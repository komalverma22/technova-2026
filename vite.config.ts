import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ── Deduplication ─────────────────────────────────────────────────────────
  // Force Vite to resolve every import of 'react' / 'react-dom' to the same
  // physical file. Without this, react-pdf / pdfjs-dist can pull in a second
  // React instance → "forwardRef undefined" crash in production.
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    alias: {
      // Ensure a single copy of React is always used, even from deep transitive deps
      react: resolve('./node_modules/react'),
      'react-dom': resolve('./node_modules/react-dom'),
    },
  },

  optimizeDeps: {
    // Let Vite pre-bundle these so they are treated as a single module
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    // lucide-react is tree-shaken at build time, no need to pre-bundle
    exclude: ['lucide-react'],
  },

  build: {
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Safe manual chunk splitting — keeps React in a single dedicated chunk.
        // Using a function avoids the path-matching fragility that caused the
        // duplicate-React bug (different OSes / resolvers produce different paths).
        manualChunks(id) {
          // Everything under the resolved react / react-dom directories → one chunk
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('\\node_modules\\react\\') ||
            id.includes('\\node_modules\\react-dom\\') ||
            id.includes('/node_modules/scheduler/')  ||
            id.includes('\\node_modules\\scheduler\\')
          ) {
            return 'react-vendor';
          }
          if (
            id.includes('/node_modules/react-router') ||
            id.includes('\\node_modules\\react-router')
          ) {
            return 'router';
          }
          if (
            id.includes('/node_modules/framer-motion') ||
            id.includes('\\node_modules\\framer-motion')
          ) {
            return 'framer-motion';
          }
          // react-pdf + pdfjs in their own lazily-loaded chunk
          if (
            id.includes('/node_modules/react-pdf') ||
            id.includes('\\node_modules\\react-pdf') ||
            id.includes('/node_modules/pdfjs-dist') ||
            id.includes('\\node_modules\\pdfjs-dist')
          ) {
            return 'pdf-viewer';
          }
          if (id.includes('/node_modules/') || id.includes('\\node_modules\\')) {
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
