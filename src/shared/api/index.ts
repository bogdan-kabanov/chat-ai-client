import axios from 'axios';
import { ChatResponse, Conversation } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (
  message: string,
  conversationId?: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/chat/send', {
    message,
    conversationId,
  });
  return response.data;
};

export const getConversations = async (): Promise<{ success: boolean; data: Conversation[] }> => {
  const response = await api.get('/chat/conversations');
  return response.data;
};

export const getConversation = async (id: string): Promise<{ success: boolean; data: Conversation }> => {
  const response = await api.get(`/chat/conversations/${id}`);
  return response.data;
};

export const deleteConversation = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/chat/conversations/${id}`);
  return response.data;
};
