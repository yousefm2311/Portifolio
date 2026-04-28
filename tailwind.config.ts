import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#111111',
          800: '#1A1A1A',
          700: '#222222',
          100: '#EEEEEE'
        },
        accent: {
          500: '#FF7B00',
          400: '#FF8F22',
          300: '#FFA444'
        },
        surface: {
          900: '#131313',
          800: '#1A1A1A',
          700: '#2A2A2A',
          100: '#FAFAFA'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-ar)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgb(var(--accent-500) / 0.45)',
        card: '0 20px 50px rgb(var(--shadow) / 0.35)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'card-sm': '1.25rem',
        'card': '1.5rem',
        'card-lg': '1.75rem',
        'shell': '2rem'
      }
    }
  },
  plugins: [typography]
};

export default config;
