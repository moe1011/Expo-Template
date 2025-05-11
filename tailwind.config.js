/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#25a0fb',
          text: 'white'
        },
        secondary: {
          DEFAULT: 'white',
          dark: 'black',
          text: '#2ea8fc',
          textDark: 'white'
        },
        success: {
          DEFAULT: '#10B981',
        },
        warning: {
          DEFAULT: '#F59E0B',
        },
        danger: {
          DEFAULT: '#EF4444',
        },
        background: {
          DEFAULT: '#7bc4ff',
          dark: '#2d87d2',
          secondary: '#25a0fb'
        },
        badge: {
          games: '#EDC7FF',
          surveys: '#BEF69B'
        },
        'location-banner-bg': '#F3E8FF',
      },
    },
  },
  plugins: [],
}; 