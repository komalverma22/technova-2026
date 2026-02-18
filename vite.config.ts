import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
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
