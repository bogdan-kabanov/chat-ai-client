import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { ChatMessage, LoadingIndicator } from '../../../entities/message';
import { ChatInput } from '../../../features/send-message';
import WelcomeScreen from './WelcomeScreen';
import { Message } from '../../../shared/types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, onSend }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0a1929',
        background: 'linear-gradient(180deg, #0a1929 0%, #0d2137 100%)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 850,
          width: '100%',
          mx: 'auto',
          px: 3,
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 3,
          },
        }}
      >
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <Box sx={{ py: 4 }}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          maxWidth: 850,
          width: '100%',
          mx: 'auto',
          px: 3,
          pb: 3,
          pt: 1.5,
        }}
      >
        <ChatInput onSend={onSend} disabled={isLoading} />
      </Box>
    </Box>
  );
};

export default ChatArea;
