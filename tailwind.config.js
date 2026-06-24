/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spider: {
          black: '#020202',
          charcoal: '#0a0a0c',
          darkGray: '#121214',
          red: {
            DEFAULT: '#ff0f39',
            glow: '#ff3b30',
            dark: '#8b0000',
          },
          silver: {
            DEFAULT: '#e2e8f0',
            muted: '#8a99ad',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'custom-spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      animation: {
        'spider-sense': 'spider-sense-glow 2s infinite alternate',
      },
      keyframes: {
        'spider-sense-glow': {
          '0%': { boxShadow: '0 0 10px rgba(255, 15, 57, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 15, 57, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
