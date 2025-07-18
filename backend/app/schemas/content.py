from typing import Optional, List
from pydantic import BaseModel

class ContentGenerationRequest(BaseModel):
    topic: str
    platform: str
    tone: Optional[str] = "professional"  # professional, casual, funny, inspirational
    length: Optional[str] = "medium"  # short, medium, long
    include_hashtags: bool = True
    include_emojis: bool = True
    target_audience: Optional[str] = None
    keywords: Optional[List[str]] = None
    
class ContentGeneration(BaseModel):
    content: str
    hashtags: Optional[List[str]] = None
    suggested_images: Optional[List[str]] = None
    engagement_tips: Optional[List[str]] = None
    
class ContentBatch(BaseModel):
    topic: str
    platform: str
    count: int = 5
    tone: Optional[str] = "professional"
    length: Optional[str] = "medium"
    include_hashtags: bool = True
    include_emojis: bool = True
    target_audience: Optional[str] = None
    keywords: Optional[List[str]] = None
    
class ContentBatchResponse(BaseModel):
    contents: List[ContentGeneration]
    
class ContentOptimization(BaseModel):
    original_content: str
    platform: str
    optimization_type: str  # engagement, reach, clicks, conversions
    
class ContentOptimizationResponse(BaseModel):
    optimized_content: str
    improvements: List[str]
    expected_improvement: float  # percentage improvement expected
