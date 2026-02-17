# Context:
I want a clean, minimalist, and premium "Skills Section" for my portfolio.
I am a BSCS student transitioning into an AI Architect.
I dislike complex animations or gamified elements. I want a "Professional Dashboard" look.

# Goal:
Create a React component using Tailwind CSS that displays skills in 3 high-quality "Glassmorphism" cards.

# Visual Style (The Premium Glass Look):
-   **Background:** The section background should be deep dark (e.g., `#0a0a0a`) with a subtle gradient orb in the center to create depth.
-   **Cards:**
    -   Effect: "Frosted Glass" look using `backdrop-filter: blur(12px)`.
    -   Color: `bg-white/5` (Very transparent white) with a `border-white/10`.
    -   Hover: When hovered, the border should glow slightly (`border-purple-500/50`).
-   **Typography:** Clean, sans-serif (Inter). Headings in white, text in soft gray (`text-gray-400`).

# The 3 Cards (Content):

1.  **Card 1: Agentic AI & Architecture (The Vision)**
    -   *Icon:* Brain or Spark (Lucide React).
    -   *Title:* "Artificial Intelligence".
    -   *Skills List (Tags):* LangChain, Python, RAG Pipelines, Vector DBs, Gemini API.
    -   *Vibe:* This is the main focus.

2.  **Card 2: Full Stack Engineering (The Core)**
    -   *Icon:* Layers or Server.
    -   *Title:* "System Engineering".
    -   *Skills List (Tags):* Next.js 14, React, FastAPI, PostgreSQL, TypeScript.

3.  **Card 3: Foundations & Tools (The Base)**
    -   *Icon:* Terminal or Book.
    -   *Title:* "Computer Science Core".
    -   *Skills List (Tags):* DSA, OOP, Git/GitHub, Linux, Docker (Basic).

# Layout:
-   **Desktop:** 3 Cards in a row (Grid cols-3).
-   **Mobile:** Stacked vertically (Grid cols-1).
-   **Spacing:** Use generous padding inside cards (`p-8`) to make it look expensive.

# Output:
Please generate the React component code with these Glassmorphism styles applied via Tailwind CSS.