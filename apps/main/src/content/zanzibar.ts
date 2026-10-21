/**
 * /zanzibar-travel-guide/ — the operator's own "Zanzibar Travel Guide",
 * supplied as a Word document on 2026-10-22 and kept close to verbatim, as the
 * Tanzania travel guide in ./travel-info.ts is. The page follows the layout
 * the document itself recommends: a hero, the eight reasons as image cards,
 * smaller cards for what lies beyond the beach, Safari + Zanzibar as the
 * strongest enquiry band, then the practical sections and the FAQs.
 *
 * Photography, two sources and nothing else:
 *   - the beach cards and the hero are hotel photographs from the operator's
 *     own accommodation database (the same bucket accommodations.ts hotlinks),
 *     copied into public/images as zanzibar-*.webp and cropped. Every one was
 *     chosen for the beach, not the hotel, and checked for logos;
 *   - the places no hotel shoot covers — Mnemba, Chumbe, Jozani and the rest —
 *     are openly licensed photographs from Wikimedia Commons, credited at the
 *     foot of the page as their licences require. See `credit` below.
 *
 * Two of the document's own images are deliberately not used: a "map" that
 * labels Kendwa, Nungwi and Paje in the wrong places, and a composite of
 * elephants on a Zanzibar beach. A photograph here may not claim to be
 * somewhere it is not.
 */

export interface GuidePhoto {
    src: string
    srcset: string
    alt: string
    /** Set on the Commons photographs; printed in the credits at the foot. */
    credit?: { author: string; licence: string; licenceUrl: string; pageUrl: string }
}

const photo = (base: string, widths: readonly number[], alt: string, credit?: GuidePhoto['credit']): GuidePhoto => ({
    src: `/images/${base}-${widths[0]}.webp`,
    srcset: widths.map((w) => `/images/${base}-${w}.webp ${w}w`).join(', '),
    alt,
    credit,
})

/** The ?plan= slug the guide's own enquiry buttons use: the planner opens with Zanzibar chosen. */
export const ZANZIBAR_PLAN = {
    slug: 'zanzibar',
    title: 'Zanzibar',
    preset: { trip: ['zanzibar'] },
} as const

export const ZANZIBAR_INTRO = {
    heading: 'Zanzibar Travel Guide',
    standfirst: 'Beautiful beaches, Swahili culture and unforgettable Indian Ocean moments.',
    image: photo(
        'zanzibar-hero',
        [900, 1400, 1920],
        'Looking along a long white beach on the east coast at Paje, the reef showing through turquoise water and thatched villas set in the trees behind the sand'
    ),
    lead: 'Zanzibar is the kind of place where you naturally slow down.',
    paragraphs: [
        'Wake to the sound of the ocean, spend your afternoons on powder-white beaches, wander through the spice-scented streets of Stone Town, or sail into the sunset aboard a traditional dhow.',
        'But Zanzibar is more than a beach destination. It is a meeting of cultures, flavours, history and nature — an island where every day offers a different way to experience the Indian Ocean.',
    ],
}

/** Filled in from the photographs on disk once each is sourced; see the header. */
export const ZANZIBAR_REASONS: { n: string; place: string; theme: string; body: string; image: GuidePhoto }[] = []

export const ZANZIBAR_BEACHES = {
    heading: 'Choose Your Zanzibar Beach',
    body: 'Every part of Zanzibar has its own personality. Choosing the right coast can make a real difference to your holiday.',
    items: [
        { place: 'Nungwi', note: 'Lively beach life, restaurants, swimming and sunsets.' },
        { place: 'Kendwa', note: 'Beautiful white sand, swimming and relaxed evenings.' },
        { place: 'Matemwe', note: 'Peace, ocean views, snorkelling and diving excursions.' },
        { place: 'Kiwengwa', note: 'Resort-style stays suited to couples and families.' },
        { place: 'Paje', note: 'Kitesurfing, beach cafés and a youthful atmosphere.' },
        { place: 'Jambiani', note: 'Traditional village life and a slower, more authentic feel.' },
    ],
    tip: 'Tides are more noticeable along much of Zanzibar’s east coast. If easy access to deeper swimming water throughout the day is important, consider Nungwi or Kendwa.',
}

