/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        mb: { min: "0", max: "767px" }
      }
    },
  },
  plugins: [],
}

