import React, { useState, useRef } from 'react';
import { Loader2, PenTool, Send, Mail, Linkedin, Github } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { DATA } from '../data/user';
import { callGemini } from '../utils/gemini';

export default function Contact() {
  const [result, setResult] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  
  // Captcha States
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  // AI Drafting Logic (Real Gemini Call)
  const draftMessage = async (type) => {
    setIsDrafting(true);
    try {
      const prompt = type === 'recruiter' 
        ? `Write a short professional message to ${DATA.profile.name} about a job opportunity.` 
        : `Write a short friendly message to ${DATA.profile.name} for a coffee chat.`;
      
      const response = await callGemini(prompt, "You are a writing assistant. Keep it short and professional.");
      setContactMessage(response.replace(/^"|"$/g, ''));
    } catch (error) {
      console.error("Drafting error:", error);
      setContactMessage("Hi, I'd like to connect!");
    } finally {
      setIsDrafting(false);
    }
  };

  // Submit Logic with hCaptcha
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Captcha Validation
    if (!captchaToken) {
      alert("⚠️ Please complete the captcha verification first!");
      return;
    }

    setResult("Sending...");

    const formData = new FormData(e.target);
    
    // Keys & Token
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append("h-captcha-response", import.meta.env.VITE_HCAPTCHA_SITE_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully! ✅");
        setContactMessage("");
        e.target.reset();
        setCaptchaToken(null);
        if (captchaRef.current) captchaRef.current.resetCaptcha();
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong!");
      }
    } catch (error) {
      setResult("Error sending message.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-800/50 px-4">
      <div className="max-w-3xl mx-auto card rounded-2xl shadow-xl p-8 md:p-12 bg-white dark:bg-slate-900">
        <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              required
              placeholder="Name" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
            <input 
              type="email" 
              name="email"
              required
              placeholder="Email" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Message</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => draftMessage('recruiter')} className="text-xs text-blue-600 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded">
                  {isDrafting ? <Loader2 size={10} className="animate-spin"/> : <PenTool size={10}/>} Recruiter
                </button>
                <button type="button" onClick={() => draftMessage('student')} className="text-xs text-purple-600 flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded">
                  {isDrafting ? <Loader2 size={10} className="animate-spin"/> : <PenTool size={10}/>} Student
                </button>
              </div>
            </div>
            <textarea 
              name="message"
              required
              rows="4" 
              value={contactMessage} 
              onChange={(e) => setContactMessage(e.target.value)} 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* hCaptcha Component */}
          <div className="flex justify-center my-4">
             <HCaptcha
               sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
               onVerify={token => setCaptchaToken(token)}
               ref={captchaRef}
               theme="dark"
             />
          </div>

          <button 
            type="submit" 
            disabled={result === "Sending..."}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50"
          >
            {result === "Sending..." ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} 
            {result === "Sending..." ? "Sending..." : "Send Message"}
          </button>

          {result && (
             <p className={`text-center mt-2 ${result.includes("Success") ? "text-green-500" : "text-red-500"}`}>
               {result}
             </p>
          )}

        </form>           

        <div className="mt-8 flex justify-center gap-6">
           <a href={`mailto:${DATA.profile.email}`}><Mail className="hover:text-blue-600 cursor-pointer"/></a>
           <a href={DATA.profile.linkedin}><Linkedin className="hover:text-blue-600 cursor-pointer"/></a>
           <a href={DATA.profile.github}><Github className="hover:text-blue-600 cursor-pointer"/></a>
        </div>
      </div>
    </section>
  );
}