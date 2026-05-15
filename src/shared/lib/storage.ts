export const STORAGE_KEY_MESSAGES = 'chat_messages';
export const STORAGE_KEY_CONVERSATION = 'chat_conversation_id';

export const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
  }
  return fallback;
};

export const saveToStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
};

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};
