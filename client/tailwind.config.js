/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // Adjusted gradient for a smoother transition with darker green
      backgroundImage: {
        "aggressive-gradient": "linear-gradient(to right, #000, #004400, #000)",
        "aggressive-body":
          "linear-gradient(0deg, #000 0%, #004400 30%, #000 70%)",
      },
      // Adding custom colors for text and borders
      colors: {
        darkGreen: "#004400",
        lightGreen: "#00cc00",
      },
      borderRadius: {
        xl: "1rem",
      },
      spacing: {
        14: "3.5rem",
      },
    },
  },
  plugins: [],
};
