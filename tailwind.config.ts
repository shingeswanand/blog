import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        adminBg: "#f6f7f7",
        adminBorder: "#dcdcde",
        adminText: "#1d2327",
        primary: "#2271b1"
      }
    }
  },
  plugins: []
};

export default config;
