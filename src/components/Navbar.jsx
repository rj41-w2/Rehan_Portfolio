import React, { useState } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Book, Sun, Moon, MoreVertical, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ activeSection, scrollToSection, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- MOBILE NAVBAR ---
  const MobileNavbar = () => {
    const mobileNavLinks = [
      { id: 'home', icon: <Home size={20} />, text: 'Home' },
      { id: 'about', icon: <User size={20} />, text: 'About' },
      { id: 'skills', icon: <Cpu size={20} />, text: 'Skills' },
      { id: 'projects', icon: <Briefcase size={20} />, text: 'Projects' },
      { id: 'contact', icon: <Mail size={20} />, text: 'Contact' },
      { id: 'guestbook', icon: <Book size={20} />, text: 'Guestbook' }
    ];

    const renderMobileNavLink = (item) => {
      const isRoutable = item.id === 'guestbook' || item.id === 'contact';
      const className = `flex items-center gap-4 w-full text-left capitalize font-medium py-3 px-4 rounded-lg ${
        activeSection === item.id
        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
        : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
      }`;

      const content = (
        <>
          {React.cloneElement(item.icon, {
            className: `transition-colors duration-300 ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'}`
          })}
          <span>{item.text}</span>
        </>
      );

      if (isRoutable) {
        return (
          <Link key={item.id} to={`/${item.id}`} onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }} className={className}>
            {content}
          </Link>
        );
      }
      return (
        <button key={item.id} onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }} className={className}>
          {content}
        </button>
      );
    };

    return (
      <div className="md:hidden">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent" aria-label="Mobile navigation">
          <div className="px-4 h-14 flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/" onClick={() => scrollToSection('home')} className="flex items-center gap-2" aria-label="Home">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleTheme()} 
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 text-gray-800 dark:text-slate-300"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
              </button>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div 
            className="fixed top-14 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg p-4 space-y-2 border-t border-gray-200 dark:border-slate-800"
            role="menu"
            aria-label="Navigation menu"
          >
            {mobileNavLinks.map(renderMobileNavLink)}
          </div>
        )}
      </div>
    );
  };

  // --- DESKTOP NAVBAR ---
  const DesktopNavbar = () => {
    const desktopNavLinks = [
      { id: 'home', icon: <Home size={20} />, text: 'Home' },
      { id: 'about', icon: <User size={20} />, text: 'About' },
      { id: 'skills', icon: <Cpu size={20} />, text: 'Skills' },
      { id: 'projects', icon: <Briefcase size={20} />, text: 'Projects' },
      { id: 'contact', icon: <Mail size={20} />, text: 'Contact' }
    ];

    const renderDesktopNavLink = (item) => {
      const isRoutable = item.id === 'contact';
      const className = `flex items-center gap-2 px-3 py-2 rounded-full font-medium text-sm transition-all duration-300 group ${
        activeSection === item.id
          ? "text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-500/10"
          : "text-gray-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800"
      }`;

      const content = (
        <>
          {React.cloneElement(item.icon, {
            className: `transition-colors duration-300 ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`
          })}
          <span className="hidden group-hover:inline transition-all duration-300">{item.text}</span>
        </>
      );

      if (isRoutable) {
        return (
          <Link key={item.id} to={`/${item.id}`} onClick={() => scrollToSection(item.id)} className={className}>
            {content}
          </Link>
        );
      }
      return (
        <button key={item.id} onClick={() => scrollToSection(item.id)} className={className}>
          {content}
        </button>
      );
    };

    return (
      <div className="hidden md:block">
        <nav 
          className="fixed top-2 left-1/2 -translate-x-1/2 z-50 mx-auto max-w-fit bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-lg rounded-full transition-all duration-300"
          aria-label="Main navigation"
        >
          <div className="px-4 h-14 flex justify-center items-center relative">
            <div 
              className="flex gap-2 items-center w-full justify-center"
              role="menubar"
              aria-label="Navigation menu"
            >
              {desktopNavLinks.map(renderDesktopNavLink)}
            </div>
          </div>
        </nav>
      </div>
    );
  };

  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
};

export default Navbar;
