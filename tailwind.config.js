/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'sky-primary': '#0050A0', // primary brand blue (adjust after audit)
        'sky-accent': '#00AEEF', // accent
        'sky-muted': '#F4F6F8', // subtle backgrounds
        'sky-text': '#0B2140', // dark text
        DEFAULT: '#0e0e10',
        accent: '#0a84ff',
      },
      fontFamily: {
        // Replace 'Inter' with the real font discovered on id.sky.com
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        display: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
      },
      boxShadow: {
        'card-md': '0 6px 20px rgba(8,15,30,0.08)',
        btn: '0 6px 18px rgba(3,55,125,0.12)',
      },
      spacing: {
        72: '18rem',
      },
    },
  },
  plugins: [],
};
