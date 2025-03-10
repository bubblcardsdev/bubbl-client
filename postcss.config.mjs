/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    "postcss-import",
    "@tailwindcss/postcss", // Updated
    "autoprefixer",
  ],
};

export default config;