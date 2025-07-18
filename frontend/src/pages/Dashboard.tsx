import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  ThumbUp,
  Share,
  Comment,
  Visibility,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from API
  const stats = {
    totalPosts: 45,
    totalViews: 12500,
    totalLikes: 2340,
    totalShares: 890,
    totalComments: 456,
    engagementRate: 8.7,
  };

  const recentPosts = [
    {
      id: 1,
      title: 'AI Revolution in Social Media',
      platform: 'Twitter',
      status: 'published',
      likes: 245,
      shares: 89,
      comments: 34,
    },
    {
      id: 2,
      title: 'Top 10 Social Media Trends',
      platform: 'LinkedIn',
      status: 'scheduled',
      scheduledAt: '2024-01-20 10:00',
    },
    {
      id: 3,
      title: 'Behind the Scenes: Our Team',
      platform: 'Instagram',
      status: 'published',
      likes: 567,
      shares: 123,
      comments: 78,
    },
  ];

  const StatCard: React.FC<{
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ color: color, mr: 1 }}>{icon}</Box>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Posts"
            value={stats.totalPosts}
            icon={<TrendingUp />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            icon={<Visibility />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Likes"
            value={stats.totalLikes.toLocaleString()}
            icon={<ThumbUp />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Shares"
            value={stats.totalShares}
            icon={<Share />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Comments"
            value={stats.totalComments}
            icon={<Comment />}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Engagement Rate"
            value={`${stats.engagementRate}%`}
            icon={<TrendingUp />}
            color="#2196f3"
          />
        </Grid>

        {/* Recent Posts */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Posts
              </Typography>
              <List>
                {recentPosts.map((post) => (
                  <ListItem key={post.id} divider>
                    <ListItemText
                      primary={post.title}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Chip
                            label={post.platform}
                            size="small"
                            color="primary"
                          />
                          <Chip
                            label={post.status}
                            size="small"
                            color={post.status === 'published' ? 'success' : 'default'}
                          />
                          {post.status === 'published' && (
                            <Typography variant="caption" color="text.secondary">
                              {post.likes} likes • {post.shares} shares • {post.comments} comments
                            </Typography>
                          )}
                          {post.status === 'scheduled' && (
                            <Typography variant="caption" color="text.secondary">
                              Scheduled for: {post.scheduledAt}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Performance Overview
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Engagement Rate
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={stats.engagementRate * 10}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {stats.engagementRate}% (Target: 10%)
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Monthly Goal
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  75% completed
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Growth Rate
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  +15% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
