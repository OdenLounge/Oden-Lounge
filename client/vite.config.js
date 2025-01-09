import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/**/*', // Copy all static assets
          dest: 'assets',
        },
      ],
    }),
  ],

  build: {
    outDir: 'build', // Specify output directory
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server URL
        changeOrigin: true, // Avoid issues with CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove /api prefix if needed
      },
    },
  },
});
