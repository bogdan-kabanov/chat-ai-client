import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Conversation } from '../../../shared/types';
import { getConversations, deleteConversation } from '../../../shared/api';

interface SidebarProps {
  currentConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat: () => void;
  refreshTrigger: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentConversationId,
  onSelectConversation,
  onNewChat,
  refreshTrigger,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await getConversations();
      if (response.success) {
        setConversations(response.data);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [refreshTrigger]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (currentConversationId === id) {
        onNewChat();
      }
    } catch {
    }
  };

  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280,
        height: '100vh',
        bgcolor: '#071318',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          onClick={onNewChat}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'rgba(25,118,210,0.15)',
              borderColor: 'rgba(25,118,210,0.4)',
            },
          }}
        >
          <AddIcon sx={{ color: '#90caf9', fontSize: 20 }} />
          <Typography sx={{ color: '#e3f2fd', fontSize: '0.9rem', fontWeight: 500 }}>
            Новый чат
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      <Box sx={{ flex: 1, overflow: 'auto', px: 1, py: 1 }}>
        {loading && conversations.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} sx={{ color: '#90caf9' }} />
          </Box>
        ) : conversations.length === 0 ? (
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.3)',
              textAlign: 'center',
              py: 4,
              fontSize: '0.85rem',
            }}
          >
            Нет чатов
          </Typography>
        ) : (
          <List disablePadding>
            {conversations.map((conv) => (
              <ListItemButton
                key={conv.id}
                selected={conv.id === currentConversationId}
                onClick={() => onSelectConversation(conv)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  py: 1,
                  px: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(25,118,210,0.2)',
                    '&:hover': { bgcolor: 'rgba(25,118,210,0.25)' },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '& .delete-btn': { opacity: 1 },
                  },
                }}
              >
                <ChatBubbleOutlineIcon
                  sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, mr: 1.5, flexShrink: 0 }}
                />
                <ListItemText
                  primary={conv.title}
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: { color: '#e3f2fd', fontSize: '0.85rem' },
                  }}
                />
                <IconButton
                  className="delete-btn"
                  size="small"
                  onClick={(e) => handleDelete(e, conv.id)}
                  sx={{
                    opacity: 0,
                    color: 'rgba(255,255,255,0.4)',
                    transition: 'opacity 0.2s',
                    '&:hover': { color: '#f44336' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
