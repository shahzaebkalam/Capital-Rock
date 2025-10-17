/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          DEFAULT: "#B58833",
        },

        "secondary-black": {
          DEFAULT: "#020202",
        },

        // Neutral Colors
        neutral: {
          DEFAULT: "#000000",
        },

        // Primary Shades
        "primary-shade": {
          100: "#F8F4EB",
          200: "#F0E7D6",
          300: "#E1CFAD",
          400: "#D3B885",
          500: "#C4A05C",
          600: "#B58833",
          700: "#916D29",
          800: "#6D521F",
          900: "#483614",
          1000: "#241B0A",
        },

        // Gray
        gray: {
          100: "#F7F7F7",
          200: "#EFEFEF",
          300: "#DEDEDE",
          400: "#BEBEBE",
          500: "#9D9D9D",
          600: "#7D7D7D",
          700: "#6D6D6D",
          800: "#5C5C5C",
        },

        // Warning
        warning: {
          100: "#FCF5E6",
          200: "#F6E2B4",
          300: "#F1CF83",
          400: "#EBBC52",
          500: "#E8B339",
          600: "#E3A008",
        },

        // Error
        error: {
          100: "#FDE6EA",
          200: "#F9CDD5",
          300: "#F49AAB",
          400: "#EE6881",
          500: "#E93657",
          600: "#E3042D",
        },

        // Success
        success: {
          100: "#E7FDF4",
          200: "#CFFAE8",
          300: "#9EF4D0",
          400: "#6EEFB9",
          500: "#3DE9A1",
          600: "#0DE48A",
        },

        // Additional Colors
        "background-light": "#FBFBFB",
        "background-dark": "#242525",
        placeholder: "#F5F5F5",
        stroke: "#E8EAED",
      },

      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-forum)", "Forum", "serif"],
      },
    },
  },
  plugins: [],
}