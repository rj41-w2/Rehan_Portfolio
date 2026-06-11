import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, X, Send, Mail, Linkedin, User, Sparkles, Trash2 } from 'lucide-react';
import { DATA } from '../../data/portfolioData';
import { callOllama } from '../../services/ollama';
import { getAIResponse } from '../../services/aiService';
import { loadChatHistory, saveChatHistory, clearChatHistory, manageContextWindow, getCachedResponse, setCachedResponse, clearResponseCache } from '../../utils/chatUtils';
import { detectLanguage, getLocalizedResponse, shouldRespondInLanguage, runLanguageTests } from '../../utils/languageUtils';
import ChatMessage from './ChatMessage';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showRateLimitMessage, setShowRateLimitMessage] = useState(false);
  const isLocalMode = import.meta.env.VITE_USE_OLLAMA === "true";

  const [chatMessages, setChatMessages] = useState(() => {
    let welcomeMessage = `${DATA.chatbotConfig.welcomeMessage}${isLocalMode ? " (Local Mode Active)" : ""}`;
    return loadChatHistory(welcomeMessage);
  });
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatLoading, isChatOpen]);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    saveChatHistory(chatMessages);
  }, [chatMessages]);

  const handleChatOpen = () => {
    setShowRateLimitMessage(false);
    setIsChatOpen(true);
  };

  const handleClearChat = () => {
    let defaultMessage = `${DATA.chatbotConfig.welcomeMessage}${isLocalMode ? " (Local Mode Active)" : ""}`;
    setChatMessages(clearChatHistory(defaultMessage));
    clearResponseCache();
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => {
      const newMessages = [...prev, userMessage];
      return manageContextWindow(newMessages, 25); // Limit to 25 messages to prevent token overflow
    });
    setChatInput("");
    setIsChatLoading(true);
    setShowRateLimitMessage(false);

    // Detect language from user input
    const userLanguage = detectLanguage(chatInput);
    const responseLanguage = shouldRespondInLanguage(chatMessages, userLanguage);

    const systemPrompt = `You are the professional ${DATA.chatbotConfig.identity.role} of ${DATA.chatbotConfig.identity.fullName}.

**IDENTITY:**
- You represent ${DATA.chatbotConfig.identity.fullName}, a ${DATA.chatbotConfig.identity.context}.
- ALWAYS refer to Rehan in the THIRD PERSON.

**LANGUAGE INSTRUCTIONS:**
- You are an expert at understanding Roman Urdu/Hinglish (e.g., "aap kaise ho?", "Rehan kya karta hai?", "kaam dikhao").
- ALWAYS respond in English, regardless of the language used by the user, but ensure you correctly interpret the user's intent in their native chat style.

**RULES:**
${DATA.chatbotConfig.rules.map(rule => `- ${rule}`).join('\n')}

**CONTEXT-AWARE RESPONSE LOGIC:**
1. **CONTEXTUAL UNDERSTANDING:** Review conversation history for continuations.
2. **STRICT DATA ADHERENCE:** ONLY use the provided PORTFOLIO DATA.
3. **UNRELATED QUERIES:** If the user asks anything NOT related to Rehan's professional life, skills, or projects (like asking for a joke, weather, or generic help), you MUST respond ONLY with this exact message in English:
   - "${DATA.chatbotConfig.messages.unrelatedQuery}"
4. **PORTFOLIO DATA MATCH:** If query matches data, provide detailed information about Rehan in English.

**PORTFOLIO DATA:**
${JSON.stringify(DATA)}

**CURRENT USER LANGUAGE DETECTED:** ${userLanguage}
**RESPONSE LANGUAGE:** ${responseLanguage}`;

    const history = chatMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.text }]
    }));

    // 1. Basic Local Guard for very common unrelated topics (Optional but saves API)
    const unrelatedKeywords = ['weather', 'news', 'joke', 'recipe', 'bitcoin', 'stock', 'translate', 'story', 'song', 'poetry', 'essay'];
    const isCommonUnrelated = unrelatedKeywords.some(keyword => chatInput.toLowerCase().includes(keyword));

    if (isCommonUnrelated) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          text: DATA.chatbotConfig.messages.unrelatedQuery 
        }]);
        setIsChatLoading(false);
      }, 500);
      return;
    }

    try {
      let response;

      // Check cache first
      const cachedResponse = getCachedResponse(chatInput);
      if (cachedResponse) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: cachedResponse }]);
        setIsChatLoading(false);
        return;
      }

      if (isLocalMode) {
        response = await callOllama(chatInput, systemPrompt, history);
      } else {
        response = await getAIResponse(chatInput, systemPrompt, history);
      }

      // Cache the response for future similar questions
      if (response && !response.includes("ERROR") && !response.includes("QUOTA_EXHAUSTED")) {
        setCachedResponse(chatInput, response);
      }

      if (response === "QUOTA_EXHAUSTED") {
        setShowRateLimitMessage(true);
        const quotaMsg = getLocalizedResponse('quotaExhausted', responseLanguage);
        setChatMessages(prev => [...prev, { role: 'assistant', text: quotaMsg }]);
      } else if (response.includes("CONNECTION_ERROR")) {
        const connectionMsg = getLocalizedResponse('connectionError', responseLanguage);
        setChatMessages(prev => [...prev, { role: 'assistant', text: connectionMsg }]);
      } else if (response.includes("API_ERROR") || response.includes("NETWORK_ERROR")) {
        const errorMsg = getLocalizedResponse('generalError', responseLanguage);
        setChatMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
      } else {
        const assistantMessage = {
          role: 'assistant',
          text: response
        };
        setChatMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: "⚠️ An unexpected error occurred." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {!isChatOpen ? (
        <button
          onClick={handleChatOpen}
          className="p-3.5 sm:p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all hover:bg-blue-500 group"
        >
          <Bot size={24} className="sm:hidden group-hover:rotate-12 transition-transform" />
          <Bot size={28} className="hidden sm:block group-hover:rotate-12 transition-transform" />
        </button>
      ) : (
        <div className="w-[calc(100vw-32px)] sm:w-[400px] h-[75vh] sm:h-[600px] max-h-[700px] flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-3xl animate-in slide-in-from-bottom-5 duration-300">
          
          <div className="flex justify-between items-center px-5 py-4 sm:px-6 sm:py-5 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Bot size={18} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white leading-none">AI Assistant</h3>
                <span className="text-[10px] text-green-600 font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all"
                title="Clear chat history"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 no-scrollbar bg-slate-50/50 dark:bg-slate-950/50">
            {chatMessages.length > 10 && (
              <div className="text-center mb-4">
                <span className="text-xs text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-full">
                  Context: {chatMessages.length} messages loaded
                </span>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm
                    ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
                  >
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>

                  <div className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-[13px] sm:text-[14px] leading-relaxed shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                    }`}
                  >
                    <ChatMessage text={msg.text} metadata={msg.metadata || {}} />
                  </div>
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 sm:gap-3 max-w-[85%]">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <Bot size={12} className="text-blue-500" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 className="animate-spin text-blue-500" size={14} />
                    <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {showRateLimitMessage && (
              <div className="pt-2">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider text-nowrap">
                    <Sparkles size={14} /> Contact Information
                  </div>
                  <div className="flex flex-col gap-2">
                    <a href={`mailto:${DATA.profile.email}`} className="flex items-center justify-center gap-2 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95 shadow-sm">
                      <Mail size={12} /> Email Rehan
                    </a>
                    <a href={DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 bg-[#0077b5] text-white rounded-xl text-xs font-bold transition-all hover:bg-[#006097] active:scale-95 shadow-sm">
                      <Linkedin size={12} fill="currentColor" strokeWidth={0} /> LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} className="h-2" />
          </div>

          <div className="p-4 sm:p-5 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 shrink-0">
            <form onSubmit={handleChatSubmit} className="relative flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Rehan's assistant..."
                className="flex-1 bg-slate-100 dark:bg-slate-900/50 text-slate-900 dark:text-white rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent dark:border-slate-800 transition-all"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatLoading}
                className="absolute right-1.5 sm:right-2 p-1.5 sm:p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 transition-all"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="text-xs text-gray-400 dark:text-gray-700 text-center mt-2">
              Responses are generated by AI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
