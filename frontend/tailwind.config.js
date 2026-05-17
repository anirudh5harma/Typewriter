/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper: '#FAFAF7',
        surface: '#FFFFFF',
        ink: {
          50:  '#F4F4EE',
          100: '#ECECE6',
          200: '#D8D8D0',
          300: '#B8B8B0',
          400: '#8E8E86',
          500: '#6B6B66',
          600: '#4A4A45',
          700: '#2A2A28',
          800: '#161614',
          900: '#0A0A0A',
        },
        accent: {
          50:  '#FFF1EA',
          100: '#FFE0CF',
          200: '#FFC1A0',
          300: '#FF9D6D',
          400: '#FF7A45',
          500: '#FF5C2A',
          600: '#E84410',
          700: '#C53D17',
          800: '#94300F',
          900: '#5C1E08',
        },
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'display': '-0.035em',
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'blink': 'blink 1.1s step-end infinite',
        'caret': 'blink 1s step-end infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        blink:     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer:   { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
      },
      backgroundImage: {
        'grid-light': "linear-gradient(to right, rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.04) 1px, transparent 1px)",
        'grid-dark': "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        'dots-light': "radial-gradient(rgba(10,10,10,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '56px 56px',
        'grid-sm': '32px 32px',
        'dots': '20px 20px',
      },
    },
  },
  plugins: [],
}
