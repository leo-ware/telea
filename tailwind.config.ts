import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "sky-blue": "#8ecae6",
        "blue-green": "#219ebc",
        "green-blue": "#3267A5",
        "cerulean": "#126782",
        "prussian-blue": "#023047",
        "lapis-lazuli": "#1E589C",
        "selective-yellow": "#ffb703",
        "orange-peel": "#fd9e02",
        "ut-orange": "#fb8500",
      }
    },
  },
  plugins: [typography],
};
export default config;
