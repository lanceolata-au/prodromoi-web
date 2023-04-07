/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  dasisyui: {
    themes : [
      {
        scoutstas: {
          "primary": "#009059",
          "secondary": "#005a37",
          "accent": "#95cb6e",
          "neutral": "#3d5c92",
          "base-100": "#1a416f",
          "info": "#008f88",
          "success": "#79b143",
          "warning": "#f3b819",
          "error": "#ea594b"
        },
      },
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ]
}
