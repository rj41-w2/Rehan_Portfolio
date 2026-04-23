import React from 'react';
import { motion } from 'framer-motion';

const PremiumSkills = () => {
  const cards = [
    {
      id: 1,
      icon: '🧠',
      title: 'Artificial Intelligence',
      subtitle: 'Agentic AI & Architecture',
      skills: ['LangChain', 'Python', 'RAG Pipelines', 'Vector DBs', 'Gemini API', 'LLMs'],
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderGradient: 'from-purple-400 to-pink-400',
      iconBg: 'bg-purple-500/20',
    },
    {
      id: 2,
      icon: '⚡',
      title: 'System Engineering',
      subtitle: 'Full Stack Development',
      skills: ['Next.js 14', 'React', 'FastAPI', 'PostgreSQL', 'TypeScript', 'Node.js'],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderGradient: 'from-blue-400 to-cyan-400',
      iconBg: 'bg-blue-500/20',
    },
    {
      id: 3,
      icon: '📚',
      title: 'Computer Science Core',
      subtitle: 'Foundations & Tools',
      skills: ['DSA', 'OOP', 'Git/GitHub', 'Linux', 'Docker', 'Algorithms'],
      gradient: 'from-amber-500/20 to-orange-500/20',
      borderGradient: 'from-amber-400 to-orange-400',
      iconBg: 'bg-amber-500/20',
    },
  ];

  return (
    <div id="skills" className="min-h-screen relative overflow-hidden py-24 px-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">Expertise</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Building intelligent systems at the intersection of AI and modern web architecture
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Glass Card */}
              <div
                className="relative h-full p-8 backdrop-blur-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl
                           transition-all duration-500 ease-out
                           hover:border-slate-300 dark:hover:border-white/[0.15] hover:bg-slate-200 dark:hover:bg-white/[0.05]
                           hover:shadow-2xl hover:shadow-purple-900/10"
              >
                {/* Gradient Border Effect on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                              bg-gradient-to-br ${card.gradient} blur-xl`}
                  style={{ filter: 'blur(20px)', margin: '-1px' }}
                ></div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${card.iconBg} mb-6`}>
                    <span className="text-2xl">{card.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-1 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 font-light">
                    {card.subtitle}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {card.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-gray-300 
                                   bg-slate-200 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.06] rounded-lg
                                   hover:bg-slate-300 dark:hover:bg-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.12]
                                   hover:text-slate-800 dark:hover:text-white transition-all duration-300
                                   cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-8 right-8 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                bg-gradient-to-r ${card.borderGradient}`}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-slate-600 dark:text-gray-400 font-bold">
              Currently expanding into Multi-Agent Systems & Advanced RAG Architectures
            </span>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {[
            { value: '3+', label: 'Core Domains' },
            { value: '18+', label: 'Technologies' },
            { value: '2', label: 'Years' },
            { value: '∞', label: 'Learning' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl md:text-3xl font-light text-slate-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500 dark:text-gray-500 font-light tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumSkills;
