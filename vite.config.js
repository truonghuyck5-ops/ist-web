import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        temNhan: resolve(__dirname, 'tem-nhan.html'),
        bangHieu: resolve(__dirname, 'bang-hieu.html'),
        comboMoQuan: resolve(__dirname, 'combo-mo-quan.html'),
      },
    },
  },
})