/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.{html,erb}', // All Rails views
    './app/helpers/**/*.rb',       // Helper files
    './app/javascript/**/*.{js,jsx,ts,tsx}', // JavaScript/React files
    './public/*.html',             // Static HTML files
  ],
  theme: {
    extend: {}, // Add custom styles here if needed
  },
  plugins: [], // Add Tailwind plugins like typography or forms if required
};
