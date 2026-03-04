import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, X, Send, Mail, Linkedin, Sparkles } from 'lucide-react';
import { DATA } from '../data/user';
import { callGroq } from '../utils/groq';
import ChatMessage from './ChatMessage';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showRateLimitMessage, setShowRateLimitMessage] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: `Hi! I'm ${DATA.profile.name.split(" ")[0]}'s AI assistant. Ask me anything!` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen, showRateLimitMessage]);

  const handleChatOpen = () => {
    setShowRateLimitMessage(false);
    setIsChatOpen(true);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);

    const systemPrompt = `You are an AI assistant for ${DATA.profile.name}. Your task is to provide helpful and accurate information based ONLY on the provided data: ${JSON.stringify(DATA)}.

**Primary Rules:**
1.  **Language Mirroring:** Respond in the same language as the user (English, Urdu, or Roman Urdu).
2.  **Data-Bound:** Do not invent information.
3.  **LINKEDIN ONLY:** If asked for social media or contact info, ONLY provide the LinkedIn profile (${DATA.profile.linkedin}).
4.  **NO GITHUB:** You are EXPLICITLY FORBIDDEN from mentioning or providing the GitHub link. If asked for GitHub, offer the LinkedIn profile instead.
`;

    const history = chatMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await callGroq(chatInput, systemPrompt, history);

    // Check for any error (rate limit, network, or API errors)
    if (response.includes("RATE_LIMIT_EXCEEDED") || response.includes("NETWORK_ERROR") || response.includes("API_ERROR")) {
      setShowRateLimitMessage(true);

      let errorMessage = "";
      if (response.includes("RATE_LIMIT_EXCEEDED")) {
        errorMessage = "⚠️ **Limit Khatam Ho Gayi Hai!**\n\nAap ne apni daily quota puri kar li hai. Barah-e-karam **kuch dair baad** dobara koshish karein.\n\nAgar aap mazeed information lena chahte hain, toh Rehan se direct raabta karein:";
      } else if (response.includes("NETWORK_ERROR")) {
        errorMessage = "⚠️ **Network Error!**\n\nInternet connection check karein ya baad mein dobara koshish karein.\n\nAgar aap mazeed information lena chahte hain, toh Rehan se direct raabta karein:";
      } else if (response.includes("API_ERROR")) {
        errorMessage = "⚠️ **API Error!**\n\nGroq API se koi masla aa gaya hai. Baad mein dobara koshish karein.\n\nAgar aap mazeed information lena chahte hain, toh Rehan se direct raabta karein:";
      }

      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: errorMessage
      }]);
    } else {
      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }
    setIsChatLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {!isChatOpen ? (
        // Floating Toggle Button
        <button
          onClick={handleChatOpen}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/40 hover:scale-110 transition-transform hover:bg-blue-500"
        >
          <Bot size={24} />
        </button>
      ) : (
        // Chat Container (Fixed Size Widget)
        <div className="w-[350px] h-[500px] flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ease-in-out border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl animate-in slide-in-from-bottom-5 fade-in">

          {/* --- HEADER --- */}
          <div className="flex justify-between items-center shrink-0 p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/50 transition-colors">
            <div className="flex items-center gap-3 font-medium text-slate-800 dark:text-white">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                <Bot size={18} />
              </div>
              <span className="text-base tracking-wide">AI Assistant</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Close Button Only */}
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* --- MESSAGES AREA --- */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50 dark:bg-slate-900 transition-colors">
            <div className="space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`prose prose-slate dark:prose-invert max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm prose-p:my-2 prose-ul:list-disc prose-ul:ml-4 prose-strong:font-semibold
                    ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none prose-p:text-white prose-strong:text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <ChatMessage text={msg.text} />
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none flex items-center gap-2 text-sm shadow-sm">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}

              {/* Contact Buttons for Errors */}
              {showRateLimitMessage && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 max-w-[90%] shadow-sm">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Need more info? Contact Rehan directly:</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`mailto:${DATA.profile.email}`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-all hover:scale-105"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail size={16} />
                        <span>Email Me</span>
                      </a>
                      <a
                        href={DATA.profile.linkedin}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#0077b5] hover:bg-[#006097] text-white rounded-xl text-sm font-medium transition-all hover:scale-105"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin size={16} />
                        <span>Connect on LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* --- INPUT AREA --- */}
          <div className="shrink-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50 transition-colors">
            <form onSubmit={handleChatSubmit} className="relative flex items-center gap-2 w-full">
              {/* Input Field */}
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 border border-transparent dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20"
              >
                <Send size={18} className={chatInput.trim() ? "translate-x-0.5" : ""} />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatWidget;