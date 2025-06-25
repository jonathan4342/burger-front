import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Suponiendo que todas las llamadas al backend empiezan con /api
      '/api': {
        target: 'https://burguer.lmcdigitalriver.online', // 🔁 Aquí va tu API real
        changeOrigin: true,
        secure: false, // poner `false` si es un certificado autofirmado (en desarrollo)
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
