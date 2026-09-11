/**
 * The journal, migrated out of the old WordPress site. Every entry's filename
 * is the slug the post was published under, because the URLs it earned are
 * being kept: a post that lived at /lake-chala-travel-guide/ still lives
 * there. See src/pages/[post].astro.
 *
 * Bodies are HTML rather than Markdown on purpose. The originals lean on
 * tables with spanning header rows, which Markdown cannot express, so the
 * migration kept the semantic HTML and dropped only the Elementor wrappers.
 */
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

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
        categories: z.array(z.string()).min(1),
        tags: z.array(z.string()).default([]),
        /** The WordPress post id, so a re-import can match entries up. */
        wpId: z.number(),
    }),
})

export const collections = { blog }
