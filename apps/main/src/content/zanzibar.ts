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
 *     are openly licensed photographs from Wikimedia Commons. Each one's
 *     author, licence and source page are kept in its `credit` below. The page
 *     no longer prints them: the credits line was removed at the user's
 *     request on 2026-10-22, as the add-on page's were on 2026-10-04. Most of
 *     these are CC BY or CC BY-SA, which ask for that credit — swap in the
 *     operator's own photographs when they exist.
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
    /** Set on the Commons photographs: where each came from and under what licence. */
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

export const ZANZIBAR_REASONS: { n: string; place: string; theme: string; body: string; image: GuidePhoto }[] = [
    {
        n: '01',
        place: 'Nungwi',
        theme: 'Beach Life & Sunsets',
        body: 'One of Zanzibar’s liveliest beach destinations, known for beautiful sunsets, restaurants, swimming and a vibrant atmosphere.',
        image: photo('zanzibar-nungwi', [900], 'Thatched beach hotels along the shore at Nungwi on the northern tip of Zanzibar, turquoise water lapping the sand below them'),
    },
    {
        n: '02',
        place: 'Paje',
        theme: 'Kitesurfing & Barefoot Living',
        body: 'A long stretch of white sand with a laid-back atmosphere, popular with kitesurfers, adventurous travellers and those who enjoy beach cafés.',
        image: photo('zanzibar-paje', [900, 1400], 'Looking out between palms over the white beach and shallow turquoise lagoon at Paje, kites out on the water'),
    },
    {
        n: '03',
        place: 'Mnemba Atoll',
        theme: 'Underwater Wonders',
        body: 'Discover colourful marine life through snorkelling and diving excursions in the waters around Mnemba Atoll.',
        image: photo('zanzibar-mnemba', [900, 1400], 'A half-underwater view at Mnemba Atoll, with striped sergeant fish in turquoise water below and the island’s white beach and trees above the waterline', {
                author: 'Jorge Láscar from Melbourne, Australia',
                licence: 'CC BY-SA 2.0',
                licenceUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Mnemba_Island_-_Zanzibar_-_Flickr_-_Jorge_Lascar.jpg',
            }),
    },
    {
        n: '04',
        place: 'Kendwa',
        theme: 'White Sand & Ocean Views',
        body: 'Famous for its beautiful beach, sunset views and swimming conditions that are generally less affected by tides than Zanzibar’s east coast.',
        image: photo('zanzibar-kendwa', [900, 1400], 'Looking down on the wide white beach at Kendwa, swimmers in the clear shallows and parasols under the palms'),
    },
    {
        n: '05',
        place: 'Matemwe',
        theme: 'Peaceful Island Escapes',
        body: 'A quieter stretch of coastline with ocean views, intimate stays and access to excursions around Mnemba.',
        image: photo('zanzibar-matemwe', [900, 1400], 'Thatched roofs among the palms behind a long, quiet beach at Matemwe on the north-east coast'),
    },
    {
        n: '06',
        place: 'Bwejuu',
        theme: 'Secluded Luxury',
        body: 'A peaceful east-coast setting for travellers seeking refined accommodation, tropical surroundings and a slower pace.',
        image: photo('zanzibar-bwejuu', [900, 1400], 'A wooden outrigger canoe resting in the low-tide shallows on the east coast near Bwejuu, with a palm-lined beach behind', {
                author: 'Chris huh',
                licence: 'CC BY-SA 4.0',
                licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Bwejuu,_Zanzibar.JPG',
            }),
    },
    {
        n: '07',
        place: 'Jambiani',
        theme: 'Authentic Coastal Culture',
        body: 'Experience a more traditional side of Zanzibar, with village life, fishing culture and long, peaceful beach walks.',
        image: photo('zanzibar-jambiani', [900, 1200], 'Four canvas deck chairs on the sand at Jambiani facing turquoise water, wooden fishing boats moored offshore'),
    },
    {
        n: '08',
        place: 'Chumbe Island',
        theme: 'Nature & Conservation',
        body: 'A special choice for travellers interested in responsible tourism, coral reefs and protecting Zanzibar’s marine environment.',
        image: photo('zanzibar-chumbe', [900, 1400], 'An aerial view of Chumbe Island, a small wooded island ringed by pale reef in the deep blue Indian Ocean', {
                author: 'Rob from United Kingdom',
                licence: 'CC BY 2.0',
                licenceUrl: 'https://creativecommons.org/licenses/by/2.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Approaching_Zanzibar.jpg',
            }),
    },
]

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
    items: [
        {
            title: 'Stone Town',
            body: 'Walk through narrow historic streets, admire intricately carved doors, visit lively markets and discover the Swahili, Arab, Indian and European influences that have shaped the island.',
            image: photo('zanzibar-stone-town', [900, 1400], 'A close-up of a carved wooden Zanzibar door in Stone Town, with ornate floral frames and rows of brass studs', {
                author: 'Adam Jones from Kelowna, BC, Canada',
                licence: 'CC BY-SA 2.0',
                licenceUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Detail_of_Carved_Wooden_Door_-_Stone_Town_-_Zanzibar_-_Tanzania_(8841700340).jpg',
            }),
        },
        {
            title: 'Spice Farms',
            body: 'Discover the aromas and flavours of cloves, cinnamon, cardamom, vanilla and other spices that helped make Zanzibar famous.',
            image: photo('zanzibar-spice', [900, 1400], 'Cupped hands holding a fresh sprig of clove buds and glossy leaves on a Zanzibar spice farm', {
                author: 'Freestylerob',
                licence: 'Public domain',
                licenceUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:ZanCloves.JPG',
            }),
        },
        {
            title: 'Mnemba Atoll',
            body: 'Head out onto the Indian Ocean for a snorkelling or diving excursion, with opportunities to discover colourful reefs and marine life.',
            image: photo('zanzibar-mnemba-reef', [900, 1400], 'A lionfish fanning its striped fins over the coral on the reef at Mnemba Atoll', {
                author: 'I’ve Got It On Film!',
                licence: 'CC BY 2.0',
                licenceUrl: 'https://creativecommons.org/licenses/by/2.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Mnemba_Atoll_-_51861330922.jpg',
            }),
        },
        {
            title: 'Jozani Forest',
            body: 'Explore Zanzibar’s natural side on a forest walk, with the chance to see the island’s famous red colobus monkeys.',
            image: photo('zanzibar-jozani', [900, 1400], 'A Zanzibar red colobus monkey sitting among the leaves of the Jozani Forest canopy, looking out from a pale ruff of fur', {
                author: 'Diego Delso',
                licence: 'CC BY-SA 4.0',
                licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Colobo_rojo_de_Zanz%C3%ADbar_(Piliocolobus_kirkii),_parque_nacional_de_la_Bah%C3%ADa_Jozani_Chwaka,_Zanz%C3%ADbar,_Tanzania,_2024-06-02,_DD_26.jpg',
            }),
        },
        {
            title: 'Safari Blue',
            body: 'Spend a day sailing, swimming and snorkelling, with opportunities to relax on sandbanks and enjoy the beauty of the ocean.',
            image: photo('zanzibar-safari-blue', [900, 1400], 'A traditional wooden outrigger boat moored in clear turquoise shallows near Kwale Island off Zanzibar', {
                author: 'lazyweaver',
                licence: 'CC BY 3.0',
                licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Small_island_near_Kwale_island_-_panoramio.jpg',
            }),
        },
        {
            title: 'Prison Island',
            body: 'Take a boat trip from Stone Town to explore the island’s history and see its resident Aldabra giant tortoises.',
            image: photo('zanzibar-prison-island', [900, 1400], 'An Aldabra giant tortoise walking over tree roots and red earth on Prison Island (Changuu)', {
                author: 'Diego Delso',
                licence: 'CC BY-SA 4.0',
                licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Tortuga_gigante_de_Aldabra_(Aldabrachelys_gigantea),_isla_Changuu,_Tanzania,_2024-05-31,_DD_09.jpg',
            }),
        },
    ],
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
