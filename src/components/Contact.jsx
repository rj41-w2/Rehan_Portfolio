import React, { useState } from 'react';
import { Loader2, Send, Mail, Linkedin, Github, MapPin, Sparkles, Copy, Check } from 'lucide-react';
import { DATA } from '../data/user';
import { callGemini } from '../utils/gemini';

export default function Contact() {
  const [result, setResult] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // --- AI DRAFTING LOGIC ---
  const draftMessage = async (type) => {
    setIsDrafting(true);
    try {
      const prompt = type === 'recruiter' 
        ? `Write a short professional message to ${DATA.profile?.name || "the developer"} about a job opportunity.` 
        : `Write a short friendly message to ${DATA.profile?.name || "the developer"} for a coffee chat.`;
      
      const response = await callGemini(prompt, "You are a writing assistant. Keep it short and professional.");
      setContactMessage(response.replace(/^"|"$/g, ''));
    } catch (error) {
      console.error("Drafting error:", error);
      setContactMessage("Hi, I'd like to connect regarding an opportunity!");
    } finally {
      setIsDrafting(false);
    }
  };

  // --- EMAIL COPY LOGIC ---
  const copyEmail = () => {
    const emailToCopy = DATA.profile.email;
    if (emailToCopy) {
      navigator.clipboard.writeText(emailToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert("Email not found in data file!");
    }
  };

  // --- FORM SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully! ✅ I will get back to you soon.");
        setContactMessage("");
        e.target.reset();
      } else {
        setResult(data.message || "Something went wrong!");
      }
    } catch (error) {
      setResult("Error sending message.");
    }
  };

  return (
    // Section BG: Light = Slate-50, Dark = Transparent (Original)
    <section id="contact" className="py-24 px-4 relative overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* --- LEFT SIDE: Info & Socials --- */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Let's work <br/> <span className="text-blue-600 dark:text-blue-500">together.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              I'm always open to discussing product design work or partnership opportunities.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* 1. Email Card */}
            <div className="p-5 rounded-2xl flex items-center justify-between group transition-colors
              bg-white border border-slate-200 hover:border-blue-400 shadow-sm
              dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-blue-500/50 dark:shadow-none">
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl 
                  bg-blue-50 text-blue-600
                  dark:bg-blue-500/10 dark:text-blue-400">
                  <Mail size={24}/>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-500">Email Me</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{DATA.profile.email || "email@example.com"}</p>
                </div>
              </div>
              <button onClick={copyEmail} className="p-2 transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white" title="Copy Email">
                {copied ? <Check size={20} className="text-green-500"/> : <Copy size={20}/>}
              </button>
            </div>

            {/* 2. Location Card */}
            <div className="p-5 rounded-2xl flex items-center gap-4 group transition-colors
              bg-white border border-slate-200 hover:border-purple-400 shadow-sm
              dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-purple-500/50 dark:shadow-none">
              
               <div className="p-3 rounded-xl 
                 bg-purple-50 text-purple-600
                 dark:bg-purple-500/10 dark:text-purple-400">
                  <MapPin size={24}/>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900 dark:text-white">Available Worldwide (Remote)</p>
                </div>
            </div>

            {/* 3. Social Links Row */}
            <div className="flex gap-4 pt-2">
               
               {/* LinkedIn */}
               {DATA.profile.linkedin && (
                  <a 
                    href={DATA.profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 p-4 rounded-xl flex justify-center items-center gap-2 transition-all group border
                      bg-white border-slate-200 text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 shadow-sm
                      dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-gray-500 dark:shadow-none"
                  >
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform"/>
                    <span className="font-medium">LinkedIn</span>
                  </a>
               )}

               {/* GitHub */}
               {DATA.profile.github && (
                  <a 
                    href={DATA.profile.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 p-4 rounded-xl flex justify-center items-center gap-2 transition-all group border
                      bg-white border-slate-200 text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 shadow-sm
                      dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-gray-500 dark:shadow-none"
                  >
                    <Github size={20} className="group-hover:scale-110 transition-transform"/>
                    <span className="font-medium">GitHub</span>
                  </a>
               )}

            </div>

          </div>
        </div>

        {/* --- RIGHT SIDE: The Form --- */}
        <div className="rounded-3xl p-8 relative transition-colors
          bg-white border border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send a message</h3>
            <div className="flex gap-2">
               <button type="button" onClick={() => draftMessage('recruiter')} disabled={isDrafting} className="text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1
                 bg-slate-50 text-blue-600 border-slate-200 hover:bg-blue-50 hover:border-blue-300
                 dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-blue-500">
                 <Sparkles size={12}/> Hiring?
               </button>
               <button type="button" onClick={() => draftMessage('student')} disabled={isDrafting} className="text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1
                 bg-slate-50 text-purple-600 border-slate-200 hover:bg-purple-50 hover:border-purple-300
                 dark:bg-slate-800 dark:text-purple-400 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-purple-500">
                 <Sparkles size={12}/> Collab?
               </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Name</label>
                <input 
                  type="text" name="name" required placeholder="Your Name" 
                  className="w-full rounded-xl px-4 py-3 transition-all outline-none focus:ring-1
                  bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500
                  dark:bg-slate-950/50 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</label>
                <input 
                  type="email" name="email" required placeholder="your@email.com" 
                  className="w-full rounded-xl px-4 py-3 transition-all outline-none focus:ring-1
                  bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500
                  dark:bg-slate-950/50 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between text-slate-500 dark:text-slate-400">
                <span>Message</span>
                {isDrafting && <span className="text-blue-500 text-xs animate-pulse">AI is typing...</span>}
              </label>
              <textarea 
                name="message" required rows="4" 
                value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} 
                placeholder="Write your message here..." 
                className="w-full rounded-xl px-4 py-3 transition-all resize-none outline-none focus:ring-1
                bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500
                dark:bg-slate-950/50 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              ></textarea>
            </div>

            <button type="submit" disabled={result === "Sending..."} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-blue-500/20">
              {result === "Sending..." ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>} 
              {result === "Sending..." ? "Sending..." : "Send Message"}
            </button>
            
            {result && (
              <div className={`text-center p-3 rounded-lg text-sm font-medium ${result.includes("Success") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                {result}
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}