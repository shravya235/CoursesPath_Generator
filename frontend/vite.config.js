import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward all requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})