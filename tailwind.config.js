// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // This will ensure that Tailwind scans your JSX/TSX files in src
    './public/index.html',         // Also scan the public/index.html file if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
