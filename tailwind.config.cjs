/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes : [ 
      {
        "scoutstas": {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: "#009059",
          secondary: "#005a37",
          accent: "#95cb6e",
          info: "#008f88",
          success: "#79b143",
          warning: "#f3b819",
          error: "#ea594b"
        }
      }
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ]
}
