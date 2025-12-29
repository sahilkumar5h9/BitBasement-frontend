/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#26658C",
        secondary: "#54ACBF",
        accent: "#A7EBF2",
        darkBlue: "#023859",
        blackBlue: "#011C40",
        weak: "#F56565",
        medium: "#ECC94B",
        strong: "#48BB78",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        lg: "12px",
      },
    },
  },
  plugins: [],
};
