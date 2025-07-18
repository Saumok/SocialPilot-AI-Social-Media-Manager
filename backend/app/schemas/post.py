from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from app.models.post import PostStatus

class PostBase(BaseModel):
    title: str
    content: str
    hashtags: Optional[str] = None
    media_urls: Optional[str] = None
    platform_name: str
    scheduled_at: Optional[datetime] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    hashtags: Optional[str] = None
    media_urls: Optional[str] = None
    platform_name: Optional[str] = None
    status: Optional[PostStatus] = None
    scheduled_at: Optional[datetime] = None

class Post(PostBase):
    id: int
    user_id: int
    status: PostStatus
    published_at: Optional[datetime] = None
    external_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class PostSchedule(BaseModel):
    post_id: int
    scheduled_at: datetime

class PostBulkSchedule(BaseModel):
    posts: List[PostSchedule]
