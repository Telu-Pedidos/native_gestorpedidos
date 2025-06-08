import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";
import tailwindCSSAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "App.{tsx,jsx,ts,js}",
    "index.{tsx,jsx,ts,js}",
    "components/**/*.{tsx,jsx,ts,js}",
    "app/**/*.{tsx,jsx,ts,js}",
  ],
  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background)/<alpha-value>)",
        foreground: "rgb(var(--foreground)/<alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary)/<alpha-value>)",
          foreground: "rgb(var(--primary-foreground)/<alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary)/<alpha-value>)",
          foreground: "rgb(var(--secondary-foreground)/<alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted)/<alpha-value>)",
          foreground: "rgb(var(--muted-foreground)/<alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent)/<alpha-value>)",
          foreground: "rgb(var(--accent-foreground)/<alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive)/<alpha-value>)",
          foreground: "rgb(var(--destructive-foreground)/<alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card)/<alpha-value>)",
          foreground: "rgb(var(--card-foreground)/<alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover)/<alpha-value>)",
          foreground: "rgb(var(--popover-foreground)/<alpha-value>)",
        },
        border: "rgb(var(--border)/<alpha-value>)",
        input: "rgb(var(--input)/<alpha-value>)",
        ring: "rgb(var(--ring)/<alpha-value>)",

        chart: {
          1: "rgb(var(--chart-1)/<alpha-value>)",
          2: "rgb(var(--chart-2)/<alpha-value>)",
          3: "rgb(var(--chart-3)/<alpha-value>)",
          4: "rgb(var(--chart-4)/<alpha-value>)",
          5: "rgb(var(--chart-5)/<alpha-value>)",
        },

        status: {
          active: "rgb(var(--active)/<alpha-value>)",
          pending: "rgb(var(--pending)/<alpha-value>)",
          accepted: "rgb(var(--accepted)/<alpha-value>)",
          preparation: "rgb(var(--preparation)/<alpha-value>)",
          completed: "rgb(var(--completed)/<alpha-value>)",
        },

        order: "rgb(var(--order)/<alpha-value>)",
        title: "rgb(var(--title)/<alpha-value>)",
      },

      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
      },

      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [gluestackPlugin, tailwindCSSAnimate],
};
