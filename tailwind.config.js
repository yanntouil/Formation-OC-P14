const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.warmGray,
        danger: colors.red,
        success: colors.lime,
        warning: colors.orange,
        info: colors.teal,
    },
    screens: {
      'only-sm': {'max': '767px'},
    },
},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
