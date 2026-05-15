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
        py: 8,
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(25,118,210,0.15)',
          borderRadius: 2.5,
          p: 1.5,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(25,118,210,0.3)',
        }}
      >
        <ChatBubbleIcon sx={{ color: '#90caf9', fontSize: 30 }} />
      </Box>

      <Typography
        variant="h5"
        sx={{ color: '#90caf9', fontWeight: 400, mb: 1.5, fontSize: '1.4rem' }}
      >
        Hi there!
      </Typography>

      <Typography
        variant="h4"
        sx={{ color: '#fff', fontWeight: 700, mb: 2.5, fontSize: '2rem', lineHeight: 1.3 }}
      >
        What would you like to know?
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: 'rgba(255,255,255,0.55)', maxWidth: 420, lineHeight: 1.7 }}
      >
        Use one of the most common prompts below
        <br />
        or ask your own question
      </Typography>
    </Box>
  );
};

export default WelcomeScreen;
