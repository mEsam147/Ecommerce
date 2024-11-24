import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#333", // Emerald green for primary elements
          secondary: "#22c55e", // Light green for secondary elements
          accent: "#fbbf24", // Amber for accents
          neutral: "#3d4451", // Neutral gray
          "base-100": "#ffffff", // White for base elements
          "base-200": "#f0f0f0", // Light gray for backgrounds
          info: "#3ABFF8", // Info color
          success: "#4CAF50", // Success color
          warning: "#FF9800", // Warning color
          error: "#F44336", // Error color
        },
      },
      {
        dark: {
          primary: "#fff", // Dim gray for primary elements
          secondary: "#888888", // Dim medium gray for secondary elements
          accent: "#a569bd", // Dim purple for accents
          neutral: "#888888", // Dim neutral gray
          "base-100": "#1a1a1a", // Very dark gray for base elements
          "base-200": "#333333", // Dark gray for backgrounds
          info: "#3ABFF8", // Info color
          success: "#4CAF50", // Success color
          warning: "#FF9800", // Warning color
          error: "#F44336", // Error color
        },
      },
    ],
  },
};
