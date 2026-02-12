# GEMINI.md

## Project Overview

This is a personal portfolio website built with React and Vite. It showcases the user's profile, skills, projects, and experience. The project uses Tailwind CSS for styling, Firebase for backend services (likely for the guestbook and live signatures), and a Gemini-powered chat widget for interactive user engagement.

## Building and Running

### Prerequisites

- Node.js and npm

### Key Commands

- **Install Dependencies:**
  ```bash
  npm install
  ```

- **Run in Development Mode:**
  ```bash
  npm run dev
  ```
  This will start a local development server, typically at `http://localhost:5173`.

- **Build for Production:**
  ```bash
  npm run build
  ```
  This command bundles the application for production in the `dist` directory.

- **Linting:**
  ```bash
  npm run lint
  ```
  This will check the code for any linting errors.

- **Preview Production Build:**
  ```bash
  npm run preview
  ```
  This command serves the production build locally for previewing.

## Development Conventions

- **Component-Based Architecture:** The application is structured around reusable React components located in `src/components`.
- **Styling:** Styling is done using Tailwind CSS.
- **Data Management:** The portfolio content is centralized in the `src/data/user.js` file. This allows for easy updates to personal information, skills, and project details.
- **State Management:** The application uses React's built-in state management.
- **Routing:** Client-side routing is handled by `react-router-dom`.
- **AI Integration:** The project includes a chat widget that uses the `@google/generative-ai` library, suggesting an integration with a Gemini model.
- **Backend:** Firebase is used for backend features like the guestbook. Configuration can be found in `src/firebase.js`.
