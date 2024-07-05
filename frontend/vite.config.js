import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/signup",
  plugins: [react()],
  server:{
    watch: {
      usePolling: true,
    },
    port: 5173,
    strictPort: true,
    host: true,
  }
})
