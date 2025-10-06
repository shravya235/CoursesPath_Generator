import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    server: command === 'serve' ? {
      proxy: {
        // Forward all requests starting with /api to your backend server in development
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      }
    } : undefined
  }
})
