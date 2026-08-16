import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { siteConfig } from './src/data/site.js'

export default defineConfig({
  site: siteConfig.url,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
})
