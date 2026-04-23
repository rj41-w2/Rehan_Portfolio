import React from 'react';
import { User, Award, Zap, Clock, Code2, Layout, GitBranch, Rocket, GraduationCap } from 'lucide-react';
import { DATA } from '../../data/portfolioData';

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
          {DATA.aboutSection.stats.map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-2xl text-center transition-colors group
                bg-slate-100 border border-slate-200
                dark:bg-slate-800/50 dark:border-slate-700
                hover:bg-slate-200 dark:hover:bg-slate-800 relative overflow-hidden
                ${idx === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
              
              {stat.icon === 'zap' && (
                <span className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
              )}

              {stat.icon === 'clock' && <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />}
              {stat.icon === 'award' && <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />}
              {stat.icon === 'zap' && <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />}

              <h3 className={`font-bold text-slate-900 dark:text-white mb-1 ${stat.icon === 'zap' ? 'text-2xl mt-2' : 'text-3xl md:text-4xl'}`}>
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 3. Main Content Split */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT: Biography & Academic Journey */}
          <div className="space-y-12">

            {/* Bio */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center">
                  <User size={18} />
                </span>
                Biography
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg border-l-2 border-blue-200 dark:border-blue-500/30 pl-4 text-justify">
                {DATA.profile.about}
              </p>
            </div>

            {/* Academic Journey */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center">
                  <GraduationCap size={18} />
                </span>
                Academic Journey
              </h3>

              <div className="space-y-4">
                {DATA.education?.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-200 dark:hover:bg-slate-800/50">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base leading-tight">{edu.degree}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-tighter">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{edu.institution}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">{edu.status}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* RIGHT: Development Process */}
          <div className="space-y-12">
            {/* Workflow */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 flex items-center justify-center">
                  <GitBranch size={18} />
                </span>
                My Workflow
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
                {DATA.aboutSection.workflow.map((step) => (
                  <div key={step.id} className="group relative p-6 rounded-2xl transition-all duration-300
                    bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-blue-400
                    dark:bg-slate-800/30 dark:border-white/5 dark:hover:border-blue-500/50 dark:hover:bg-slate-800/60"
                  >
                    <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                      bg-slate-200 text-slate-500 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-500
                      dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:group-hover:text-blue-400">
                      {step.id}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-full 
                        ${step.icon === 'layout' ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' : ''}
                        ${step.icon === 'code' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : ''}
                        ${step.icon === 'rocket' ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : ''}
                      `}>
                        {step.icon === 'layout' && <Layout size={20} />}
                        {step.icon === 'code' && <Code2 size={20} />}
                        {step.icon === 'rocket' && <Rocket size={20} />}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white hidden md:block">{step.title}</h4>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white md:hidden">{step.shortTitle || step.title}</h4>
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
