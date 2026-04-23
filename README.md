# 🚀 Personal Portfolio - Rehan Jamil

A modern, interactive portfolio built with **React 19**, **Vite**, and **Firebase**. It features a 3D interface, an AI-powered chat assistant, and a live guestbook.

![Portfolio Preview](/public/images/logo.png)

## ✨ Features

-   **🤖 AI Chat Assistant:** Integrated with Gemini/Groq for real-time interaction.
-   **📝 Live Guestbook:** Sign the guestbook and see your message appear instantly on the wall.
-   **💻 Interactive Terminal:** A fully functional terminal emulator for developer vibes.
-   **🎨 Dynamic UI:** Responsive design with Framer Motion animations and Dark Mode support.
-   **📊 Analytics:** Integrated Vercel Analytics to track engagement.

## 🛠️ Tech Stack

-   **Frontend:** React 19, Vite, Tailwind CSS
-   **Animations:** Framer Motion, Three.js
-   **Backend:** Firebase (Auth, Firestore, Functions)
-   **AI:** Google Gemini API, Groq SDK
-   **Tools:** Lucide Icons, React Router DOM, Vitest

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/     # Navigation and Page Structure
│   ├── sections/   # Main page sections (Hero, About, Projects, etc.)
│   ├── features/   # Interactive widgets (Chat, Terminal, Guestbook)
│   └── ui/         # Reusable UI components (Buttons, Skeletons, SEO)
├── data/           # Site content configuration (portfolioData.js)
├── services/       # AI and External API services
└── firebase.js     # Firebase client configuration
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rehanjamilw2/rehan_portfolio.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Create a `.env` file in the root and add your keys:
    ```env
    VITE_FIREBASE_API_KEY=...
    VITE_GEMINI_API_KEY=...
    VITE_WEB3FORMS_ACCESS_KEY=...
    ```
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📝 Configuration

To update your personal details, projects, or skills, simply edit the file:
`src/data/portfolioData.js`

---

Developed with ❤️ by [Rehan Jamil](https://www.linkedin.com/in/rehanjamil41/)
