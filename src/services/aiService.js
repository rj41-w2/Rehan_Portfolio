import { callGroq } from './groq';
import { callGemini } from './gemini';
import { shouldCacheResponse } from '../utils/chatUtils';

// OpenRouter Implementation
const callOpenRouter = async (prompt, systemInstruction = "", history = []) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) return "API_KEY_MISSING";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-001", // Economical & Fast
        messages: [
          { role: "system", content: systemInstruction },
          ...history.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', content: h.parts[0].text })),
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    if (response.status === 429) return "RATE_LIMIT_EXCEEDED";
    return data.choices[0].message.content;
  } catch (error) {
    return "NETWORK_ERROR";
  }
};

// Enhanced caching with conversation context consideration
export const getCacheKey = (prompt, history) => {
  // Create a more specific cache key that includes context from recent messages
  const recentContext = history
    .slice(-3) // Consider last 3 messages for context
    .map(msg => msg.parts[0].text.substring(0, 20)) // First 20 chars of each
    .join('_');

  return `ai_cache_${recentContext}_${prompt.toLowerCase().trim().replace(/[^a-z0-9]/g, '_')}`;
};

// Cache management utilities
const MAX_CACHE_ENTRIES = 100;
const cleanupCache = () => {
  const cacheKeys = Object.keys(localStorage).filter(key => key.startsWith('ai_cache_'));
  if (cacheKeys.length > MAX_CACHE_ENTRIES) {
    // Remove oldest entries
    const sortedKeys = cacheKeys.sort((a, b) => {
      const aTime = localStorage.getItem(`cache_time_${a}`) || 0;
      const bTime = localStorage.getItem(`cache_time_${b}`) || 0;
      return aTime - bTime;
    });

    for (let i = 0; i < sortedKeys.length - MAX_CACHE_ENTRIES; i++) {
      localStorage.removeItem(sortedKeys[i]);
      localStorage.removeItem(`cache_time_${sortedKeys[i]}`);
    }
  }
};

// Main Failover Logic with enhanced caching
export const getAIResponse = async (prompt, systemInstruction, history) => {
  // 1. Check Cache first with context-aware key
  const cacheKey = getCacheKey(prompt, history);
  const cachedResponse = localStorage.getItem(cacheKey);
  if (cachedResponse) {
    console.log("Serving from context-aware cache...");
    return cachedResponse;
  }

  // 2. Try Providers in sequence: Groq -> Gemini -> OpenRouter
  const providers = [
    { name: 'Groq', call: callGroq },
    { name: 'Gemini', call: callGemini },
    { name: 'OpenRouter', call: callOpenRouter }
  ];

  for (const provider of providers) {
    console.log(`Trying ${provider.name}...`);
    const response = await provider.call(prompt, systemInstruction, history);

    if (response && shouldCacheResponse(response)) {
      // Save to cache with timestamp
      localStorage.setItem(cacheKey, response);
      localStorage.setItem(`cache_time_${cacheKey}`, Date.now());

      // Clean up old cache entries
      cleanupCache();

      return response;
    }

    // Return response even if not cached (e.g., error messages)
    if (response) {
      return response;
    }
    console.warn(`${provider.name} failed or limit reached. Switching...`);
  }

  // 3. All providers failed
  return "QUOTA_EXHAUSTED";
};
