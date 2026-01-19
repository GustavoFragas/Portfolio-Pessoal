import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Otimizações de build
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Code splitting otimizado
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  // Otimizar servidor de desenvolvimento
  server: {
    port: 5173,
    strictPort: true,
  },
})
