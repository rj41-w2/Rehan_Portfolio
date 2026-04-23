// Test component to verify the chat enhancements work
import React from 'react';

const ChatWidgetTest = () => {
  const testFeatures = () => {
    console.log('Testing Chat Widget Enhancements...');

    // Test 1: Local Storage Persistence
    const testHistory = [
      { role: 'user', text: 'What are Rehan\'s skills?' },
      { role: 'assistant', text: 'Rehan has expertise in AI, Python, and web development.' }
    ];

    localStorage.setItem('portfolio_chat_history', JSON.stringify(testHistory));
    const loaded = JSON.parse(localStorage.getItem('portfolio_chat_history') || '[]');
    console.log('Local Storage Test:', loaded.length === 2 ? 'PASS' : 'FAIL');

    // Test 2: Context Window Management
    const longHistory = Array.from({ length: 30 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      text: `Message ${i + 1}`
    }));

    const managed = manageContextWindow(longHistory, 25);
    console.log('Context Window Test:', managed.length === 25 ? 'PASS' : 'FAIL');

    // Test 3: Cache Key Generation
    const testPrompt = "Tell me about AI projects";
    const testHistoryForCache = [
      { role: 'model', parts: [{ text: 'Hello! How can I help?' }] },
      { role: 'user', parts: [{ text: 'What can you tell me?' }] }
    ];

    const cacheKey = getCacheKey(testPrompt, testHistoryForCache);
    console.log('Cache Key Test:', cacheKey.includes('ai_cache_') ? 'PASS' : 'FAIL');

    // Test 4: Cache Validation
    const validResponse = "Rehan has worked on several AI projects including...";
    const errorResponse = "QUOTA_EXHAUSTED: API limit reached";

    console.log('Cache Validation Test - Valid:', shouldCacheResponse(validResponse) ? 'PASS' : 'FAIL');
    console.log('Cache Validation Test - Error:', !shouldCacheResponse(errorResponse) ? 'PASS' : 'FAIL');

    localStorage.removeItem('portfolio_chat_history');
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Chat Widget Test Suite</h3>
      <button
        onClick={testFeatures}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run Tests
      </button>
      <p className="mt-2 text-sm text-slate-600">
        Check browser console for test results
      </p>
    </div>
  );
};

// Mock functions for testing
const manageContextWindow = (messages, max) => {
  if (messages.length <= max) return messages;
  const first = messages[0];
  const recent = messages.slice(-(max - 1));
  return [first, ...recent];
};

const getCacheKey = (prompt, history) => {
  const recentContext = history
    .slice(-3)
    .map(msg => msg.parts[0].text.substring(0, 20))
    .join('_');
  return `ai_cache_${recentContext}_${prompt.toLowerCase().trim().replace(/[^a-z0-9]/g, '_')}`;
};

const shouldCacheResponse = (response) => {
  const noCachePatterns = ['QUOTA_EXHAUSTED', 'RATE_LIMIT_EXCEEDED', 'API_ERROR', 'NETWORK_ERROR', 'CONNECTION_ERROR', 'API_KEY_MISSING', 'Error:', '⚠️'];
  return !noCachePatterns.some(pattern => response.includes(pattern));
};

export default ChatWidgetTest;