import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Sun, Moon import karein

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- THEME LOGIC START ---
  // LocalStorage check karega ke user ne pehle kya select kiya tha
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
  // --- THEME LOGIC END ---

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    // Navbar Background: Light mein White/80, Dark mein Slate-900/80
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
      {/* Logo Section - Image */}
<div className="cursor-pointer group" onClick={() => scrollToSection('home')}>
  <img 
    src="/images/logo.png" 
    alt="RJ Logo" 
    className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110 shadow-lg"
  />
</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {['about', 'skills', 'projects', 'contact'].map(item => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item)} 
              className="capitalize font-medium text-sm text-gray-700 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 dark:bg-violet-500 transition-all group-hover:w-full"></span>
            </button>
          ))}

          {/* --- THEME TOGGLE BUTTON --- */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu Controls */}
         <div className="md:hidden flex gap-4 items-center">
            {/* Mobile Theme Button */}
           <button onClick={toggleTheme} className="text-gray-800 dark:text-yellow-400">
             {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
           </button>

           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-slate-300">
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
         </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-4 space-y-4">
          {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
            <button key={item} onClick={() => scrollToSection(item)} className="block w-full text-left capitalize font-medium text-gray-700 dark:text-slate-300">
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;