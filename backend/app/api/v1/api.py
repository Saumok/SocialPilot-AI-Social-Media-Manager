from fastapi import APIRouter

from app.api.v1.endpoints import content, posts, analytics, auth, platforms

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
api_router.include_router(platforms.router, prefix="/platforms", tags=["platforms"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
