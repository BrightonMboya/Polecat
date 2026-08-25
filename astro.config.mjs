import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build
export default defineConfig({
    site: 'https://polecatsafaris.example.com',
    vite: {
        plugins: [tailwindcss()],
    },
})
