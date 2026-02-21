# Rehan's Portfolio - Project Context

## Project Overview

This is a **personal portfolio website** built with **React 19** and **Vite 7**, showcasing Rehan's skills, projects, and experience as a student developer. The site features a modern dark/light theme, 3D animations, Firebase integration for a guestbook feature, and an AI-powered chat widget.

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2.0 |
| **Build Tool** | Vite 7.2.4 |
| **Styling** | Tailwind CSS 3.4.17 |
| **Animations** | Framer Motion 12.34.0 |
| **3D Graphics** | Three.js + React Three Fiber + Drei |
| **Routing** | React Router DOM 7.10.1 |
| **Backend/DB** | Firebase (Auth + Firestore) |
| **AI Integration** | Google Generative AI (@google/generative-ai) |
| **Icons** | Lucide React |
| **Markdown** | react-markdown + remark-gfm |
| **Deployment** | Vercel |

## Project Structure

```
Rehan_Portfolio/
├── src/
│   ├── components/       # React components (Hero, About, Skills, Projects, etc.)
│   ├── data/
│   │   └── user.js       # Personal information & portfolio data (EDIT THIS)
│   ├── utils/            # Utility functions
│   ├── assets/           # Static assets
│   ├── firebase.js       # Firebase configuration
│   ├── App.jsx           # Main app component with routing
│   ├── Layout.jsx        # Layout wrapper with navigation
│   └── main.jsx          # Entry point
├── public/               # Static public assets
├── functions/            # Firebase Cloud Functions
├── guestbook1/           # Guestbook-related files
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── eslint.config.js      # ESLint configuration
├── firestore.rules       # Firebase Firestore security rules
├── firestore.indexes.json # Firestore index definitions
└── vercel.json           # Vercel deployment configuration
```

## Key Components

| Component | Description |
|-----------|-------------|
| `Hero.jsx` | Landing section with animated introduction |
| `About.jsx` | About section with personal info |
| `Skills.jsx` | Skills display with layered architecture |
| `Projects.jsx` | Project showcase gallery |
| `Contact.jsx` | Contact form with hCaptcha |
| `Guestbook.jsx` | Firebase-powered visitor guestbook |
| `ChatWidget.jsx` | AI chatbot using Google Generative AI |
| `Documents.jsx` | Document viewing component |
| `Background.jsx` | Animated background effects |
| `Navbar.jsx` | Navigation with theme toggle |
| `Terminal.jsx` | Terminal-style UI component |
| `LikeButton.jsx` | Interactive like functionality |
| `LiveSignatures.jsx` | Real-time guestbook signatures |

## Building and Running

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts Vite development server (typically at `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

Outputs to `dist/` directory with code splitting (vendor chunk for node_modules)

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Configuration Files

### Personal Data (`src/data/user.js`)

**This is the main file to customize.** Contains:
- Profile information (name, email, social links)
- Skills organized in 3 layers (Vision, Structure, Foundation)
- Projects array with demo/github links
- Experience history

### Firebase (`src/firebase.js`)

Firebase configuration for:
- Google Authentication
- Firestore Database (guestbook feature)

**Note:** The current config contains exposed API keys. Consider using environment variables for production.

### Tailwind (`tailwind.config.js`)

Customizations include:
- Dark mode support (`class` strategy)
- Custom animations (blob, float, blink)
- Urdu font family support
- Custom `.terminal` utility

### Vite (`vite.config.js`)

- Code splitting: node_modules bundled into `vendor` chunk
- Chunk size warning limit: 1000KB
- React plugin enabled

### Vercel (`vercel.json`)

SPA routing configuration - all routes rewrite to `index.html`

## Development Conventions

### Code Style

- **ESLint:** Uses `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
- **Naming:** PascalCase for components, camelCase for variables/functions
- **Files:** `.jsx` extension for React components
- **Exports:** Default exports for components

### State Management

- Local state via `useState` hooks
- Theme persistence in `localStorage`
- React Router for navigation state

### Theme System

- Dark/Light mode toggle
- Stored in `localStorage` as `theme`
- Respects system preference (`prefers-color-scheme`)
- Applied via `dark:` class on `<html>` element

## Features

1. **Multi-page Routing:** Home, Guestbook, Documents, Contact
2. **Theme Toggle:** Persistent dark/light mode
3. **Guestbook:** Firebase-backed visitor signatures with real-time updates
4. **AI Chat:** Google Generative AI-powered chatbot
5. **3D Animations:** Three.js background effects
6. **Responsive Design:** Mobile-first Tailwind CSS
7. **Scroll Spy:** Active section highlighting in navbar
8. **hCaptcha:** Bot protection on contact form

## Deployment

Deployed on **Vercel**. Push to main branch triggers automatic deployment.

```bash
# After building
vercel --prod
```

## Notes for AI Assistants

- Personal data is in `src/data/user.js` - direct users here for content updates
- Firebase config is hardcoded - suggest environment variables for security
- Project uses Urdu font support (`Jameel Noori Nastaleeq`)
- Comments in code are mixed English/Urdu (Romanized)
- The `functions/` directory contains Firebase Cloud Functions (unexplored)
