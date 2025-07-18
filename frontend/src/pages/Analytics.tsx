import React from 'react';
import { Box, Typography } from '@mui/material';

const Analytics: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body1">
        This page will contain detailed analytics and insights about post performance, engagement metrics, and growth tracking.
      </Typography>
    </Box>
  );
};

export default Analytics;
