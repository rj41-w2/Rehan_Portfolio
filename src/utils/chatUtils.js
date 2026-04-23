// Chat utility functions for managing conversation context and persistence

export const loadChatHistory = (defaultMessage = "") => {
  try {
    const savedChat = localStorage.getItem('portfolio_chat_history');
    if (savedChat) {
      const parsed = JSON.parse(savedChat);
      // Ensure we have at least one message
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load chat history:', e);
  }

  // Return default message if no saved history or error
  return defaultMessage ? [{ role: 'assistant', text: defaultMessage }] : [];
};

export const saveChatHistory = (messages) => {
  try {
    localStorage.setItem('portfolio_chat_history', JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save chat history:', e);
  }
};

export const clearChatHistory = (defaultMessage = "") => {
  localStorage.removeItem('portfolio_chat_history');
  return defaultMessage ? [{ role: 'assistant', text: defaultMessage }] : [];
};

// Context window management - limit conversation length to prevent token overflow
export const manageContextWindow = (messages, maxMessages = 20) => {
  if (messages.length <= maxMessages) {
    return messages;
  }

  // Keep the first message (welcome) and the most recent messages
  const firstMessage = messages[0];
  const recentMessages = messages.slice(-(maxMessages - 1));

  return [firstMessage, ...recentMessages];
};

// Check if a response should be cached (avoid caching sensitive or error messages)
export const shouldCacheResponse = (response) => {
  const noCachePatterns = [
    'QUOTA_EXHAUSTED',
    'RATE_LIMIT_EXCEEDED',
    'API_ERROR',
    'NETWORK_ERROR',
    'CONNECTION_ERROR',
    'API_KEY_MISSING',
    'Error:',
    '⚠️'
  ];

  return !noCachePatterns.some(pattern => response.includes(pattern));
};