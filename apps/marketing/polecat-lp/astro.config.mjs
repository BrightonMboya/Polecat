import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build
export default defineConfig({
    // Real deployed origin — canonical, og:url and the sitemap all derive
    // from this, so it has to be right now that the page is indexable.
    site: 'https://lp.africanpolecatsafaris.com',

    // The page was bilingual (English at `/`, French at `/fr`) until
    // 2026-09-04. French is now the only version and lives at `/`, so the old
    // paths are kept alive as redirects rather than 404ing — anything already
    // linking to them (an old ad URL, a bookmark, an indexed result) still
    // lands on the live page. In a static build Astro emits these as
    // meta-refresh + canonical stub pages.
    redirects: {
        '/fr': '/',
        '/fr/confidentialite': '/confidentialite',
        '/privacy-policy': '/confidentialite',
    },

    vite: {
        plugins: [tailwindcss()],
    },
})
