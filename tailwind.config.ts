import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        emerald: "#006341",
        fiesta: "#C8102E",
        queso: "#F59E0B",
        obsidian: "#110E0C",
        terracotta: "#181310",
      },
    },
  },
  plugins: [],
};

export default config;
