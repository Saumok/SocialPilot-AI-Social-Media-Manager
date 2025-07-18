from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.schemas.content import (
    ContentGenerationRequest,
    ContentGeneration,
    ContentBatch,
    ContentBatchResponse,
    ContentOptimization,
    ContentOptimizationResponse
)
from app.services.ai_service import ai_service

router = APIRouter()

@router.post("/generate", response_model=ContentGeneration)
async def generate_content(request: ContentGenerationRequest):
    """Generate AI-powered social media content"""
    try:
        content = await ai_service.generate_content(request)
        return content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/batch-generate", response_model=ContentBatchResponse)
async def batch_generate_content(request: ContentBatch):
    """Generate multiple content pieces at once"""
    try:
        contents = []
        for _ in range(request.count):
            content_request = ContentGenerationRequest(
                topic=request.topic,
                platform=request.platform,
                tone=request.tone,
                length=request.length,
                include_hashtags=request.include_hashtags,
                include_emojis=request.include_emojis,
                target_audience=request.target_audience,
                keywords=request.keywords
            )
            content = await ai_service.generate_content(content_request)
            contents.append(content)
        
        return ContentBatchResponse(contents=contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/optimize", response_model=ContentOptimizationResponse)
async def optimize_content(request: ContentOptimization):
    """Optimize existing content for better engagement"""
    try:
        # This is a simplified optimization - in a real app, you'd use AI here too
        improvements = [
            "Added relevant hashtags",
            "Improved call-to-action",
            "Enhanced readability",
            "Optimized for platform best practices"
        ]
        
        optimized_content = request.original_content
        if request.optimization_type == "engagement":
            optimized_content += "\n\n💭 What do you think? Let us know in the comments!"
        elif request.optimization_type == "reach":
            optimized_content += "\n\n🔄 Please share if you found this helpful!"
        elif request.optimization_type == "clicks":
            optimized_content += "\n\n🔗 Click the link in our bio to learn more!"
        
        return ContentOptimizationResponse(
            optimized_content=optimized_content,
            improvements=improvements,
            expected_improvement=25.0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/templates")
async def get_content_templates():
    """Get available content templates"""
    return {
        "templates": [
            {
                "name": "Product Launch",
                "description": "Announce new products or services",
                "platforms": ["twitter", "instagram", "facebook", "linkedin"]
            },
            {
                "name": "Behind the Scenes",
                "description": "Show your team or process",
                "platforms": ["instagram", "facebook", "linkedin"]
            },
            {
                "name": "Industry News",
                "description": "Share relevant industry updates",
                "platforms": ["twitter", "linkedin"]
            },
            {
                "name": "User Generated Content",
                "description": "Feature customer content",
                "platforms": ["instagram", "facebook", "twitter"]
            }
        ]
    }

@router.get("/hashtag-suggestions")
async def get_hashtag_suggestions(topic: str, platform: str):
    """Get hashtag suggestions for a topic and platform"""
    # In a real app, this would use AI or a hashtag database
    base_hashtags = [f"#{topic.replace(' ', '')}", "#SocialMedia", "#Content"]
    
    platform_hashtags = {
        "instagram": ["#InstaGood", "#PhotoOfTheDay", "#Instagood"],
        "twitter": ["#TwitterChat", "#Tweet", "#Social"],
        "facebook": ["#Facebook", "#Community", "#Share"],
        "linkedin": ["#LinkedIn", "#Professional", "#Business"]
    }
    
    suggestions = base_hashtags + platform_hashtags.get(platform.lower(), [])
    return {"hashtags": suggestions}
