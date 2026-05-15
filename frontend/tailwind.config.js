/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f5efe2',
          300: '#ede4d0',
          400: '#e0d2b4',
          500: '#d4c29a',
        },
        ink: {
          50: '#f6f5f4',
          100: '#e7e5e2',
          200: '#cfccc7',
          300: '#b0aba3',
          400: '#8a847a',
          500: '#6f6860',
          600: '#5c564f',
          700: '#4a4540',
          800: '#3e3a36',
          900: '#363330',
          950: '#1c1a18',
        },
        terracotta: {
          50: '#fdf4f1',
          100: '#fce6df',
          200: '#facec0',
          300: '#f6ad97',
          400: '#ee8465',
          500: '#e26441',
          600: '#d34b2e',
          700: '#b03a24',
          800: '#8d3222',
          900: '#722d20',
          950: '#3d140e',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c7d8c7',
          300: '#a1bda1',
          400: '#789e78',
          500: '#588358',
          600: '#446844',
          700: '#375237',
          800: '#2f422f',
          900: '#273627',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'typewriter': 'typewriter 2s steps(12) forwards',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
