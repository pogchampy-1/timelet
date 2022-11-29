/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/**/*.{html,js,svelte,ts}`
  ],
  theme: {
    extend: {
      boxShadow: {
        containerBox: '0 8px 32px 0'
      },
      backgroundColor: {
        charcoal: '#36454F'
      }
    },
  },
  plugins: [],
}
