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

import { TRIPADVISOR } from '../config'
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
     * The hero cycles. `slides[0]` is the one the browser preloads and paints
     * — it is the LCP, so it is the only one served at three widths and the
     * only one with alt text; the rest fade in behind it on a loop and are
     * marked decorative (see Hero.astro).
     *
     * The loop mixes stock with the operator's own photography, and is
     * ordered so that no two frames of the same subject sit next to each
     * other — two lantern-lit dinner tables back to back read as one
     * photograph shown twice.
     *
     * Every `imageAlt` describes the photograph rather than claiming a place
     * it cannot vouch for. Adding, removing or re-cropping a slide means
     * re-running scripts/hero-scrim.py and copying the worst case into the
     * gradient in Hero.astro — a new photograph can put a white sky where the
     * sub-head sits.
     */
    slides: [
        {
            image: '/images/hero-acacia-game-drive-1400.webp',
            srcset:
                '/images/hero-acacia-game-drive-900.webp 900w, /images/hero-acacia-game-drive-1400.webp 1400w, /images/hero-acacia-game-drive-1920.webp 1920w',
            alt: 'A guide and a guest standing beside an open-sided game drive vehicle under a flat-topped acacia, open plains running to the horizon behind them',
        },
        {
            image: '/images/hero-campfire-wine-1600.webp',
            srcset:
                '/images/hero-campfire-wine-900.webp 900w, /images/hero-campfire-wine-1600.webp 1600w',
            alt: 'A woman sitting with a glass of red wine on cushions by a campfire on a rocky outcrop, looking out over the bush at dusk',
        },
        {
            image: '/images/hero-baobab-bush-brunch-1400.webp',
            srcset:
                '/images/hero-baobab-bush-brunch-900.webp 900w, /images/hero-baobab-bush-brunch-1400.webp 1400w',
            alt: 'Guests standing with drinks around long tables laid for brunch in the shade of a baobab, a game drive vehicle parked behind them',
        },
        {
            image: '/images/hero-long-table-lanterns-1600.webp',
            srcset:
                '/images/hero-long-table-lanterns-900.webp 900w, /images/hero-long-table-lanterns-1600.webp 1600w',
            alt: 'A long table laid for dinner in a clearing at dusk, red director chairs down both sides and lanterns hung in the trees above it',
        },
        {
            image: '/images/hero-lodge-games-1400.webp',
            srcset:
                '/images/hero-lodge-games-900.webp 900w, /images/hero-lodge-games-1400.webp 1400w',
            alt: 'Four people around a wooden table under a thatched roof, mid-game with tiles laid out between them and forest behind',
        },
        {
            image: '/images/hero-horseback-sunset-1600.webp',
            srcset:
                '/images/hero-horseback-sunset-900.webp 900w, /images/hero-horseback-sunset-1600.webp 1600w',
            alt: 'Two riders on a white and a bay horse stopped side by side on open grassland, watching the sun go down',
        },
        /* The frame the 6-Day Honeymoon card used to carry, re-cropped to 16:9
           from the original. */
        {
            image: '/images/hero-lantern-dinner-1600.webp',
            srcset:
                '/images/hero-lantern-dinner-900.webp 900w, /images/hero-lantern-dinner-1600.webp 1600w',
            alt: 'A couple at a table laid for dinner under an acacia hung with hurricane lanterns, more lanterns along the path and a fire burning outside the tents behind them',
        },
        {
            image: '/images/hero-shaded-lunch-table-1600.webp',
            srcset:
                '/images/hero-shaded-lunch-table-900.webp 900w, /images/hero-shaded-lunch-table-1600.webp 1600w',
            alt: 'Four guests in sun hats eating lunch at a table under dappled shade, wine poured and the garden green behind them',
        },
    ],
    imageSizes: '100vw',
    cta: { label: 'Tell Us About Your Milestone', href: '/enquire/' },
} as const

/**
 * One card in the "What kind of safari speaks to you?" section, after the same band
 * on abercrombiekent.com, which the client asked this to read like.
 */
