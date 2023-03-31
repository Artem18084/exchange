/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'my-image': "url('./assets/bgImg.jpg')",
      },
    },
  },
  plugins: [],
}