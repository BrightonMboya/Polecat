/**
 * Everything the journal pages need to agree on: how a category is spelled
 * for a reader, what order posts come in, and how a date is written.
 *
 * The journal is filed under four fixed categories, in the order the filter
 * chips show them. A post must use one of these slugs; the content schema
 * enforces it.
 */
import { getCollection, type CollectionEntry } from 'astro:content'
import { CATEGORIES } from './categories'

export type Post = CollectionEntry<'blog'>

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, c.label])
)

export const categoryLabel = (slug: string) =>
    CATEGORY_LABELS[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/** Newest first, which is the order every listing on the site uses. */
export async function getPosts(): Promise<Post[]> {
    const posts = await getCollection('blog')
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

/** All four categories in their fixed order, each with its posts attached (possibly none). */
export async function getCategories(posts?: Post[]) {
    const all = posts ?? (await getPosts())
    return CATEGORIES.map(({ slug, label }) => ({
        slug,
        label,
        posts: all.filter((post) => post.data.categories.includes(slug)),
    }))
}

/** The category shown on a card — the first one listed on the post. */
export const primaryCategory = (post: Post) => post.data.categories[0]

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
        p.data.categories.some((c) => post.data.categories.includes(c))
    )
    return [...sameCategory, ...others.filter((p) => !sameCategory.includes(p))].slice(0, limit)
}
