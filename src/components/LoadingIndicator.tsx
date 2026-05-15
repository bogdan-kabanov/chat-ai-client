import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 2,
        px: 2,
      }}
    >
      <CircularProgress size={20} sx={{ color: 'rgba(255,255,255,0.7)' }} />
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
        Thinking...
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;
