/**
 * Everything the journal pages need to agree on: how a category is spelled
 * for a reader, what order posts come in, and how a date is written.
 *
 * The first six category slugs are WordPress's own, from the migrated posts.
 * Those posts are gone, so nothing renders them today; they stay here so a
 * re-import cannot land without labels. Everything written since uses the
 * slugs below them.
 */
import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'blog'>

export const CATEGORY_LABELS: Record<string, string> = {
    destinations: 'Destinations',
    migration: 'The Migration',
    'family-safaris': 'Family Safaris',
    itinerary: 'Itineraries',
    accomodation: 'Camps and Lodges',
    uncategorized: 'Field Notes',
    seasons: 'Seasons',
    planning: 'Planning Your Safari',
}

export const categoryLabel = (slug: string) =>
    CATEGORY_LABELS[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/** Newest first, which is the order every listing on the site uses. */
export async function getPosts(): Promise<Post[]> {
    const posts = await getCollection('blog')
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

/** The categories that actually have posts, each with its posts attached. */
export async function getCategories(posts?: Post[]) {
    const all = posts ?? (await getPosts())
    const map = new Map<string, Post[]>()
    for (const post of all) {
        for (const slug of post.data.categories) {
            map.set(slug, [...(map.get(slug) ?? []), post])
        }
    }
    return [...map.entries()]
        .map(([slug, items]) => ({ slug, label: categoryLabel(slug), posts: items }))
        .sort((a, b) => b.posts.length - a.posts.length)
}

/** The category shown on a card — the first one that isn't the WP catch-all. */
export const primaryCategory = (post: Post) =>
    post.data.categories.find((c) => c !== 'uncategorized') ?? post.data.categories[0]

const FORMATTER = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

export const formatDate = (date: Date) => FORMATTER.format(date)

/** ISO day, for <time datetime>. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10)

/** Up to `limit` other posts, preferring ones in the same category. */
export function relatedPosts(post: Post, all: Post[], limit = 3): Post[] {
    const others = all.filter((p) => p.id !== post.id)
    const sameCategory = others.filter((p) =>
        p.data.categories.some((c) => c !== 'uncategorized' && post.data.categories.includes(c))
    )
    return [...sameCategory, ...others.filter((p) => !sameCategory.includes(p))].slice(0, limit)
}
