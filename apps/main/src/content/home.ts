/**
 * Every piece of copy and every image on the homepage, in the order the page
 * renders them. The components in src/components/ are pure layout — if a word
 * or a price needs to change, it changes here and nowhere else.
 *
 * The safari packages are real: they come from the operator's own itinerary
 * documents and live in src/content/packages.ts. So are the destinations, which
 * are now the three routes those itineraries actually sell rather than three
 * countries. The journal posts are the real ones migrated out of WordPress.
 *
 * The photography is still stock, and every `imageAlt` describes the photograph
 * rather than claiming a place it cannot vouch for. The hero and the itinerary
 * cards now lead with people in the experience rather than with animals; the
 * destination and journal art is still the Paper design's. Replace all of it
 * with the operator's own before this page takes production traffic.
 */

import { PACKAGES as PACKAGE_ITEMS, type RouteTag, type SafariPackage } from './packages'

export interface Cta {
    label: string
    href: string
}

export interface Destination {
    name: string
    /** The route this card filters the itineraries section down to. */
    route: RouteTag
    blurb: string
    image: string
    /** Alt text has to describe the photograph, not repeat the card heading. */
    imageAlt: string
}

export interface Review {
    title: string
    quote: string
    author: string
    source: string
}

export const HERO = {
    heading: 'Celebrate Life Milestones in the Wild',
    /* The italic line under the headline. Kept to two clauses — the occasions,
       then the promise — so it balances onto two lines at desktop width. */
    subheading:
        'From honeymoons to anniversaries to family holidays — let us help you celebrate the moments that matter with a curated wildlife experience.',
    /*
     * Full-bleed, and the LCP, so it is served at three widths rather than
     * one: the grass and sky in this frame do not compress down to a single
     * file that is both sharp on a desktop and cheap on a phone. `image` is
     * the middle width, which is what a browser without srcset support gets.
     *
     * The photograph is people in the experience rather than animals, and the
     * two of them are ranged left and right of the frame, which is what leaves
     * the centre clear for the copy. Swapping it for a brighter one means
     * re-measuring the scrim in Hero.astro.
     */
    image: '/images/hero-acacia-chairs-1400.webp',
    imageSrcset:
        '/images/hero-acacia-chairs-900.webp 900w, /images/hero-acacia-chairs-1400.webp 1400w, /images/hero-acacia-chairs-1920.webp 1920w',
    imageSizes: '100vw',
    imageAlt:
        'Two travellers sitting out in safari chairs with wine poured on the table between them, looking across the plains to a flat-topped acacia',
    cta: { label: 'Tell Us About Your Milestone', href: '/enquire/' },
} as const

/*
 * Not countries — the three ways to travel Tanzania that we actually sell.
 * Each card filters the itineraries section rather than leading off the page,
 * so `route` here has to be one of the tags the packages carry.
 */
export const DESTINATIONS: { heading: string; body: string; items: Destination[] } = {
    heading: 'Our Destinations',
    body: 'Three ways to travel northern Tanzania. Choose one and the itineraries below narrow to it.',
    items: [
        {
            name: 'Northern Circuit',
            route: 'northern-circuit',
            blurb: 'Tarangire, Lake Manyara, the Ngorongoro Crater and the Serengeti — the run of parks that holds the migration, the crater floor and the biggest elephant herds in Africa.',
            image: '/images/serengeti-cheetah-plains.jpg',
            imageAlt: 'A cheetah standing on open Serengeti grassland in early morning light',
        },
        {
            name: 'Trekking',
            route: 'trekking',
            blurb: 'Days spent on foot: a walking safari with an armed ranger in Arusha National Park, the Ngorongoro Crater rim, and a day hike on the Marangu route up Kilimanjaro.',
            image: '/images/namibia-desert-dunes.webp',
            imageAlt: 'A lone walker crossing high ground below a bare mountain range',
        },
        {
            name: 'Zanzibar',
            route: 'zanzibar',
            blurb: 'Stone Town and the east-coast beaches, a short flight off the safari airstrip. One itinerary ends there; two more extend onto the island for three to five nights.',
            image: '/images/south-africa-coast.webp',
            imageAlt: 'Turquoise water breaking over dark rocks along an empty tropical coastline',
        },
    ],
}

/*
 * The teaser for /about/#impact, and it now says the same thing that section
 * says: schooling for young Tanzanians, illustrated with the same photograph.
 * It used to promise that "a share of every night booked" went into
 * conservation trusts and community partnerships — a specific, checkable claim
 * about how the business spends money that came from the Paper design and was
 * never confirmed by the operator. That sentence is gone.
 *
 * ⚠️ What remains is still unconfirmed: the subject came from the equivalent
 * band on ~/web/atlas, which is a different operator's site. It names no
 * programme, no school and no sum, so it is not a false specific — but if the
 * operator does not do this, both this band and /about/#impact come out.
 */
export const IMPACT = {
    eyebrow: 'Beyond The Journey',
    heading: 'Our positive impact',
    body: 'A fortnight in Tanzania ought to leave more behind than a set of photographs. The part of this business that has nothing to do with selling safaris goes to schooling for children and teenagers here.',
    cta: { label: 'Learn More', href: '/about/#impact' },
    image: '/images/impact-schoolchildren.webp',
    imageAlt:
        'Schoolchildren in uniform sitting together on a grassy hillside, listening, with the highlands behind them',
} as const

