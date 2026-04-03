/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          900: '#0a0c0f',
          800: '#111318',
          700: '#1a1d24',
          600: '#22262f',
          500: '#2e3340',
        },
        accent: {
          cyan: '#00e5cc',
          green: '#00d68f',
          red: '#ff4d6d',
          amber: '#ffb547',
          purple: '#7c5cfc',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
