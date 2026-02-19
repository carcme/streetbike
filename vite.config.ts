import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"; // Import visualizer

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Automatically opens the report in your browser
      filename: "bundle-report.html", // Name of the report file
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Put all admin routes into a separate 'admin' chunk
          if (id.includes('src/routes/admin')) {
            return 'admin';
          }
          // Explicitly separate react and react-dom into their own vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Other modules can go into default chunks or other manual chunks
          // For example, you might want to split large libraries
          if (id.includes('node_modules')) {
            return 'vendor'; // Example: put all node_modules into a vendor chunk
          }
        },
      },
    },
  },
})
