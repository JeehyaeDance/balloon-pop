import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [{ pattern: /grid-cols-./ }],
  darkMode: "class", // required for @next-themes
  theme: {
    extend: {
      gridTemplateColumns: {
        "12": "repeat(12, 1fr)",
        "11": "repeat(11, 1fr)",
        "10": "repeat(10, 1fr)",
        "9": "repeat(9, 1fr)",
        "8": "repeat(8, 1fr)",
      },
    },
  },
};
export default config;
