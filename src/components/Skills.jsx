import React from 'react';
import { Code2, Database, Terminal, Cpu, Globe, Wrench, Layout, ExternalLink } from 'lucide-react';
import { DATA } from '../data/user';


// --- HELPER 1: Website Links ---
const SKILL_LINKS = {
  "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "typescript": "https://www.typescriptlang.org/",
  "python": "https://www.python.org/",
  "java": "https://www.java.com/",
  "c++": "https://isocpp.org/",
  "html": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "css": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "react": "https://react.dev/",
  "next.js": "https://nextjs.org/",
  "vue": "https://vuejs.org/",
  "angular": "https://angular.io/",
  "tailwind": "https://tailwindcss.com/",
  "bootstrap": "https://getbootstrap.com/",
  "node.js": "https://nodejs.org/",
  "express": "https://expressjs.com/",
  "django": "https://www.djangoproject.com/",
  "mongodb": "https://www.mongodb.com/",
  "firebase": "https://firebase.google.com/",
  "postgresql": "https://www.postgresql.org/",
  "mysql": "https://www.mysql.com/",
  "git": "https://git-scm.com/",
  "github": "https://github.com/",
  "docker": "https://www.docker.com/",
  "aws": "https://aws.amazon.com/",
  "figma": "https://www.figma.com/",
  "postman": "https://www.postman.com/",
  "vs code": "https://code.visualstudio.com/"
};

// --- HELPER 2: Subtitles / Descriptions (NEW ADDITION) ---
const SKILL_DESCRIPTIONS = {
  // Languages
  "javascript": "Language of the Web",
  "typescript": "Typed JavaScript",
  "python": "AI & Backend Logic",
  "java": "Enterprise Software",
  "c++": "System Programming",
  "html": "Page Structure",
  "css": "Styling & Layout",
  "sql": "Database Querying",

  // Frontend
  "react": "UI Library",
  "next.js": "React Framework",
  "vue": "Progressive Framework",
  "angular": "Platform by Google",
  "tailwind": "Utility-first CSS",
  "bootstrap": "Responsive UI Kit",
  "sass": "CSS with Superpowers",
  "redux": "State Management",
  "material ui": "React Components",

  // Backend
  "node.js": "JS Runtime",
  "express": "Node.js Framework",
  "django": "Python Framework",
  "flask": "Lightweight Python",
  "mongodb": "NoSQL Database",
  "firebase": "Backend-as-a-Service",
  "postgresql": "Relational SQL DB",
  "mysql": "Open Source SQL",
  "redis": "In-memory Caching",

  // Tools
  "git": "Version Control",
  "github": "Code Hosting",
  "docker": "Containerization",
  "kubernetes": "Container Orchestration",
  "aws": "Cloud Computing",
  "azure": "Cloud Services",
  "figma": "UI/UX Design Tool",
  "postman": "API Testing",
  "vs code": "Code Editor"
};

// Function to get link
const getSkillLink = (skillName) => {
  const key = skillName.toLowerCase().trim();
  return SKILL_LINKS[key] || `https://www.google.com/search?q=${encodeURIComponent(skillName)}`;
};

// Function to get description (NEW)
const getSkillDesc = (skillName) => {
  const key = skillName.toLowerCase().trim();
  return SKILL_DESCRIPTIONS[key] || "Core Technology"; // Fallback text
};

// Helper: Icon Mapping
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
    <section id="skills" className="py-24 px-4 relative overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-300">
      
      {/* Background Decor */}
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
              {/* Animated Gradient Border */}
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

              {/* Skills List - Updated Design */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <a 
                    key={skill}
                    href={getSkillLink(skill)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-3 pr-4 pl-3 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer group/skill w-full sm:w-auto
                    bg-slate-50 border border-slate-200 hover:bg-white hover:border-blue-400 hover:shadow-sm
                    dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10"
                  >
                    {/* Tiny dot decoration */}
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors
                      bg-slate-400 group-hover/skill:bg-blue-500
                      dark:bg-slate-500 dark:group-hover/skill:bg-blue-400"></span>
                    
                    {/* Text Container */}
                    <div className="flex flex-col">
                        {/* Title */}
                        <span className="font-bold text-slate-700 dark:text-slate-200 group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 leading-tight">
                            {skill}
                        </span>
                        
                        {/* Subtitle (NEW) */}
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider group-hover/skill:text-slate-500 dark:group-hover/skill:text-slate-400">
                            {getSkillDesc(skill)}
                        </span>
                    </div>

                    {/* Tiny Link Icon on Hover */}
                    <ExternalLink size={12} className="ml-auto opacity-0 -translate-x-2 group-hover/skill:opacity-100 group-hover/skill:translate-x-0 transition-all duration-300 text-blue-500" />
                  </a>
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