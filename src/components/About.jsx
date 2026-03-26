import React from 'react';
import { User, Cpu, Award, Zap, Clock, Code2, Globe, Layout, GitBranch, Rocket } from 'lucide-react';
import { DATA } from '../data/user';

// --- MAIN COMPONENT ---
const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-24 px-4 relative">
      <div className="max-w-6xl mx-auto w-full">

        {/* 1. Header & Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">Me</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 mx-auto rounded-full"></div>
        </div>

        {/* 2. Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">

          {/* Card 1: Experience Years */}
          <div className="p-6 rounded-2xl text-center transition-colors group
              bg-slate-100 border border-slate-200
              dark:bg-slate-800/50 dark:border-slate-700
              hover:bg-slate-200 dark:hover:bg-slate-800">

            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">
              2+
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">Years </p>
          </div>

          {/* Card 2: Projects Done */}
          <div className="p-6 rounded-2xl text-center transition-colors group
              bg-slate-100 border border-slate-200
              dark:bg-slate-800/50 dark:border-slate-700
              hover:bg-slate-200 dark:hover:bg-slate-800">

            <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">
              12+
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">Projects</p>
          </div>

          {/* Card 3: Availability */}
          <div className="col-span-2 md:col-span-1 p-6 rounded-2xl text-center transition-colors group
              bg-slate-100 border border-slate-200
              dark:bg-slate-800/50 dark:border-slate-700
              hover:bg-slate-200 dark:hover:bg-slate-800 relative overflow-hidden">

            <span className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>

            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 mt-2">
              Available
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium"> 24/7 </p>
          </div>

        </div>

        {/* 3. Main Content Split */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT: Biography & Tech Stack */}
          <div className="space-y-12">

            {/* Bio */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center">
                  <User size={18} />
                </span>

              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg border-l-2 border-blue-200 dark:border-blue-500/30 pl-4 text-justify">
                {DATA.profile.about || "I am a passionate Full Stack Developer dedicated to building scalable and efficient web applications. I love solving complex problems and learning new technologies to stay ahead in the tech world."}
              </p>
            </div>

            {/* Technical Arsenal */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 flex items-center justify-center">
                  <Cpu size={18} />
                </span>
                Technical Arsenal
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Frontend */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-bold">
                    <Globe size={16} /> Frontend
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-400">React, Tailwind, Next.js, Framer Motion</p>
                </div>

                {/* Backend */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400 font-bold">
                    <Code2 size={16} /> Backend
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-400">Node.js, Express, Firebase, MongoDB</p>
                </div>
              </div>
            </div>

          </div>


          {/* RIGHT: Development Process */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 flex items-center justify-center">
                <GitBranch size={18} />
              </span>
              My Workflow
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">

              {/* Step 1: Design & Plan */}
              <div className="group relative p-6 rounded-2xl transition-all duration-300
                bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-blue-400
                dark:bg-slate-800/30 dark:border-white/5 dark:hover:border-blue-500/50 dark:hover:bg-slate-800/60"
              >
                <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                  bg-slate-200 text-slate-500 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-500
                  dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:group-hover:text-blue-400">
                  01
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                    <Layout size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white hidden md:block">Planning & Design</h4>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white md:hidden">Planning</h4>
                </div>

                <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  I start by understanding requirements, designing the UI/UX in Figma, and planning the DB schema.
                </p>
              </div>

              {/* Step 2: Development */}
              <div className="group relative p-6 rounded-2xl transition-all duration-300
                bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-blue-400
                dark:bg-slate-800/30 dark:border-white/5 dark:hover:border-blue-500/50 dark:hover:bg-slate-800/60"
              >
                <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                  bg-slate-200 text-slate-500 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-500
                  dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:group-hover:text-blue-400">
                  02
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <Code2 size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white hidden md:block">Development</h4>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white md:hidden">Coding</h4>
                </div>

                <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  I write clean, modular, and reusable code using React & Node.js with best practices.
                </p>
              </div>

              {/* Step 3: Deployment */}
              <div className="col-span-2 md:col-span-1 group relative p-6 rounded-2xl transition-all duration-300
                bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-blue-400
                dark:bg-slate-800/30 dark:border-white/5 dark:hover:border-blue-500/50 dark:hover:bg-slate-800/60"
              >
                <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                  bg-slate-200 text-slate-500 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-500
                  dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:group-hover:text-blue-400">
                  03
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                    <Rocket size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Testing & Launch</h4>
                </div>

                <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  After thorough testing and bug fixing, I deploy the application on platforms like Vercel or Netlify.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
