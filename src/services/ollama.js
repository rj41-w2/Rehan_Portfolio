/**
 * Ollama Service for Local AI Testing
 * 
 * To use this, ensure Ollama is running locally on http://localhost:11434
 * and you have pulled a model (e.g., 'ollama pull llama3')
 */

const OLLAMA_URL = "http://localhost:11434/api/chat";

export const callOllama = async (prompt, systemInstruction = "", history = [], model = import.meta.env.VITE_OLLAMA_MODEL || "llama3.2") => {
  try {
    const messages = [];
    
    // Add system instruction if provided
    if (systemInstruction) {
      messages.push({ role: "system", content: systemInstruction });
    }

    // Add history (Ollama expects role and content)
    history.forEach(msg => {
      messages.push({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.parts[0].text
      });
    });

    // Add current prompt
    messages.push({ role: "user", content: prompt });

    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model,
        messages: messages,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return `OLLAMA_ERROR: ${errorData.error || response.statusText}`;
    }

    const data = await response.json();
    return data.message.content || "No response from Ollama.";

  } catch (error) {
    console.error("Ollama connection failed:", error);
    return `CONNECTION_ERROR: Make sure Ollama is running locally on http://localhost:11434. (Error: ${error.message})`;
  }
};
