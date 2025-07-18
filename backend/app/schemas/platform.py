from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel

class PlatformBase(BaseModel):
    name: str
    display_name: str
    is_connected: bool = False
    platform_user_id: Optional[str] = None
    platform_username: Optional[str] = None
    config: Optional[Dict[str, Any]] = None

class PlatformCreate(PlatformBase):
    pass

class PlatformUpdate(BaseModel):
    display_name: Optional[str] = None
    is_connected: Optional[bool] = None
    platform_user_id: Optional[str] = None
    platform_username: Optional[str] = None
    config: Optional[Dict[str, Any]] = None

class Platform(PlatformBase):
    id: int
    user_id: int
    token_expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class PlatformConnection(BaseModel):
    platform_name: str
    authorization_url: str

class PlatformCallback(BaseModel):
    platform_name: str
    code: str
    state: Optional[str] = None
