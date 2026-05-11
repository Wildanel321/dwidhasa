/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4ff',
          100: '#bae0ff',
          200: '#91caff',
          300: '#69b1ff',
          400: '#4096ff',
          500: '#1677ff',
          600: '#0958d9',
          700: '#003eb3',
          800: '#002c8c',
          900: '#001d66',
        },
        brutalist: {
          lime: '#A3E635',
          yellow: '#FBBF24',
          pink: '#F472B6',
          blue: '#60A5FA',
          red: '#F87171',
          purple: '#C084FC',
          white: '#FFFFFF',
          black: '#000000',
        },
        light: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d9d9d9',
        },
        dark: {
          50: '#1f1f1f',
          100: '#141414',
          200: '#0a0a0a',
        }
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutalist-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutalist-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
        'brutalist-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
        'brutalist-dark': '4px 4px 0px 0px rgba(255,255,255,0.3)',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
