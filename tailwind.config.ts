import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFCFA',
          100: '#FAF8F5',
          200: '#F2EDE6',
          300: '#E8E0D8',
          400: '#D4C8BB',
        },
        taupe: {
          400: '#C4A48E',
          500: '#B5927B',
          600: '#9B7A63',
          700: '#7D6050',
        },
        brown: {
          800: '#3D2B1F',
          900: '#2C2420',
        },
        muted: '#9E8E82',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1':      ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2':      ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
        'h3':      ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        section: '6rem',
        'section-sm': '3rem',
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(181, 146, 123, 0.4)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(181, 146, 123, 0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-cta': 'pulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
