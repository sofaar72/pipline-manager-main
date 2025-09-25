import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // This is crucial for Electron - use relative paths
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]", // Simplify asset naming
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
});
