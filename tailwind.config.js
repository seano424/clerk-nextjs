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
        'theme-cyan': '#9BEDFE',
        'theme-yellow': '#FFFA70',
        'theme-slate-900': '#25354A',
        'theme-slate-500': '#9AAAC6',
        'theme-blue-900': '#101B2E',
        'theme-blue-700': '#2F4C8D',
        'theme-blue-500': '#1A3272',
        'theme-blue-300': '#5F8AFF',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
}
