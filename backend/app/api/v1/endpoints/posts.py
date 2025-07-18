from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.base import get_db
from app.models.post import Post, PostStatus
from app.schemas.post import PostCreate, PostUpdate, Post as PostSchema, PostSchedule
from app.models.user import User

router = APIRouter()

# Mock current user dependency - in real app, this would be from auth
def get_current_user() -> User:
    # This is a placeholder - implement proper authentication
    return User(id=1, username="testuser", email="test@example.com")

@router.post("/", response_model=PostSchema)
async def create_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new post"""
    try:
        db_post = Post(
            user_id=current_user.id,
            title=post.title,
            content=post.content,
            hashtags=post.hashtags,
            media_urls=post.media_urls,
            platform_name=post.platform_name,
            scheduled_at=post.scheduled_at
        )
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[PostSchema])
async def get_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    platform: Optional[str] = None,
    status: Optional[PostStatus] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user's posts with optional filtering"""
    try:
        query = db.query(Post).filter(Post.user_id == current_user.id)
        
        if platform:
            query = query.filter(Post.platform_name == platform)
        
        if status:
            query = query.filter(Post.status == status)
        
        posts = query.offset(skip).limit(limit).all()
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{post_id}", response_model=PostSchema)
async def get_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific post by ID"""
    try:
        post = db.query(Post).filter(
            Post.id == post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        return post
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{post_id}", response_model=PostSchema)
async def update_post(
    post_id: int,
    post_update: PostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a specific post"""
    try:
        post = db.query(Post).filter(
            Post.id == post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # Update only provided fields
        update_data = post_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(post, field, value)
        
        db.commit()
        db.refresh(post)
        return post
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{post_id}")
async def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a specific post"""
    try:
        post = db.query(Post).filter(
            Post.id == post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        db.delete(post)
        db.commit()
        return {"message": "Post deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/schedule", response_model=PostSchema)
async def schedule_post(
    schedule: PostSchedule,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Schedule a post for later publishing"""
    try:
        post = db.query(Post).filter(
            Post.id == schedule.post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        post.scheduled_at = schedule.scheduled_at
        post.status = PostStatus.SCHEDULED
        
        db.commit()
        db.refresh(post)
        return post
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{post_id}/publish", response_model=PostSchema)
async def publish_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Immediately publish a post"""
    try:
        post = db.query(Post).filter(
            Post.id == post_id,
            Post.user_id == current_user.id
        ).first()
        
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # In a real app, this would call the social media platform APIs
        # For now, we'll just mark it as published
        post.status = PostStatus.PUBLISHED
        from datetime import datetime
        post.published_at = datetime.utcnow()
        
        db.commit()
        db.refresh(post)
        return post
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/scheduled/upcoming", response_model=List[PostSchema])
async def get_upcoming_posts(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get upcoming scheduled posts"""
    try:
        from datetime import datetime
        posts = db.query(Post).filter(
            Post.user_id == current_user.id,
            Post.status == PostStatus.SCHEDULED,
            Post.scheduled_at > datetime.utcnow()
        ).order_by(Post.scheduled_at).limit(limit).all()
        
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
