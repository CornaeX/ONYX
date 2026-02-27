/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#040B1C',    // Deep Navy
          sidebar: '#0B1426',       // Sidebar
          card: '#121E36',          // Card BG
          accent: '#007AFF',        // Bright Blue
          border: '#1E2D4A',        // Borders
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },

    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      }
    },
    
    plugins: [],
  }