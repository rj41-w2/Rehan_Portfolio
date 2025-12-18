import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components Import
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import LiveSignatures from './components/LiveSignatures';

// --- HOME PAGE COMPONENT ---

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <LiveSignatures />
      
      {/* Contact Section with Overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm -z-10"></div>
        <Contact />
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-sm border-t backdrop-blur-md transition-colors duration-300
        bg-slate-50 border-slate-200 text-slate-600
        dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-500">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-slate-900 dark:text-slate-200">Rehan</span>. All rights reserved.
        </p>
      </footer>
    </>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {

  useEffect(() => {
    try {
      // Default Dark Mode Check
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
        
        {/* 1. Global Background (Har page par dikhega) */}
        <Background />

        {/* 2. Page Content (Routes) */}
        <div className="relative z-10">
          <Routes>
            {/* Main Portfolio Page */}
            <Route path="/" element={<Home />} />
            
            {/* Alag Guestbook Page */}
            <Route path="/guestbook" element={<Guestbook />} />
          </Routes>
        </div>

        {/* 3. Global Chat Widget */}
        <ChatWidget />
        
      </div>
    </Router>
  );
}