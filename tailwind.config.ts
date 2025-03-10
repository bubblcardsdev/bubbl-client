import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,tsx,jsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px', 
        'sm': '576px', 
        'md': '768px', 
        'lg': '992px', 
      },
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      transitionDuration: {
        '3500': '3.5s',
      },
      animation: {
        "scroll-left": "scrollLeft 10s linear infinite",
        "scroll-right": "scrollRight 10s linear infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-5px) rotate(-5deg)" },
        },
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(10deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

    },
  },

  backgroundSize: {
    "100%": '100%',
  },
  plugins: [

    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".font-semi-expanded": {
          "font-stretch": "semi-expanded",
        },
      });
    },
  ],
} satisfies Config;
