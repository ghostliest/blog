/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layout/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-color-hover": "var(--primary-color-hover)",
        "primary-color-darker": "var(--primary-color-darker)",
        "border-color": "var(--border-color)",
        "green-1": "var(--green-1)",
        "green-2": "var(--green-2)",
        "green-3": "var(--green-3)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
