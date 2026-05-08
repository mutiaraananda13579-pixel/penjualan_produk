import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      strict: false, // supaya akses folder root aman
    },
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // pastikan input ke index.html
    },
  },
})
