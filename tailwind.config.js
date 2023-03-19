/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar')({
      size: '5px', // width or height, default '5px'
      track: {
        background: 'none', // default '#f1f1f1'
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-track
      },
      thumb: {
        background: 'gray', // default '#c1c1c1'
        borderRadius: '40px',
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-thumb
      },
      hover: {
        background: '#e50914', // default '#a8a8a8'
        borderRadius: '40px',
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-thumb:hover
      },
    }),
  ],
}
