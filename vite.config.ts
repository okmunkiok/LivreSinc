import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/LivreSinc/' : '/',
  plugins: [react()],
  define: {
    'import.meta.env.ENABLE_CHARACTER': JSON.stringify(
      process.env.VITE_ENABLE_CHARACTER || 'true'
    )
  }
})
