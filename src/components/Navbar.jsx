import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Book } from 'lucide-react';
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

  const navLinks = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <nav className="fixed top-2 left-0 right-0 z-50 mx-4 md:mx-auto max-w-8xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-lg rounded-full transition-all duration-300">
      
      <div className="px-6 h-14 md:h-16 flex justify-between items-center relative">
        
        {/* 1. LEFT SIDE (Desktop): Theme Toggle */}
        {/* CHANGE: Added 'hidden md:flex' so it hides on mobile */}
        <div className="hidden md:flex items-center z-20">
          <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
          >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* 2. LEFT SIDE (Mobile): Logo */}
        {/* CHANGE: Removed 'absolute left-1/2' and put it in normal flow so it sits on Left */}
        <div className="md:hidden flex items-center z-10">
            <Link 
            to="/" 
            className="cursor-pointer group" 
            onClick={() => scrollToSection('home')}
            >
            <img 
                src="/images/logo.png" 
                alt="RJ Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110 shadow-lg"
            />
            </Link>
        </div>

        {/* 3. CENTER (Desktop): Menu Links */}
        <div className="hidden md:flex gap-8 items-center w-full justify-center absolute left-0 right-0 pointer-events-none">
          <div className="pointer-events-auto flex gap-6">
            {navLinks.map(item => (
                <button 
                key={item} 
                onClick={() => scrollToSection(item)} 
                className={`capitalize font-medium text-sm transition-all duration-300 relative group ${
                    activeSection === item 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                >
                {item === 'skills' ? 'Tech Arsenal' : item === 'projects' ? 'Works' : item}
                
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-500 transition-all duration-300 ${
                    activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
                </button>
            ))}
          </div>
        </div>
        
        {/* 4. RIGHT SIDE (Desktop): Guestbook Button */}
        <div className="hidden md:flex items-center z-20">
            <Link 
                to="/guestbook" 
                onClick={() => setActiveSection('guestbook')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeSection === 'guestbook' 
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]" 
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                }`}
            >
                Guestbook
            </Link>
        </div>

        {/* 5. RIGHT SIDE (Mobile): Mobile Controls */}
        {/* CHANGE: Added Theme Toggle here */}
         <div className="md:hidden flex gap-3 items-center ml-auto z-20">
           
           {/* Mobile Theme Toggle */}
           <button 
              onClick={toggleTheme} 
              className="text-gray-800 dark:text-yellow-400 p-1"
           >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
           </button>

           {/* Mobile Guestbook Icon */}
           <Link 
             to="/guestbook"
             onClick={() => setActiveSection('guestbook')}
             className={`p-1 transition-colors ${
               activeSection === 'guestbook' 
                 ? "text-blue-600 dark:text-blue-400" 
                 : "text-gray-700 dark:text-slate-300"
             }`}
           >
             <Book size={20} />
           </Link>

           {/* Mobile Menu Toggle */}
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-slate-300">
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
         </div>
      </div>
      
      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 space-y-4 rounded-3xl shadow-xl mx-0">
          {navLinks.map(item => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item)} 
              className={`block w-full text-left capitalize font-medium ${activeSection === item ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-slate-300'}`}
            >
              {item === 'skills' ? 'Tech Arsenal' : item === 'projects' ? 'Works' : item}
            </button>
          ))}
          
          <Link 
            to="/guestbook" 
            onClick={() => { setIsMenuOpen(false); setActiveSection('guestbook'); }}
            className={`block w-full text-left capitalize font-medium ${activeSection === 'guestbook' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-slate-300'}`}
          >
            Guestbook
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;