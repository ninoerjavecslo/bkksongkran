/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — Teal/Cyan family
        primary: {
          DEFAULT: '#006479',
          dim: '#00576a',
          fixed: '#40cef3',
          'fixed-dim': '#28c0e4',
          container: '#40cef3',
          'on-container': '#00414f',
          'on': '#e0f6ff',
          'on-fixed': '#002a34',
          'on-fixed-variant': '#004a5a',
        },
        // Secondary — Orange/Amber family
        secondary: {
          DEFAULT: '#964300',
          dim: '#843a00',
          fixed: '#ffc5a6',
          'fixed-dim': '#ffb287',
          container: '#ffc5a6',
          'on-container': '#773400',
          'on': '#fff0e9',
          'on-fixed': '#592500',
          'on-fixed-variant': '#853b00',
        },
        // Tertiary — Pink/Rose family
        tertiary: {
          DEFAULT: '#b4005d',
          dim: '#9f0051',
          fixed: '#ff8eb2',
          'fixed-dim': '#ff75a5',
          container: '#ff8eb2',
          'on-container': '#650031',
          'on': '#ffeff1',
          'on-fixed': '#380018',
          'on-fixed-variant': '#76003a',
        },
        // Surface family
        surface: {
          DEFAULT: '#eef8ff',
          dim: '#9bddff',
          bright: '#eef8ff',
          variant: '#b2e4ff',
          tint: '#006479',
          container: {
            DEFAULT: '#cdedff',
            low: '#e1f3ff',
            high: '#c0e8ff',
            highest: '#b2e4ff',
            lowest: '#ffffff',
          }
        },
        // On-colors
        'on-surface': '#003345',
        'on-surface-variant': '#2a5468',
        'on-background': '#003345',
        background: '#eef8ff',
        outline: {
          DEFAULT: '#3a7a94',
          variant: '#86b3cc',
        },
        'inverse-primary': '#40cef3',
        'inverse-surface': '#001018',
        'inverse-on-surface': '#76a3bb',
        // Hero-specific
        'hero-accent': '#5dd8f7',
        'hero-text': '#d0ecf7',
        'hero-text-muted': '#a0d4e8',
        'hero-text-dim': '#b0d8ec',
        'hero-badge': '#b0ecff',
        // Content
        'content-muted': '#456b7d',
        'content-light': '#7a9eb3',
        error: {
          DEFAULT: '#b31b25',
          dim: '#9f0519',
          container: '#fb5151',
          'on': '#ffefee',
          'on-container': '#570008',
        },
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
        label: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(0, 100, 121, 0.25)',
        'glow-cyan': '0 0 40px rgba(64, 206, 243, 0.35)',
        'glow-pink': '0 0 40px rgba(180, 0, 93, 0.25)',
        'card': '0 2px 24px rgba(0, 51, 69, 0.08)',
        'card-hover': '0 8px 48px rgba(0, 51, 69, 0.16)',
        'glass': '0 8px 32px rgba(0, 100, 121, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'liquid': 'linear-gradient(135deg, #006479 0%, #40cef3 100%)',
        'liquid-soft': 'linear-gradient(135deg, #e1f3ff 0%, #b2e4ff 100%)',
        'liquid-warm': 'linear-gradient(135deg, #ffc5a6 0%, #ffb287 100%)',
        'liquid-hot': 'linear-gradient(135deg, #ff8eb2 0%, #b4005d 100%)',
        'mesh': 'radial-gradient(at 40% 20%, rgba(64,206,243,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,100,121,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(180,0,93,0.1) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
