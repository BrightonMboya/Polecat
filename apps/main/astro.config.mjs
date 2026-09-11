import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import maplibreAssets from './scripts/vendor-maplibre.mjs'

// https://astro.build
export default defineConfig({
    // The brand's primary site. The paid-traffic landing page is a separate
    // app in this monorepo (apps/marketing/polecat-lp) and keeps its own
    // `lp.` origin, so nothing here should link across with a relative path.
    site: 'https://africanpolecatsafaris.com',

    // Copies MapLibre's worker into public/ so the route map on the itinerary
    // pages can paint. See scripts/vendor-maplibre.mjs.
    integrations: [maplibreAssets()],

    vite: {
        plugins: [tailwindcss()],
    },
})
