from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel

class AnalyticsBase(BaseModel):
    platform_name: str
    views: int = 0
    likes: int = 0
    shares: int = 0
    comments: int = 0
    clicks: int = 0
    impressions: int = 0
    engagement_rate: float = 0.0
    reach: int = 0
    metadata: Optional[Dict[str, Any]] = None

class AnalyticsCreate(AnalyticsBase):
    post_id: int

class Analytics(AnalyticsBase):
    id: int
    user_id: int
    post_id: int
    recorded_at: datetime
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class AnalyticsSummary(BaseModel):
    total_posts: int
    total_views: int
    total_likes: int
    total_shares: int
    total_comments: int
    total_clicks: int
    total_impressions: int
    average_engagement_rate: float
    total_reach: int
    platform_breakdown: Dict[str, Dict[str, int]]
    
class AnalyticsDateRange(BaseModel):
    start_date: datetime
    end_date: datetime
    platform_name: Optional[str] = None
