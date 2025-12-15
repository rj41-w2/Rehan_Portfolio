import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, ExternalLink, BookOpen, User, FileText, Send, Menu, X, 
  Sparkles, MessageSquare, Bot, Loader2, Minimize2 
} from 'lucide-react';

import { DATA } from './data/user';
import { callGemini } from './utils/gemini';
import Contact from './components/Contact'; 

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: `Hi! I'm ${DATA.profile.name.split(" ")[0]}'s AI assistant. Ask me anything!` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    try {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

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
    <div className="min-h-screen transition-colors duration-300 bg-slate-900 text-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-blue-600 w-9 h-9 flex items-center justify-center rounded-lg text-white font-bold text-lg shadow-md shadow-blue-500/20">
              R
            </div>
            
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {['about', 'skills', 'projects', 'contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className="capitalize hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm text-gray-600 dark:text-gray-300 transition-colors">
                {item}
              </button>
            ))}
          </div>
          
           <div className="md:hidden flex gap-4">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
           </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-4 space-y-4">
            {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className="block w-full text-left capitalize font-medium">{item}</button>
            ))}
          </div>
        )}
      </nav>

    {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex flex-col justify-center items-center px-4 text-center max-w-7xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
          Available 
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">Hi, I'm {DATA.profile.name.split(" ")[0]}. <br/><span className="text-blue-600 dark:text-blue-400">{DATA.profile.role}</span></h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">{DATA.profile.tagline}</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => scrollToSection('projects')} className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20">View My Work</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex flex-col justify-center py-20 bg-white dark:bg-slate-900 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 w-full">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><User className="text-blue-600"/> About Me</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{DATA.profile.about}</p>
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="text-blue-500 dark:text-blue-400"/> Education</h3>
              <p className="font-medium text-lg">{DATA.profile.university}</p>
              <p className="text-gray-500 dark:text-gray-400">{DATA.profile.degree} • (2024-28) {DATA.profile.gpa}</p>
              <p className="font-medium text-lg">{DATA.profile.College}</p>
              <p className="text-gray-500 dark:text-gray-400">{DATA.profile.Degree} • (2022-24)</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><FileText className="text-blue-600"/> Experience</h2>
            <div className="space-y-6 border-l-2 border-gray-200 dark:border-slate-700 ml-3 pl-8">
              {DATA.experience.map(job => (
                <div key={job.id} className="relative">
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-slate-900 bg-blue-600"></span>
                  <h3 className="font-bold text-gray-900 dark:text-slate-100">{job.role}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-1">{job.company} • {job.period}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800/50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(DATA.skills).map(([category, skills]) => (
              <div 
                key={category} 
                className="card p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 
                transition-all duration-300 
                hover:-translate-y-2 
                hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] 
                hover:border-blue-500"
              >
                <h3 className="text-xl font-bold mb-4 capitalize text-gray-900 dark:text-slate-100">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-md text-sm font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Projects Section */}
      <section 
        id="projects" 
        className="min-h-screen flex flex-col justify-center py-20 bg-white dark:bg-slate-900 px-4"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA.projects.map(project => (
              <div 
                key={project.id} 
                className="group border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden 
                transition-all duration-300 
                hover:-translate-y-2 
                hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] 
                hover:border-blue-500"
              >
                <div className="h-48 bg-gray-200 dark:bg-slate-800 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <div className="card p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => <span key={t} className="text-xs bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">{t}</span>)}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <a href={project.github} className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"><Github size={14}/> Code</a>
                    <a href={project.demo} className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"><ExternalLink size={14}/> Demo</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section (Now imported from component) */}
      <Contact />

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        © {new Date().getFullYear()} {DATA.profile.name}. All rights reserved.
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
    
            <Bot size={24}/> 
          </button>
        ) : (
          <div className="bg-white dark:bg-slate-900 w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2"><Bot size={20}/> AI Assistant</div>
              <button onClick={() => setIsChatOpen(false)}><Minimize2 size={18}/></button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-800/50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && <Loader2 className="animate-spin text-blue-500"/>}
              <div ref={chatEndRef}/>
            </div>
            <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 dark:border-slate-700 flex gap-2 bg-white dark:bg-slate-900">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"/>
              <button type="submit" disabled={!chatInput.trim()} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 disabled:opacity-50"><Send size={20}/></button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}