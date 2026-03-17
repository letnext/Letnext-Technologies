import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // GZIP: produces .gz files alongside assets during `npm run build`
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // only files > 1KB
    }),
  ],
  esbuild: {
    drop: ['console', 'debugger'], // remove debug code from production build
  },
  server: {
    host: true,
    port: 5173,
    open: true,
  }
})

