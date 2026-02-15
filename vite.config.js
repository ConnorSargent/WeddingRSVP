import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // GitHub Pages: https://connorsargent.github.io/connorAndMaggiesWedding
  base: process.env.NODE_ENV === 'production' ? '/connorAndMaggiesWedding/' : '/',
})
