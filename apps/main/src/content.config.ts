/**
 * The journal. Every entry's filename is the slug it is published under, and
 * the route is root-level rather than /blog/<slug>/ — that started as a
 * migration constraint (the WordPress posts had earned their URLs) and is now
 * simply the shape of the site. See src/pages/[post].astro.
 *
 * The twenty-two migrated WordPress posts were removed as stale in September
 * 2026; what is here is the operator's own writing. Their slugs are still in
 * git history if any of them has to come back, and they are not redirected
 * anywhere, so those URLs now 404.
 *
 * Bodies are HTML rather than Markdown on purpose. The copy leans on tables
 * and inline emphasis that Markdown either cannot express or mangles, and the
 * prose styles in global.css are written against plain semantic HTML.
 */
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { CATEGORY_SLUGS } from './content/categories'

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        /** Meta description. Carried over from Yoast, or cut from the excerpt. */
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date(),
        heroImage: z.string().optional(),
        heroImageAlt: z.string().optional(),
        /** One or more of Safari, Trekking, Zanzibar, Culture — see content/journal.ts. */
        categories: z.array(z.enum(CATEGORY_SLUGS)).min(1),
        tags: z.array(z.string()).default([]),
        /**
         * The WordPress post id, so a re-import could match entries up. Only
         * the migrated posts ever had one, so a post written since is allowed
         * to omit it rather than being given a made-up number.
         */
        wpId: z.number().optional(),
    }),
})

/**
 * The "Good to Know" pages linked from the footer (booking process, refund
 * policy, terms). Markdown, rendered by components/LegalPage.astro. The
 * privacy policy is its own page, src/pages/privacy-policy.astro.
 *
 * The booking, refund and terms texts started from ~/web/mufasa_new's legal
 * pages, adapted to this operator and approved as they stand.
 */
const legal = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
    }),
})

export const collections = { blog, legal }
