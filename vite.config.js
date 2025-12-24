import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  // Ensure assets folder is accessible
  publicDir: 'public',
  // If you want to keep assets in root, uncomment below and comment publicDir
  // publicDir: false,
})

