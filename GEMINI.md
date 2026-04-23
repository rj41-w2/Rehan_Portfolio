# GEMINI.md

## Project Overview

This is a professional personal portfolio website built with **React 19** and **Vite**. It features an interactive UI with 3D elements, AI integration, and a real-time guestbook.

### Key Technologies
- **Frontend Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS (Dark Mode support)
- **Animations:** Framer Motion, Three.js
- **Backend:** Firebase (Firestore, Auth, Cloud Functions)
- **AI Integration:** Google Gemini & Groq APIs
- **Routing:** React Router DOM v7

### Architecture & Folder Structure
- **`src/components/layout/`**: Global components like the Navbar.
- **`src/components/sections/`**: Visual sections of the homepage (Hero, About, Skills, Projects).
- **`src/components/features/`**: Complex interactive components (ChatWidget, Terminal, Guestbook).
- **`src/components/ui/`**: Reusable atomic components (Buttons, Skeletons, SEO).
- **`src/services/`**: External API logic (Gemini, Groq).
- **`src/data/portfolioData.js`**: Central source of truth for all portfolio content.

## Building and Running

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file with:
- `VITE_FIREBASE_API_KEY`
- `VITE_GEMINI_API_KEY`
- `VITE_WEB3FORMS_ACCESS_KEY`

### Key Commands
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run lint`: Check code quality.
- `npm test`: Run unit tests.

## Development Conventions

1.  **Content Management:** Always update `src/data/portfolioData.js` for profile changes.
2.  **Component Categorization:** Place new components in the appropriate subfolder within `src/components/`.
3.  **Clean Code:** Follow the established pattern of using Tailwind for styling and Lucide for icons.
4.  **Security:** Never commit API keys. Use environment variables.
