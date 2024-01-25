/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/@arco-design/web-react/**/*.js',],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/@arco-design/web-react/**/*.js',],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

