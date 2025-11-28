// AB HUM KEY .ENV FILE SE LE RAHAY HAIN
const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 

export const callGemini = async (prompt, systemInstruction = "") => {
  if (!apiKey) {
    console.error("API Key missing in .env");
    return "Error: API Key is missing in .env file.";
  }

  try {
    // STEP 1: Available Models ki list mangwao
    const listResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const listData = await listResponse.json();
    
    // STEP 2: Smart Filter (Wahi logic jo abhi chali thi)
    // Flash model dhoondo jo Experimental (exp) na ho
    let activeModel = listData.models?.find(m => 
      m.supportedGenerationMethods?.includes("generateContent") && 
      m.name.includes("flash") && 
      !m.name.includes("exp")
    )?.name;

    // Fallback: Agar Flash na mile to Pro use karo
    if (!activeModel) {
       activeModel = "models/gemini-pro";
    }

    // STEP 3: Call Model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${activeModel}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `System: ${systemInstruction}\n\nUser: ${prompt}` }] 
          }]
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
        return `Google Error (${data.error?.code}): ${data.error?.message}`;
    }
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

  } catch (error) {
    return `Network Error: ${error.message}`;
  }
};