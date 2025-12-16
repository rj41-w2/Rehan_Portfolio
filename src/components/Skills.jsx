import React from 'react';
import { Code2, Database, Terminal, Cpu, Globe, Wrench, Layout } from 'lucide-react';
import { DATA } from '../data/user';

// --- HELPER: Icon Mapping (Updated colors for Light/Dark) ---
const getIcon = (category) => {
  const cat = category.toLowerCase();
  const commonClasses = "w-6 h-6 transition-colors";
  
  if (cat.includes('front')) return <Layout className={`${commonClasses} text-blue-600 dark:text-blue-400`} />;
  if (cat.includes('back')) return <Database className={`${commonClasses} text-purple-600 dark:text-purple-400`} />;
  if (cat.includes('tool')) return <Terminal className={`${commonClasses} text-green-600 dark:text-green-400`} />;
  if (cat.includes('lang')) return <Code2 className={`${commonClasses} text-yellow-600 dark:text-yellow-400`} />;
  if (cat.includes('web')) return <Globe className={`${commonClasses} text-cyan-600 dark:text-cyan-400`} />;
  if (cat.includes('tech')) return <Cpu className={`${commonClasses} text-red-600 dark:text-red-400`} />;
  
  return <Wrench className={`${commonClasses} text-slate-600 dark:text-slate-400`} />;
};

const Skills = () => {
  return (
    // Section BG: Light = Slate-50, Dark = Transparent (Global BG dikhega)
    <section id="skills" className="py-24 px-4 relative overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-300">
      
      {/* Background Decor (Only Visible in Dark Mode mostly, subtle in light) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Technical <span className="text-blue-600 dark:text-blue-500">Arsenal</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My weapon of choice for building scalable and robust applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(DATA.skills).map(([category, skills], index) => (
            <div 
              key={category} 
              className="group relative rounded-2xl p-6 transition-all duration-300
              bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300
              dark:bg-slate-900 dark:border-slate-800 dark:shadow-none dark:hover:border-slate-600 dark:hover:shadow-2xl dark:hover:shadow-blue-900/10"
            >
              {/* Animated Gradient Border (Only visible in Dark Mode hover) */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6 border-b pb-4 transition-colors
                border-slate-100 group-hover:border-slate-200
                dark:border-slate-800 dark:group-hover:border-slate-700">
                
                <div className="p-3 rounded-xl transition-colors
                  bg-slate-50 group-hover:bg-slate-100
                  dark:bg-slate-800 dark:group-hover:bg-slate-700">
                  {getIcon(category)}
                </div>
                
                <h3 className="text-xl font-bold capitalize tracking-wide text-slate-900 dark:text-white">
                  {category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <div 
                    key={skill} 
                    className="relative overflow-hidden px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-default group/skill
                    bg-slate-50 border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-400 hover:text-blue-600
                    dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-slate-300 dark:hover:text-white dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10"
                  >
                    {/* Tiny dot decoration */}
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 transition-colors
                      bg-slate-400 group-hover/skill:bg-blue-500
                      dark:bg-slate-500 dark:group-hover/skill:bg-blue-400"></span>
                    {skill}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;