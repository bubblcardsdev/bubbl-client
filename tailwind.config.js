const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Add this if using Next.js App Router
  ],
  theme: {
    extend: {
      screens: {
        xs: "0px",
        // => @media (min-width: 0px) { ... }
        sm: "576px",
        // => @media (min-width: 576px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        xl: "1200px",
        // => @media (min-width: 1200px) { ... }

        "2xl": "1600px",
        // => @media (min-width: 1600px) { ... }
        "4xl": "2000px",
        // => @media (min-width: 1600px) { ... }
        // 'mid': { 'raw': '(min-height: 650px)' },
        // => @media (min-heigt: 650px)
      },
      keyframes: {
         slide: {
          '0%': { left: '-600px' },
          '100%': { left: '100px' },
        },
         reverseSlide: {
          '0%': { left: '100px' },
          '100%': { left: '-600px' },
        },
        fadeIn: {
          '0%': { opacity: 0,transform: "translateY(150px)" },
          // '35%':{opacity:0.1},
          '100%': { opacity: 1,transform: "translateY(0px)" },
        },
      fadeInShort: {
  '0%': { opacity: 0, transform: 'translateY(50px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
},
 slideUp3D: {
      '0%': {
        transform:
          'translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
        opacity: '0',
      },
      '100%': {
        transform:
          'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
        opacity: '1',
      },
    },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      perspective: {
        1000: '1000px',
      },
     riseUp: {
          "0%": {
            transform: "translateY(120px) scale(0.97)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.7",
          },
          "70%": {
            transform: "translateY(-15px) scale(1.02)",
          },
          "85%": {
            transform: "translateY(5px) scale(0.99)",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
        floatIn: {
          "0%": {
            transform: "translateY(100px)",
            opacity: "0",
            filter: "blur(5px)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
            filter: "blur(0)",
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        headerFadeIn:'fadeInShort 0.5s ease-out forwards',
        slideUp3D: 'slideUp3D 0.8s ease-out forwards',
        riseUp: "riseUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        floatIn: "floatIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
         slide: 'slide 10s linear infinite',
        reverseSlide:'reverseSlide 10s linear infinite',
      },
    },
  },
  plugins: [],
};