export interface TravelStyle {
    /** The `?plan=` value that carries this card's intent into /enquire/. */
    slug: string
    title: string
    blurb: string
    image: string
    imageAlt: string
    /**
     * What the planner preselects when someone arrives from this card, keyed
     * by the id of the step that holds the answer ('trip' or 'interests' in
     * src/pages/enquire.astro).
     *
     * Values have to be options that step actually offers — enquire.astro
     * throws at build time if one is not, so a renamed chip cannot quietly
     * stop preselecting. Nothing is invented: a card presets only what its
     * own title already says, which is why Private Safaris presets nothing —
     * every itinerary on the site is private, so it implies no answer. The
     * card's title still reaches the inbox as the enquiry's stated intent.
     */
    preset?: Partial<Record<'trip' | 'interests', readonly string[]>>
}

/*
 * The five ways people travel with this operator, each card a way into the
 * planner with its intent already carried.
 *
 * The photographs are people doing the thing the card names rather than
 * scenery, and every `imageAlt` describes the frame as cropped — these are
 * tight crops out of 16:9 originals. Order matters: the grid gives the first
 * three cards a third of the row and the last two a half, so the first three
 * images are cropped 3:4 and the last two 3:2 (see TravelStyles.astro).
 * Reordering or replacing a card means re-cropping to the shape of its slot,
 * then re-running scripts/style-card-scrim.py and copying the worst case into
 * the gradient in TravelStyles.astro: the title and the copy are both white
 * over the photograph.
 */
export const TRAVEL_STYLES: {
    heading: string
    body: string
    items: readonly TravelStyle[]
} = {
    heading: 'What kind of safari speaks to you?',
    body: 'Five ways people travel with us. Start with the one that sounds like your trip and the planner opens with it already filled in.',
    items: [
        {
            slug: 'family',
            title: 'Family',
            blurb: 'Shorter drives, earlier dinners, and guides who know how to hold a seven-year-old’s attention all morning.',
            image: '/images/style-family.webp',
            imageAlt:
                'A camp cook lifting a grill of roasted vegetables while a small girl in a pink jacket watches from beside him',
            preset: { interests: ['family'] },
        },
        {
            slug: 'honeymoon',
            title: 'Honeymoon',
            blurb: 'A dinner laid out where nobody else can find you, late breakfasts, and camps quiet enough to hear the plains.',
            image: '/images/style-honeymoon.webp',
            imageAlt:
                'A couple reading together on the bed of a tented room, a breakfast tray beside them and the bush through the open canvas',
            preset: { interests: ['honeymoon'] },
        },
        {
            /* The photograph is the frame to the left of the one the 13-Day
               Great Migration card carries further down this page — herd and
               plains, no vehicle — so the two do not read as the same
               picture twice. */
            slug: 'migration',
            title: 'Migration',
            blurb: 'Twelve nights following the herds: Lake Natron, the Mara River in the northern Serengeti, then west and central as they move.',
            image: '/images/style-migration.webp',
            imageAlt:
                'A column of wildebeest walking up a track towards the camera, zebra behind them and thousands more spread along the horizon',
            preset: { trip: ['safari'], interests: ['migration'] },
        },
        {
            slug: 'trekking',
            title: 'Trekking',
            blurb: 'Days on foot: Kilimanjaro by Marangu, Machame, Rongai, Lemosho or the Northern Circuit — and, on the safaris, a walking safari with an armed ranger.',
            image: '/images/style-trekking.webp',
            imageAlt:
                'A line of trekkers with packs and poles crossing the high desert of the Kilimanjaro saddle, the snow-streaked summit of Kibo ahead of them',
            preset: { trip: ['kilimanjaro'] },
        },
        {
            /* Presets the interest; the planner does not ask how you get
               between the parks otherwise. */
            slug: 'fly-in',
            title: 'Fly-In',
            preset: { trip: ['safari'], interests: ['fly-in'] },
            blurb: 'An hour in a light aircraft instead of a day in a vehicle — a scheduled bush flight straight onto the Serengeti plains, and the drive from the airstrip is your first game drive.',
            image: '/images/style-fly-in.webp',
            imageAlt:
                'A pilot in uniform carrying two kit bags away from a single-engine Cessna parked on a gravel bush airstrip',
        },
    ],
}

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
            blurb: 'Kilimanjaro on foot. Five routes to Uhuru Peak at 5,895 metres — the classic Marangu huts, the scenic Machame, the quiet northern Rongai, the gradual Lemosho, and the nine-day Northern Circuit right around the mountain.',
            image: '/images/kili-moorland-trail.webp',
            imageAlt:
                'A file of trekkers and porters climbing a trail through giant heather on Kilimanjaro under a clear sky',
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
 * first, then the shortest family safari and the migration flagship. All
 * fifteen — the ten safaris and the five Kilimanjaro climbs — are on
 * /safari-packages behind the button.
 */
