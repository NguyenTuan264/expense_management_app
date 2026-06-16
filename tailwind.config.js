/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        menuBg: "#f9f9f9",
        mainBg: "#ffffff",
        btnHeader: "#e9e9e9",
        calendarOutMonth: "#f5f5f5",
        sectionBg: "#d9d9d9",
        decorBar: "#d2d2d2",
        calendarTHBg: "#e1e1e1",
        alertSuccess: "#09b640",
        textGray: "#c0c0c0",
        borderColor: "#7c7c7c",
        borderDark: "#b2b2b2",
        iconGray: "#acacac",
        primary: "#fd7f04",
        secondary: "#febe7e",
        inputBG: "#fff6e5",
        darkBlue: "#2f8dc3",
        darkRed: "#fe0000",
      },
    },
  },
  plugins: [],
};
