import openai
from typing import List, Optional
from app.core.config import settings
from app.schemas.content import ContentGeneration, ContentGenerationRequest

class AIService:
    def __init__(self):
        if settings.OPENAI_API_KEY:
            openai.api_key = settings.OPENAI_API_KEY
    
    async def generate_content(self, request: ContentGenerationRequest) -> ContentGeneration:
        """Generate AI content based on request parameters"""
        try:
            # Build the prompt based on request parameters
            prompt = self._build_prompt(request)
            
            # Call OpenAI API
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a social media content creator expert."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            content = response.choices[0].message.content.strip()
            
            # Extract hashtags if requested
            hashtags = None
            if request.include_hashtags:
                hashtags = self._extract_hashtags(content)
            
            # Generate engagement tips
            engagement_tips = self._generate_engagement_tips(request.platform)
            
            return ContentGeneration(
                content=content,
                hashtags=hashtags,
                engagement_tips=engagement_tips
            )
            
        except Exception as e:
            # Fallback to template-based generation if AI fails
            return self._generate_fallback_content(request)
    
    def _build_prompt(self, request: ContentGenerationRequest) -> str:
        """Build AI prompt based on request parameters"""
        prompt = f"Create a {request.tone} social media post for {request.platform} about {request.topic}."
        
        if request.length == "short":
            prompt += " Keep it concise and under 100 characters."
        elif request.length == "long":
            prompt += " Write a detailed post with multiple paragraphs."
        else:
            prompt += " Write a medium-length post."
        
        if request.target_audience:
            prompt += f" Target audience: {request.target_audience}."
        
        if request.keywords:
            prompt += f" Include these keywords: {', '.join(request.keywords)}."
        
        if request.include_hashtags:
            prompt += " Include relevant hashtags."
        
        if request.include_emojis:
            prompt += " Include appropriate emojis."
        
        return prompt
    
    def _extract_hashtags(self, content: str) -> List[str]:
        """Extract hashtags from generated content"""
        import re
        hashtags = re.findall(r'#\w+', content)
        return hashtags
    
    def _generate_engagement_tips(self, platform: str) -> List[str]:
        """Generate platform-specific engagement tips"""
        tips = {
            "twitter": [
                "Tweet during peak hours (8-9 AM, 6-7 PM)",
                "Use 1-2 hashtags maximum",
                "Include a call-to-action",
                "Engage with replies quickly"
            ],
            "instagram": [
                "Post during lunch hours (11 AM - 2 PM)",
                "Use 5-10 relevant hashtags",
                "Include a strong visual element",
                "Ask questions in your caption"
            ],
            "facebook": [
                "Post between 1-4 PM on weekdays",
                "Keep posts under 250 characters",
                "Include native video when possible",
                "Encourage comments and shares"
            ],
            "linkedin": [
                "Post during business hours (8 AM - 6 PM)",
                "Share professional insights",
                "Tag relevant people or companies",
                "Include industry-relevant hashtags"
            ]
        }
        return tips.get(platform.lower(), [])
    
    def _generate_fallback_content(self, request: ContentGenerationRequest) -> ContentGeneration:
        """Generate fallback content when AI service fails"""
        templates = {
            "professional": "Exciting news about {topic}! We're thrilled to share this update with our community. What are your thoughts?",
            "casual": "Hey everyone! Just wanted to share something cool about {topic}. Check it out! 😊",
            "funny": "You know what's funny about {topic}? It's actually pretty amazing! 😂 Who else agrees?",
            "inspirational": "Every day is a new opportunity to learn about {topic}. Stay motivated and keep growing! 🚀"
        }
        
        content = templates.get(request.tone, templates["professional"]).format(topic=request.topic)
        
        hashtags = [f"#{request.topic.replace(' ', '')}", "#SocialMedia", "#Content"] if request.include_hashtags else None
        
        return ContentGeneration(
            content=content,
            hashtags=hashtags,
            engagement_tips=self._generate_engagement_tips(request.platform)
        )

# Global instance
ai_service = AIService()
