import React, { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, Briefcase, Calendar, Code, Award } from 'lucide-react';
import { DATA } from '../data/user';

// --- HELPER COMPONENT: Animated Counter ---
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const totalSteps = 60; 
          const stepTime = duration / totalSteps;
          const increment = end / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepTime);
          
          return () => clearInterval(timer);
        } else {
          setCount(0);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};


// --- MAIN COMPONENT ---
const About = () => {
  return (
    // Background Class Removed (As per original code). Text color handles theme.
    <section id="about" className="min-h-screen flex flex-col justify-center py-20 px-4 relative">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* 1. Header & Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About <span className="text-blue-600 dark:text-blue-500">Me</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* 2. Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Semester */}
          <div className="p-6 rounded-2xl text-center transition-colors group
             bg-white border border-slate-200 
             dark:bg-slate-800/50 dark:border-slate-700 
             hover:bg-slate-100 dark:hover:bg-slate-800">
             
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
              <AnimatedCounter end={4} />th
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">Semester</p>
          </div>

          {/* Card 2: Companies/Experience */}
          <div className="p-6 rounded-2xl text-center transition-colors group
             bg-white border border-slate-200 
             dark:bg-slate-800/50 dark:border-slate-700 
             hover:bg-slate-100 dark:hover:bg-slate-800">
             
            <Briefcase className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
              <AnimatedCounter end={DATA.experience?.length || 2} />+
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">Companies</p>
          </div>

          {/* Card 3: Projects */}
          <div className="p-6 rounded-2xl text-center transition-colors group
             bg-white border border-slate-200 
             dark:bg-slate-800/50 dark:border-slate-700 
             hover:bg-slate-100 dark:hover:bg-slate-800">
             
            <Award className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
              <AnimatedCounter end={6} />+
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">Projects</p>
          </div>

        </div>

        {/* 3. Main Content Split */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* LEFT: Biography & Education */}
          <div className="space-y-12">
            
            {/* Bio */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center">
                  <User size={18}/>
                </span>
                Biography
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg border-l-2 border-blue-200 dark:border-blue-500/30 pl-4">
                {DATA.profile.about}
              </p>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 flex items-center justify-center">
                  <GraduationCap size={18}/>
                </span>
                Education
              </h3>
              
              <div className="relative space-y-8 pl-6 border-l border-slate-300 dark:border-slate-700">
                {/* University */}
                <div className="relative">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-slate-100 dark:ring-slate-900"></span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{DATA.profile.university}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{DATA.profile.degree}</p>
                  <span className="inline-block px-2 py-1 bg-slate-100 text-blue-700 border border-slate-200 dark:bg-slate-800 dark:text-blue-300 dark:border-slate-700 text-xs rounded">2024 - 2028</span>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-500"> {DATA.profile.gpa}</span>
                </div>
                
                {/* College */}
                <div className="relative">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-slate-400 dark:bg-slate-600 ring-4 ring-slate-100 dark:ring-slate-900"></span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{DATA.profile.College}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{DATA.profile.Degree}</p>
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 text-xs rounded">2022 - 2024</span>
                </div>
              </div>
            </div>

          </div>


          {/* RIGHT: Experience Timeline */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 flex items-center justify-center">
                <Briefcase size={18}/>
              </span>
              Working History
            </h3>

            <div className="space-y-6">
              {DATA.experience.map((job, index) => (
                <div 
                  key={job.id} 
                  className="group relative p-6 rounded-2xl transition-all duration-300
                  bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-400
                  dark:bg-slate-800/30 dark:border-white/5 dark:hover:border-blue-500/50 dark:hover:bg-slate-800/60"
                >
                  {/* Number Badge */}
                  <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                    bg-slate-100 text-slate-500 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-500
                    dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:group-hover:text-blue-400">
                    0{index + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                    <div>
                      <h4 className="text-lg font-bold transition-colors text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{job.role}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border
                      bg-slate-100 text-slate-600 border-slate-200
                      dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600">
                      <Calendar size={12} />
                      {job.period}
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed border-l-2 pl-4 transition-colors
                    text-slate-600 border-slate-200 group-hover:border-blue-400
                    dark:text-slate-400 dark:border-slate-700 dark:group-hover:border-blue-500/50">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;