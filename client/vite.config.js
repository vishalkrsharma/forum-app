import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.jsx",
  })],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
