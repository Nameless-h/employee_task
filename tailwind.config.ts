import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'sans': 'Helvetica, Arial, sans-serif',
    },
    colors: {
      'mainBlue':'#0046CC',
      'white': '#ffffff',
       'lightBlue': '#2563eb',
       'lightGray' : '#e4e4e7',
       'lightRed' : '#d44f46',
       'mediumGray': "#7a7373",
       'black': '#000000',
       'red': '#ed1f11',
       'gray': '#595656',
       'green': '#21a81d'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
