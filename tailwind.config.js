module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(10px, 10px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        blink: {
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.terminal': {
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '1rem',
        },
      });
    },
  ],
};