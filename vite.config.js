import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/producto.json': {
        target: 'https://etherealparfums.netlify.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/producto.json/, '/producto.json')
      },
    },
  },
})
