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
 * The hero photographs are the operator's own, chosen by them from the old
 * WordPress media library. The rest of the photography is still stock, and
 * every `imageAlt` describes the photograph rather than claiming a place it
 * cannot vouch for. The destination and journal art is still the Paper
 * design's. Replace it with the operator's own before this page takes
 * production traffic.
 */

import { TRIPADVISOR } from '../config'
import { PACKAGES as PACKAGE_ITEMS, type SafariPackage } from './packages'

export interface Cta {
    label: string
    href: string
}

export interface Destination {
    name: string
    /**
     * The `?plan=` value for a country with no itineraries on the site yet,
     * so the card opens the planner with the country carried as the
     * enquiry's stated intent. Absent when `href` goes to itineraries.
     */
    slug?: string
    /**
     * The planner's trip-type hints, rewritten for this country, keyed by
     * trip value. The defaults all describe Tanzania; a visitor arriving
     * from the Kenya card should not be offered only the Serengeti.
     */
    tripHints?: Readonly<Record<string, string>>
    line: string
    href: string
    cta: string
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
    heading: 'Travel Deep. Feel More.',
    /* The italic line under the headline. Kept general on purpose — the client
       asked that the hero not read as a honeymoon page — and to two clauses,
       the where then the who, so it balances onto two lines at desktop width. */
    subheading:
        "Private safaris through Tanzania's wild places and on to Zanzibar's shores\u00a0— shaped around how you want to travel, and who you're travelling with.",
    /*
     * The hero cycles. `slides[0]` is the one the browser preloads and paints
     * — it is the LCP, so it is the only one served at three widths and the
     * only one with alt text; the rest fade in behind it on a loop and are
     * marked decorative (see Hero.astro).
     *
     * These seven are the operator's own choice, pulled from the old WordPress
     * media library, in the order they asked for them except that the two
     * family frames are split apart — two families on the grass back to back
     * read as one photograph shown twice.
     *
     * Every `imageAlt` describes the photograph rather than claiming a place
     * it cannot vouch for. Adding, removing or re-cropping a slide means
     * re-running scripts/hero-scrim.py and copying the worst case into the
     * gradient in Hero.astro — a new photograph can put a white sky where the
     * sub-head sits.
     */
    slides: [
        {
            image: '/images/hero-beach-infinity-pool-1400.webp',
            srcset:
                '/images/hero-beach-infinity-pool-900.webp 900w, /images/hero-beach-infinity-pool-1400.webp 1400w, /images/hero-beach-infinity-pool-1920.webp 1920w',
            alt: 'An infinity pool lined with palms and white parasols in front of a thatched beach lodge, the sea beyond it and the palms reflected in the water',
        },
        {
            image: '/images/hero-family-bush-walk-1600.webp',
            srcset:
                '/images/hero-family-bush-walk-900.webp 900w, /images/hero-family-bush-walk-1600.webp 1600w',
            alt: 'A family crouched in long grass with two guides, the youngest looking through binoculars, acacias behind them',
        },
        {
            image: '/images/hero-tree-climbing-lion-1600.webp',
            srcset:
                '/images/hero-tree-climbing-lion-900.webp 900w, /images/hero-tree-climbing-lion-1600.webp 1600w',
            alt: 'A young lion asleep draped along a thick tree branch, a hind leg hanging down below it',
        },
        {
            image: '/images/hero-camp-firepit-dusk-1220.webp',
            srcset:
                '/images/hero-camp-firepit-dusk-900.webp 900w, /images/hero-camp-firepit-dusk-1220.webp 1220w',
            alt: 'A fire burning in a pit before canvas camp tents at dusk, director chairs and lanterns set out on the ground around it',
        },
        {
            image: '/images/hero-family-game-viewing-1354.webp',
            srcset:
                '/images/hero-family-game-viewing-900.webp 900w, /images/hero-family-game-viewing-1354.webp 1354w',
            alt: 'A girl standing on the bonnet of a safari vehicle while her parents watch and photograph a herd of gazelle and wildebeest on the plain',
        },
        {
            image: '/images/hero-lodge-garden-dinner-1366.webp',
            srcset:
                '/images/hero-lodge-garden-dinner-900.webp 900w, /images/hero-lodge-garden-dinner-1366.webp 1366w',
            alt: 'A table laid with white linen and a candle in a hurricane glass on a brick terrace, uplit trees and lanterns in the garden behind',
        },
        {
            image: '/images/hero-bush-daybed-shelter-1600.webp',
            srcset:
                '/images/hero-bush-daybed-shelter-900.webp 900w, /images/hero-bush-daybed-shelter-1600.webp 1600w',
            alt: 'A cushioned daybed under a rustic timber shelter on a brick floor, a lantern hanging from a post and woodland all around',
        },
    ],
    imageSizes: '100vw',
    cta: { label: 'Start Planning Your Safari', href: '/enquire/' },
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
 * The five kinds of safari the client listed, in their order: Great Wildebeest
 * Migration, Big Five, Safari & Beach, Luxury Fly-In Safaris and Adventure &
 * Culture. Each card is a way into the planner with its intent already carried.
 *
 * Every `imageAlt` describes the frame as cropped. Order matters: the grid
 * gives the first three cards a third of the row and the last two a half, so
 * the first three images are cropped 3:4 and the last two 3:2 (see
 * TravelStyles.astro). Reordering or replacing a card means re-cropping to the
 * shape of its slot (scripts/experience-cards.py), then re-running
 * scripts/style-card-scrim.py and copying the worst case into the gradient in
 * TravelStyles.astro: the title and the copy are both white over the
 * photograph.
 */
export const TRAVEL_STYLES: {
    heading: string
    body: string
    items: readonly TravelStyle[]
} = {
    heading: 'What kind of safari speaks to you?',
    body: 'Five kinds of safari we plan. Start with the one that sounds like your trip and the planner opens with it already filled in.',
    items: [
        {
            slug: 'migration',
            title: 'Great Wildebeest Migration',
            blurb: 'From the calving at Ndutu to the Mara River crossings. Tell us your months and we will put you where the herds are.',
            image: '/images/style-migration.webp',
            imageAlt:
                'A column of wildebeest walking up a track towards the camera, zebra behind them and thousands more spread along the horizon',
            preset: { trip: ['safari'], interests: ['migration'] },
        },
        {
            slug: 'big-five',
            title: 'Big Five',
            blurb: 'Lion, leopard, elephant, buffalo and rhino, with the Ngorongoro Crater floor the best place to find all five.',
            image: '/images/style-big-five.webp',
            imageAlt: 'A lioness lying in golden grass, looking straight into the lens',
            preset: { trip: ['safari'], interests: ['wildlife'] },
        },
        {
            slug: 'safari-beach',
            title: 'Safari & Beach',
            blurb: 'The parks first, then Zanzibar’s white sand, a short flight from the bush.',
            /* Tulia Zanzibar Unique Beach Resort, Pongwe — the last stop of
               the 8-Day Tanzania & Zanzibar Honeymoon. */
            image: '/images/style-safari-beach.webp',
            imageAlt:
                'A path between palms opening onto white sand and the turquoise water off Pongwe Beach, Zanzibar, a paddleboarder out on the lagoon',
            preset: { trip: ['combination'] },
        },
        {
            /* Presets the interest; the planner does not ask how you get
               between the parks otherwise. */
            slug: 'fly-in',
            title: 'Luxury Fly-In Safaris',
            blurb: 'An hour in a light aircraft instead of a day on the road, landing straight onto the Serengeti plains.',
            image: '/images/style-fly-in.webp',
            imageAlt:
                'A pilot in uniform carrying two kit bags away from a single-engine Cessna parked on a gravel bush airstrip',
            preset: { trip: ['safari'], interests: ['fly-in'] },
        },
        {
            slug: 'adventure-culture',
            title: 'Adventure & Culture',
            blurb: 'Bush walks with a Maasai guide, village visits and the Materuni waterfall on the slopes of Kilimanjaro.',
            image: '/images/style-adventure-culture.webp',
            imageAlt:
                'A Maasai guide in a red shuka leaning on his staff beside a family on a bush walk, zebra grazing on the plain behind them',
            preset: { interests: ['culture'] },
        },
    ],
}

/*
 * "Every safari has its own story" — the homepage carousel after the one on
 * abercrombiekent.com ("What kind of trip are you looking for?"), which the
 * client asked for by name, holding the four kinds of traveller the client
 * listed: families, friends and private groups, solo travellers, and
 * honeymoons or romantic escapes.
 *
 * Each card opens the planner the way the cards above do, and the same rule
 * holds for `preset`: only what the title already says, so Friends and Solo
 * preset nothing — the planner has no answer for either, and their titles
 * still reach the inbox as the enquiry's stated intent. Slugs share the
 * `?plan=` namespace with TRAVEL_STYLES and must not repeat one (enquire.astro
 * checks).
 *
 * The images are 3:4 portraits; exp-friends and exp-solo are cut by
 * scripts/experience-cards.py. After re-cropping, re-run
 * `scripts/style-card-scrim.py --experiences` and update the gradient in
 * Experiences.astro.
 */
export const EXPERIENCES: {
    heading: string
    body: string
    cta: string
    items: readonly TravelStyle[]
} = {
    heading: 'Every safari has its own story. What’s in yours?',
    body: 'Tell us who is coming, and we will build the trip around them.',
    cta: 'Plan Your Safari',
    items: [
        {
            slug: 'family',
            title: 'Family Safaris',
            blurb: 'Shorter drives, earlier dinners and guides who are good with kids.',
            image: '/images/exp-family.webp',
            imageAlt:
                'A camp cook lifting a grill of roasted vegetables while a small girl in a pink jacket watches from beside him',
            preset: { interests: ['family'] },
        },
        {
            slug: 'friends',
            title: 'Friends & Private Groups',
            blurb: 'Your own vehicle and guide, long dinners by the fire, and the pace your group sets.',
            image: '/images/exp-friends.webp',
            imageAlt:
                'Four friends seen from behind, sitting in camp chairs set in the shallows of a river below a wooded hillside',
        },
        {
            slug: 'solo',
            title: 'Solo',
            blurb: 'A private guide and a vehicle of your own, and nobody else’s schedule to keep.',
            image: '/images/exp-solo.webp',
            imageAlt: 'A lone rider on horseback crossing the plains, silhouetted against a red setting sun',
        },
        {
            slug: 'honeymoon',
            title: 'Honeymoons & Romantic Escapes',
            blurb: 'Private bush dinners, late breakfasts and the quietest camps.',
            image: '/images/exp-honeymoon.webp',
            imageAlt:
                'A couple reading together on the bed of a tented room, a breakfast tray beside them and the bush through the open canvas',
            preset: { interests: ['honeymoon'] },
        },
    ],
}

/*
 * The three countries, after the "Beyond Tanzania" cards on the King Mufasa
 * site (~/web/mufasa_new), at the client's request — three across and shorter
 * than Mufasa's two, which were too large.
 *
 * No card quotes a price, at the client's request. Tanzania opens the
 * itineraries. Kenya and Rwanda have no itineraries on the site yet, so their
 * cards open the planner with the country carried in `?plan=` (enquire.astro
 * reads these alongside the travel-style cards).
 *
 * All three photographs are stand-ins from Unsplash, under its free licence
 * (no credit required), chosen for colour and sharpness, each checked against
 * its location on the photo page. All three are 4:5 crops at 800x1000:
 *   - Tanzania: a leopard asleep in a tree, Serengeti, Denice Alex (HrcPumKuhfM)
 *   - Kenya: a herd of eland on the Maasai Mara, sutirta budiman (PdiOj8kRy28)
 *   - Rwanda: a young mountain gorilla, Max Christian (sMjVNtvYkD0) — taken
 *     in Bwindi, Uganda, not Rwanda, at the client's choice; it is the same
 *     species visitors trek to in Volcanoes National Park
 */
export const DESTINATIONS: { eyebrow: string; heading: string; body: string; items: readonly Destination[] } = {
    eyebrow: 'Our Destinations',
    heading: 'Tanzania, and beyond',
    body: 'Northern Tanzania is home. The same team and the same standard of guiding carry over the border to the Masai Mara and the mountain gorillas of Rwanda.',
    items: [
        {
            name: 'Tanzania',
            line: 'The Serengeti, Ngorongoro and Zanzibar',
            href: '/safari-packages/',
            cta: 'View Tanzania journeys',
            image: '/images/dest-tanzania.webp',
            imageAlt: 'A leopard asleep along the branch of an acacia, its legs and tail hanging against a clear blue sky',
        },
        {
            name: 'Kenya',
            slug: 'kenya',
            tripHints: {
                safari: 'Masai Mara, Amboseli & Lake Naivasha',
                combination: 'Kenya with Tanzania, Zanzibar or the mountain',
            },
            line:'The Masai Mara, Amboseli and Lake Naivasha',
            href: '/enquire/?plan=kenya',
            cta: 'Plan a Kenya safari',
            image: '/images/dest-kenya.webp',
            imageAlt: 'A herd of eland walking through tall golden grass on the Masai Mara, blue hills on the horizon behind them',
        },
        {
            name: 'Rwanda',
            slug: 'rwanda',
            tripHints: {
                safari: 'Mountain gorillas, golden monkeys & Akagera',
                combination: 'The gorillas with a Tanzania safari or Zanzibar',
            },
            line:'Mountain gorillas, golden monkeys and Akagera',
            href: '/enquire/?plan=rwanda',
            cta: 'Plan a Rwanda trip',
            image: '/images/dest-rwanda.webp',
            imageAlt: 'A young mountain gorilla looking over its shoulder among bright green rainforest leaves, another gorilla resting behind it',
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
 * first, then the shortest family safari and the migration flagship. The
 * rest — two dozen safaris and the five Kilimanjaro climbs — are on
 * /safari-packages behind the button, nine at a time.
 */
export const PACKAGES: {
    heading: string
    body: string
    /** The six shown by default. */
    items: SafariPackage[]
    cta: Cta
} = {
    heading: 'Get Inspired',
    body: 'Every itinerary here is private — your own guide, your own vehicle, and days that can move. Honeymoons, family safaris, the Great Migration from the calving to the river crossings, fly-in safaris from Zanzibar, and five routes up Kilimanjaro.',
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
 * The footer sitemap, in the shape of the ~/web/mufasa_new footer at the
 * client's request: Travel · Company · Good to Know, then a Contact Us
 * column that Footer.astro builds from CONTACT in src/config.ts. The old
 * "Where We Travel" column is gone; its links repeated the Travel column.
 *
 * Every href here has to resolve to something this site actually builds — a
 * page under src/pages, or an anchor that exists on the page it points at.
 * The Journal link stays: without it the site links at /blogs/ from nowhere.
 * The category archives are still unlinked.
 */
export const FOOTER_COLUMNS = [
    {
        heading: 'Travel',
        links: [
            { label: 'Safari packages', href: '/safari-packages/' },
            { label: 'Climb Kilimanjaro', href: '/kilimanjaro/' },
            { label: 'Honeymoon safaris', href: '/safari-packages/6-day-tanzania-honeymoon-safari/' },
            { label: 'Family safaris', href: '/safari-packages/6-day-tanzania-family-safari/' },
            { label: 'The Great Migration', href: '/enquire/?plan=migration' },
            { label: 'Safari add-ons', href: '/safari-add-ons/' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'Our story', href: '/about/' },
            { label: 'Our positive impact', href: '/about/#impact' },
            { label: 'Guest reviews', href: '/#reviews' },
            { label: 'Gallery', href: '/gallery/' },
            { label: 'Journal', href: '/blogs/' },
        ],
    },
    {
        /* As on ~/web/mufasa_new, without "Our vehicles" and "Tipping
           guideline", which have no page here. The legal pages' text is in
           src/content/legal. */
        heading: 'Good to Know',
        links: [
            { label: 'Travel information', href: '/travel-information/' },
            { label: 'Zanzibar travel guide', href: '/zanzibar-travel-guide/' },
            { label: 'Cost breakdown', href: '/cost-breakdown/' },
            { label: 'Our booking process', href: '/our-booking-process/' },
            { label: 'Refund policy', href: '/refund-policy/' },
            { label: 'Privacy policy', href: '/privacy-policy/' },
            { label: 'Terms and conditions', href: '/terms-and-conditions/' },
        ],
    },
] as const
