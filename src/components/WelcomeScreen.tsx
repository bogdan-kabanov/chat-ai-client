import React from 'react';
import { Box, Typography } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const WelcomeScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        px: 4,
        py: 6,
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          p: 1.5,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChatBubbleIcon sx={{ color: '#fff', fontSize: 28 }} />
      </Box>

      <Typography
        variant="h5"
        sx={{ color: '#fff', fontWeight: 400, mb: 1 }}
      >
        Hi there!
      </Typography>

      <Typography
        variant="h4"
        sx={{ color: '#fff', fontWeight: 700, mb: 2 }}
      >
        What would you like to know?
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 400 }}
      >
        Use one of the most common prompts below
        <br />
        or ask your own question
      </Typography>
    </Box>
  );
};

export default WelcomeScreen;
