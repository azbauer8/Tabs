
import type { Config } from "tailwindcss";
import { radixThemePreset } from 'radix-themes-tw';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    borderRadius:{
      lg: "var(--radius-5)",
      md: "var(--radius-3)",
      sm: "var(--radius-1)",
    }
  },
  darkMode: "class",
  presets: [radixThemePreset]
};
export default config;
