import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    // Fonts always ship as files: the production CSP (vercel.json, font-src 'self') blocks data: fonts.
    assetsInlineLimit: (filePath) => (/\.woff2?(\?|$)/i.test(filePath) ? false : undefined),
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Let Rollup split motion: the menu's animation features load on demand.
            if (/[\\/]node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
              return undefined;
            }
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
