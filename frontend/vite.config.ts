import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.share.zrok.io'], // Allows all LocalXpose subdomains
    host: true // Listens on 0.0.0.0 instead of just 127.0.0.1
  }
})