import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#061527",
          DEFAULT: "#0B2545",
          800: "#0E2F56",
          700: "#133E72",
        },
        teal: {
          DEFAULT: "#13A3A8",
          hover: "#0E868A",
          light: "#18BAC0",
          soft: "#E6F6F7",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#DFBD6C",
          dark: "#A38032",
        },
        offwhite: "#F7FAFC",
        charcoal: "#1F2937",
        muted: "#4B5563",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(11, 37, 69, 0.08)",
        card: "0 20px 40px -15px rgba(11, 37, 69, 0.07)",
        glow: "0 0 35px -5px rgba(19, 163, 168, 0.3)",
        goldGlow: "0 0 25px -5px rgba(201, 162, 75, 0.25)",
      },
      borderRadius: {
        'luxury': '20px',
        'luxury-lg': '24px',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        reverseSpinSlow: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spinSlow 35s linear infinite',
        'spin-reverse-slow': 'reverseSpinSlow 45s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
