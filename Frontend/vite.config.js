import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This tells Vite to bind to all addresses (0.0.0.0) 
    // allowing your laptop (192.168.1.101) to access the frontend.
    host: true, 
    port: 5173,
  }
})