/*
 * The section wrapper only. The cards themselves live in src/content/packages.ts
 * alongside their itineraries, so the homepage and the detail pages cannot
 * disagree about a price.
 *
 * The homepage shows the six itineraries flagged `featured` — the honeymoons
 * first, then the shortest family safari and the migration flagship. All ten
 * are on /safari-packages behind the button.
 */
export const PACKAGES: {
    heading: string
    body: string
    /** The six shown by default. */
    items: SafariPackage[]
    /** All ten, so a route filter can reach the ones that aren't featured. */
    all: SafariPackage[]
    cta: Cta
} = {
    heading: 'Safari packages',
    body: 'Every itinerary here is private — your own guide, your own vehicle, and days that can move. Honeymoons first, then the family safaris, and the twelve nights it takes to follow the migration properly.',
    cta: { label: 'All Safari Packages', href: '/safari-packages/' },
    items: PACKAGE_ITEMS.filter((pkg) => pkg.featured),
    all: PACKAGE_ITEMS,
}

/*
 * The section wrapper only. The posts themselves are the ones migrated out of
 * WordPress and live in src/content/blog — Journal.astro reads the newest four
 * straight from the collection, so this cannot fall out of date.
 */
export const JOURNAL: { eyebrow: string; heading: string; cta: Cta } = {
    eyebrow: 'From The Field',
    heading: 'Notes and news from Tanzania',
    cta: { label: 'All Stories', href: '/blogs/' },
}

export const REVIEWS: Review[] = [
    {
        title: 'A truly fantastic safari provider',
        quote: 'We were offered a private safari for two and immediately received a quote tailored to our individual needs. Our guide, Francis, was absolutely fantastic and, with his incredible knowledge, gave us wonderful insights into the flora and fauna of Tanzania.',
        author: 'Rainer',
        source: 'Verified · Tripadvisor',
    },
    {
        title: 'Great trip and great guide',
        quote: 'A joy to work with for planning our trip — great communication from start to finish. Our guide, Stan, was awesome, found us tons of great wildlife and was a lot of fun to hang out with. Very knowledgeable about everything Serengeti.',
        author: 'Karen Goulekas',
        source: 'Verified · Tripadvisor',
    },
    {
        title: 'Ask for Zakayo, great guide',
        quote: 'We aren’t hikers normally and we aren’t in great shape. No problem. Pole pole — slow, slow — and we moved along, stopping frequently to rest. During those times he explained the plants, the animals. Incredibly knowledgeable.',
        author: 'Paul H',
        source: 'Verified · Tripadvisor',
    },
]

export const PARTNERS = {
    heading: 'Members And Partners',
    items: [
        { name: 'SafariBookings', role: 'Listed Operator' },
        { name: 'TATO', role: 'Tanzania Association of Tour Operators' },
        { name: 'Design My Safari', role: 'Design Partner' },
    ],
} as const

export const NEWSLETTER = {
    eyebrow: 'Stay In Touch',
    heading: 'Letters from the wild places',
    body: 'Camp news, new routes and the occasional photograph worth stopping for. Six times a year, never more.',
    placeholder: 'Your email address',
    submit: 'Subscribe',
    note: 'We keep your details to ourselves. Unsubscribe any time.',
} as const

export const NAV = {
    /** The two text links in the header, beside the Enquire button. */
    primary: [
        { label: 'Safaris', href: '/safari-packages/' },
        { label: 'About Us', href: '/about/' },
    ],
    enquire: { label: 'Enquire', href: '/enquire/' },
} as const

/**
 * The footer sitemap. Every href here has to resolve to something this site
 * actually builds — a page under src/pages, or an anchor that exists on the
 * page it points at. There is deliberately nothing for Botswana, Namibia,
 * South Africa, camps or lodges: the operator sells northern Tanzania and
 * Zanzibar, and owns no property.
 *
 * The `/#route-<tag>` links drive the homepage itinerary filter (see
 * Packages.astro). They only work on the homepage — /safari-packages lists all
 * ten unfiltered — so they are written as absolute paths back to `/`.
 *
 * Three columns, and no Journal one: it used to be built in Footer.astro from
 * the categories that had posts, and was removed by request. /blogs/ and the
 * category pages still exist, they are simply not linked from the footer.
 */
export const FOOTER_COLUMNS = [
    {
        heading: 'Safaris',
        links: [
            { label: 'Honeymoon safaris', href: '/safari-packages/6-day-tanzania-honeymoon-safari/' },
            { label: 'Family safaris', href: '/safari-packages/6-day-tanzania-family-safari/' },
            { label: 'The Great Migration', href: '/safari-packages/13-day-great-migration-safari/' },
            { label: 'All safari packages', href: '/safari-packages/' },
        ],
    },
    {
        heading: 'Where We Travel',
        links: [
            { label: 'Northern Circuit', href: '/#route-northern-circuit' },
            { label: 'Trekking', href: '/#route-trekking' },
            { label: 'Zanzibar', href: '/#route-zanzibar' },
            { label: 'Guest reviews', href: '/about/#reviews' },
        ],
    },
    {
        heading: 'Polecat Safaris',
        links: [
            { label: 'Our story', href: '/about/' },
            { label: 'Our positive impact', href: '/about/#impact' },
            { label: 'Members and partners', href: '/about/#partners' },
            { label: 'Enquire', href: '/enquire/' },
        ],
    },
] as const

/*
 * No legal links. The privacy policy that used to sit here was removed along
 * with its page; terms and a modern slavery statement were never written.
 * Anything added back needs a page behind it — the footer linking at nothing
 * is worse than the footer saying nothing.
 */
