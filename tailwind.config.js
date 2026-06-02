/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'Hanuman', '"Kiwi Maru"', 'system-ui', 'sans-serif'],
        khmer: ['Hanuman', 'Urbanist', 'serif'],
        jp: ['"Kiwi Maru"', 'Urbanist', 'serif'],
        // Elegant serif for display headings; Khmer/Japanese fall back to
        // their own faces automatically since Fraunces lacks those glyphs.
        display: ['Fraunces', 'Hanuman', '"Kiwi Maru"', 'Georgia', 'serif'],
      },
      colors: {
        // Brand palette derived from the KHode logo + ABA assets
        brand: {
          50: '#ecfdff',
          100: '#cff8fe',
          200: '#a5effc',
          300: '#67e2f9',
          400: '#22cbed',
          500: '#05bbd3', // primary cyan (lang-switch accent)
          600: '#0894b2',
          700: '#0e7690',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        deep: {
          DEFAULT: '#055e7c', // ABA deep blue
          900: '#04465d',
        },
        // Warm coffee accent for café warmth
        coffee: {
          50: '#fbf6f0',
          100: '#f3e6d6',
          200: '#e6cbac',
          300: '#d6a978',
          400: '#c98a4f',
          500: '#bd7338',
          600: '#a95c2e',
          700: '#8c4628',
          800: '#723a26',
          900: '#5e3122',
        },
        ink: {
          900: '#14110d',
          800: '#1c1813',
          700: '#2a241d',
        },
        // Warm paper neutrals for the minimal base
        paper: {
          DEFAULT: '#f6f3ee',
          50: '#faf8f4',
          100: '#f1ece4',
          200: '#e7e0d5',
        },
      },
      boxShadow: {
        glow: '0 18px 50px -28px rgba(20,17,13,0.35)',
        soft: '0 24px 60px -32px rgba(20,17,13,0.28)',
        card: '0 1px 2px rgba(20,17,13,0.04), 0 12px 36px -24px rgba(20,17,13,0.22)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(5,94,124,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,94,124,0.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(5,187,211,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,187,211,0.08) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.8s ease both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.16,1,0.3,1) infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
