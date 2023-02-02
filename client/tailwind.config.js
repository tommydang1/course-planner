/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ucscblue: "#003C6C",
        ucscyellow: "#FDC800",
      },
    },
  },
  plugins: [],
};
