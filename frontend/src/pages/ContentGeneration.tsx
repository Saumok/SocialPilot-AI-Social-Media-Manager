import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { AutoAwesome, Send } from '@mui/icons-material';

const ContentGeneration: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: '',
    platform: '',
    tone: 'professional',
    length: 'medium',
    includeHashtags: true,
    includeEmojis: true,
    targetAudience: '',
    keywords: '',
  });

  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const platforms = [
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'funny', label: 'Funny' },
    { value: 'inspirational', label: 'Inspirational' },
  ];

  const lengths = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateContent = async () => {
    if (!formData.topic || !formData.platform) {
      setError('Please fill in the topic and platform fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          platform: formData.platform,
          tone: formData.tone,
          length: formData.length,
          include_hashtags: formData.includeHashtags,
          include_emojis: formData.includeEmojis,
          target_audience: formData.targetAudience || null,
          keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsPost = () => {
    if (!generatedContent) return;

    // In a real app, this would save the content as a post
    console.log('Saving as post:', generatedContent);
    // Navigate to posts page or show success message
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Content Generation
      </Typography>
      
      <Grid container spacing={3}>
        {/* Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Parameters
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Topic"
                    placeholder="e.g., AI in marketing, healthy recipes, travel tips"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Platform</InputLabel>
                    <Select
                      value={formData.platform}
                      onChange={(e) => handleInputChange('platform', e.target.value)}
                    >
                      {platforms.map((platform) => (
                        <MenuItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tone</InputLabel>
                    <Select
                      value={formData.tone}
                      onChange={(e) => handleInputChange('tone', e.target.value)}
                    >
                      {tones.map((tone) => (
                        <MenuItem key={tone.value} value={tone.value}>
                          {tone.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Length</InputLabel>
                    <Select
                      value={formData.length}
                      onChange={(e) => handleInputChange('length', e.target.value)}
                    >
                      {lengths.map((length) => (
                        <MenuItem key={length.value} value={length.value}>
                          {length.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Target Audience"
                    placeholder="e.g., young professionals, parents, students"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Keywords (comma-separated)"
                    placeholder="e.g., marketing, AI, automation"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.includeHashtags}
                          onChange={(e) => handleInputChange('includeHashtags', e.target.checked)}
                        />
                      }
                      label="Include Hashtags"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.includeEmojis}
                          onChange={(e) => handleInputChange('includeEmojis', e.target.checked)}
                        />
                      }
                      label="Include Emojis"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleGenerateContent}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
                  >
                    {loading ? 'Generating...' : 'Generate Content'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Generated Content */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generated Content
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {generatedContent ? (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                    {generatedContent.content}
                  </Typography>

                  {generatedContent.hashtags && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Hashtags:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {generatedContent.hashtags.map((hashtag: string, index: number) => (
                          <Chip
                            key={index}
                            label={hashtag}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {generatedContent.engagement_tips && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Engagement Tips:
                      </Typography>
                      <ul>
                        {generatedContent.engagement_tips.map((tip: string, index: number) => (
                          <li key={index}>
                            <Typography variant="body2">{tip}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  <Button
                    variant="outlined"
                    startIcon={<Send />}
                    onClick={handleSaveAsPost}
                    sx={{ mr: 2 }}
                  >
                    Save as Post
                  </Button>
                  <Button
                    variant="text"
                    onClick={handleGenerateContent}
                    disabled={loading}
                  >
                    Generate Another
                  </Button>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Generated content will appear here. Fill in the form and click "Generate Content" to get started.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentGeneration;
