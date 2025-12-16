import React from 'react';
import { ArrowRight, Code2, Database, Layout, Smartphone } from 'lucide-react';
import { DATA } from '../data/user';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 pb-20 px-4">
      
      {/* 1. Background Effects (Spotlight & Grid) */}
      {/* Spotlight: Light mode me thoda soft, Dark me deep */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
      
      {/* Grid: Light mode me Black lines, Dark mode me White lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>

      {/* 2. Main Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        
        {/* Name Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 backdrop-blur-md text-gray-700 dark:text-slate-300 text-sm animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Hello, I'm {DATA.profile?.name || "Developer"}
        </div>

        {/* Big Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Software</span> <br />
          that <span className="italic font-serif font-light text-gray-500 dark:text-slate-300">Scales.</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {DATA.profile?.tagline || "I craft reliable and high-performing web applications."} 
          <span className="block mt-2 text-sm text-gray-500 dark:text-slate-500">Specializing in Full Stack Development & UI/UX.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <button 
            onClick={scrollToProjects}
            // Light: Dark Button, Dark: White Button
            className="px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-2 shadow-lg dark:shadow-none"
          >
            See My Work <ArrowRight size={18} />
          </button>
          
          <a 
            href="#contact"
            // Light: White Glass, Dark: Dark Glass
            className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 text-gray-700 dark:text-white border border-gray-200 dark:border-slate-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-slate-800 transition-all hover:border-gray-300 dark:hover:border-slate-500 backdrop-blur-sm"
          >
            Contact Me
          </a>
        </div>

      </div>

      {/* 3. Tech Stack Strip (Bottom) */}
      <div className="absolute bottom-10 left-0 right-0 w-full animate-in fade-in duration-1000 delay-500">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest mb-6">Powering applications with modern tech</p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             
             {/* Tech Icons (Decorative with Theme Support) */}
             <div className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700 group-hover:border-blue-500/50 transition-colors shadow-sm dark:shadow-none">
                  <Code2 className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400">Frontend</span>
             </div>

             <div className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700 group-hover:border-purple-500/50 transition-colors shadow-sm dark:shadow-none">
                  <Database className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400">Backend</span>
             </div>

             <div className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700 group-hover:border-pink-500/50 transition-colors shadow-sm dark:shadow-none">
                  <Layout className="text-pink-600 dark:text-pink-400" size={24} />
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400">Design</span>
             </div>

             <div className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700 group-hover:border-green-500/50 transition-colors shadow-sm dark:shadow-none">
                  <Smartphone className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400">Mobile</span>
             </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;