import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DATA } from '../../data/portfolioData';
import Terminal from '../features/Terminal';

const Hero = ({ theme, toggleTheme, activeSection, setActiveSection, scrollToSection, showUI, setShowUI }) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-32 pb-20 px-4">

      {/* Guestbook Link for Desktop */}
      <div className="hidden md:flex absolute top-4 right-4 z-20">
          <Link
            to="/guestbook"
            onClick={() => setActiveSection('guestbook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeSection === 'guestbook'
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]"
              : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
              }`}
          >
            <Book size={18} />
            <span className="hidden sm:inline">Guestbook</span>
          </Link>
        </div>

      {/* 1. Background Effects (Spotlight & Grid) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>

      {/* 2. Main Content Wrapper - Changed to Flexbox */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between z-10">

        {/* Left Side: Original Content */}
        <div className="max-w-xl text-center lg:text-left lg:pr-8 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-md text-slate-700 dark:text-slate-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 shadow-sm text-[10px] md:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            {DATA.hero?.badge || `Hello, I'm ${DATA.profile?.name}`}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 uppercase">
            {DATA.hero?.title?.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">{DATA.hero?.title?.split(' ')[1]}</span> <br />
          </h1>

          <div className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {DATA.profile?.tagline}
            <TypeAnimation
              sequence={DATA.hero?.sequence || [
                "Architecting the Future.",
                2000,
                "Building Solutions.",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block mt-2 text-xs sm:text-sm text-gray-500 dark:text-slate-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <button
              onClick={scrollToProjects}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-blue-50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg dark:shadow-none"
            >
              {DATA.hero?.cta || "See My Work"} <ArrowRight size={18} />
            </button>
            <Link
              to="/contact"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-slate-800/50 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-slate-800 transition-all hover:border-gray-300 dark:hover:border-slate-500 backdrop-blur-sm"
            >
              {DATA.hero?.contact || "Contact Me"}
            </Link>
          </div>
        </div>

        {/* Right Side: New Terminal Component */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-end animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
          <Terminal
            scrollToSection={scrollToSection}
            toggleTheme={toggleTheme}
            showUI={showUI}
            setShowUI={setShowUI}
          />
        </div>

      </div>



    </section>
  );
};

export default Hero;