import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ruta base para GitHub Pages: https://facundoabba.github.io/album_neuronic/
export default defineConfig({
  base: '/album_neuronic/',
  plugins: [react()],
})
