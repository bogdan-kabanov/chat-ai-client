import React, { useState, useCallback } from 'react';
import {
  Box,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Sidebar } from '../widgets/sidebar';
import { ChatArea } from '../widgets/chat-area';
import { sendMessage } from '../shared/api';
import { Message, Conversation } from '../shared/types';
import {
  STORAGE_KEY_MESSAGES,
  STORAGE_KEY_CONVERSATION,
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from '../shared/lib/storage';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() =>
    loadFromStorage<Message[]>(STORAGE_KEY_MESSAGES, [])
  );
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(() =>
    loadFromStorage<string | undefined>(STORAGE_KEY_CONVERSATION, undefined)
  );
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);

  const saveSession = useCallback((msgs: Message[], convId: string | undefined) => {
    saveToStorage(STORAGE_KEY_MESSAGES, msgs);
    if (convId) {
      saveToStorage(STORAGE_KEY_CONVERSATION, convId);
    } else {
      removeFromStorage(STORAGE_KEY_CONVERSATION);
    }
  }, []);

  const resetChat = () => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
    removeFromStorage(STORAGE_KEY_MESSAGES);
    removeFromStorage(STORAGE_KEY_CONVERSATION);
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setNewChatDialogOpen(true);
    } else {
      resetChat();
    }
  };

  const handleConfirmNewChat = () => {
    setNewChatDialogOpen(false);
    resetChat();
  };

  const handleSelectConversation = (conversation: Conversation) => {
    const msgs: Message[] = conversation.messages.map((msg) => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      createdAt: msg.createdAt,
    }));
    setMessages(msgs);
    setConversationId(conversation.id);
    saveSession(msgs, conversation.id);
    setError(null);
  };

  const handleSend = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveSession(updatedMessages, conversationId);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(message, conversationId);

      if (response.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.reply,
          createdAt: new Date().toISOString(),
        };

        const finalMessages = [...updatedMessages, assistantMessage];
        setMessages(finalMessages);
        setConversationId(response.data.conversationId);
        saveSession(finalMessages, response.data.conversationId);
        setRefreshTrigger((prev) => prev + 1);
      } else {
        setError(response.error || 'Failed to get response');
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred. Please try again.';
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { error?: string } } }).response?.data?.error === 'string'
      ) {
        setError((err as { response: { data: { error: string } } }).response.data.error);
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Sidebar
        currentConversationId={conversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        refreshTrigger={refreshTrigger}
      />

      <ChatArea messages={messages} isLoading={isLoading} onSend={handleSend} />

      <Dialog
        open={newChatDialogOpen}
        onClose={() => setNewChatDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#132f4c',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e3f2fd' }}>Начать новый чат?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Текущий чат уже сохранён. Вы можете вернуться к нему в любой момент через боковую панель.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setNewChatDialogOpen(false)}
            sx={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirmNewChat}
            variant="contained"
            sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
          >
            Новый чат
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
