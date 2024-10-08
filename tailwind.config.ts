import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbarGutter: {
        stable: 'stable',
      },
      colors: {
        primary: "#0F6FEC",
        secondary: "#676A79",
        third: "rgba(238, 240, 242, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
