/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-light': '#F1F2FE',
        'primary-blue': '#9394F7',
        'primary-dark': '#0F1047',
        'primary-secondary': '#ABACDA',
        'primary-slate': '#9696B1',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
}
