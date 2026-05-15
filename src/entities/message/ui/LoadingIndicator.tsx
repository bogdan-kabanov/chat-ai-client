import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const LoadingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 2.5,
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#2e7d32',
          width: 34,
          height: 34,
        }}
      >
        <SmartToyIcon fontSize="small" />
      </Avatar>
      <Box
        sx={{
          bgcolor: '#1e3a5f',
          borderRadius: '18px 18px 18px 4px',
          px: 2.5,
          py: 1.5,
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#90caf9',
                animation: 'pulse 1.4s infinite ease-in-out',
                animationDelay: `${i * 0.2}s`,
                '@keyframes pulse': {
                  '0%, 80%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                  '40%': { opacity: 1, transform: 'scale(1)' },
                },
              }}
            />
          ))}
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', ml: 0.5 }}>
          Thinking...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingIndicator;
