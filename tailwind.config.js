import defaultTheme from 'tailwindcss/defaultTheme'
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")


export default {
    darkMode: 'class',
    content: [
        'content/**/*.md'
      ], 
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.red
      }
    }
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["mdi"]), // , "lucide"
    }),
  ],
}
