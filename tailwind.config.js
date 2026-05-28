/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', 'sans-serif'],
      },
      colors: {
        album: {
          cream: '#f5f0e6',
          paper: '#faf8f3',
          spine: '#8b7355',
          cover: '#6b5344',
        },
      },
      boxShadow: {
        page: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
        book: '0 12px 40px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
}
