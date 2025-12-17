import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Book } from 'lucide-react'; // Book icon import kiya
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // --- Track Active Section ---
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (location.pathname === '/guestbook') {
      setActiveSection('guestbook');
    } else if (location.pathname === '/') {
      setActiveSection('home');
    }
  }, [location.pathname]);

  // --- Scroll Spy ---
  useEffect(() => {
    if (location.pathname !== '/') return;
    const handleScroll = () => {
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

  // --- Theme Logic ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // --- Scroll Function ---
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = ['about', 'skills', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="cursor-pointer group" 
          onClick={() => scrollToSection('home')}
        >
          <img 
            src="/images/logo.png" 
            alt="RJ Logo" 
            className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110 shadow-lg"
          />
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(item => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item)} 
              className={`capitalize font-medium text-sm transition-colors relative group ${
                activeSection === item 
                  ? "text-violet-600 dark:text-violet-400" 
                  : "text-gray-700 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
              }`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-violet-600 dark:bg-violet-500 transition-all duration-300 ${
                activeSection === item ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </button>
          ))}

          {/* Guestbook Desktop Link */}
          <Link 
            to="/guestbook" 
            onClick={() => setActiveSection('guestbook')}
            className={`capitalize font-medium text-sm transition-colors relative group ${
              activeSection === 'guestbook' 
                ? "text-violet-600 dark:text-violet-400" 
                : "text-gray-700 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
            }`}
          >
            Guestbook
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-violet-600 dark:bg-violet-500 transition-all duration-300 ${
              activeSection === 'guestbook' ? "w-full" : "w-0 group-hover:w-full"
            }`}></span>
          </Link>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        {/* --- MOBILE CONTROLS --- */}
         <div className="md:hidden flex gap-4 items-center">
           
           {/* 1. New: Guestbook ICON (Header mein dikhega) */}
           <Link 
             to="/guestbook"
             onClick={() => setActiveSection('guestbook')}
             className={`p-1 transition-colors ${
               activeSection === 'guestbook' 
                 ? "text-violet-600 dark:text-violet-400" 
                 : "text-gray-700 dark:text-slate-300"
             }`}
           >
             <Book size={20} />
           </Link>

           {/* 2. Theme Button */}
           <button onClick={toggleTheme} className="text-gray-800 dark:text-yellow-400">
             {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
           </button>

           {/* 3. Hamburger Menu */}
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-slate-300">
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
         </div>
      </div>
      
      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-4 space-y-4">
          <button 
            onClick={() => scrollToSection('home')} 
            className={`block w-full text-left capitalize font-medium ${activeSection === 'home' ? 'text-violet-600 dark:text-violet-400' : 'text-gray-700 dark:text-slate-300'}`}
          >
            Home
          </button>
          
          {navLinks.map(item => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item)} 
              className={`block w-full text-left capitalize font-medium ${activeSection === item ? 'text-violet-600 dark:text-violet-400' : 'text-gray-700 dark:text-slate-300'}`}
            >
              {item}
            </button>
          ))}
          
          {/* 4. Old: Guestbook TEXT Button (Menu list mein dikhega) */}
          <Link 
            to="/guestbook" 
            onClick={() => { setIsMenuOpen(false); setActiveSection('guestbook'); }}
            className={`block w-full text-left capitalize font-medium ${activeSection === 'guestbook' ? 'text-violet-600 dark:text-violet-400' : 'text-gray-700 dark:text-slate-300'}`}
          >
            Guestbook
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;