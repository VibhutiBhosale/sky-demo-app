// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for Next.js app router
    "./pages/**/*.{js,ts,jsx,tsx}", // for pages router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // if using src structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
