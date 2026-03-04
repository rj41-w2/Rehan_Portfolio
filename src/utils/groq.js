const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export const callGroq = async (prompt, systemInstruction = "", history = []) => {
  if (!apiKey) {
    console.error("Groq API Key missing in .env");
    return "Error: Groq API Key is missing in .env file.";
  }

  try {
    const messages = [
      { role: "system", content: systemInstruction },
      ...history.map(msg => ({
        role: msg.role === "model" ? "assistant" : msg.role,
        content: msg.parts[0].text
      })),
      { role: "user", content: prompt }
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      })
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 429) {
            return "RATE_LIMIT_EXCEEDED: You have exceeded your Groq API quota. Please try again later.";
        }
        return `API_ERROR: Groq Error (${data.error?.code}): ${data.error?.message}`;
    }

    return data.choices?.[0]?.message?.content || "No response.";

  } catch (error) {
    return `NETWORK_ERROR: Network Error: ${error.message}`;
  }
};