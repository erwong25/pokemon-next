import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        Normal: "#A8A77A",
        Fighting: "#C22E28",
        Flying: "#A98FF3",
        Poison: "#A33EA1",
        Ground: "#E2BF65",
        Rock: "#B6A136",
        Bug: "#A6B91A",
        Ghost: "#735797",
        Steel: "#B7B7CE",
        Water: "#6390F0",
        Fire: "#EE8130",
        Grass: "#7AC74C",
        Electric: "#F7D02C",
        Psychic: "#F95587",
        Ice: "#96D9D6",
        Dragon: "#6F35FC",
        Dark: "#705746",
        Fairy: "#D685AD",
      },
    },
  },
  plugins: [],
};
export default config;
