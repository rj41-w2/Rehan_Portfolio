import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

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
import Documents from './components/Documents';

// --- HOME PAGE COMPONENT ---

const Home = ({ theme, toggleTheme, activeSection, setActiveSection, showUI, setShowUI, scrollToSection }) => {
  return (
    <>
      <Hero
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        showUI={showUI}
        setShowUI={setShowUI}
        scrollToSection={scrollToSection}
      />
      <About />
      <Skills />
      <Projects />


    </>
  );
};

export default function Layout() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [showUI, setShowUI] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [pendingScrollId, setPendingScrollId] = useState(null);

  // --- Scroll Spy & Scroll Button Visibility ---
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll button after scrolling down 400px (on all pages)
      setShowScrollButton(window.scrollY > 400);
      
      // Scroll spy only for home page
      if (location.pathname !== '/') return;
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Effect to scroll after navigation to home page
  useEffect(() => {
    if (location.pathname === '/' && pendingScrollId) {
      const element = document.getElementById(pendingScrollId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setPendingScrollId(null);
      }
    }
  }, [location.pathname, pendingScrollId]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (mode) => {
    if (mode) {
      setTheme(mode);
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const validIds = ['home', 'about', 'skills', 'projects', 'contact', 'guestbook'];
    if (!validIds.includes(id) && id !== 'hero') {
      console.error(`Invalid section id: ${id}`);
      return;
    }

    const sectionId = id === 'hero' ? 'home' : id;

    setActiveSection(sectionId);

    // Contact and Guestbook are separate pages, navigate to them
    if (sectionId === 'contact') {
      if (location.pathname !== '/contact') {
        navigate('/contact');
      }
      return;
    }

    if (sectionId === 'guestbook') {
      if (location.pathname !== '/guestbook') {
        navigate('/guestbook');
      }
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setPendingScrollId(sectionId); // Set pending scroll
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error(`Element with id '${sectionId}' not found.`);
      }
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">

      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg transition-all"
      >
        Skip to main content
      </a>

      {showUI && (location.pathname !== '/guestbook' && location.pathname !== '/documents' && location.pathname !== '/contact' && location.pathname !== '/skills') && (
        <Link to="/" className="fixed top-4 left-4 z-50 hidden md:block">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>
      )}

      {/* 1. Global Background (Har page par dikhega) */}
      <Background />

      {showUI && <Navbar activeSection={activeSection} scrollToSection={scrollToSection} theme={theme} toggleTheme={toggleTheme} />}

      {/* 2. Page Content (Routes) */}
      <main id="main-content" className="relative z-10" role="main" aria-label="Main content">
        <Routes>
          <Route path="/" element={
            <Home theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} setActiveSection={setActiveSection} showUI={showUI} setShowUI={setShowUI} scrollToSection={scrollToSection} />
          } />
          <Route path="/guestbook" element={
            <Guestbook theme={theme} toggleTheme={toggleTheme} showUI={showUI} setShowUI={setShowUI} />
          } />
          <Route path="/documents" element={
            <Documents showUI={showUI} setShowUI={setShowUI} />
          } />
          <Route path="/contact" element={
            <Contact />
          } />
        </Routes>
      </main>

      {/* 3. Global Chat Widget */}
      {showUI && <ChatWidget />}

      {/* Footer */}
      {showUI && (
        <footer className="py-4 px-6 border-t backdrop-blur-md transition-colors duration-300
          bg-slate-50 border-slate-200
          dark:bg-slate-900/80 dark:border-slate-800
          flex flex-col md:flex-row justify-between items-center gap-2">

          {location.pathname !== '/contact' && (
            <Link
              to="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Get in Touch
            </Link>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            © {new Date().getFullYear()} <span className="font-semibold text-slate-900 dark:text-slate-200">Rehan Jamil</span>. All rights reserved.
          </p>
        </footer>
      )}

      {/* Floating Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-6 z-[45] p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <ChevronUp size={28} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
