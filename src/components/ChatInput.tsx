import React, { useState, useEffect } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { isListening, transcript, startListening, stopListening, isSupported } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput((prev) => prev + transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#1a3a5c',
        borderRadius: '28px',
        px: 1,
        py: 0.5,
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {isSupported && (
        <IconButton
          onClick={handleMicClick}
          disabled={disabled}
          sx={{
            color: isListening ? '#f44336' : 'rgba(255,255,255,0.7)',
            '&:hover': { color: isListening ? '#f44336' : '#fff' },
          }}
        >
          {isListening ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
      )}

      <InputBase
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask whatever you want"
        disabled={disabled}
        multiline
        maxRows={4}
        sx={{
          flex: 1,
          color: '#fff',
          px: 1,
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: 'rgba(255,255,255,0.5)',
              opacity: 1,
            },
          },
        }}
      />

      <IconButton
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        sx={{
          bgcolor: '#1976d2',
          color: '#fff',
          width: 36,
          height: 36,
          '&:hover': { bgcolor: '#1565c0' },
          '&.Mui-disabled': { bgcolor: 'rgba(25,118,210,0.3)', color: 'rgba(255,255,255,0.3)' },
        }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
