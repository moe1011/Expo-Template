/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6'
        },
        secondary: {
          DEFAULT: '#1F2937'
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
          DEFAULT: '#F9FAFB',
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