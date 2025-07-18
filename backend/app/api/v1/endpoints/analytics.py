from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.models.base import get_db
from app.models.analytics import Analytics
from app.models.post import Post
from app.models.user import User
from app.schemas.analytics import (
    AnalyticsCreate,
    Analytics as AnalyticsSchema,
    AnalyticsSummary,
    AnalyticsDateRange
)

router = APIRouter()

# Mock current user dependency - in real app, this would be from auth
def get_current_user() -> User:
    # This is a placeholder - implement proper authentication
    return User(id=1, username="testuser", email="test@example.com")

@router.get("/summary", response_model=AnalyticsSummary)
async def get_analytics_summary(
    days: int = Query(30, ge=1, le=365),
    platform: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get analytics summary for the specified time period"""
    try:
        # Calculate date range
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Base query
        query = db.query(Analytics).filter(
            Analytics.user_id == current_user.id,
            Analytics.recorded_at >= start_date,
            Analytics.recorded_at <= end_date
        )
        
        # Apply platform filter if provided
        if platform:
            query = query.filter(Analytics.platform_name == platform)
        
        analytics_data = query.all()
        
        # Calculate totals
        total_posts = len(set(a.post_id for a in analytics_data))
        total_views = sum(a.views for a in analytics_data)
        total_likes = sum(a.likes for a in analytics_data)
        total_shares = sum(a.shares for a in analytics_data)
        total_comments = sum(a.comments for a in analytics_data)
        total_clicks = sum(a.clicks for a in analytics_data)
        total_impressions = sum(a.impressions for a in analytics_data)
        total_reach = sum(a.reach for a in analytics_data)
        
        # Calculate average engagement rate
        engagement_rates = [a.engagement_rate for a in analytics_data if a.engagement_rate > 0]
        average_engagement_rate = sum(engagement_rates) / len(engagement_rates) if engagement_rates else 0
        
        # Calculate platform breakdown
        platform_breakdown = {}
        for analytics in analytics_data:
            platform_name = analytics.platform_name
            if platform_name not in platform_breakdown:
                platform_breakdown[platform_name] = {
                    "views": 0,
                    "likes": 0,
                    "shares": 0,
                    "comments": 0,
                    "clicks": 0,
                    "impressions": 0,
                    "reach": 0
                }
            
            platform_breakdown[platform_name]["views"] += analytics.views
            platform_breakdown[platform_name]["likes"] += analytics.likes
            platform_breakdown[platform_name]["shares"] += analytics.shares
            platform_breakdown[platform_name]["comments"] += analytics.comments
            platform_breakdown[platform_name]["clicks"] += analytics.clicks
            platform_breakdown[platform_name]["impressions"] += analytics.impressions
            platform_breakdown[platform_name]["reach"] += analytics.reach
        
        return AnalyticsSummary(
            total_posts=total_posts,
            total_views=total_views,
            total_likes=total_likes,
            total_shares=total_shares,
            total_comments=total_comments,
            total_clicks=total_clicks,
            total_impressions=total_impressions,
            average_engagement_rate=average_engagement_rate,
            total_reach=total_reach,
            platform_breakdown=platform_breakdown
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/posts/{post_id}", response_model=List[AnalyticsSchema])
async def get_post_analytics(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get analytics for a specific post"""
    try:
        # Verify post belongs to user
        post = db.query(Post).filter(
            Post.id == post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # Get analytics data
        analytics = db.query(Analytics).filter(
            Analytics.post_id == post_id,
            Analytics.user_id == current_user.id
        ).order_by(Analytics.recorded_at.desc()).all()
        
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/posts/{post_id}", response_model=AnalyticsSchema)
async def create_post_analytics(
    post_id: int,
    analytics: AnalyticsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create analytics record for a post"""
    try:
        # Verify post belongs to user
        post = db.query(Post).filter(
            Post.id == post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # Create analytics record
        db_analytics = Analytics(
            user_id=current_user.id,
            post_id=post_id,
            platform_name=analytics.platform_name,
            views=analytics.views,
            likes=analytics.likes,
            shares=analytics.shares,
            comments=analytics.comments,
            clicks=analytics.clicks,
            impressions=analytics.impressions,
            engagement_rate=analytics.engagement_rate,
            reach=analytics.reach,
            metadata=analytics.metadata
        )
        
        db.add(db_analytics)
        db.commit()
        db.refresh(db_analytics)
        
        return db_analytics
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/top-performing", response_model=List[AnalyticsSchema])
async def get_top_performing_posts(
    limit: int = Query(10, ge=1, le=50),
    metric: str = Query("engagement_rate", regex="^(views|likes|shares|comments|clicks|impressions|engagement_rate|reach)$"),
    platform: Optional[str] = None,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get top performing posts based on specified metric"""
    try:
        # Calculate date range
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Base query
        query = db.query(Analytics).filter(
            Analytics.user_id == current_user.id,
            Analytics.recorded_at >= start_date,
            Analytics.recorded_at <= end_date
        )
        
        # Apply platform filter if provided
        if platform:
            query = query.filter(Analytics.platform_name == platform)
        
        # Order by specified metric
        if metric == "views":
            query = query.order_by(Analytics.views.desc())
        elif metric == "likes":
            query = query.order_by(Analytics.likes.desc())
        elif metric == "shares":
            query = query.order_by(Analytics.shares.desc())
        elif metric == "comments":
            query = query.order_by(Analytics.comments.desc())
        elif metric == "clicks":
            query = query.order_by(Analytics.clicks.desc())
        elif metric == "impressions":
            query = query.order_by(Analytics.impressions.desc())
        elif metric == "engagement_rate":
            query = query.order_by(Analytics.engagement_rate.desc())
        elif metric == "reach":
            query = query.order_by(Analytics.reach.desc())
        
        top_posts = query.limit(limit).all()
        return top_posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trends")
async def get_analytics_trends(
    days: int = Query(30, ge=7, le=365),
    platform: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get analytics trends over time"""
    try:
        # Calculate date range
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Base query
        query = db.query(Analytics).filter(
            Analytics.user_id == current_user.id,
            Analytics.recorded_at >= start_date,
            Analytics.recorded_at <= end_date
        )
        
        # Apply platform filter if provided
        if platform:
            query = query.filter(Analytics.platform_name == platform)
        
        analytics_data = query.order_by(Analytics.recorded_at).all()
        
        # Group by date
        daily_metrics = {}
        for analytics in analytics_data:
            date_key = analytics.recorded_at.date().isoformat()
            if date_key not in daily_metrics:
                daily_metrics[date_key] = {
                    "views": 0,
                    "likes": 0,
                    "shares": 0,
                    "comments": 0,
                    "clicks": 0,
                    "impressions": 0,
                    "reach": 0,
                    "engagement_rate": []
                }
            
            daily_metrics[date_key]["views"] += analytics.views
            daily_metrics[date_key]["likes"] += analytics.likes
            daily_metrics[date_key]["shares"] += analytics.shares
            daily_metrics[date_key]["comments"] += analytics.comments
            daily_metrics[date_key]["clicks"] += analytics.clicks
            daily_metrics[date_key]["impressions"] += analytics.impressions
            daily_metrics[date_key]["reach"] += analytics.reach
            daily_metrics[date_key]["engagement_rate"].append(analytics.engagement_rate)
        
        # Calculate average engagement rate for each day
        for date_key in daily_metrics:
            engagement_rates = daily_metrics[date_key]["engagement_rate"]
            if engagement_rates:
                daily_metrics[date_key]["engagement_rate"] = sum(engagement_rates) / len(engagement_rates)
            else:
                daily_metrics[date_key]["engagement_rate"] = 0
        
        return {"trends": daily_metrics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
