/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Add your custom colors
      colors: {
        'brand-dark': '#111827',
        'brand-accent-orange': '#FF5733',
        'brand-accent-blue': '#3B82F6',
        // Light theme colors
        'light-bg': '#F9FAFB',
        'light-navbar-bg': '#FFFFFF',
        'light-text': '#1F2937',
      },
      // 2. Add your custom background gradients
      backgroundImage: {
        'gradient-purple-blue': 'linear-gradient(135deg, #8A2BE2 0%, #4169E1 100%)',
        'gradient-magenta-cyan': 'linear-gradient(135deg, #C71585 0%, #00FFFF 100%)',
        'gradient-electric-orange': 'linear-gradient(135deg, #FF4500 0%, #FFA500 100%)',
        'gradient-orange-glow': 'radial-gradient(ellipse at center, #FF5733, rgba(255, 87, 51, 0) 70%)',
      },
      // 3. Define your keyframe animations
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #FF5733, 0 0 10px #FF5733' },
          '50%': { boxShadow: '0 0 20px #FF5733, 0 0 30px #FF5733' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      // 4. Create utility classes for your animations
      animation: {
        'glow': 'glow 2.5s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'blob-delayed': 'blob 7s infinite 2s',
      },
      // 5. Define your font family
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
