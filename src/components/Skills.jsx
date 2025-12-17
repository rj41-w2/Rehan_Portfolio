import React from 'react';
import { Code2, Database, Terminal, Cpu, Globe, Wrench, Layout, ExternalLink } from 'lucide-react';
import { DATA } from '../data/user';

// --- HELPER: Popular Tech Websites Mapping ---
// Aap yahan apni marzi se aur links add kar sakte hain
const SKILL_LINKS = {
  // Languages
  "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "typescript": "https://www.typescriptlang.org/",
  "python": "https://www.python.org/",
  "java": "https://www.java.com/",
  "c++": "https://isocpp.org/",
  "c#": "https://learn.microsoft.com/en-us/dotnet/csharp/",
  "php": "https://www.php.net/",
  "html": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "css": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "sql": "https://www.w3schools.com/sql/",

  // Frontend
  "react": "https://react.dev/",
  "react js": "https://react.dev/",
  "next.js": "https://nextjs.org/",
  "vue": "https://vuejs.org/",
  "angular": "https://angular.io/",
  "tailwind": "https://tailwindcss.com/",
  "tailwind css": "https://tailwindcss.com/",
  "bootstrap": "https://getbootstrap.com/",
  "sass": "https://sass-lang.com/",
  "redux": "https://redux.js.org/",
  "material ui": "https://mui.com/",

  // Backend & DB
  "node.js": "https://nodejs.org/",
  "node": "https://nodejs.org/",
  "express": "https://expressjs.com/",
  "express.js": "https://expressjs.com/",
  "django": "https://www.djangoproject.com/",
  "flask": "https://flask.palletsprojects.com/",
  "mongodb": "https://www.mongodb.com/",
  "firebase": "https://firebase.google.com/",
  "postgresql": "https://www.postgresql.org/",
  "mysql": "https://www.mysql.com/",
  "redis": "https://redis.io/",

  // Tools & DevOps
  "git": "https://git-scm.com/",
  "github": "https://github.com/",
  "docker": "https://www.docker.com/",
  "kubernetes": "https://kubernetes.io/",
  "aws": "https://aws.amazon.com/",
  "azure": "https://azure.microsoft.com/",
  "figma": "https://www.figma.com/",
  "postman": "https://www.postman.com/",
  "vs code": "https://code.visualstudio.com/"
};

// Function to get link (Official or Google Search Fallback)
const getSkillLink = (skillName) => {
  const key = skillName.toLowerCase().trim();
  return SKILL_LINKS[key] || `https://www.google.com/search?q=${encodeURIComponent(skillName + " official website")}`;
};

// --- HELPER: Icon Mapping ---
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

              {/* Skills List - Now Clickable Links */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <a 
                    key={skill}
                    href={getSkillLink(skill)} // Link function call
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative overflow-hidden px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer group/skill flex items-center
                    bg-slate-50 border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-400 hover:text-blue-600 hover:shadow-sm
                    dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-slate-300 dark:hover:text-white dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10"
                  >
                    {/* Tiny dot decoration */}
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 transition-colors
                      bg-slate-400 group-hover/skill:bg-blue-500
                      dark:bg-slate-500 dark:group-hover/skill:bg-blue-400"></span>
                    
                    {skill}

                    {/* Tiny Link Icon on Hover */}
                    <ExternalLink size={10} className="ml-1 opacity-0 -translate-x-2 group-hover/skill:opacity-100 group-hover/skill:translate-x-0 transition-all duration-300" />
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