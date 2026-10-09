import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deploy base path, e.g. VITE_BASE_PATH=/cellexplorer/ for a sub-path deployment.
// Defaults to "/" so local dev and root deployments are unchanged.
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split the heavy 3D stack into its own long-cached vendor chunks.
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
