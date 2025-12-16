import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, Minimize2, Send } from 'lucide-react';
import { DATA } from '../data/user';
import { callGemini } from '../utils/gemini'; // Make sure path is correct

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: `Hi! I'm ${DATA.profile.name.split(" ")[0]}'s AI assistant. Ask me anything!` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput("");
    setIsChatLoading(true);

    const systemPrompt = `You are a helpful AI assistant for ${DATA.profile.name}. Only answer based on this data: ${JSON.stringify(DATA)}.`;
    const response = await callGemini(userMessage, systemPrompt);
    
    setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsChatLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isChatOpen ? (
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/40 hover:scale-110 transition-transform hover:bg-blue-500"
        >
          <Bot size={24}/> 
        </button>
      ) : (
        <div className="bg-slate-900 w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2 font-medium"><Bot size={20}/> AI Assistant</div>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded"><Minimize2 size={18}/></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-800/50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 border border-slate-600 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isChatLoading && <Loader2 className="animate-spin text-blue-500"/>}
            <div ref={chatEndRef}/>
          </div>
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-700 flex gap-2 bg-slate-900">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-slate-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700 placeholder:text-slate-500"/>
            <button type="submit" disabled={!chatInput.trim()} className="text-blue-500 hover:text-blue-400 disabled:opacity-50"><Send size={20}/></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;