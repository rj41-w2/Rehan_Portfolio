import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { DATA } from '../../data/portfolioData';
import LikeButton from '../ui/LikeButton';
import { ProjectSkeleton } from '../ui/Skeletons';
import ErrorBoundary from '../ui/ErrorBoundary';

// --- HELPER: Website Links ---
const TECH_LINKS = {
  "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "typescript": "https://www.typescriptlang.org/",
  "python": "https://www.python.org/",
  "java": "https://www.java.com/",
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
  "figma": "https://www.figma.com/"
};

// Helper Function to get Link
const getTechLink = (techName) => {
  const key = techName.toLowerCase().trim();
  return TECH_LINKS[key] || `https://www.google.com/search?q=${encodeURIComponent(techName)}`;
};

const Projects = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading (you can replace with actual data fetching if needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary fallbackMessage="Failed to load projects. Please refresh the page.">
      <section id="projects" className="min-h-screen py-24 px-4 relative bg-slate-50 dark:bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 uppercase">
              {DATA.projectsSection.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">{DATA.projectsSection.title.split(' ')[1]}</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full"></div>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-400 mt-6 max-w-xl leading-relaxed">
              {DATA.projectsSection.subtitle}
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-40">
            {loading ? (
              // Show skeletons while loading
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="w-full lg:w-3/5">
                    <ProjectSkeleton />
                  </div>
                  <div className="w-full lg:w-2/5">
                    <ProjectSkeleton />
                  </div>
                </div>
              ))
            ) : (
              DATA.projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >

                  {/* 1. Project Visual (Browser Window) */}
                  <div className="w-full lg:w-3/5 group perspective-1000">
                    <div className="relative rounded-xl overflow-hidden transition-all duration-500
                      bg-slate-100 border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2
                      dark:bg-slate-900 dark:border-slate-700 dark:shadow-2xl dark:group-hover:shadow-blue-500/20 dark:group-hover:border-slate-600">

                      {/* Browser Header Bar */}
                      <div className="h-8 border-b flex items-center px-4 gap-2
                        bg-slate-100 border-slate-200
                        dark:bg-slate-800 dark:border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        <div className="ml-4 flex-1 h-4 rounded-full max-w-[200px]
                          bg-slate-200 border border-slate-200
                          dark:bg-slate-900/50 dark:border-transparent"></div>
                      </div>

                      {/* Project Image */}
                      <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-900">
                        <div className="absolute inset-0 z-10 transition-colors
                          bg-transparent
                          dark:bg-blue-900/20 dark:group-hover:bg-transparent"></div>
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>


                  {/* 2. Project Details */}
                  <div className="w-full lg:w-2/5 space-y-6">

                    {/* Number */}
                    <span className="font-mono text-xl text-blue-600 dark:text-blue-500">0{index + 1}.</span>

                    {/* Title */}
                    <h3 className="text-3xl font-bold transition-colors
                      text-slate-900 group-hover:text-blue-600
                      dark:text-white dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>

                    {/* Description Card */}
                    <div className="p-6 rounded-xl relative transition-colors
                      bg-slate-100 border border-slate-200 shadow-sm
                      dark:bg-slate-800/50 dark:backdrop-blur-sm dark:border-slate-700 dark:shadow-none dark:hover:bg-slate-800">
                      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-500 dark:text-slate-500">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <a
                            key={t}
                            href={getTechLink(t)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm rounded-full border transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-md
                              bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300
                              dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20 dark:hover:bg-blue-500/20 dark:hover:border-blue-500/40"
                          >
                            {t}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Links & Like Button Row */}
                    <div className="flex flex-wrap items-center gap-6 pt-4">

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border-b transition-colors pb-1
                          text-slate-700 border-transparent hover:text-slate-900 hover:border-slate-900
                          dark:text-slate-300 dark:hover:text-white dark:hover:border-white"
                      >
                        <Github size={20} /> GitHub Code
                      </a>

                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-semibold transition-colors
                          text-blue-600 hover:text-blue-700
                          dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Live Demo <ArrowUpRight size={20} />
                      </a>

                      {/* LIKE BUTTON */}
                      <div className="ml-auto">
                        <LikeButton projectId={project.id} />
                      </div>

                    </div>

                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Projects;