export const PACKAGES: {
    heading: string
    body: string
    /** The six shown by default. */
    items: SafariPackage[]
    cta: Cta
} = {
    heading: 'Get Inspired',
    body: 'Every itinerary here is private — your own guide, your own vehicle, and days that can move. Honeymoons first, then the family safaris, the twelve nights it takes to follow the migration properly, and five routes up Kilimanjaro.',
    cta: { label: 'All Safari Packages', href: '/safari-packages/' },
    items: PACKAGE_ITEMS.filter((pkg) => pkg.featured),
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

/*
 * Members and partners — the logo row, laid out as on ~/web/mufasa_new's
 * Reviews block. Each logo links to the live listing.
 *
 * `nativeWidth`/`nativeHeight` are the file's own dimensions and `height` is
 * what it renders at; the component works out the width from them. `badge`
 * marks Design My Safari, which carries its own card and border and so is set
 * taller than the wordmarks.
 *
 * The logos came from mufasa_new, but none of the `href`s did: the listing
 * ids and utm_source there are King Mufasa's, and sending this operator's
 * referrals under another operator's name would credit the wrong business.
 */
export const PARTNERS: {
    heading: string
    items: {
        name: string
        href: string
        logo: string
        logoAlt: string
        nativeWidth: number
        nativeHeight: number
        height: number
        badge?: boolean
    }[]
} = {
    heading: 'Members and Partners',
    items: [
        {
            name: 'SafariBookings',
            /* p4005 is this operator's listing, not mufasa's p6151. */
            href: 'https://www.safaribookings.com/reviews/p4005',
            /* Ships white-on-transparent; the copy in public/images is
               recoloured to the brand green for this light surface. */
            logo: '/images/partner-safaribookings.png',
            logoAlt: 'SafariBookings',
            nativeWidth: 173,
            nativeHeight: 22,
            height: 22,
        },
        {
            name: 'Tripadvisor',
            href: TRIPADVISOR.url,
            logo: '/images/partner-tripadvisor.svg',
            logoAlt: 'Tripadvisor',
            nativeWidth: 7675,
            nativeHeight: 1174,
            height: 26,
        },
        {
            name: 'Google',
            /* No Business Profile link has been supplied, so this is a Maps
               search for the business name, as on the mufasa page. Swap in the
               profile's share link once there is one. */
            href: 'https://www.google.com/maps/search/African+Polecat+Safaris+Arusha',
            logo: '/images/partner-google.svg',
            logoAlt: 'Google',
            nativeWidth: 272,
            nativeHeight: 92,
            height: 26,
        },
        {
            name: 'Design My Safari',
            /* utm_source names this site — Design My Safari attributes the
               referral by it. If they issue a partner id, it replaces this. */
            href: 'https://www.designmysafari.com/?utm_source=africanpolecatsafaris.com&utm_medium=partner&utm_campaign=operator_partner',
            logo: '/images/partner-designmysafari.svg',
            logoAlt: 'Design My Safari — Safari Partner',
            nativeWidth: 1400,
            nativeHeight: 460,
            height: 52,
            badge: true,
        },
    ],
}

export const NEWSLETTER = {
    eyebrow: 'Stay In Touch',
    heading: 'Letters from the wild places',
    body: 'Camp news, new routes and the occasional photograph worth stopping for. Six times a year, never more.',
    placeholder: 'Your email address',
    submit: 'Subscribe',
    note: 'We keep your details to ourselves. Unsubscribe any time.',
} as const

/**
 * The header. `primary` is read in order and every item is a plain link —
 * there is no dropdown any more. It used to open on Journeys, which split the
 * catalogue into safaris and the mountain; the client asked for Travel
 * Information, Journal and About Us instead, so both of those pages are now
 * reached from the footer and from the homepage's own sections rather than
 * from the bar. If Journeys ever comes back, so does the <details> menu in
 * Header.astro — it is in the history, not commented out here.
 */
/**
 * The header. Two dropdown menus, laid out after dub.sh's: Our Journeys as
 * three photo cards, About Us as a featured "Our story" card beside four
 * icon rows. `icon` names an inline SVG in Header.astro. Every href has to
 * resolve: /safari-packages/#safaris is a group anchor on that page and
 * #zanzibar is one of the route filters it reads from the hash.
 */
export const NAV = {
    journeys: {
        label: 'Our Journeys',
        items: [
            {
                label: 'Safari',
                href: '/safari-packages/#safaris',
                description: 'Private game drives through Tarangire, Ngorongoro and the Serengeti.',
                image: '/images/nav-safari.webp',
            },
            {
                label: 'Trekking',
                href: '/kilimanjaro/',
                description: 'Five routes to Uhuru Peak, the roof of Africa.',
                image: '/images/nav-trekking.webp',
            },
            {
                label: 'Zanzibar',
                href: '/safari-packages/#zanzibar',
                description: 'Stone Town and the Indian Ocean after the bush.',
                image: '/images/nav-zanzibar.webp',
            },
        ],
    },
    about: {
        label: 'About Us',
        featured: {
            label: 'Our story',
            href: '/about/',
            description: 'Private safaris, crafted in Arusha by our own guides.',
            image: '/images/nav-about.webp',
        },
        items: [
            {
                label: 'About Us',
                href: '/about/',
                description: 'Who we are and how we work.',
                icon: 'users',
            },
            {
                label: 'Travel Information',
                href: '/travel-information/',
                description: 'Visas, packing and what to expect.',
                icon: 'info',
            },
            {
                label: 'Cost Breakdown',
                href: '/cost-breakdown/',
                description: 'What each journey costs and covers.',
                icon: 'receipt',
            },
            {
                label: 'Best Time to Visit',
                href: '/travel-information/#seasons',
                description: 'The seasons, month by month.',
                icon: 'sun',
            },
            {
                label: 'Safari Add-ons',
                href: '/safari-add-ons/',
                description: 'Balloons, bush breakfasts and more.',
                icon: 'sparkle',
            },
        ],
    },
    links: [{ label: 'Journal', href: '/blogs/' }],
    enquire: { label: 'Enquire', href: '/enquire/' },
} as const

/**
 * The footer sitemap. Every href here has to resolve to something this site
 * actually builds — a page under src/pages, or an anchor that exists on the
 * page it points at. There is deliberately nothing for Botswana, Namibia,
 * South Africa, camps or lodges: the operator sells northern Tanzania and
 * Zanzibar, and owns no property.
 *
 * Four columns, and no Journal one: it used to be built in Footer.astro from
 * the categories that had posts, and was removed by request. What is back is a
 * single "Journal" link in the last column, added when the stale migrated
 * posts were replaced with the operator's own writing — without it the site
 * links at /blogs/ from nowhere, and two posts nobody can reach are two posts
 * nobody reads. The category archives are still unlinked.
 */
export const FOOTER_COLUMNS = [
    {
        heading: 'Safaris',
        links: [
            { label: 'Honeymoon safaris', href: '/safari-packages/6-day-tanzania-honeymoon-safari/' },
            { label: 'Family safaris', href: '/safari-packages/6-day-tanzania-family-safari/' },
            { label: 'The Great Migration', href: '/safari-packages/13-day-great-migration-safari/' },
            { label: 'All safari packages', href: '/safari-packages/' },
            { label: 'Safari add-ons', href: '/safari-add-ons/' },
            { label: 'Climb Kilimanjaro', href: '/kilimanjaro/' },
        ],
    },
    {
        heading: 'Where We Travel',
        links: [
            { label: 'Northern Circuit', href: '/safari-packages/#northern-circuit' },
            { label: 'Kilimanjaro', href: '/kilimanjaro/' },
            { label: 'Zanzibar', href: '/safari-packages/#zanzibar' },
            { label: 'Guest reviews', href: '/#reviews' },
        ],
    },
    {
        heading: 'Polecat Safaris',
        links: [
            { label: 'Our story', href: '/about/' },
            { label: 'Our positive impact', href: '/about/#impact' },
            { label: 'Travel information', href: '/travel-information/' },
            { label: 'Journal', href: '/blogs/' },
            { label: 'Enquire', href: '/enquire/' },
        ],
    },
    {
        /* As on ~/web/mufasa_new, without "Our vehicles". The pages' text is
           in src/content/legal, and the privacy policy is its own page. */
        heading: 'Good to Know',
        links: [
            { label: 'Our booking process', href: '/our-booking-process/' },
            { label: 'Privacy policy', href: '/privacy-policy/' },
            { label: 'Refund policy', href: '/refund-policy/' },
            { label: 'Terms and conditions', href: '/terms-and-conditions/' },
        ],
    },
] as const
