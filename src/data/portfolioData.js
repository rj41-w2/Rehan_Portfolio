/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * This file is the "Single Source of Truth" for the entire portfolio.
 * To customize the portfolio, simply update the values in this file.
 */

export const DATA = {
  // 1. Profile Information
  profile: {
    name: "Rehan",
    role: "Student Developer",
    tagline: "Learning | Building | Sharing",
    about: "I am a passionate student developer dedicated to building scalable and efficient web applications. I love solving complex problems and learning new technologies to stay ahead in the tech world.",
    email: "rehanjamilwattoo@gmail.com",
    github: "https://github.com/rj41-w2",
    linkedin: "https://www.linkedin.com/in/rehanjamil41/",
    resumeLink: "#"
  },

  // 2. Hero Section
  hero: {
    title: "ASPIRING  AI ARCHITECT",
    badge: "Hello, I'm Rehan",
    cta: "See My Work",
    contact: "Contact Me",
    sequence: [
      "Architecting the Future. Transforming Code into Agentic Solutions.",
      2000,
      "Student by Day. System Architect by Night.",
      2000,
    ]
  },

  // 3. Skills Section
  skillsSection: {
    title: "Skills & Expertise",
    subtitle: "Building intelligent systems at the intersection of AI and modern web architecture",
    footerNote: "Currently expanding into Multi-Agent Systems & Advanced RAG Architectures",
    stats: [
      { value: '3+', label: 'Core Domains' },
      { value: '18+', label: 'Technologies' },
      { value: '2+', label: 'Years' },
      { value: '∞', label: 'Learning' },
    ],
    cards: [
      {
        id: "ai",
        title: "Artificial Intelligence",
        subtitle: "Agentic AI & Architecture",
        status: "Learning", 
        skills: ['LangChain', 'Python', 'RAG Pipelines', 'Vector DBs', 'Gemini API', 'LLMs'],
        gradient: 'from-purple-500/20 to-pink-500/20',
        borderGradient: 'from-purple-400 to-pink-400',
        iconBg: 'bg-purple-500/20',
      },
      {
        id: "fullstack",
        title: "System Engineering",
        subtitle: "Full Stack Development",
        status: "Exploring",
        skills: ['Next.js 14', 'React', 'FastAPI', 'PostgreSQL', 'TypeScript', 'Node.js'],
        gradient: 'from-blue-500/20 to-cyan-500/20',
        borderGradient: 'from-blue-400 to-cyan-400',
        iconBg: 'bg-blue-500/20',
      },
      {
        id: "core",
        title: "Computer Science Core",
        subtitle: "Foundations & Tools",
        status: "Ongoing",
        skills: ['DSA', 'OOP', 'Git/GitHub', 'Linux', 'Docker', 'Algorithms'],
        gradient: 'from-amber-500/20 to-orange-500/20',
        borderGradient: 'from-amber-400 to-orange-400',
        iconBg: 'bg-amber-500/20',
      },
    ]
  },

  // 4. Projects Section
  projectsSection: {
    title: "Featured Work",
    subtitle: "A selection of projects that showcase my passion for building clean, robust, and scalable applications."
  },

  // 5. Featured Projects
  projects: [
    {
      id: 1,
      title: "Personal AI Employee (Hackathon-0)",
      description: "An advanced AI-powered assistant designed to handle various tasks and improve productivity.",
      tech: ["Python", "LangChain", "Gemini AI"],
      image: "/images/AI-Employee.png",
      demo: "https://www.loom.com/share/f9edfec79afc417983eb251469abfe34",
      github: "https://github.com/rj41-w2/Personal-AI-Employee-Hackathon-0"
    },
    {
      id: 2,
      title: "Physical AI & Robotices (Hackathon-1)",
      description: "An AI-powered book authored using Gemini & Docusaurus. Features a RAG Chatbot (FastAPI, Neon DB, Qdrant) for real-time reader interaction, user personalization, and Urdu translation for accessibility. Includes secure authentication via better-auth.",
      tech: ["Gemini AI", "Docusaurus", "FastAPI", "Neon DB", "Qdrant", "better-auth"],
      image: "/images/physical-ai-book.png",
      demo: "https://physical-ai-book-hackathon-1.vercel.app/",
      github: "https://github.com/rj41-w2/physical-ai-book-hackathon-1"
    },
    {
      id: 3,
      title: "Task Manager",
      description: "A productivity app to manage daily tasks efficiently.",
      tech: ["React", "Tailwind", "Vite"],
      image: "/images/task-master.png",
      demo: "https://taskmaster41.vercel.app/",
      github: "https://github.com/rj41-w2/TASK-MASTER"
    },
    {
      id: 4,
      title: "IDM-CLI",
      description: "A blazing-fast, multi-threaded CLI download manager with concurrent downloads, interactive shell, YouTube support, and a Chrome extension.",
      tech: ["TypeScript", "Bun", "Commander", "Chrome Extension"],
      image: "/images/idm-cli.png",
      demo: "https://github.com/rj41-w2/idm-cli",
      github: "https://github.com/rj41-w2/idm-cli"
    },
    {
      id: 5,
      title: "Advanced AI Portfolio",
      description: "A professional, high-performance portfolio featuring an AI chatbot with multi-provider failover and semantic caching.",
      tech: ["React 19", "Vite", "Tailwind CSS", "Firebase", "Gemini AI"],
      image: "/images/Portfolio-website.png",
      demo: "https://rehanjamil41.vercel.app/",
      github: "https://github.com/rj41-w2/Rehan_Portfolio"
    }
  ],

  // 6. About Section
  aboutSection: {
    stats: [
      { label: "Years", value: "2+", icon: "clock" },
      { label: "Projects", value: "12+", icon: "award" },
      { label: "24/7", value: "Available", icon: "zap" },
    ],
    technicalArsenal: [
      { category: "Frontend", skills: "React, Tailwind, Next.js, Framer Motion", icon: "globe" },
      { category: "Backend", skills: "Node.js, Express, Firebase, MongoDB", icon: "code" },
    ],
    workflow: [
      { 
        id: "01", 
        title: "Planning & Design", 
        shortTitle: "Planning",
        description: "I start by understanding requirements, designing the UI/UX in Figma, and planning the DB schema.",
        icon: "layout"
      },
      { 
        id: "02", 
        title: "Development", 
        shortTitle: "Coding",
        description: "I write clean, modular, and reusable code using React & Node.js with best practices.",
        icon: "code"
      },
      { 
        id: "03", 
        title: "Testing & Launch", 
        description: "After thorough testing and bug fixing, I deploy the application on platforms like Vercel or Netlify.",
        icon: "rocket"
      }
    ]
  },

  // 7. Academic Journey (Education)
  education: [
    {
      id: 1,
      institution: "Presidential Initiative for Artificial Intelligence and Computing (PIAIC)",
      degree: "Agentic AI and LLMs",
      period: "2026 - Present",
      status: "Learning"
    },
    {
      id: 2,
      institution: "University of the Lahore (UOL)",
      degree: "BS Computer Science",
      period: "2024 - 2028",
      status: "Ongoing"
    },
    {
      id: 3,
      institution: "Aspire Group of Colleges",
      degree: "Intermediate Computer Science",
      period: "2021 - 2023",
      status: "Completed"
    }
  ],

  // 8. Package Section - idm-cli
  packageSection: {
    name: "idm-cli",
    version: "0.1.3",
    description: "A blazing-fast, multi-threaded CLI download manager with concurrent downloads, interactive shell, YouTube support, and a Chrome extension.",
    route: "/package",
    installCommand: "bun install -g idm-cli",
    requirements: "Requires Bun runtime. Install Bun via PowerShell: powershell -c \"irm bun.sh/install.ps1 | iex\"",
    quickStart: "Type 'idm' in terminal to open the interactive download shell.",
    features: [
      "Concurrent Downloads: Split files into up to 32 parallel streams for maximum speed.",
      "Interactive Shell: Persistent REPL with visual UI for easy link management.",
      "Auto Quality Selection: Choose from 144p to 4K with automatic audio-video merging.",
      "Zero Setup: Auto-downloads ffmpeg & yt-dlp binaries. No manual config needed.",
      "Pause & Resume: Robust state tracking with .dl.json for reliable resume.",
      "Beautiful Terminal UI: Multi-progress bars with speed, ETA, and percentage display.",
      "Browser Extension: Manifest V3 Chrome extension for right-click download and video detection."
    ],
    chromeExtension: "Ships with a Chrome extension. Install via chrome://extensions > Developer mode > Load unpacked > select extension/ folder.",
    repo: "https://github.com/rj41-w2/idm-cli"
  },

  // 9. Chatbot Configuration
  chatbotConfig: {
    name: "AI Assistant",
    welcomeMessage: "Hi! I'm Rehan's AI assistant. How can I help you today?",
    identity: {
      fullName: "Rehan Jamil",
      role: "Virtual Representative",
      context: "CS student at University of the Lahore (UOL) and PIAIC"
    },
    messages: {
      unrelatedQuery: "I am specifically designed to assist with information about Rehan's portfolio and professional background. I cannot answer general queries, but I would love to tell you about Rehan's latest AI projects!",
      quotaExhausted: "I'm sorry, but our AI's daily conversation quota has been reached. Please come back tomorrow or contact Rehan directly via the links below.",
      connectionError: "⚠️ Ollama is not connected locally.",
      generalError: "⚠️ An unexpected error occurred."
    },
    rules: [
      "ALWAYS respond in English, regardless of the language used by the user.",
      "ALWAYS refer to Rehan in the THIRD PERSON.",
      "ONLY use the provided PORTFOLIO DATA. Do NOT invent or hallucinate information.",
      "If information is not in the data, state that you don't have that information.",
      "Do NOT confuse Rehan with anyone else from other institutions.",
      "KEEP RESPONSES EXTREMELY SHORT (2-3 sentences max). Only give a brief overview, then end with the exact phrase: 'TIP: Explore in the [section name] section.' For example: 'Rehan is a passionate student developer dedicated to building scalable and efficient web applications.' TIP: Explore in the About section.'"
    ]
  }
};