export const ZANZIBAR_BEYOND: { heading: string; body: string; items: { title: string; body: string; image?: GuidePhoto }[] } = {
    heading: 'Beyond the Beach',
    body: 'Zanzibar rewards travellers who take time to explore beyond the shoreline.',
    items: [],
}

export const ZANZIBAR_COMBINE = {
    eyebrow: 'Safari + Zanzibar',
    heading: 'Combine Your Safari with Zanzibar',
    paragraphs: [
        'Imagine spending your days tracking wildlife across Tanzania’s golden plains, watching elephants beneath ancient baobabs and exploring the Ngorongoro Crater — then exchanging the savannah for warm ocean water and peaceful beach evenings.',
        'After your safari, fly to Zanzibar to enjoy Stone Town, beautiful beaches and the Indian Ocean at your own pace.',
    ],
    route: ['Tarangire', 'Ngorongoro Crater', 'Serengeti', 'Zanzibar'],
    combinations: [
        'Tanzania safari and Zanzibar beach holiday',
        'Serengeti safari and Zanzibar',
        'Kilimanjaro adventure and Zanzibar',
        'Honeymoon safari and Zanzibar',
        'Family safari and Zanzibar',
    ],
    closing:
        'At Polecat Safaris, we can help bring these experiences together into one thoughtfully planned journey, with accommodation and travel arrangements suited to your preferences.',
    /* The operator's own photograph: the table on the sand at the end of the
       8-Day Tanzania & Zanzibar Honeymoon. */
    image: photo(
        'honeymoon-beach-dinner-sunset',
        [900, 1400],
        'A table laid for two on the sand at sunset, a couple in white walking hand in hand towards the water beneath a palm'
    ),
    /* Every itinerary that starts on, ends on or extends onto the island. */
    itinerariesHref: '/safari-packages/#zanzibar',
    planHref: '/enquire/?plan=safari-beach',
}

export const ZANZIBAR_SEASONS = {
    heading: 'When Is the Best Time to Visit Zanzibar?',
    body: 'Zanzibar is a year-round destination, but the weather can influence the kind of holiday you enjoy.',
    rows: [
        { period: 'January – February', note: 'Hot, sunny tropical weather; popular for beach holidays' },
        { period: 'March', note: 'Warm conditions, with the long rains approaching' },
        { period: 'April – May', note: 'Main rainy season; quieter travel period' },
        { period: 'June – October', note: 'Generally excellent conditions for a classic beach escape' },
        { period: 'November', note: 'Short rains may bring occasional showers' },
        { period: 'December', note: 'Warm beach weather and a popular festive season' },
    ],
    closing:
        'June to October is generally an excellent time for a beach holiday, while January and February are also popular for warm tropical conditions. Rainfall varies, so it is worth planning around your preferred activities and travel dates.',
}

/** The four "for X: Y" lists, shown side by side. */
export const ZANZIBAR_ADVICE = [
    {
        heading: 'Where Should You Stay?',
        body: 'The best place to stay depends on the atmosphere you want from your island escape.',
        items: [
            ['For romance', 'Choose an intimate beachfront retreat, private villa or secluded resort.'],
            ['For families', 'Look for comfortable resorts with suitable swimming areas, family rooms and activities.'],
            ['For luxury', 'Consider refined beachfront accommodation, personalised service and peaceful surroundings.'],
            ['For culture', 'Spend time in or near Stone Town before heading to the coast.'],
            ['For barefoot simplicity', 'Explore the quieter villages and beaches along the east and southeast coasts.'],
        ],
    },
    {
        heading: 'Which Zanzibar Experience Is Right for You?',
        items: [
            ['For couples', 'Sunset cruises, private dinners, quiet beaches and romantic accommodation.'],
            ['For families', 'Beach time, boat trips, spice farms and nature excursions.'],
            ['For adventure seekers', 'Snorkelling, diving, kitesurfing and sailing.'],
            ['For culture lovers', 'Stone Town, Swahili cuisine, local markets and spice tours.'],
            ['For relaxation', 'Slow mornings, warm ocean breezes and unhurried days beside the sea.'],
        ],
    },
    {
        heading: 'How Long Should You Stay?',
        items: [
            ['3 nights', 'A refreshing beach extension after your safari.'],
            ['4–5 nights', 'Time for the beach, Stone Town and a few excursions.'],
            ['6–7 nights', 'A more relaxed island holiday with room for culture, nature and ocean activities.'],
            ['8 nights or more', 'Ideal when Zanzibar is a major part of your holiday rather than a short addition.'],
        ],
    },
    {
        heading: 'What Should You Pack?',
        items: [
            ['For the beach', 'Swimwear, sandals, sunglasses, a hat and reef-conscious sun protection.'],
            ['For exploring', 'Lightweight clothing, comfortable walking shoes and a small day bag.'],
            ['For evenings', 'Smart-casual clothing and a light layer for breezy nights.'],
            ['For cultural visits', 'Modest clothing that covers your shoulders and knees, particularly when visiting religious sites and local communities.'],
        ],
    },
] as const

