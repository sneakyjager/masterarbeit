import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d10",
        smoke: "#151923",
        mist: "#c8d0da",
        accent: "#76e4c1",
        neon: "#9ef2d9",
        ember: "#ffb86b",
      },
      boxShadow: {
        glow: "0 0 30px rgba(118, 228, 193, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
