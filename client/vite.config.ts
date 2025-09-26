import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/Eduspark/' : '/';
  
  return {
  }
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-progress']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
}
)