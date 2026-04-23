# 🚀 Advanced AI Portfolio - Rehan Jamil

A high-performance, industry-grade portfolio built with **React 19**, **Vite**, and **Tailwind CSS**. This project features a sophisticated **AI Chat Assistant** with multi-provider failover, semantic caching, and a fully responsive 3D-integrated UI.

---

## ✨ Features

### 🤖 Intelligent AI Chatbot (The "Brain")
Built for maximum uptime and efficiency, the chatbot is more than just a text box:
-   **Multi-LLM Failover Strategy:** Automatically switches between providers if one hits a rate limit:
    1.  **Groq** (Primary - Ultra Fast)
    2.  **Google Gemini** (Secondary)
    3.  **OpenRouter** (Tertiary)
-   **Semantic Caching:** Responses are saved in `localStorage`. If a user repeats a question, the answer is served instantly from the cache, saving your API tokens.
-   **Local Development (Ollama):** Toggle `VITE_USE_OLLAMA=true` in your `.env` to run your chatbot using a local LLM.
-   **Rich UI Rendering:** Detects LinkedIn and Email links to render interactive, styled buttons instead of raw URLs.
-   **Strict Persona:** Acts as Rehan's professional virtual representative, speaking strictly in the third person.

### 🎨 Premium UI/UX
-   **Bento-style Sections:** Modular layout for Projects, Skills, and About.
-   **Dynamic Status Badges:** Skill cards feature real-time learning status badges (e.g., "Started", "Exploring", "50% Complete").
-   **Responsive Design:** Pixel-perfect optimization for Mobile, Tablet, and Desktop.
-   **Modern Glassmorphism:** Clean, modern interface with smooth Framer Motion animations.

### 📝 Live Guestbook
-   A real-time signature wall powered by **Firebase Firestore**.
-   Integrated Google Authentication.

---

## 📂 Project Structure

```text
rehan_portfolio/
├── src/
│   ├── components/
│   │   ├── layout/      # Global layout elements (Navbar, Footer)
│   │   ├── sections/    # Main page sections (Hero, About, Projects)
│   │   ├── features/    # Complex widgets (Chatbot, Terminal, Guestbook)
│   │   └── ui/          # Atomic reusable components (Buttons, Skeletons)
│   ├── services/        # AI logic, Provider handlers, and Failover system
│   ├── data/            # Site content (portfolioData.js) - THE SOURCE OF TRUTH
│   ├── utils/           # Helper functions
│   └── firebase.js      # Backend configuration
├── public/              # Static assets (Images, Logos)
├── functions/           # Firebase Cloud Functions (if used)
└── .env.example         # Template for environment variables
```

---

## 🛠️ Tech Stack

-   **Frontend:** React 19, Vite, Tailwind CSS
-   **Animations:** Framer Motion, Three.js
-   **Backend:** Firebase (Firestore, Auth)
-   **AI Engines:** Groq, Google Gemini, OpenRouter, Ollama
-   **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Cloning the Project
First, clone the repository to your local machine:
```bash
git clone https://github.com/rj41-w2/Rehan_Portfolio.git
cd Rehan_Portfolio
```

### 2. Installation
Install the necessary dependencies:
```bash
npm install
```

### 3. Environment Configuration
Copy the `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Open the `.env` file and fill in your API keys and Firebase credentials.

### 4. Running the Development Server
```bash
npm run dev
```

---

## ⚙️ How to Modify & Customize

This project is designed for easy customization. You don't need to dig through multiple files to change your personal details.

### Updating Content (The "Source of Truth")
All text, project details, skills, and links are managed in a single file:
**`src/data/portfolioData.js`**

Simply open this file to:
-   Change your **Name, Role, and Tagline**.
-   Update your **Social Media Links** (LinkedIn, GitHub).
-   Add or remove **Projects** (Title, Description, Tech Stack, Image).
-   Update **Skills** and their learning **Status**.

### Changing Images
Place your project screenshots or logos in the `public/images/` folder and reference them in `portfolioData.js`.

---

Developed with ❤️ by [Rehan Jamil](https://www.linkedin.com/in/rehanjamil41/)
