/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // Add this if using Next.js App Router
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',
        // => @media (min-width: 0px) { ... }
        'sm': '576px', 
        // => @media (min-width: 576px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '992px',
        // => @media (min-width: 992px) { ... }
  
        'xl': '1200px',
        // => @media (min-width: 1200px) { ... }
  
        '2xl': '1600px',
        // => @media (min-width: 1600px) { ... }
        '4xl': '2000px',
        // => @media (min-width: 1600px) { ... }
        // 'mid': { 'raw': '(min-height: 650px)' },
        // => @media (min-heigt: 650px)
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
