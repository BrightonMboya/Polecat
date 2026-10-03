/**
 * The journal's four categories, in the order the filter chips show them.
 * Kept apart from journal.ts so content.config.ts can import it without
 * pulling in astro:content.
 */
export const CATEGORIES = [
    { slug: 'safari', label: 'Safari' },
    { slug: 'trekking', label: 'Trekking' },
    { slug: 'zanzibar', label: 'Zanzibar' },
    { slug: 'culture', label: 'Culture' },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]]
