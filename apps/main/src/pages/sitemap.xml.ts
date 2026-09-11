/**
 * Hand-rolled rather than @astrojs/sitemap, which would be another dependency
 * for something this small. Lists what this site actually builds: the
 * homepage, the itineraries, and the journal migrated from WordPress.
 *
 * Every URL carries a trailing slash, matching the canonicals in Layout.astro
 * and the URLs the old site was indexed under.
 */
import type { APIRoute } from 'astro'
import { PACKAGES } from '../content/packages'
import { getCategories, getPosts } from '../content/journal'

interface Entry {
    path: string
    lastmod?: Date
    priority: string
    changefreq: string
}

export const GET: APIRoute = async ({ site }) => {
    const posts = await getPosts()
    const categories = await getCategories(posts)

    const entries: Entry[] = [
        { path: '/', priority: '1.0', changefreq: 'weekly' },
        { path: '/safari-packages/', priority: '0.9', changefreq: 'weekly' },
        { path: '/enquire/', priority: '0.8', changefreq: 'monthly' },
        { path: '/about/', priority: '0.7', changefreq: 'monthly' },
        ...PACKAGES.map((pkg) => ({
            path: `/safari-packages/${pkg.slug}/`,
            priority: '0.8',
            changefreq: 'monthly',
        })),
        {
            path: '/blogs/',
            lastmod: posts[0]?.data.updatedDate,
            priority: '0.8',
            changefreq: 'weekly',
        },
        ...posts.map((post) => ({
            path: `/${post.id}/`,
            lastmod: post.data.updatedDate,
            priority: '0.7',
            changefreq: 'monthly',
        })),
        { path: '/privacy-policy/', priority: '0.2', changefreq: 'yearly' },
        ...categories.map((category) => ({
            path: `/category/${category.slug}/`,
            lastmod: category.posts[0]?.data.updatedDate,
            priority: '0.5',
            changefreq: 'monthly',
        })),
    ]

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(({ path, lastmod, priority, changefreq }) =>
        [
            '    <url>',
            `        <loc>${new URL(path, site).href}</loc>`,
            lastmod ? `        <lastmod>${lastmod.toISOString()}</lastmod>` : null,
            `        <changefreq>${changefreq}</changefreq>`,
            `        <priority>${priority}</priority>`,
            '    </url>',
        ]
            .filter(Boolean)
            .join('\n')
    )
    .join('\n')}
</urlset>
`

    return new Response(body, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
}
