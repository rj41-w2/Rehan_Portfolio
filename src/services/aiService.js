import { callGroq } from './groq';
import { callGemini } from './gemini';

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

// Main Failover Logic
export const getAIResponse = async (prompt, systemInstruction, history) => {
  // 1. Check Cache first
  const cacheKey = `ai_cache_${prompt.toLowerCase().trim()}`;
  const cachedResponse = localStorage.getItem(cacheKey);
  if (cachedResponse) {
    console.log("Serving from cache...");
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

    if (response && !response.includes("RATE_LIMIT_EXCEEDED") && !response.includes("API_ERROR") && !response.includes("API_KEY_MISSING")) {
      // Save to cache for next time
      localStorage.setItem(cacheKey, response);
      return response;
    }
    console.warn(`${provider.name} failed or limit reached. Switching...`);
  }

  // 3. All providers failed
  return "QUOTA_EXHAUSTED";
};
