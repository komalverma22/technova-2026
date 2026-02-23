import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    // Don't pre-bundle lucide-react — it's huge and tree-shaken at build time
    exclude: ['lucide-react'],
  },

  build: {
    // Raise the chunk size warning threshold to avoid false positives
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor code into logical named chunks so browsers can cache
        // them independently of your app code.
        manualChunks(id) {
          // React + React-DOM in their own chunk (changes rarely)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // Framer Motion (heavy — Gallery only)
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          // Everything else from node_modules in one shared vendor chunk
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
      },
    },
  },

  server: {
    proxy: {
      '/technova-api': {
        target: 'https://technova.indiesoft.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/technova-api/, ''),
      },
    },
  },
});
