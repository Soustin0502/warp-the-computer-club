import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: mode === 'production' ? '/warp-the-computer-club/' : '/',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Add this to help with debugging
    rollupOptions: {
      output: {
        manualChunks: {
          // This helps with caching and performance
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
}));
