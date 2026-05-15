import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useSpeechRecognition } from '../lib/useSpeechRecognition';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported } =
    useSpeechRecognition();
  const inputBeforeSpeech = useRef('');

  useEffect(() => {
    if (isListening) {
      inputBeforeSpeech.current = input;
    }
  }, [isListening]);

  useEffect(() => {
    if (transcript) {
      setInput(inputBeforeSpeech.current + transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      resetTranscript();
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
      resetTranscript();
      startListening();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#132f4c',
        borderRadius: '50px',
        px: 1.5,
        py: 0.75,
        border: isListening
          ? '1px solid rgba(244,67,54,0.5)'
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow: isListening
          ? '0 0 12px rgba(244,67,54,0.2)'
          : '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.2s',
        '&:focus-within': {
          borderColor: isListening ? 'rgba(244,67,54,0.5)' : 'rgba(25,118,210,0.6)',
        },
      }}
    >
      {isSupported && (
        <IconButton
          onClick={handleMicClick}
          disabled={disabled}
          sx={{
            color: isListening ? '#f44336' : 'rgba(255,255,255,0.5)',
            '&:hover': { color: isListening ? '#f44336' : '#90caf9' },
            transition: 'color 0.2s',
            animation: isListening ? 'micPulse 1.5s infinite' : 'none',
            '@keyframes micPulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
          }}
        >
          {isListening ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
      )}

      <InputBase
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? 'Listening...' : 'Ask whatever you want'}
        disabled={disabled}
        multiline
        maxRows={4}
        sx={{
          flex: 1,
          color: '#e3f2fd',
          px: 1.5,
          fontSize: '1rem',
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: isListening ? 'rgba(244,67,54,0.6)' : 'rgba(255,255,255,0.4)',
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
          width: 38,
          height: 38,
          '&:hover': { bgcolor: '#1565c0' },
          '&.Mui-disabled': {
            bgcolor: 'rgba(25,118,210,0.2)',
            color: 'rgba(255,255,255,0.2)',
          },
          transition: 'all 0.2s',
        }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