export const ZANZIBAR_TASTE = {
    heading: 'A Taste of Zanzibar',
    paragraphs: [
        'Food is part of the island’s story. Enjoy freshly prepared seafood, fragrant pilau, biryani, octopus dishes, coconut-rich curries, tropical fruit and the spices that give Zanzibari cooking its distinctive character.',
        'Visit a local market, try a traditional dish and allow yourself to discover the island one flavour at a time.',
    ],
}

export const ZANZIBAR_THOUGHTFUL = {
    heading: 'Travel Thoughtfully',
    paragraphs: [
        'Zanzibar’s beaches, coral reefs, forests and coastal communities are part of what makes the island so special. Help protect them by avoiding single-use plastics where possible, never touching or standing on coral, respecting wildlife and asking permission before photographing local people.',
        'Small choices can help preserve the island for the communities who call it home and the travellers who will discover it in the future.',
    ],
}

export const ZANZIBAR_FAQS = [
    {
        question: 'Is Zanzibar worth visiting after a Tanzania safari?',
        answer: 'Absolutely. A safari and Zanzibar holiday combine two very different experiences: wildlife adventures on the mainland and time to unwind beside the Indian Ocean.',
    },
    {
        question: 'Which beach is best for swimming?',
        answer: 'Nungwi and Kendwa are popular choices because their beaches are generally less affected by tides than many east-coast locations. Conditions can still vary with the weather and sea state.',
    },
    {
        question: 'Is Zanzibar suitable for families?',
        answer: 'Yes. Families can enjoy beach stays, boat excursions, spice tours and nature experiences. Choose accommodation and activities that suit your children’s ages and needs.',
    },
    {
        question: 'Can I visit Zanzibar on my honeymoon?',
        answer: 'Yes. Zanzibar is a wonderful addition to a honeymoon, especially when paired with a private safari, intimate accommodation and time for romantic ocean experiences.',
    },
    {
        question: 'How do I get to Zanzibar?',
        answer: 'You can fly to Zanzibar from selected international destinations and mainland Tanzania airports, or take a ferry from Dar es Salaam. The best option depends on your arrival point and itinerary.',
    },
]

export const ZANZIBAR_CLOSING = {
    heading: 'The Zanzibar Feeling',
    lines: ['Come for the beaches.', 'Stay for the feeling.'],
    body: 'The warmth of the ocean. The scent of spices drifting through old streets. A dhow sailing across the horizon. Golden sunsets and mornings with nowhere urgent to be. Zanzibar is a place to stop rushing, reconnect with the moment and enjoy the journey.',
    ctaHeading: 'Plan Your Zanzibar Escape with Polecat Safaris',
    ctaBody: 'Whether you dream of a peaceful beach retreat, a cultural island adventure or a luxury safari followed by the Indian Ocean, we can help you create a journey that feels right for you.',
    signoff: 'Explore Tanzania. Discover Zanzibar. Travel at your own pace.',
    planHref: `/enquire/?plan=${ZANZIBAR_PLAN.slug}`,
}

export { photo as guidePhoto }
