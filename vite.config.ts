import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer"; // Import visualizer
import { ohImage } from "@lonik/oh-image/plugin";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
    tailwindcss({ optimize: true }),
    ohImage(),
    command === "build" &&
      visualizer({
        open: false,
        filename: "bundle-report.html",
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
