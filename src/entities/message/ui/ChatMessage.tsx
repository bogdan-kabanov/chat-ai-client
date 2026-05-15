import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { Message } from '../../../shared/types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 2.5,
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? '#1976d2' : '#2e7d32',
          width: 34,
          height: 34,
          mt: 0.5,
        }}
      >
        {isUser ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
      </Avatar>
      <Box
        sx={{
          maxWidth: '75%',
          bgcolor: isUser ? '#1976d2' : '#1e3a5f',
          color: '#fff',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          px: 2.5,
          py: 1.5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: '#f0f4f8',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
