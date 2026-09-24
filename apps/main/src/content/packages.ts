/**
 * The safari packages, in full: the cards the homepage and /safari-packages
 * render, and the day-by-day detail behind each one at /safari-packages/[slug].
 *
 * Everything here — routes, lodges, day-by-day and rates — comes from the
 * operator's own itinerary documents, transcribed rather than invented. The
 * honeymoon itineraries lead, then the family and migration ones, then the
 * five Kilimanjaro climbs, longest last within each group.
 *
 * Three things are still outstanding and are marked where they occur:
 *   - The 8-Day Tanzania Family Safari came to us without a rate, so it quotes
 *     "on request" rather than a number.
 *   - None of the five Kilimanjaro documents carried a rate. The operator gave
 *     one afterwards as a day rate — US$ 360 per person per day on the
 *     mountain — so each climb's price is that figure times the length of the
 *     route, computed by `trekTotal` rather than written out. The climbs are
 *     also the one place where a field is not transcribed: the documents give
 *     no travel window, so `bestTime` on each of them is the standard
 *     Kilimanjaro season rather than the operator's own words. Confirm it.
 *   - The card photography shows the travellers rather than the wildlife —
 *     couples on the honeymoon itineraries, families on the family ones, and
 *     on each climb a photograph of something that route actually does — which
 *     is what these trips are sold on. Every `imageAlt` describes the
 *     photograph that is actually there, so none of it claims to be a place it
 *     is not, but the safari images are still stock and real Polecat property
 *     photography should replace them.
 *
 * Card-level fields (name, region, duration, price, image) are the same records
 * the homepage uses — src/content/home.ts re-exports from here so a price can
 * never drift between the card and the itinerary page.
 */

import type { AddonSlug } from './addons'

export interface PriceLine {
    label: string
    amount: string
}

/**
 * One thing offered on a day beyond what the rate covers.
 *
 * A slug points at the add-on catalogue in ./addons.ts, which carries the
 * price, the duration and the age limits — so an add-on's rate lives in one
 * place and cannot drift between the ten itineraries that offer it. `price`
 * and `note` override the catalogue for this day only, which is how the
 * operator's own itinerary wording survives ("Sundowners at Hole 16 — US$ 50
 * pp"): the row still links to the catalogue entry, but says what they said.
 *
 * A bare string is for a one-off with no catalogue entry — polo chukkas, a
 * Stone Town walking tour, a dhow cruise. Nothing there needs a price row.
 *
 * An add-on may only be offered on a day that actually reaches one of the
 * places in its catalogue `places` list. See the header of ./addons.ts.
 */
export type DayExtra = string | { addon: AddonSlug; price?: string; note?: string }

/**
 * A labelled figure for a day, shown in the same wrapping row as Meals and
 * Overnight. The safari itineraries have nothing to put here; the Kilimanjaro
 * climbs have the numbers the operator's documents lead with — the elevation
 * gained, the distance walked, the hours on foot and the habitat crossed —
 * and those are the figures people compare routes on.
 */
export interface DayStat {
    label: string
    value: string
}

/** One day of an itinerary, or a grouped range like "Days 5–6". */
export interface Day {
    /** Numeral shown in the left rail. */
    n: number
    /** Human label, e.g. "Day 3" or "Days 5–6". */
    label: string
    title: string
    paragraphs: string[]
    /** Elevation, distance, hours, habitat — see `DayStat`. Trek days only. */
    stats?: DayStat[]
    /** The species the day's drives are built around, as the operator lists them. */
    wildlife?: string[]
    /** Add-ons offered on the day — catalogue slugs, or free text for one-offs. */
    optional?: DayExtra[]
    /** Where the night is spent. Repeated nights are marked "(Cont.)". */
    overnight?: string
    meals?: string
    highlight?: string
}

export interface Faq {
    question: string
    answer: string
}

export interface RouteStop {
    name: string
    /** [lng, lat] — the order MapLibre expects. */
    coordinates: [number, number]
    /** Which days are spent here. Shown in the map pin's popup. */
    label?: string
}

export interface Route {
    start?: RouteStop
    points: RouteStop[]
    end?: RouteStop
}

/**
 * The three journeys the homepage's destination cards sell. An itinerary can
 * belong to more than one: the ten safaris are all northern-circuit, and three
 * of those either end on Zanzibar or extend onto it.
 *
 * `trekking` means the mountain, and only the mountain — the five Kilimanjaro
 * climbs and nothing else. It used to mean "days on foot", which pulled in the
 * four safaris carrying a walking safari or the Marangu day hike; once the
 * climbs went on the site that read as a mistake, because somebody filtering
 * for Trekking is looking for Uhuru Peak, not a ranger walk in Arusha NP.
 * Those safaris keep their on-foot days and are found under Northern Circuit.
 */
export type RouteTag = 'northern-circuit' | 'trekking' | 'zanzibar'

export const ROUTE_LABELS: Record<RouteTag, string> = {
    'northern-circuit': 'Northern Circuit',
    trekking: 'Trekking',
    zanzibar: 'Zanzibar',
}

export interface SafariPackage {
    /** Bare slug. The page href is built as `/safari-packages/${slug}`. */
    slug: string
    name: string
    /** Card subtitle and the "Destination" row in the trip summary. */
    region: string
    category: string
    /** Which of the three journeys this itinerary belongs to. See `RouteTag`. */
    routes: RouteTag[]
    duration: string
    days: number
    nights: number
    /** Card price line — the shorthand, e.g. "From US$ 4,306 pp". */
    price: string
    image: string
    /**
     * The same photograph at the widths on disk. Every package image is a
     * full-bleed hero on its own page as well as a 428px card, so one file
     * cannot serve both: at card size a hero-sized file is wasted bytes, and
     * at hero size a card-sized one is an upscale. Five of them stop at
     * 1400w because that is all their source frame holds.
     */
    imageSrcset: string
    /**
     * Where the itinerary hero holds the photograph, as an object-position.
     * The hero is a 2.4:1 band and these are 1.4:1 frames, so it shows a
     * little over half of one and `50% 55%` — the default, which suits most
     * of them — cuts the top quarter away. Set this on any photograph whose
     * subject sits high enough that the default takes its head off. Only the
     * y matters; the x stays centred.
     */
    imageFocus?: string
    imageAlt: string
    summary: string
    priceFrom: string
    priceUnit: string
    priceLines: PriceLine[]
    priceNote?: string
    /** The operator's recommended travel window, shown in the trip summary. */
    bestTime: string
    /** "Why this itinerary" — the operator's own reasons, one line each. */
    highlights: string[]
    /** Headline places, shown as the flow under the hero. */
    destinations: string[]
    route: Route
    itinerary: Day[]
    included: string[]
    excluded: string[]
    faqs?: Faq[]
    /** The six the homepage section shows. The index page shows all of them. */
    featured?: boolean
}

// Approximate positions — accurate enough to draw a readable route line, and
// no more than that. Airports and towns are the real thing; a park is pinned
// somewhere central rather than at the camp, because the camps move between
// departures and several of these itineraries offer alternatives.
const PT = {
    jro: { name: 'Kilimanjaro International Airport', coordinates: [37.0745, -3.4294] as [number, number] },
    arusha: { name: 'Arusha', coordinates: [36.683, -3.3869] as [number, number] },
    arushaPark: { name: 'Arusha National Park', coordinates: [36.85, -3.25] as [number, number] },
    tarangire: { name: 'Tarangire National Park', coordinates: [36.0, -3.8333] as [number, number] },
    manyara: { name: 'Lake Manyara National Park', coordinates: [35.8333, -3.5833] as [number, number] },
    mtoWaMbu: { name: 'Mto wa Mbu', coordinates: [35.85, -3.3667] as [number, number] },
    ngorongoro: { name: 'Ngorongoro Crater', coordinates: [35.5833, -3.1667] as [number, number] },
    karatu: { name: 'Karatu Highlands', coordinates: [35.6944, -3.3417] as [number, number] },
    serengeti: { name: 'Central Serengeti (Seronera)', coordinates: [34.825, -2.45] as [number, number] },
    serengetiNorth: { name: 'Northern Serengeti (Mara River)', coordinates: [34.83, -1.6] as [number, number] },
    serengetiWest: { name: 'Western Serengeti', coordinates: [34.2, -2.15] as [number, number] },
    natron: { name: 'Lake Natron', coordinates: [36.05, -2.4167] as [number, number] },
    eyasi: { name: 'Lake Eyasi', coordinates: [35.35, -3.55] as [number, number] },
    stoneTown: { name: 'Stone Town, Zanzibar', coordinates: [39.19, -6.165] as [number, number] },
    zanzibarBeach: { name: 'Pongwe Beach, Zanzibar', coordinates: [39.38, -6.01] as [number, number] },
    zanzibarAirport: { name: 'Zanzibar International Airport', coordinates: [39.2247, -6.222] as [number, number] },
    materuni: { name: 'Materuni Village, Kilimanjaro', coordinates: [37.3167, -3.2333] as [number, number] },
    marangu: { name: 'Marangu Gate, Kilimanjaro', coordinates: [37.524, -3.26] as [number, number] },
    chemka: { name: 'Chemka (Kikuletwa) Hot Springs', coordinates: [37.1667, -3.5] as [number, number] },
    moshi: { name: 'Moshi', coordinates: [37.3333, -3.35] as [number, number] },

    // Kilimanjaro: the gates, the camps and the summit. Same standard as the
    // rest of PT — the gates and Uhuru Peak are the real positions, the camps
    // are close enough to draw the shape of a route around the mountain.
    kiliMachameGate: { name: 'Machame Gate', coordinates: [37.2356, -3.1697] as [number, number] },
    kiliLondorossiGate: { name: 'Londorossi Gate', coordinates: [37.1, -3.0333] as [number, number] },
    kiliRongaiGate: { name: 'Rongai Gate (Nalemoru)', coordinates: [37.5622, -2.9689] as [number, number] },
    kiliMwekaGate: { name: 'Mweka Gate', coordinates: [37.3492, -3.2233] as [number, number] },
    kiliMandara: { name: 'Mandara Hut', coordinates: [37.5167, -3.2333] as [number, number] },
    kiliHorombo: { name: 'Horombo Hut', coordinates: [37.5167, -3.15] as [number, number] },
    kiliKibo: { name: 'Kibo Hut', coordinates: [37.3667, -3.0667] as [number, number] },
    kiliMachameCamp: { name: 'Machame Camp', coordinates: [37.2683, -3.1489] as [number, number] },
    kiliShira1: { name: 'Shira 1 Camp', coordinates: [37.1897, -3.0508] as [number, number] },
    kiliShira2: { name: 'Shira 2 Camp', coordinates: [37.2367, -3.0644] as [number, number] },
    kiliMtiMkubwa: { name: 'Mti Mkubwa Camp', coordinates: [37.1483, -3.0181] as [number, number] },
    kiliLavaTower: { name: 'Lava Tower', coordinates: [37.3269, -3.0672] as [number, number] },
    kiliBarranco: { name: 'Barranco Camp', coordinates: [37.3161, -3.0964] as [number, number] },
    kiliKaranga: { name: 'Karanga Camp', coordinates: [37.3444, -3.0975] as [number, number] },
    kiliBarafu: { name: 'Barafu Camp', coordinates: [37.3653, -3.0925] as [number, number] },
    kiliMwekaCamp: { name: 'Mweka Camp', coordinates: [37.3494, -3.1636] as [number, number] },
    kiliMoir: { name: 'Moir Hut', coordinates: [37.3053, -3.0286] as [number, number] },
    kiliBuffalo: { name: 'Buffalo Camp', coordinates: [37.3556, -3.0075] as [number, number] },
    kiliThirdCave: { name: 'Third Cave Camp', coordinates: [37.4083, -3.0244] as [number, number] },
    kiliSchoolHut: { name: 'School Hut', coordinates: [37.3722, -3.0439] as [number, number] },
    kiliSimba: { name: 'Simba Camp', coordinates: [37.5417, -2.9944] as [number, number] },
    kiliKikelewa: { name: 'Kikelewa Cave Camp', coordinates: [37.5017, -3.0294] as [number, number] },
    kiliMawenziTarn: { name: 'Mawenzi Tarn Camp', coordinates: [37.4544, -3.0919] as [number, number] },
    kiliUhuru: { name: 'Uhuru Peak (5,895 m)', coordinates: [37.3556, -3.0674] as [number, number] },
}

/*
 * Inclusions repeat across these itineraries because they are a function of how
 * northern Tanzania is travelled — a private vehicle and guide, park fees paid
 * at the gate — rather than of the itinerary. Anything specific to one journey
 * is spread in alongside these where it belongs.
 */
const INCLUDED_CORE = [
    'A private 4×4 safari vehicle with a pop-up roof, for your party alone',
    'A dedicated professional English-speaking safari guide throughout',
    'All accommodation as listed',
    'All meals shown in the itinerary',
    'All game drives and activities listed in the itinerary',
    'Park, conservation area and Ngorongoro Crater fees',
    'Airport transfers on arrival and departure',
    'Bottled drinking water in the vehicle, and government taxes',
]

const EXCLUDED_CORE = [
    'International flights to and from Kilimanjaro (JRO)',
    'Tanzanian visa fees',
    'Travel insurance',
    'Items of a personal nature',
    'Tips and gratuities for your guide and lodge staff',
    'Optional activities not listed in the itinerary',
]

/** Asked of every private itinerary, so answered the same way on each. */
const FAQ_PRIVATE: Faq = {
    question: 'Is this a private safari?',
    answer:
        'Yes. The vehicle, the guide and the itinerary are yours alone — you share the day with nobody outside your own party.',
}

const FAQ_CUSTOMISE: Faq = {
    question: 'Can the itinerary be changed?',
    answer:
        'Yes. Because it is private, the nights, the lodges, the activities and the pace can all move. Tell us what you have in mind and we will redraft it.',
}

/* ------------------------------------------------------------- Kilimanjaro */
/*
 * The five Kilimanjaro climbs share a support model — the same guides, crew,
 * cook, oximeter and emergency oxygen, the same park and rescue fees, the same
 * hot shower and massage at the bottom — so the inclusions are assembled from
 * the parts below rather than written out five times. What differs between
 * routes is only where you sleep, which is why the accommodation and the
 * camping or hut fee are passed in per itinerary.
 */
const TREK_INCLUDED_HEAD = [
    'Airport transfers from Kilimanjaro International Airport or Arusha Airport',
    'Hotel-to-gate and return transfers',
    'A professional mountain guide',
    'An experienced mountain crew and adequate porters',
    'A mountain cook, and fresh meals throughout the trek',
    'Kilimanjaro National Park entrance and conservation fees',
    'Rescue fees',
]

const TREK_INCLUDED_TAIL = [
    'A sleeping mattress',
    'Walking poles',
    'An oximeter and an emergency oxygen cylinder, with daily altitude monitoring',
    'A medical kit',
    'Drinking water, approximately 3 litres a day',
    'Storage for excess luggage not needed on the mountain',
    'A hot shower and a complimentary massage after the descent',
    'VAT and applicable government taxes',
]

/** `stay` is the accommodation line, `fees` the camping or hut fee line. */
const trekIncluded = (fees: string, ...stay: string[]) => [
    ...TREK_INCLUDED_HEAD,
    fees,
    ...stay,
    ...TREK_INCLUDED_TAIL,
]

const TREK_EXCLUDED = [
    'International or domestic flights',
    'Personal hiking and mountain equipment',
    'Travel insurance',
    'Tips for the mountain crew',
    'A private toilet, available at an additional cost',
    'Additional porter services',
    'Personal expenses',
]

const FAQ_TREK_EXPERIENCE: Faq = {
    question: 'Do I need mountaineering experience?',
    answer:
        'No. Kilimanjaro is a trek rather than a technical climb, and no route on it needs ropes or rock skills. What it does need is preparation, determination and a good level of fitness — and enough days on the mountain to acclimatise, which is why we sell the longer versions of each route.',
}

const FAQ_TREK_ALTITUDE: Faq = {
    question: 'What happens about the altitude?',
    answer:
        'Your guide checks your oxygen saturation and pulse with an oximeter every day and sets the pace off what he sees. An emergency oxygen cylinder and a medical kit go up the mountain with the crew. Every itinerary here is built around acclimatisation — the extra night, the climb-high-sleep-low day at Lava Tower — rather than the shortest line to the summit.',
}

const FAQ_TREK_DIET: Faq = {
    question: 'Can you cater for my diet?',
    answer:
        'Yes. Vegetarian, vegan, halal and gluten-free meals can all be arranged with advance notice — tell us when you book and the mountain cook will carry what he needs.',
}

const FAQ_TREK_EXTEND: Faq = {
    question: 'Can I add a safari or Zanzibar afterwards?',
    answer:
        'Most people do. The climb ends back in Arusha or Moshi, an easy transfer from the northern circuit, so it joins straight onto a private safari through Tarangire, Ngorongoro and the Serengeti — or onto a flight to Zanzibar for a few days by the Indian Ocean. Tell us at the enquiry stage and we will draft the whole thing as one journey.',
}

const TREK_FAQS = [FAQ_TREK_EXPERIENCE, FAQ_TREK_ALTITUDE, FAQ_TREK_DIET, FAQ_TREK_EXTEND]

/*
 * The climbs are sold on a day rate rather than a price per itinerary: US$ 360
 * per person per day on the mountain. Every trek rate below is that figure
 * multiplied by the length of the route and worked out here rather than typed
 * out five times, so changing the day rate changes all five climbs at once —
 * the card, the hero and the price rail cannot drift apart.
 *
 * The rail on a climb is now the total and nothing else. It used to carry a
 * `priceNote` spelling the arithmetic out again ("360 a day, so 7 days comes
 * to 2,520") over a `priceLines` table of the day rate, the toilet tent, the
 * extra porters and the single supplement — all four either restating the
 * figure above them or saying "On request". Both were removed by request, so
 * `priceLines` is empty on every climb and the rail falls back to the same
 * "Per person sharing" the safaris show. ItineraryOverview already skips the
 * table when the list is empty, so nothing needed changing there.
 */
const TREK_DAY_RATE = 360

const money = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/** e.g. "US$ 2,160" for a six-day route. */
const trekTotal = (days: number) => `US$ ${money(TREK_DAY_RATE * days)}`

/** The card line, e.g. "From US$ 2,160 pp". */
const trekCardPrice = (days: number) => `From ${trekTotal(days)} pp`


export const PACKAGES: SafariPackage[] = [
    /* ---------------------------------------------------------------- Honeymoon */
    {
        slug: '6-day-tanzania-honeymoon-safari',
        name: '6-Day Tanzania Honeymoon Safari',
        region: 'Tarangire, Ngorongoro & Serengeti',
        category: 'Honeymoon',
        routes: ['northern-circuit'],
        duration: '6 Days / 5 Nights',
        days: 6,
        nights: 5,
        price: 'From US$ 4,306 pp',
        image: '/images/honeymoon-festoon-dinner-1400.webp',
        imageSrcset:
            '/images/honeymoon-festoon-dinner-900.webp 900w, /images/honeymoon-festoon-dinner-1400.webp 1400w',
        imageAlt:
            'A table laid for two in a clearing after dark, festoon lights strung through the trees above it and lanterns set out around the sand',
        summary:
            'Five nights across the northern circuit for couples who want the whole of it — Tarangire’s elephant herds, Lake Manyara’s forest, the crater floor, and two nights in the central Serengeti with a private candlelit dinner under the stars.',
        priceFrom: 'US$ 4,306',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Private candlelit Serengeti dinner', amount: 'Included' },
            { label: 'Honeymoon rooms and tents throughout', amount: 'Included' },
            { label: 'Single supplement', amount: 'On request' },
        ],
        priceNote:
            'The rate is the current per-person price on a private basis and moves with the season and with which of the listed lodges have space. Best travel period is June to October and January to March.',
        bestTime: 'June – October & January – March',
        highlights: [
            'A private luxury safari with a guide who is yours for the whole trip',
            'Honeymoon rooms and tents at every stop',
            'The Big Five, and the best rhino odds in Tanzania, on the crater floor',
            'Both Tarangire and Lake Manyara, not one or the other',
            'A private candlelit dinner in the Serengeti',
            'Sundowners looking out over the Serengeti plains',
            'Works as well for an anniversary as for a honeymoon',
        ],
        destinations: ['Arusha', 'Tarangire', 'Lake Manyara', 'Ngorongoro', 'Serengeti'],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Day 1' },
                { ...PT.tarangire, label: 'Day 2' },
                { ...PT.manyara, label: 'Day 3' },
                { ...PT.ngorongoro, label: 'Days 3–4' },
                { ...PT.serengeti, label: 'Days 4–6' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you across to Melia in Arusha — lush gardens, tall old trees, and a first evening with nothing in it.',
                    'Sleep off the flight, eat when you feel like eating, and let the safari start in the morning.',
                ],
                overnight: 'Melia, Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Tarangire National Park',
                paragraphs: [
                    'After breakfast you drive south-west into Tarangire — giant baobabs, and a river that holds water when very little else in the region does, which is why the park carries some of the largest elephant herds in Africa.',
                    'You have the full day in the park before turning in at Elephant Springs by Karibu Camps, out in the bush with not much between you and it.',
                ],
                wildlife: ['African elephant', 'Lion', 'Giraffe', 'Zebra', 'Buffalo'],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Elephant Springs by Karibu Camps, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Lake Manyara & the Ngorongoro Highlands',
                paragraphs: [
                    'The morning is a game drive in Lake Manyara: groundwater forest thick enough to feel like a different country, a soda lake edged pink with flamingo, and the tree-climbing lions the park is known for.',
                    'From there the road climbs into the Ngorongoro Highlands and Meliá Ngorongoro, where the air turns cool and the view falls away into the crater.',
                ],
                wildlife: ['Tree-climbing lion', 'Elephant', 'Hippo', 'Flamingo', 'Baboon'],
                optional: [
                    { addon: 'treetop-walk' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Meliá Ngorongoro, Ngorongoro Highlands',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'The Crater, and into the Serengeti',
                paragraphs: [
                    'You descend into the crater early. Six hundred metres down there is a caldera floor holding the densest concentration of large mammals in Africa — and the best chance in the country of a black rhino.',
                    'In the afternoon you carry on north-west into the Serengeti, to your honeymoon tent at Kubu Kubu.',
                    'Dinner is laid for the two of you alone, by candlelight, under the stars.',
                ],
                wildlife: ['Black rhino', 'Lion', 'Elephant', 'Buffalo', 'Hippo'],
                optional: [
                    { addon: 'olduvai-gorge' },
                ],
                highlight: 'A private candlelit dinner for two on the Serengeti plains',
                overnight: 'Kubu Kubu — Honeymoon Tent, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'The Endless Plains',
                paragraphs: [
                    'A full day out with your guide across the central Serengeti — the plains that give the park its name, and the cats that work them.',
                    'The day closes with a sundowner looking out over the savannah while the light goes.',
                ],
                wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Giraffe', 'Wildebeest', 'Zebra'],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                    { addon: 'spa' },
                ],
                highlight: 'Sundowners over the Serengeti at last light',
                overnight: 'Kubu Kubu — Honeymoon Tent, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Last Morning, and Home',
                paragraphs: [
                    'One more game drive through the Serengeti on the way to the airstrip, and the scheduled flight back to Arusha.',
                    'From there you connect with your onward flight out of Kilimanjaro International Airport.',
                ],
                meals: 'Breakfast',
            },
        ],
        included: [
            'A private 4×4 safari vehicle with a pop-up roof, for the two of you alone',
            'A dedicated professional English-speaking safari guide throughout',
            'All accommodation as listed, in honeymoon rooms and tents where the lodge offers them',
            'All meals shown in the itinerary',
            'All game drives listed, including the descent to the crater floor',
            'A private candlelit dinner in the Serengeti',
            'The scheduled flight from the Serengeti back to Arusha on the last day',
            'Park, conservation area and Ngorongoro Crater fees',
            'Airport transfers on arrival and departure',
            'Bottled drinking water in the vehicle, and government taxes',
        ],
        excluded: EXCLUDED_CORE,
        faqs: [FAQ_PRIVATE, FAQ_CUSTOMISE],
        featured: true,
    },
    {
        slug: '7-day-serengeti-honeymoon',
        name: '7-Day Serengeti Honeymoon',
        region: 'Serengeti, Ngorongoro & Tarangire',
        category: 'Honeymoon',
        routes: ['northern-circuit', 'zanzibar'],
        duration: '7 Days / 6 Nights',
        days: 7,
        nights: 6,
        price: 'From US$ 4,828 pp',
        image: '/images/honeymoon-deck-sunrise-1400.webp',
        imageSrcset:
            '/images/honeymoon-deck-sunrise-900.webp 900w, /images/honeymoon-deck-sunrise-1400.webp 1400w, /images/honeymoon-deck-sunrise-1920.webp 1920w',
        imageAlt:
            'A couple taking breakfast on a lodge deck at sunrise, the plains opening out below them',
        summary:
            'Six nights that open with a bush flight straight into the Serengeti and work back overland through the crater, the Karatu highlands and Tarangire — with a polo lawn, a guided walk and a night drive along the way.',
        priceFrom: 'US$ 4,828',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Scheduled bush flight to the Serengeti', amount: 'Included' },
            { label: 'Guided wildlife walk on arrival', amount: 'Complimentary' },
            { label: 'Riding, polo and Hole 16 sundowners', amount: 'On request' },
            { label: 'Single supplement', amount: 'On request' },
        ],
        priceNote:
            'Three to five nights in Zanzibar can be added to the end of this itinerary, which is how most couples travel it. Rates move with the season and with lodge availability.',
        bestTime: 'June – October & January – March',
        highlights: [
            'A scheduled bush flight from Arusha straight onto the Serengeti plains',
            'Two nights in the central Serengeti before you drive anywhere',
            'A night on the crater rim, and a morning on the crater floor',
            'Kitela Lodge in the Karatu highlands, among the coffee',
            'Mto wa Mbu and Tarangire on the way back, rather than a transfer day',
            'An optional night game drive in Tarangire',
            'Shanga, where artisans with disabilities work in glass, bead and metal',
            'Extendable with three to five nights in Zanzibar',
        ],
        destinations: ['Arusha', 'Serengeti', 'Ngorongoro', 'Karatu', 'Tarangire'],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Day 1' },
                { ...PT.serengeti, label: 'Days 2–4' },
                { ...PT.ngorongoro, label: 'Days 4–5' },
                { ...PT.karatu, label: 'Day 5' },
                { ...PT.tarangire, label: 'Days 6–7' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'You are met at Kilimanjaro International Airport and driven to Hamerkop House by Lemala, set beneath the slopes of Mount Meru — small, quiet, and the right sort of place to arrive at.',
                    'An hour-long guided wildlife walk comes with the night if you want to stretch your legs; the polo lawn and the golf course next door are there if you want more than that.',
                ],
                optional: [
                    { addon: 'sundowner', note: 'at Hole 16, Kilimanjaro Golf Course' },
                    { addon: 'horse-riding' },
                    'Polo chukkas',
                    'A one-hour polo lesson',
                ],
                highlight: 'A complimentary hour-long guided wildlife walk on arrival',
                overnight: 'Hamerkop House by Lemala, Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Fly to the Serengeti',
                paragraphs: [
                    'After breakfast you transfer the short distance to Arusha Airport for the scheduled bush flight west — an hour or so in a light aircraft instead of a day in a vehicle.',
                    'Your guide meets you at the airstrip and the drive to Melia Serengeti doubles as your first game drive.',
                ],
                wildlife: ['Lion', 'Elephant', 'Giraffe', 'Zebra', 'Wildebeest', 'Cheetah'],
                overnight: 'Melia Serengeti, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'A Full Day in the Serengeti',
                paragraphs: [
                    'A whole day out with your guide, which is what the central Serengeti asks for — the big cats here are found by working the same country patiently rather than by covering ground.',
                    'How far you go and when you stop is yours to decide; there is no group to keep to.',
                ],
                wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Hippo', 'Wildebeest', 'Zebra'],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                ],
                overnight: 'Melia Serengeti, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Serengeti to the Ngorongoro Highlands',
                paragraphs: [
                    'A final morning game drive in the Serengeti, then the road south-east through the Ngorongoro Conservation Area.',
                    'The landscape changes as you climb, and there is game to see for most of it. You finish at Lion’s Paw Camp, close enough to the crater rim to be first down in the morning.',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'The Ngorongoro Crater',
                paragraphs: [
                    'An early breakfast and then down onto the crater floor, which holds one of the great wildlife concentrations anywhere and the country’s most reliable black rhino sightings.',
                    'After the drive and a picnic lunch you climb back out and carry on to the Karatu highlands.',
                ],
                wildlife: ['Black rhino', 'Lion', 'Elephant', 'Buffalo', 'Hippo', 'Hyena', 'Zebra'],
                optional: [
                    { addon: 'quad-biking' },
                ],
                highlight: 'A full morning on the crater floor',
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Mto wa Mbu & Tarangire',
                paragraphs: [
                    'You leave Kitela after breakfast and pass through Mto wa Mbu, a town where a great many of Tanzania’s language groups have ended up living side by side, for a short introduction to the place.',
                    'Then into Tarangire for a game drive among the ancient baobabs and the elephant herds, and on to Lemala Mpingo Ridge.',
                ],
                wildlife: ['Elephant', 'Lion', 'Giraffe', 'Zebra', 'Eland', 'Buffalo'],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'zipline', note: 'at Mto wa Mbu, on the way through' },
                ],
                overnight: 'Lemala Mpingo Ridge, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Tarangire at First Light, Shanga & Departure',
                paragraphs: [
                    'An early game drive in Tarangire, which is the best hour of the day there, and then the road back towards Arusha.',
                    'On the way you stop at Shanga, a social enterprise that employs people with disabilities — glassblowing, beadwork, weaving, sewing and metalwork, all of it done in front of you.',
                    'Then the airport, and your onward flight.',
                ],
                highlight: 'Shanga — glassblowing, beadwork and weaving by artisans with disabilities',
                meals: 'Breakfast & lunch',
            },
        ],
        included: [
            ...INCLUDED_CORE.slice(0, 4),
            'The scheduled bush flight from Arusha Airport to the Serengeti',
            'A complimentary guided wildlife walk on the first evening',
            'The Mto wa Mbu introduction and the visit to Shanga',
            ...INCLUDED_CORE.slice(4),
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            FAQ_PRIVATE,
            FAQ_CUSTOMISE,
            {
                question: 'Can we add Zanzibar?',
                answer:
                    'Yes, and most couples do. Three to five nights on the coast at the end turns this into a safari and a beach honeymoon; we book the domestic flight and the resort with it.',
            },
        ],
        featured: true,
    },
    {
        slug: '8-day-tanzania-zanzibar-honeymoon',
        name: '8-Day Tanzania & Zanzibar Honeymoon',
        region: 'Northern Circuit & Zanzibar',
        category: 'Honeymoon',
        routes: ['northern-circuit', 'zanzibar'],
        duration: '8 Days / 7 Nights',
        days: 8,
        nights: 7,
        price: 'From US$ 6,279 pp',
        image: '/images/honeymoon-beach-dinner-sunset-1400.webp',
        imageSrcset:
            '/images/honeymoon-beach-dinner-sunset-900.webp 900w, /images/honeymoon-beach-dinner-sunset-1400.webp 1400w',
        imageAlt:
            'A table laid for two on the sand at sunset, a couple in white walking hand in hand towards the water beneath a palm',
        summary:
            'Five nights of safari — Tarangire, the crater and two on the central Serengeti — and then a flight straight off the airstrip to Zanzibar, for Stone Town and a night on the beach.',
        priceFrom: 'US$ 6,279',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Serengeti to Zanzibar flight', amount: 'Included' },
            { label: 'Sunrise hot air balloon safari', amount: 'On request' },
            { label: 'Extra nights in Zanzibar', amount: 'On request' },
            { label: 'Single supplement', amount: 'On request' },
        ],
        priceNote:
            'Seven nights is tight on the island end — one night in Stone Town and one on the beach. Most couples add two or three nights at Tulia, which we quote with the itinerary.',
        bestTime: 'June – October & January – March',
        highlights: [
            'A private luxury safari with a dedicated guide, then a beach with nothing to do',
            'Handpicked lodges — Gran Meliá, Lemala Mpingo Ridge, Lion’s Paw, Lala Salama',
            'Two nights in the central Serengeti',
            'An optional sunrise hot air balloon safari and champagne bush breakfast',
            'A domestic flight from the Serengeti airstrip straight to Zanzibar',
            'A night in Stone Town, in the middle of the old city',
            'Beachfront at Tulia on the east coast',
            'Adventure at the front, nothing whatsoever at the back',
        ],
        destinations: ['Arusha', 'Tarangire', 'Ngorongoro', 'Serengeti', 'Stone Town', 'Zanzibar'],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Day 1' },
                { ...PT.tarangire, label: 'Day 2' },
                { ...PT.ngorongoro, label: 'Days 3–4' },
                { ...PT.serengeti, label: 'Days 4–6' },
                { ...PT.stoneTown, label: 'Day 6' },
                { ...PT.zanzibarBeach, label: 'Days 7–8' },
            ],
            end: PT.zanzibarAirport,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and takes you to Gran Meliá Arusha, with Mount Meru standing behind it.',
                    'Dinner, and an early night. The driving starts tomorrow.',
                ],
                overnight: 'Gran Meliá Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Tarangire National Park',
                paragraphs: [
                    'South-west after breakfast to Tarangire, where the baobabs are enormous and the elephant herds are the largest you are likely to see on this trip.',
                    'A game drive through the park, and then up to Lemala Mpingo Ridge, which sits high enough to give you the whole valley from your deck.',
                ],
                wildlife: ['Elephant', 'Lion', 'Giraffe', 'Zebra', 'Buffalo'],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Lemala Mpingo Ridge, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'The Ngorongoro Crater',
                paragraphs: [
                    'After breakfast you drive to the Ngorongoro Conservation Area and descend into the crater itself.',
                    'The floor is twenty kilometres across and closed in on every side, which is why so much wildlife sits in it — and why it is the best place in Tanzania to look for black rhino.',
                    'A picnic lunch down there, then back up to the rim and Lion’s Paw Camp for a quiet evening in the highlands.',
                ],
                wildlife: ['Black rhino', 'Lion', 'Elephant', 'Buffalo', 'Hippo', 'Hyena', 'Flamingo'],
                optional: [
                    { addon: 'walking-safari', note: 'on the crater rim, or down into Empakaai' },
                ],
                highlight: 'A full day on the crater floor, rhino included',
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Ngorongoro to the Serengeti',
                paragraphs: [
                    'The drive north-west through the conservation area and into the Serengeti is a long one, and it is also a game drive — the short-grass plains on the way in are where a great deal happens.',
                    'You settle into Lala Salama in the central Serengeti in the afternoon.',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Lala Salama Serengeti Camp, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'A Full Day in the Serengeti',
                paragraphs: [
                    'The whole day is yours in the park with your guide.',
                    'If you want the one thing that is hard to arrange later, start it in the air: a sunrise balloon flight over the plains, and a champagne breakfast laid out in the bush when you come down.',
                ],
                wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Giraffe', 'Wildebeest', 'Zebra'],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'spa', note: 'in-tent, at the camp' },
                ],
                overnight: 'Lala Salama Serengeti Camp, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Fly to Zanzibar',
                paragraphs: [
                    'A slow breakfast, then the airstrip and the scheduled flight to the coast — savannah to Indian Ocean in a couple of hours.',
                    'You stay at The Neela Boutique Hotel, in the middle of Stone Town. The afternoon is free to walk the old city, or not.',
                ],
                optional: ['Stone Town walking tour', 'Prison Island', 'Nakupenda sandbank'],
                overnight: 'The Neela Boutique Hotel, Stone Town',
                meals: 'Breakfast',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Stone Town to the Coast',
                paragraphs: [
                    'Breakfast in Stone Town, then across the island to Tulia Zanzibar Unique Beach Resort and your beachfront room.',
                    'The rest of the day is the point of the day. White sand, warm water, and a list of things you are free to ignore.',
                ],
                optional: [
                    'Snorkelling and scuba diving',
                    'Paddleboarding',
                    { addon: 'spa', note: 'a couples treatment at the resort' },
                    'A private beach dinner',
                    'A sunset dhow cruise',
                ],
                overnight: 'Tulia Zanzibar Unique Beach Resort, Pongwe',
                meals: 'Breakfast',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'Departure',
                paragraphs: [
                    'Breakfast, and as much of the morning at Tulia as your flight allows — the beach, the pool, or nothing at all.',
                    'Then a private transfer to Zanzibar International Airport for your flight home.',
                ],
                meals: 'Breakfast',
            },
        ],
        included: [
            'A private 4×4 safari vehicle for the safari leg, for the two of you alone',
            'A professional English-speaking safari guide throughout the safari',
            'All accommodation as listed — lodges, safari camps and the beach resort',
            'Full board on safari, and daily breakfast in Zanzibar',
            'All game drives listed, including the Ngorongoro Crater descent',
            'The domestic flight from the Serengeti to Zanzibar',
            'Park, conservation area and Ngorongoro Crater fees',
            'All airport and hotel transfers',
            'Bottled drinking water on game drives, and government taxes',
        ],
        excluded: [
            'International flights',
            'Tanzanian visa fees',
            'Travel insurance',
            'The optional hot air balloon safari',
            'Lunches and dinners in Zanzibar unless stated',
            'Items of a personal nature',
            'Tips and gratuities',
        ],
        faqs: [
            FAQ_PRIVATE,
            {
                question: 'When should we travel?',
                answer:
                    'It runs all year. June to October is the dry season and the easiest game viewing; January to March is the calving season in the southern Serengeti; July to September is the northern Serengeti and the Mara River crossings. Zanzibar is warm throughout.',
            },
            {
                question: 'Is the balloon safari included?',
                answer:
                    'No — it is an optional extra. A sunrise flight over the Serengeti followed by a champagne bush breakfast, added to the full Serengeti day and quoted separately.',
            },
            {
                question: 'Can we see Stone Town properly?',
                answer:
                    'Yes. A guided Stone Town tour can go on the afternoon you arrive or on the morning you leave, depending on your flights.',
            },
            FAQ_CUSTOMISE,
        ],
        featured: true,
    },
    {
        slug: '9-day-romantic-luxury-safari',
        name: '9-Day Romantic Luxury Safari',
        region: 'Arusha, Serengeti & the Crater Highlands',
        category: 'Honeymoon',
        routes: ['northern-circuit', 'zanzibar'],
        duration: '9 Days / 8 Nights',
        days: 9,
        nights: 8,
        price: 'From US$ 6,242 pp',
        image: '/images/sundowner-lake-manyara-1400.webp',
        imageSrcset:
            '/images/sundowner-lake-manyara-900.webp 900w, /images/sundowner-lake-manyara-1400.webp 1400w, /images/sundowner-lake-manyara-1920.webp 1920w',
        imageAlt:
            'Guests in camp chairs around a fire at a sundowner on the shore of Lake Manyara, two Maasai hosts standing with them and the sun going down over the water',
        summary:
            'Eight nights for couples with time to spend: a walking safari under Mount Meru, a bush flight to two nights in the Serengeti, a walk along the crater rim, the crater floor itself, then Manyara and Tarangire on the way back.',
        priceFrom: 'US$ 6,242',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'One-hour guided wildlife walk', amount: 'Complimentary' },
            { label: 'Sundowners at Hole 16, Kilimanjaro Golf Course', amount: 'US$ 50 pp' },
            { label: 'Two-hour horse riding experience', amount: 'US$ 150 pp' },
            { label: 'Single supplement', amount: 'On request' },
        ],
        priceNote:
            'Soft drinks, beer, wine and safari snacks are in the rate on this itinerary. A Serengeti balloon flight, a private bush dinner or three to five nights in Zanzibar can all be added.',
        bestTime: 'June – October & January – March',
        highlights: [
            'A private luxury safari with your own professional guide',
            'A scenic bush flight from Arusha into the Serengeti',
            'Two nights in the Serengeti at Lala Salama',
            'A guided walking safari in Arusha National Park, with an armed ranger',
            'A second guided walk along the Ngorongoro Crater rim',
            'The Big Five on the crater floor',
            'Lake Manyara as its own day, not a stop on a transfer',
            'A Tarangire day, with an optional night game drive',
            'Built for honeymoons, anniversaries and the odd very good reason',
        ],
        destinations: [
            'Arusha National Park',
            'Serengeti',
            'Ngorongoro',
            'Karatu',
            'Lake Manyara',
            'Tarangire',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Days 1 & 8' },
                { ...PT.arushaPark, label: 'Day 2' },
                { ...PT.serengeti, label: 'Days 3–5' },
                { ...PT.ngorongoro, label: 'Days 5–6' },
                { ...PT.karatu, label: 'Day 6' },
                { ...PT.manyara, label: 'Day 7' },
                { ...PT.tarangire, label: 'Day 8' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Hamerkop House by Lemala, in the foothills of Mount Meru — a small, quiet luxury lodge with gardens worth sitting in.',
                    'Dinner is a welcome dinner, and the evening is otherwise yours. The guided wildlife walk is complimentary if you would rather move than sit.',
                ],
                optional: [
                    { addon: 'sundowner', price: 'US$ 50 pp', note: 'at Hole 16, Kilimanjaro Golf Course' },
                    'A one-hour guided wildlife walk — complimentary',
                    { addon: 'horse-riding', price: 'US$ 150 pp', note: 'two hours, at the Dolly Estate' },
                ],
                overnight: 'Hamerkop House by Lemala, Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Arusha National Park, on Foot',
                paragraphs: [
                    'After a slow breakfast you drive out to Arusha National Park, which is small, steep and much more varied than the parks you will see later in the week.',
                    'You start on foot with an armed ranger — the only way to notice the things a vehicle drives past — then have a picnic lunch and spend the afternoon on a game drive through montane forest, open grassland and the Momella Lakes.',
                    'You finish at Koroi Forest Camp, tucked into the trees.',
                ],
                wildlife: [
                    'Giraffe',
                    'Buffalo',
                    'Zebra',
                    'Colobus monkey',
                    'Waterbuck',
                    'Warthog',
                    'Flamingo',
                ],
                optional: [
                    { addon: 'canoeing', note: 'on the Momella Lakes' },
                    { addon: 'biking', note: 'inside the park' },
                ],
                highlight: 'A guided walking safari with an armed ranger',
                overnight: 'Koroi Forest Camp, Arusha National Park',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Fly to the Serengeti',
                paragraphs: [
                    'A short transfer to Arusha Airport and the scheduled bush flight west, which saves you the better part of a day and is worth staying awake for.',
                    'Your guide is at the airstrip. The drive to Lala Salama across the plains is your first game drive.',
                ],
                wildlife: ['Lion', 'Elephant', 'Giraffe', 'Wildebeest', 'Zebra', 'Cheetah'],
                overnight: 'Lala Salama Serengeti Camp, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'A Full Day in the Serengeti',
                paragraphs: [
                    'A whole day in the park. Your guide will work the predators in the morning and the herds later, or the other way around, depending on what the night before turned up.',
                ],
                wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Hippo', 'Wildebeest'],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                ],
                overnight: 'Lala Salama Serengeti Camp, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Serengeti to the Crater Highlands',
                paragraphs: [
                    'An unhurried game drive in the morning, then the road east into the Ngorongoro Conservation Area.',
                    'On arrival you walk the crater rim with an armed ranger — a genuinely different way to see the place, and the only way to feel how high it is.',
                    'The evening is at Meliá Ngorongoro, with the highlands falling away below you.',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                highlight: 'A guided walking safari along the Ngorongoro Crater rim',
                overnight: 'Meliá Ngorongoro, Ngorongoro Highlands',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'The Crater Floor, and Karatu',
                paragraphs: [
                    'Down into the crater, a UNESCO World Heritage site and the single most reliable day’s game viewing in the country.',
                    'You spend the day on the floor looking for the Big Five, black rhino among them, and then climb out towards the Karatu highlands and Kitela Lodge — gardens, coffee, and a very quiet evening.',
                ],
                wildlife: ['Black rhino', 'Lion', 'Elephant', 'Buffalo', 'Hippo', 'Hyena'],
                optional: [
                    { addon: 'quad-biking' },
                ],
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Lake Manyara',
                paragraphs: [
                    'A game drive through Lake Manyara after breakfast — groundwater forest, then open country, then the lakeshore, which is a lot of habitat for one small park.',
                    'Elephant, hippo, big baboon troops, a great deal of birdlife, and the tree-climbing lions if you are lucky.',
                    'The evening is at Elephant Springs.',
                ],
                wildlife: ['Tree-climbing lion', 'Elephant', 'Hippo', 'Flamingo', 'Baboon'],
                optional: [
                    { addon: 'treetop-walk' },
                    { addon: 'horse-riding', note: 'at Manyara Ranch' },
                ],
                overnight: 'Elephant Springs',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'Tarangire, and Back to Arusha',
                paragraphs: [
                    'Tarangire for the day — ancient baobabs, the river, and the elephant herds the park is famous for.',
                    'If you want one more thing, a night game drive can be arranged, which shows you a completely different set of animals.',
                    'Then the road back to Arusha and Elewana Arusha Coffee Lodge for the last night.',
                ],
                wildlife: ['Elephant', 'Lion', 'Giraffe', 'Zebra', 'Buffalo', 'Eland'],
                optional: [
                    { addon: 'night-game-drive' },
                ],
                overnight: 'Elewana Arusha Coffee Lodge, Arusha',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 9,
                label: 'Day 9',
                title: 'Departure',
                paragraphs: [
                    'Breakfast among the coffee at Elewana, then a private transfer to the airport.',
                    'If your flight is late enough we will fit in Shanga Shanga on the way — locally made work, and a social enterprise worth the half hour.',
                ],
                meals: 'Breakfast',
            },
        ],
        included: [
            'A private luxury 4×4 safari vehicle with a pop-up roof',
            'A professional English-speaking safari guide throughout',
            'The scheduled flight from Arusha to the Serengeti',
            'All luxury accommodation as listed',
            'All meals on safari',
            'All private game drives listed',
            'The guided walking safaris in Arusha National Park and on the crater rim',
            'Park, conservation area and Ngorongoro Crater fees',
            'Airport transfers on arrival and departure',
            'Bottled water, soft drinks, beer, wine and safari snacks',
            'Government taxes',
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'Is this suitable for a honeymoon?',
                answer:
                    'It is built for couples — luxury lodges, private game drives and a pace that leaves room in the day. It works just as well for an anniversary.',
            },
            FAQ_PRIVATE,
            FAQ_CUSTOMISE,
            {
                question: 'Can we add Zanzibar?',
                answer:
                    'Yes. Three to five nights on the coast at the end is the usual answer, and we book the domestic flight with it.',
            },
        ],
        featured: true,
    },

    /* ------------------------------------------------------- Family and migration */
    {
        slug: '6-day-tanzania-family-safari',
        name: '6-Day Tanzania Family Safari',
        region: 'Tarangire, Serengeti & Ngorongoro',
        category: 'Family Safari',
        routes: ['northern-circuit'],
        duration: '6 Days / 5 Nights',
        days: 6,
        nights: 5,
        price: 'From US$ 2,975 pp',
        image: '/images/family-deck-viewpoint-1400.webp',
        imageSrcset:
            '/images/family-deck-viewpoint-900.webp 900w, /images/family-deck-viewpoint-1400.webp 1400w',
        imageFocus: '50% 30%', // the mother and daughter stand at the very top of this frame
        imageAlt:
            'A family of four leaning on a lodge railing, the parents and children pointing out something in the bush below',
        summary:
            'The northern circuit at a pace that works with children: Tarangire, a day through to the Serengeti, a full day on the crater floor, and a last morning cycling to the Lake Manyara shore with Mto wa Mbu.',
        priceFrom: 'US$ 2,975',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Child rates', amount: 'On request' },
            { label: 'Single supplement', amount: 'On request' },
        ],
        priceNote:
            'The shortest of the family itineraries and the least expensive, which is what makes it the usual first safari. Child rates depend on ages and on which lodges have family rooms for your dates.',
        bestTime: 'June – October & December – March',
        highlights: [
            'Tanzania’s four best-known northern parks in five nights',
            'The Serengeti plains, without the flight',
            'The Big Five, and the country’s best rhino odds, in the crater',
            'Tarangire’s elephant herds and its baobabs',
            'A private 4×4 and a professional guide, for your family alone',
            'A flat, family-friendly bicycle ride to the Lake Manyara shore',
            'Short enough for a first safari, and for younger children',
        ],
        destinations: ['Arusha', 'Tarangire', 'Serengeti', 'Ngorongoro', 'Karatu', 'Mto wa Mbu'],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Day 1' },
                { ...PT.tarangire, label: 'Day 2' },
                { ...PT.serengeti, label: 'Days 3–4' },
                { ...PT.ngorongoro, label: 'Days 4–5' },
                { ...PT.karatu, label: 'Day 5' },
                { ...PT.mtoWaMbu, label: 'Day 6' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Mount Meru Game Lodge, which has grounds children can be let loose in after a long flight.',
                    'Dinner, and an early night. Nothing else is asked of anyone today.',
                ],
                overnight: 'Mount Meru Game Lodge, Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Arusha to Tarangire',
                paragraphs: [
                    'After breakfast you drive to Tarangire, which is the right park to start in — the elephants are numerous, close and unmistakable, and the baobabs make the landscape look the way children expect Africa to look.',
                    'The Tarangire River pulls animals in all year, so the game drive rarely goes quiet. You spend the night at Lake Burunge Baobab Tented Camp.',
                ],
                wildlife: [
                    'African elephant',
                    'Lion',
                    'Giraffe',
                    'Zebra',
                    'Buffalo',
                    'Greater kudu',
                ],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Lake Burunge Baobab Tented Camp, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Tarangire to the Serengeti',
                paragraphs: [
                    'A long day, and deliberately not a wasted one: the route to the Serengeti runs up through the Ngorongoro Conservation Area, and the whole drive is game viewing rather than transfer.',
                    'You reach the plains in the afternoon and drive on into the park towards Kubu Kubu Tented Lodge, looking for the herds and whatever is following them.',
                ],
                wildlife: [
                    'Lion',
                    'Elephant',
                    'Wildebeest',
                    'Zebra',
                    'Giraffe',
                    'Cheetah',
                    'Hyena',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Kubu Kubu Tented Lodge, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Serengeti Morning, Highland Evening',
                paragraphs: [
                    'A morning game drive across the central Serengeti with your guide — the best hours of the day, and the ones the cats use.',
                    'Then back east through the conservation area, with the landscape climbing and changing the whole way, to Lion’s Paw Camp near the crater rim.',
                ],
                wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Wildebeest', 'Zebra'],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                ],
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'The Ngorongoro Crater',
                paragraphs: [
                    'A full day down on the crater floor, which is the day most children remember: everything is in one bowl, and almost all of it is visible.',
                    'The Big Five are all here, black rhino included, along with flamingo on the soda lake and hippo in the pools.',
                    'Afterwards you climb out and carry on to Kitela Lodge in the Karatu highlands.',
                ],
                wildlife: ['Black rhino', 'Lion', 'Elephant', 'Buffalo', 'Hippo', 'Flamingo'],
                optional: [
                    { addon: 'quad-biking' },
                ],
                highlight: 'A full day on the Ngorongoro Crater floor',
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Mto wa Mbu, by Bicycle',
                paragraphs: [
                    'The last morning is out of the vehicle. You cycle down to the shore of Lake Manyara on ground that is flat the whole way, so it suits most ages and most levels of fitness — and anyone who would rather not ride goes by tuk-tuk instead.',
                    'At the lake you walk the shoreline with a guide, where zebra, wildebeest, antelope, waterbuck and giraffe come down, along with a great deal of birdlife and, now and then, hippo.',
                    'Then a cultural morning in Mto wa Mbu itself — a plantation, how the farming works, and what daily life in the town looks like — and a tuk-tuk ride back through it before you carry on.',
                ],
                optional: [
                    { addon: 'zipline' },
                ],
                highlight: 'A flat, family-friendly cycle to the Lake Manyara shore — tuk-tuk if you prefer',
                meals: 'Breakfast & lunch',
            },
        ],
        included: [
            ...INCLUDED_CORE.slice(0, 5),
            'The Lake Manyara National Park visit and the Mto wa Mbu cultural morning',
            ...INCLUDED_CORE.slice(5),
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'Does this work for families?',
                answer:
                    'Yes. The pace is comfortable, the parks are the most family-friendly in the country, and the last morning is built around a flat bicycle ride with a tuk-tuk alternative.',
            },
            {
                question: 'Will we see the Big Five?',
                answer:
                    'Four of the five are likely. Rhino are the exception everywhere in Tanzania; the crater is where you have a real chance of one.',
            },
            FAQ_PRIVATE,
            FAQ_CUSTOMISE,
        ],
        featured: true,
    },
    {
        slug: '7-day-tanzania-family-safari',
        name: '7-Day Tanzania Family Safari',
        region: 'Tarangire, Serengeti & Ngorongoro',
        category: 'Family Safari',
        routes: ['northern-circuit'],
        duration: '7 Days / 6 Nights',
        days: 7,
        nights: 6,
        price: 'From US$ 4,200 pp',
        image: '/images/family-lunch-under-acacia-1400.webp',
        imageSrcset:
            '/images/family-lunch-under-acacia-900.webp 900w, /images/family-lunch-under-acacia-1400.webp 1400w',
        imageAlt:
            'A family at a long lunch table set in the shade of an acacia, with the lake and hills beyond',
        summary:
            'Six nights with a full day in the Serengeti rather than a morning, a Maasai village on the way in, the crater floor, and a cultural morning in Mto wa Mbu before you fly.',
        priceFrom: 'US$ 4,200',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Maasai village visit', amount: 'Included' },
            { label: 'Mto wa Mbu cultural tour', amount: 'Included' },
            { label: 'Child rates', amount: 'On request' },
        ],
        priceNote:
            'The extra night over the six-day itinerary buys a full day in the Serengeti and the Maasai village visit, which is why most families choose it.',
        bestTime: 'June – October & December – March',
        highlights: [
            'A full day in the Serengeti, not a morning',
            'A Maasai village visit on the way to the park',
            'The Big Five across the Serengeti and the crater',
            'Tarangire’s elephant herds at the start',
            'A cultural morning in Mto wa Mbu at the end',
            'A private 4×4 and an experienced local guide throughout',
            'Comfortable lodges and tented camps chosen for families',
            'Wildlife, culture and enough downtime to keep everyone civil',
        ],
        destinations: ['Arusha', 'Tarangire', 'Serengeti', 'Ngorongoro', 'Karatu', 'Mto wa Mbu'],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Day 1' },
                { ...PT.tarangire, label: 'Day 2' },
                { ...PT.serengeti, label: 'Days 3–5' },
                { ...PT.ngorongoro, label: 'Days 5–6' },
                { ...PT.karatu, label: 'Day 6' },
                { ...PT.mtoWaMbu, label: 'Day 7' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Mount Meru Game Lodge, where the grounds do a lot of work on a first evening.',
                    'Dinner, and then bed. The safari begins in the morning.',
                ],
                overnight: 'Mount Meru Game Lodge, Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Arusha to Tarangire',
                paragraphs: [
                    'After breakfast you drive to Tarangire — enormous elephant herds, ancient baobabs, and a river that keeps the park busy all year.',
                    'A game drive through the park, and then Elephant Springs by Karibu Camps for the night.',
                ],
                wildlife: [
                    'Elephant',
                    'Lion',
                    'Giraffe',
                    'Zebra',
                    'Buffalo',
                    'Greater kudu',
                ],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Elephant Springs by Karibu Camps, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Tarangire to the Serengeti, by Way of a Maasai Village',
                paragraphs: [
                    'You start north towards the Serengeti, and stop on the way at a Maasai village — a proper visit, with time to ask about the customs, the cattle and how the day actually runs.',
                    'Then on to the park, arriving in time for an afternoon game drive out across the plains.',
                ],
                wildlife: ['Lion', 'Elephant', 'Wildebeest', 'Zebra', 'Giraffe', 'Cheetah'],
                optional: [
                    { addon: 'olduvai-gorge' },
                ],
                highlight: 'A Maasai village visit — customs, cattle and daily life',
                overnight: 'Kubu Kubu, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'A Full Day in the Serengeti',
                paragraphs: [
                    'The whole day in the park with your guide, which is enough time to reach more than one part of it and to sit still where sitting still pays off.',
                    'It is a long day in a vehicle for children, so it is deliberately unhurried — a picnic, a siesta in the shade, and out again for the last of the light.',
                ],
                wildlife: [
                    'Lion',
                    'Leopard',
                    'Cheetah',
                    'Elephant',
                    'Wildebeest',
                    'Zebra',
                    'Hippo',
                ],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                ],
                overnight: 'Kubu Kubu, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Serengeti to the Ngorongoro Highlands',
                paragraphs: [
                    'Game drives in the Serengeti through the morning, and then east in the afternoon towards the Ngorongoro Conservation Area.',
                    'The plains give way to highland as you climb. You finish at Lion’s Paw Camp, close to the crater.',
                ],
                optional: [
                    { addon: 'walking-safari', note: 'on the crater rim' },
                ],
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'The Ngorongoro Crater',
                paragraphs: [
                    'An early breakfast and down into the crater, where the concentration of animals in one enclosed floor is unlike anywhere else in the country.',
                    'Afterwards you climb out and carry on to Kitela Lodge in the quiet of the Karatu highlands.',
                ],
                wildlife: [
                    'Black rhino',
                    'Lion',
                    'Elephant',
                    'Buffalo',
                    'Hippo',
                    'Flamingo',
                    'Hyena',
                ],
                optional: [
                    { addon: 'quad-biking' },
                ],
                highlight: 'A morning on the crater floor',
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Mto wa Mbu, and Departure',
                paragraphs: [
                    'The last morning is in Mto wa Mbu — a walk through the village, the farming, the crafts and the markets, in a town where a remarkable number of Tanzania’s communities live within a few streets of each other.',
                    'Then on to the airport for your onward flight.',
                ],
                optional: [
                    { addon: 'zipline' },
                ],
                highlight: 'A guided cultural tour of Mto wa Mbu',
                meals: 'Breakfast & lunch',
            },
        ],
        included: [
            ...INCLUDED_CORE.slice(0, 5),
            'The Maasai village visit and the Mto wa Mbu cultural tour',
            ...INCLUDED_CORE.slice(5),
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'Does this work for families with children?',
                answer:
                    'Yes. The pace is comfortable and the wildlife days are broken up with cultural mornings, which is what keeps a week in a vehicle enjoyable for children.',
            },
            FAQ_PRIVATE,
            {
                question: 'What will we see?',
                answer:
                    'Elephant, lion, leopard, cheetah, giraffe, zebra, wildebeest, buffalo, hippo and rhino are all possible across these parks. What you actually see depends on where the animals are that week — no operator can promise otherwise.',
            },
            FAQ_CUSTOMISE,
        ],
    },
    {
        slug: '8-day-tanzania-family-safari',
        name: '8-Day Tanzania Family Safari',
        region: 'Arusha, Tarangire, Serengeti & Ngorongoro',
        category: 'Family Safari',
        routes: ['northern-circuit'],
        duration: '8 Days / 7 Nights',
        days: 8,
        nights: 7,
        price: 'Price on request',
        image: '/images/family-mess-tent-dinner-1400.webp',
        imageSrcset:
            '/images/family-mess-tent-dinner-900.webp 900w, /images/family-mess-tent-dinner-1400.webp 1400w',
        imageAlt:
            'Three generations of a family passing dishes around a long table in the mess tent',
        summary:
            'Seven nights at a gentle pace — a walking safari in Arusha National Park, a full day in Tarangire, a cultural day in Mto wa Mbu, the Serengeti and the crater — staying in luxury lodges chosen for families.',
        priceFrom: 'On request',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Child rates', amount: 'On request' },
            { label: 'Single supplement', amount: 'On request' },
        ],
        priceNote:
            'The rate for this itinerary is being confirmed and is deliberately not published here. Ask us and we will quote it against your dates, your party and your children’s ages.',
        bestTime: 'June – October & December – March',
        highlights: [
            'A private luxury vehicle and a professional guide for your family alone',
            'Luxury lodges and tented camps that take families properly',
            'Game drives in all of Tanzania’s best-known northern parks',
            'Arusha National Park, including a walking safari',
            'A cultural day in Mto wa Mbu',
            'The central Serengeti plains',
            'The Ngorongoro Crater, a UNESCO World Heritage site',
            'Good odds on all of the Big Five',
            'Flexible enough to move around children’s ages and stamina',
        ],
        destinations: [
            'Arusha National Park',
            'Tarangire',
            'Mto wa Mbu',
            'Karatu',
            'Serengeti',
            'Ngorongoro',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Days 1, 2 & 7' },
                { ...PT.arushaPark, label: 'Day 2' },
                { ...PT.tarangire, label: 'Day 3' },
                { ...PT.mtoWaMbu, label: 'Day 4' },
                { ...PT.karatu, label: 'Day 4' },
                { ...PT.serengeti, label: 'Days 5–6' },
                { ...PT.ngorongoro, label: 'Days 6–7' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Arusha Serena Hotel, Resort & Spa, set in gardens above Lake Duluti.',
                    'A day to do nothing in, which is the right way to begin a week of early starts.',
                ],
                overnight: 'Arusha Serena Hotel, Resort & Spa',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Arusha National Park',
                paragraphs: [
                    'Arusha National Park is the most varied park on this route and the only one you can walk in, so that is how the day starts: on foot with a ranger, looking at tracks, plants, birds and the small things a vehicle drives past.',
                    'The afternoon is an unhurried game drive through forest, open plains, the Momella Lakes and old volcanic country, and then back to the Serena for the evening.',
                ],
                wildlife: [
                    'Giraffe',
                    'Buffalo',
                    'Zebra',
                    'Colobus monkey',
                    'Warthog',
                    'Flamingo',
                ],
                optional: [
                    { addon: 'walking-safari' },
                    { addon: 'biking', note: 'inside the park' },
                    { addon: 'canoeing', note: 'on the Momella Lakes' },
                ],
                highlight: 'A guided walking safari — the one park on this route you can explore on foot',
                overnight: 'Arusha Serena Hotel, Resort & Spa',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Tarangire National Park',
                paragraphs: [
                    'South-west to Tarangire — ancient baobabs, a seasonal river, and one of the largest elephant populations in Africa.',
                    'A full day’s game drive, and then Elephant Springs by Karibu Camps, which sits inside the park rather than outside the gate.',
                ],
                wildlife: [
                    'African elephant',
                    'Lion',
                    'Giraffe',
                    'Zebra',
                    'Buffalo',
                    'Wildebeest',
                ],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Elephant Springs by Karibu Camps, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Mto wa Mbu, and the Highlands',
                paragraphs: [
                    'The morning is in Mto wa Mbu, one of the most culturally mixed towns in Tanzania — farms, the market, and how people here actually live.',
                    'Then up into the Ngorongoro highlands to Kitela Lodge, with coffee plantations on every side.',
                ],
                optional: [
                    { addon: 'zipline' },
                    { addon: 'treetop-walk' },
                ],
                highlight: 'A morning in Mto wa Mbu — farms, market and village life',
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Into the Serengeti',
                paragraphs: [
                    'North-west through the Ngorongoro Conservation Area and on into the Serengeti, game driving as you go.',
                    'You arrive at Kubu Kubu Tented Lodge, in the middle of the central Serengeti and the middle of the game.',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Kubu Kubu Tented Lodge, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Serengeti Morning, Crater Rim Evening',
                paragraphs: [
                    'A final morning game drive across the plains, and lunch.',
                    'The afternoon is the drive back east through the conservation area to Lion’s Paw by Karibu Camps, set just off the crater rim so that tomorrow starts early and close.',
                ],
                wildlife: [
                    'Lion',
                    'Leopard',
                    'Cheetah',
                    'Elephant',
                    'Giraffe',
                    'Wildebeest',
                    'Zebra',
                ],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                ],
                overnight: 'Lion’s Paw by Karibu Camps, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'The Ngorongoro Crater, and Back to Arusha',
                paragraphs: [
                    'Down into the crater for the day — the best single day’s game viewing in Tanzania, and the one where the Big Five are all genuinely on the table.',
                    'Afterwards the road back to Arusha and Elewana Arusha Coffee Lodge, which sits in the middle of one of the largest coffee estates in the country.',
                ],
                wildlife: [
                    'Black rhino',
                    'Lion',
                    'Elephant',
                    'Buffalo',
                    'Hippo',
                    'Hyena',
                    'Flamingo',
                ],
                overnight: 'Elewana Arusha Coffee Lodge, Arusha',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'Shanga, and Departure',
                paragraphs: [
                    'A slow breakfast, and then Shanga — a social enterprise employing people with disabilities, who make glass, beadwork and textiles on site and will show you how.',
                    'If your flight is late enough there is time for a short Arusha town tour before the transfer to Kilimanjaro International Airport.',
                ],
                optional: ['A short Arusha town tour, flight schedule permitting'],
                meals: 'Breakfast',
            },
        ],
        included: [
            'A private luxury safari vehicle, for your family alone',
            'A professional English-speaking safari guide throughout',
            'All luxury accommodation as listed',
            'All meals on safari',
            'All game drives and activities listed, including the walking safari',
            'Park, conservation area and Ngorongoro Crater fees',
            'Airport transfers on arrival and departure',
            'Bottled water, soft drinks, beer, wine and snacks',
            'Government taxes',
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'Does this work for families with children?',
                answer:
                    'It is built for them, and it can be adjusted for children of different ages — the walking safari, the driving days and the early starts all have alternatives.',
            },
            {
                question: 'What will we see?',
                answer:
                    'Families on this route regularly see elephant, lion, giraffe, zebra, buffalo, hippo, wildebeest, cheetah and leopard, along with a great deal of birdlife.',
            },
            {
                question: 'When should we travel?',
                answer:
                    'June to October is the dry season and the easiest game viewing. January to March is the Serengeti calving season, which is a spectacle of its own.',
            },
            FAQ_PRIVATE,
            FAQ_CUSTOMISE,
        ],
    },
    {
        slug: '9-day-luxury-family-safari',
        name: '9-Day Luxury Family Safari',
        region: 'Tarangire, Serengeti, Ngorongoro & Lake Eyasi',
        category: 'Family Safari',
        routes: ['northern-circuit'],
        duration: '9 Days / 8 Nights',
        days: 9,
        nights: 8,
        price: 'From US$ 4,605 pp',
        image: '/images/family-firepit-sundowners-1400.webp',
        imageSrcset:
            '/images/family-firepit-sundowners-900.webp 900w, /images/family-firepit-sundowners-1400.webp 1400w, /images/family-firepit-sundowners-1920.webp 1920w',
        imageAlt:
            'Guests and their guides around a fire pit on the open plains, drinks in hand as the sun sets',
        summary:
            'Eight nights taking in Tarangire from inside the park, Lake Manyara, two nights in the Serengeti and the crater floor — then Lake Eyasi to meet the Hadzabe and the Datoga, and the Materuni waterfall on the last day.',
        priceFrom: 'US$ 4,605',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Lake Eyasi cultural experience', amount: 'Included' },
            { label: 'Materuni village and waterfall', amount: 'Included' },
            { label: 'Child rates', amount: 'On request' },
        ],
        priceNote:
            'Beer, wine, juice, soft drinks and snacks are in the rate on this itinerary. The Lake Eyasi morning is the reason most families choose it over the shorter ones.',
        bestTime: 'June – October & December – March',
        highlights: [
            'Built for families and for travelling with more than one generation',
            'A private vehicle and a dedicated professional guide',
            'Luxury lodges and tented camps that take families properly',
            'Two nights in the central Serengeti at Meliá Serengeti',
            'Tarangire from a camp inside the park, not outside the gate',
            'The Ngorongoro Crater, a UNESCO World Heritage site',
            'A morning with the Hadzabe and the Datoga at Lake Eyasi',
            'Shanga and the Materuni waterfall on the way out',
        ],
        destinations: [
            'Tarangire',
            'Lake Manyara',
            'Karatu',
            'Serengeti',
            'Ngorongoro',
            'Lake Eyasi',
            'Materuni',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Days 1 & 8' },
                { ...PT.tarangire, label: 'Days 2–3' },
                { ...PT.manyara, label: 'Day 3' },
                { ...PT.karatu, label: 'Day 3' },
                { ...PT.serengeti, label: 'Days 4–6' },
                { ...PT.ngorongoro, label: 'Days 6–7' },
                { ...PT.eyasi, label: 'Days 7–8' },
                { ...PT.materuni, label: 'Day 9' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Gran Meliá Arusha — gardens, and Mount Meru standing over the whole thing.',
                    'A quiet first evening after the flight, and dinner whenever suits.',
                ],
                overnight: 'Gran Meliá Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Tarangire National Park',
                paragraphs: [
                    'After breakfast you drive to Tarangire and spend the full day in the park, following the river through the baobabs.',
                    'The elephant herds here are the largest you will see on this trip, and there is very little you have to work for.',
                    'You stay at Elephant Springs, inside the park — which means the noise at night is the park’s rather than the road’s.',
                ],
                wildlife: [
                    'Elephant',
                    'Lion',
                    'Giraffe',
                    'Zebra',
                    'Buffalo',
                    'Wildebeest',
                    'Impala',
                ],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Elephant Springs, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Tarangire at Dawn, then Lake Manyara',
                paragraphs: [
                    'An early game drive in Tarangire while it is cool and the animals are moving, working your way slowly towards the gate.',
                    'Then Lake Manyara for a second game drive: groundwater forest, open plains and the lakeshore in one small park, with big baboon troops, hippo, and the tree-climbing lions it is known for.',
                    'You finish the day up in the highlands at Kitela Lodge, in gardens and coffee.',
                ],
                wildlife: [
                    'Elephant',
                    'Lion',
                    'Giraffe',
                    'Hippo',
                    'Baboon',
                    'Buffalo',
                    'Flamingo',
                ],
                optional: [
                    { addon: 'treetop-walk' },
                    { addon: 'horse-riding', note: 'at Manyara Ranch' },
                    { addon: 'quad-biking' },
                ],
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Into the Serengeti',
                paragraphs: [
                    'North-west through the Ngorongoro Conservation Area, game viewing the whole way, and on into the Serengeti.',
                    'An afternoon game drive across the central plains, and then Meliá Serengeti Lodge.',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Meliá Serengeti Lodge, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'A Full Day in the Serengeti',
                paragraphs: [
                    'The whole day in the park, shaped by your guide around whatever the last twenty-four hours have turned up rather than by a fixed route.',
                ],
                wildlife: [
                    'Lion',
                    'Leopard',
                    'Cheetah',
                    'Elephant',
                    'Giraffe',
                    'Wildebeest',
                    'Zebra',
                ],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                    { addon: 'spa' },
                ],
                overnight: 'Meliá Serengeti Lodge, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'A Last Serengeti Morning, then the Crater Rim',
                paragraphs: [
                    'Up early for a final game drive while the light is still low on the plains.',
                    'Back for lunch, and then the long, scenic climb east through the highlands to Lion’s Paw Camp, set near the crater rim so that tomorrow can start before everyone else’s.',
                ],
                optional: [
                    { addon: 'walking-safari', note: 'on the crater rim' },
                ],
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'The Crater, then Lake Eyasi',
                paragraphs: [
                    'An early breakfast and down onto the crater floor for the morning — the Big Five, and hippo, hyena and flamingo besides.',
                    'In the afternoon you carry on south-west to the shore of Lake Eyasi and Kisima Ngeda Tented Camp, which is a very different sort of quiet.',
                ],
                wildlife: [
                    'Black rhino',
                    'Lion',
                    'Elephant',
                    'Buffalo',
                    'Hippo',
                    'Hyena',
                    'Flamingo',
                ],
                overnight: 'Kisima Ngeda Tented Camp, Lake Eyasi',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'The Hadzabe and the Datoga',
                paragraphs: [
                    'The morning is spent with the Hadzabe, one of the last hunter-gatherer communities in Africa, alongside local guides who can translate both the language and the context — how the hunting works, and what the relationship with this country actually is.',
                    'Then the neighbouring Datoga, who are known for their blacksmithing, and whose craft you can watch being done.',
                    'In the afternoon you drive back to Arusha and the Arusha Coffee Lodge.',
                ],
                highlight: 'A morning with the Hadzabe and the Datoga at Lake Eyasi',
                overnight: 'Arusha Coffee Lodge, Arusha',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 9,
                label: 'Day 9',
                title: 'Shanga, Materuni Falls & Departure',
                paragraphs: [
                    'You start with Shanga, a social enterprise employing people with disabilities, where jewellery, glassware and textiles are made on site.',
                    'Then Materuni Village on the slopes of Kilimanjaro — a guided walk through coffee country to the waterfall, which is a good deal taller than most people expect.',
                    'Afterwards, on to Kilimanjaro International Airport for your onward flight.',
                ],
                highlight: 'The Materuni waterfall, and the coffee country around it',
                meals: 'Breakfast & lunch',
            },
        ],
        included: [
            'A private luxury safari vehicle, for your family alone',
            'A professional safari guide throughout',
            'All luxury accommodation as listed',
            'All meals on safari',
            'All game drives listed, including the Ngorongoro Crater descent',
            'The Lake Eyasi cultural experience with local guides',
            'Park, conservation area and Ngorongoro Crater fees',
            'Airport transfers on arrival and departure',
            'Bottled water, beer, wine, juice, soft drinks and snacks',
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'Is this suitable for children?',
                answer:
                    'Yes — it is built for families, and the days can be adjusted around children’s ages and how much time they will tolerate in a vehicle.',
            },
            FAQ_CUSTOMISE,
            {
                question: 'What makes Lake Eyasi worth the detour?',
                answer:
                    'It is the one place on the northern circuit where you can spend a morning with the Hadzabe and the Datoga. It is a genuine cultural visit rather than a performance, and it is what makes this itinerary different from the shorter ones.',
            },
            FAQ_PRIVATE,
        ],
    },
    {
        slug: '10-day-tanzania-family-safari',
        name: '10-Day Tanzania Family Safari',
        region: 'Northern Tanzania & Kilimanjaro',
        category: 'Family Safari',
        routes: ['northern-circuit'],
        duration: '10 Days / 9 Nights',
        days: 10,
        nights: 9,
        price: 'From US$ 5,384 pp',
        /* The one card whose photograph is now of the right country and the
           right place: day nine of this itinerary is the Materuni waterfall.
           It replaced a stock shot of San people on a southern-African salt
           pan. The rest of the card imagery in this file is still inherited
           stock — see the file header. */
        image: '/images/family-walk-maasai-guide-1400.webp',
        imageSrcset:
            '/images/family-walk-maasai-guide-900.webp 900w, /images/family-walk-maasai-guide-1400.webp 1400w, /images/family-walk-maasai-guide-1920.webp 1920w',
        imageAlt:
            'A Maasai guide leading a family on a walking safari, a herd of zebra grazing in the grass behind them',
        summary:
            'Nine nights: a walking safari in Arusha National Park, two days on Tarangire, a cultural day in Mto wa Mbu, two nights in the Serengeti and the crater floor — then the Materuni waterfall, the Chemka hot springs and Shanga.',
        priceFrom: 'US$ 5,384',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Materuni coffee tour and waterfall', amount: 'Included' },
            { label: 'Chemka Hot Springs', amount: 'Included' },
            { label: 'Child rates', amount: 'On request' },
        ],
        priceNote:
            'The last two days are deliberately not game drives. By day eight most families have had enough of a vehicle, and a waterfall and a hot spring land better than another park.',
        bestTime: 'June – October & December – March',
        highlights: [
            'A walking safari in Arusha National Park',
            'Family-friendly luxury lodges throughout',
            'Two days on Tarangire and its elephant herds',
            'A full cultural day in Mto wa Mbu',
            'Two nights in the Serengeti',
            'The Big Five on the Ngorongoro Crater floor',
            'A Chagga coffee tour and the Materuni waterfall',
            'A swim in the Chemka hot springs',
            'Shanga, and what a social enterprise actually looks like',
            'Comfortable driving distances and a pace that suits all ages',
        ],
        destinations: [
            'Arusha National Park',
            'Tarangire',
            'Mto wa Mbu',
            'Serengeti',
            'Ngorongoro',
            'Materuni',
            'Chemka',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Days 1, 8 & 9' },
                { ...PT.arushaPark, label: 'Day 2' },
                { ...PT.tarangire, label: 'Days 3–4' },
                { ...PT.mtoWaMbu, label: 'Day 4' },
                { ...PT.karatu, label: 'Day 4' },
                { ...PT.serengeti, label: 'Days 5–7' },
                { ...PT.ngorongoro, label: 'Days 7–8' },
                { ...PT.materuni, label: 'Day 9' },
                { ...PT.chemka, label: 'Day 9' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Melia Arusha, which looks out at Mount Meru across its gardens.',
                    'Nothing is scheduled. Recover from the flight and start properly tomorrow.',
                ],
                overnight: 'Melia Arusha',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Arusha National Park',
                paragraphs: [
                    'A guided walking safari with an armed ranger, which is a very different way for children to meet the bush than through a window.',
                    'Then a game drive through the park’s several ecosystems, including the Momella Lakes and the Ngurdoto Crater, and on to Koroi Forest Camp in the trees.',
                ],
                wildlife: [
                    'Giraffe',
                    'Zebra',
                    'Buffalo',
                    'Colobus monkey',
                    'Waterbuck',
                    'Flamingo (seasonal)',
                ],
                optional: [
                    { addon: 'walking-safari' },
                    { addon: 'biking', note: 'inside the park' },
                    { addon: 'canoeing', note: 'on the Momella Lakes' },
                ],
                highlight: 'A walking safari with an armed ranger',
                overnight: 'Koroi Forest Camp, Arusha National Park',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Tarangire National Park',
                paragraphs: [
                    'After breakfast you drive to Tarangire — huge elephant herds, ancient baobabs, and one of the most rewarding parks in the country for a first afternoon.',
                    'An afternoon game drive, and then Elephant Springs Camp.',
                ],
                wildlife: [
                    'Elephant',
                    'Lion',
                    'Giraffe',
                    'Zebra',
                    'Wildebeest',
                    'Ostrich',
                ],
                optional: [
                    { addon: 'night-game-drive' },
                    { addon: 'sundowner' },
                ],
                overnight: 'Elephant Springs Camp, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Tarangire at Dawn, Mto wa Mbu by Lunch',
                paragraphs: [
                    'An early morning game drive in Tarangire, and then north to Mto wa Mbu.',
                    'The afternoon is a guided walk through the town — farms, the market, the workshops and the banana plantations, in a place where a great many of Tanzania’s communities live in a few streets.',
                    'You spend the night at Kitela Lodge, up in the highlands.',
                ],
                optional: [
                    { addon: 'zipline' },
                    { addon: 'treetop-walk' },
                ],
                highlight: 'A guided walk through Mto wa Mbu — farms, market and banana plantations',
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Into the Serengeti',
                paragraphs: [
                    'The drive through the Ngorongoro highlands and down onto the Serengeti plains, which is one of the better drives in Africa and worth doing slowly.',
                    'There is game the whole way in. You finish at Lala Salama Camp.',
                ],
                optional: [
                    { addon: 'olduvai-gorge' },
                    { addon: 'maasai-village' },
                ],
                overnight: 'Lala Salama Camp, Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'A Full Day in the Serengeti',
                paragraphs: [
                    'A whole day out on the plains looking for the Big Five and everything else that lives out here.',
                    'Depending on the month you may run into part of the Great Migration, which is a different order of spectacle again — though nobody can promise it on a given date.',
                ],
                wildlife: [
                    'Lion',
                    'Leopard',
                    'Cheetah',
                    'Elephant',
                    'Giraffe',
                    'Wildebeest',
                    'Zebra',
                ],
                optional: [
                    { addon: 'balloon' },
                    { addon: 'bush-breakfast' },
                ],
                overnight: 'Lala Salama Camp, Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Serengeti to Ngorongoro',
                paragraphs: [
                    'A final morning game drive in the Serengeti, and then the road east into the Ngorongoro Conservation Area.',
                    'You stay at Lion’s Paw Camp, just off the crater rim.',
                ],
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'The Ngorongoro Crater',
                paragraphs: [
                    'Down into the crater, which holds one of the highest concentrations of wildlife anywhere on the continent and the best chance of the whole Big Five in one day.',
                    'Afterwards you drive back to Arusha and the Arusha Coffee Lodge, where the last two days are based.',
                ],
                wildlife: ['Black rhino', 'Lion', 'Elephant', 'Buffalo', 'Hippo', 'Hyena'],
                overnight: 'Arusha Coffee Lodge, Arusha',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 9,
                label: 'Day 9',
                title: 'Materuni Falls & Chemka Hot Springs',
                paragraphs: [
                    'East to the foothills of Kilimanjaro and Materuni Village, for a coffee tour with the Chagga who grow it — picked, roasted and ground in front of you — and a walk up to the waterfall.',
                    'In the afternoon, the Chemka hot springs: clear, warm water under fig trees, and the best possible answer to eight days in a safari vehicle.',
                ],
                optional: [
                    { addon: 'biking', note: 'through the Chagga farmland below the mountain' },
                ],
                highlight: 'A Chagga coffee tour, the Materuni waterfall, and a swim at Chemka',
                overnight: 'Arusha Coffee Lodge, Arusha',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 10,
                label: 'Day 10',
                title: 'Shanga, and Departure',
                paragraphs: [
                    'Shanga is at the Arusha Coffee Lodge, so the last morning needs no driving: an hour in the workshop, watching artisans with disabilities make glass, beadwork and textiles from recycled material, and buying some of it if you want to.',
                    'Then the transfer to Kilimanjaro International Airport for your flight home.',
                ],
                highlight: 'Shanga — a 45 to 60 minute workshop tour, on site at the lodge',
                meals: 'Breakfast',
            },
        ],
        included: [
            ...INCLUDED_CORE.slice(0, 5),
            'The Arusha National Park walking safari and the Mto wa Mbu cultural tour',
            'The Materuni coffee tour and waterfall walk, and the Chemka Hot Springs visit',
            'The Shanga workshop tour',
            ...INCLUDED_CORE.slice(5),
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'Why ten days rather than eight?',
                answer:
                    'The two extra days are the ones that are not game drives — Materuni and Chemka. By the end of the first week most families want water and a walk rather than another park, and this is the itinerary that gives them one.',
            },
            FAQ_PRIVATE,
            FAQ_CUSTOMISE,
        ],
    },
    {
        slug: '13-day-great-migration-safari',
        name: '13-Day Great Migration Safari',
        region: 'Lake Natron, the Serengeti & Kilimanjaro',
        category: 'Great Migration',
        routes: ['northern-circuit'],
        duration: '13 Days / 12 Nights',
        days: 13,
        nights: 12,
        price: 'From US$ 6,943 pp',
        image: '/images/migration-herd-vehicle-1400.webp',
        imageSrcset:
            '/images/migration-herd-vehicle-900.webp 900w, /images/migration-herd-vehicle-1400.webp 1400w, /images/migration-herd-vehicle-1920.webp 1920w',
        imageAlt:
            'A column of wildebeest and zebra walking past an open safari vehicle, with thousands more spread across the plain behind them',
        summary:
            'Twelve nights following the migration: north through Maasai country to Lake Natron, two nights on the Mara River in the northern Serengeti, then west, then central, then the crater and Tarangire — finishing with a day on Kilimanjaro, Materuni and the hot springs.',
        priceFrom: 'US$ 6,943',
        priceUnit: 'Per person sharing',
        priceLines: [
            { label: 'Four Serengeti regions, six safari nights', amount: 'Included' },
            { label: 'Kilimanjaro day hike, Marangu route', amount: 'Included' },
            { label: 'Child rates', amount: 'On request' },
        ],
        priceNote:
            'July to October is the window for the Mara River crossings, and this itinerary is built around it. The crossings themselves depend on the rain and on the herds — no operator can put a date on them.',
        bestTime: 'July – October',
        highlights: [
            'Follows the migration across four distinct Serengeti regions',
            'Two nights on the Mara River, where the crossings happen',
            'Lake Natron, under Ol Doinyo Lengai, at the start',
            'Luxury lodges and tented camps for all twelve nights',
            'A private 4×4 and a professional guide throughout',
            'The Ngorongoro Crater floor',
            'A cultural day in Mto wa Mbu',
            'A coffee tour and the waterfall at Materuni',
            'A swim in the Kikuletwa hot springs',
            'A guided day hike on Kilimanjaro, no summit attempt needed',
        ],
        destinations: [
            'Lake Natron',
            'Northern Serengeti',
            'Western Serengeti',
            'Central Serengeti',
            'Ngorongoro',
            'Tarangire',
            'Kilimanjaro',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Days 1, 10 & 12' },
                { ...PT.natron, label: 'Day 2' },
                { ...PT.serengetiNorth, label: 'Days 3–5' },
                { ...PT.serengetiWest, label: 'Day 5' },
                { ...PT.serengeti, label: 'Days 6–7' },
                { ...PT.ngorongoro, label: 'Days 7–8' },
                { ...PT.karatu, label: 'Day 8' },
                { ...PT.mtoWaMbu, label: 'Day 9' },
                { ...PT.tarangire, label: 'Days 9–10' },
                { ...PT.marangu, label: 'Day 11' },
                { ...PT.materuni, label: 'Day 12' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arrival in Arusha',
                paragraphs: [
                    'Your guide meets you at Kilimanjaro International Airport and drives you to Arusha Serena Hotel, Resort & Spa, on the shore of Lake Duluti.',
                    'Gardens, water, and a day with nothing in it — which you will be glad of, because tomorrow is a long drive.',
                ],
                overnight: 'Arusha Serena Hotel, Resort & Spa',
                meals: 'Dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Arusha to Lake Natron',
                paragraphs: [
                    'North through Maasai country to Lake Natron, which is one of the most dramatic places in Tanzania and one of the least visited.',
                    'The lake is alkaline, shallow and full of flamingo, ringed by volcanic mountains with Ol Doinyo Lengai — still active — standing over it.',
                    'You stay at Africa Safari Lake Natron, with all of that in front of you.',
                ],
                optional: [
                    { addon: 'maasai-village', note: 'in the Longido country on the way north' },
                ],
                highlight: 'Lake Natron under Ol Doinyo Lengai — few people come this way',
                overnight: 'Africa Safari Lake Natron',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Natron to the Northern Serengeti',
                paragraphs: [
                    'Today you enter the Serengeti from the north-east and work your way towards the Mara River.',
                    'Between July and October this is where the migration is: hundreds of thousands of wildebeest and zebra gathered along the river, with everything that hunts them close behind.',
                    'A first afternoon game drive, and then Mara River Camp.',
                ],
                wildlife: [
                    'Wildebeest',
                    'Lion',
                    'Elephant',
                    'Giraffe',
                    'Zebra',
                    'Topi',
                    'Crocodile',
                ],
                overnight: 'Mara River Camp, Northern Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'The Mara River',
                paragraphs: [
                    'A full day in the north, which is what a crossing requires — your guide positions you at the crossing points and you wait, because the herds move when they move and not before.',
                    'When it happens it is the most violent thing most people will ever watch: crocodile in the water, predators on the bank, and a great deal of noise.',
                    'When it does not happen there is still more game per hour here than almost anywhere else in the park.',
                ],
                wildlife: [
                    'Lion',
                    'Leopard',
                    'Cheetah',
                    'Elephant',
                    'Hippo',
                    'Nile crocodile',
                ],
                optional: [
                    { addon: 'bush-breakfast' },
                    { addon: 'sundowner' },
                ],
                highlight: 'Mara River crossings, season and herds permitting',
                overnight: 'Mara River Camp, Northern Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'North to the Western Corridor',
                paragraphs: [
                    'After breakfast you cross into the western corridor, a strip of riverine forest and open savannah that runs towards Lake Victoria and carries its own migration routes.',
                    'You stay at Lahia Tented Lodge, which looks out a long way.',
                ],
                wildlife: [
                    'Elephant',
                    'Buffalo',
                    'Lion',
                    'Giraffe',
                    'Hyena',
                    'Wildebeest',
                ],
                overnight: 'Lahia Tented Lodge, Western Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Into the Seronera Valley',
                paragraphs: [
                    'East into the Seronera Valley, the heart of the park and the densest predator country in it — leopard in the riverine trees, lion on the kopjes, cheetah on the open ground.',
                    'An afternoon working the valley, and then Kubu Kubu Tented Lodge.',
                ],
                wildlife: ['Lion', 'Leopard', 'Cheetah', 'Elephant', 'Hippo', 'Hyena'],
                optional: [
                    { addon: 'spa' },
                ],
                overnight: 'Kubu Kubu Tented Lodge, Central Serengeti',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Central Serengeti to Ngorongoro',
                paragraphs: [
                    'One last morning game drive in the central Serengeti, and then the climb east through the highlands.',
                    'You finish at Lion’s Paw Camp, set near the crater rim, ready for the descent in the morning.',
                ],
                optional: [
                    { addon: 'balloon', note: 'from the Seronera launch site, before the drive out' },
                    { addon: 'olduvai-gorge' },
                ],
                overnight: 'Lion’s Paw Camp, Ngorongoro Crater rim',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'Six Hundred Metres Down',
                paragraphs: [
                    'The descent into the crater is more than six hundred metres, and what is at the bottom is one of the highest concentrations of wildlife on the continent held inside twenty kilometres of caldera.',
                    'The Big Five are all possible in the day, black rhino included, along with hippo, hyena and flamingo.',
                    'Afterwards you climb out and carry on to Kitela Lodge in the Karatu highlands.',
                ],
                wildlife: [
                    'Black rhino',
                    'Lion',
                    'Elephant',
                    'Buffalo',
                    'Hippo',
                    'Hyena',
                    'Flamingo',
                ],
                optional: [
                    { addon: 'quad-biking' },
                ],
                overnight: 'Kitela Lodge, Karatu',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 9,
                label: 'Day 9',
                title: 'Mto wa Mbu, then Tarangire',
                paragraphs: [
                    'A morning in Mto wa Mbu — farms, the market, and a town where a remarkable number of Tanzania’s communities live within a few streets of each other.',
                    'Then south to Tarangire and Elephant Springs by Karibu Camps.',
                ],
                optional: [
                    { addon: 'zipline' },
                    { addon: 'treetop-walk' },
                    { addon: 'night-game-drive' },
                ],
                highlight: 'A cultural morning in Mto wa Mbu',
                overnight: 'Elephant Springs by Karibu Camps, Tarangire',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 10,
                label: 'Day 10',
                title: 'Tarangire',
                paragraphs: [
                    'A full day in Tarangire, following the river through the baobabs to the elephant herds the park is known for.',
                    'Afterwards, the road back to Arusha and Meliá Arusha.',
                ],
                wildlife: [
                    'African elephant',
                    'Lion',
                    'Giraffe',
                    'Zebra',
                    'Buffalo',
                    'Greater kudu',
                ],
                overnight: 'Meliá Arusha',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 11,
                label: 'Day 11',
                title: 'A Day on Kilimanjaro — the Marangu Route',
                paragraphs: [
                    'After breakfast you drive to the Marangu Gate, where the oldest route up Kilimanjaro starts.',
                    'The day hike takes you up through the rainforest with a local guide — enough of the mountain to understand it, without a week of it.',
                    'You come back down to Marangu and stay at the Pink Flamingo Boutique Hotel.',
                ],
                highlight: 'A guided day hike on Kilimanjaro, with no summit attempt required',
                overnight: 'Pink Flamingo Boutique Hotel, Marangu',
                meals: 'Breakfast & lunch',
            },
            {
                n: 12,
                label: 'Day 12',
                title: 'Materuni Falls & Kikuletwa Hot Springs',
                paragraphs: [
                    'Materuni Village in the morning, on the slopes of Kilimanjaro: a guided walk through the coffee to the waterfall, and the coffee-growing itself, which the Chagga will take you through properly.',
                    'Then Kikuletwa, where warm, startlingly clear water sits under fig trees and you can swim in it.',
                    'Back to Arusha for the last night.',
                ],
                optional: [
                    { addon: 'biking', note: 'through the Chagga farmland' },
                ],
                overnight: 'Meliá Arusha',
                meals: 'Breakfast & lunch',
            },
            {
                n: 13,
                label: 'Day 13',
                title: 'Shanga, the Cultural Heritage Centre & Departure',
                paragraphs: [
                    'Shanga first, where artisans with disabilities make jewellery, glassware, textiles and homeware, and will show you the workshop.',
                    'Then the Cultural Heritage Centre — carvings, gemstones and a very large amount of Tanzanian art under one roof.',
                    'Afterwards, on to Kilimanjaro International Airport for your onward flight.',
                ],
                meals: 'Breakfast & lunch',
            },
        ],
        included: [
            'A private luxury 4×4 safari vehicle with a pop-up roof',
            'A professional English-speaking safari guide throughout',
            'All luxury accommodation as listed',
            'All meals as specified in the itinerary',
            'All game drives listed, across four Serengeti regions',
            'The Ngorongoro Crater descent',
            'The Mto wa Mbu cultural experience',
            'The Materuni coffee tour and waterfall walk',
            'The Kikuletwa Hot Springs visit',
            'The guided Kilimanjaro day hike on the Marangu route',
            'Park and conservation area fees',
            'Airport transfers on arrival and departure',
            'Bottled water, soft drinks, beer, wine and snacks on safari',
        ],
        excluded: EXCLUDED_CORE,
        faqs: [
            {
                question: 'When are the Mara River crossings?',
                answer:
                    'July to October is the window, and this itinerary is built for it. The crossings themselves depend on the rain and on the herds — two nights on the river is what gives you a real chance, and nobody honest will promise more than that.',
            },
            FAQ_PRIVATE,
            {
                question: 'What are the accommodations like?',
                answer:
                    'Luxury lodges and tented camps for all twelve nights, each chosen for where it sits — Mara River Camp for the crossings, Lion’s Paw for the crater start, Africa Safari Lake Natron for the volcano.',
            },
            FAQ_CUSTOMISE,
        ],
        featured: true,
    },
    /* -------------------------------------------------------- Kilimanjaro */
    {
        slug: '6-day-marangu-route-kilimanjaro',
        name: '6-Day Marangu Route',
        region: 'Kilimanjaro National Park',
        category: 'Kilimanjaro Trek',
        routes: ['trekking'],
        duration: '6 Days / 5 Nights',
        days: 6,
        nights: 5,
        price: trekCardPrice(6),
        image: '/images/kili-heath-traverse-1400.webp',
        imageSrcset:
            '/images/kili-heath-traverse-900.webp 900w, /images/kili-heath-traverse-1400.webp 1400w, /images/kili-heath-traverse-1920.webp 1920w',
        imageAlt:
            'A line of trekkers with poles and packs climbing a heathland traverse on Kilimanjaro, cloud banked against the ridge behind them',
        summary:
            'The classic way up Kilimanjaro, and the only main route where you sleep in permanent huts rather than tents. Six days rather than five, so there is an extra acclimatisation night at Horombo before the summit — rainforest, heathland and the alpine desert of the Saddle, then Uhuru Peak at 5,895 metres.',
        priceFrom: trekTotal(6),
        priceUnit: 'Per person sharing',
        priceLines: [],
        bestTime: 'January – March & June – October',
        highlights: [
            'The classic Kilimanjaro route, and the most established on the mountain',
            'Mountain huts every night rather than tents',
            'An extra acclimatisation night at Horombo before the summit stages',
            'Rainforest, open heathland and the alpine desert of the Saddle in six days',
            'Uhuru Peak at 5,895 metres — the highest point in Africa',
            'A private mountain guide, a full crew and a mountain cook',
            'Daily oxygen-level monitoring, with emergency oxygen carried throughout',
            'A hot shower and a complimentary massage waiting at the bottom',
        ],
        destinations: [
            'Arusha',
            'Marangu Gate',
            'Mandara Hut',
            'Horombo Hut',
            'Kibo Hut',
            'Uhuru Peak',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Start' },
                { ...PT.marangu, label: 'Day 1' },
                { ...PT.kiliMandara, label: 'Day 1' },
                { ...PT.kiliHorombo, label: 'Days 2–3' },
                { ...PT.kiliKibo, label: 'Day 4' },
                { ...PT.kiliUhuru, label: 'Day 5' },
                { ...PT.kiliHorombo, label: 'Day 5' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arusha – Marangu Gate – Mandara Hut',
                paragraphs: [
                    'Your climb begins with a transfer from Arusha to Marangu Gate, where registration and the park formalities are done.',
                    'From the gate you walk up through lush rainforest towards Mandara Hut, with birdlife along the trail and, often, the blue colobus monkeys the forest is known for.',
                    'The afternoon is yours — rest around the huts, or walk up to the nearby Maundi Crater for the view north towards Kenya.',
                ],
                stats: [
                    { label: 'Elevation', value: '1,860 m – 2,700 m' },
                    { label: 'Distance', value: 'Approx. 8 km' },
                    { label: 'Hiking', value: '4–5 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                wildlife: ['Blue colobus monkey', 'Forest birdlife'],
                overnight: 'Mandara Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Mandara Hut – Horombo Hut',
                paragraphs: [
                    'After breakfast the forest thins and gives way to open heathland, and the mountain opens up with it — Kibo and Mawenzi ahead of you for much of the day.',
                    'The trail climbs steadily to Horombo Hut. This is usually where the altitude first makes itself felt, so the pace stays deliberate and the water bottle stays in your hand.',
                ],
                stats: [
                    { label: 'Elevation', value: '2,700 m – 3,700 m' },
                    { label: 'Distance', value: 'Approx. 12 km' },
                    { label: 'Hiking', value: '5–6 hours' },
                    { label: 'Habitat', value: 'Heathland' },
                ],
                overnight: 'Horombo Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Horombo Hut – Acclimatisation Day',
                paragraphs: [
                    'A second night at Horombo, and a day given over to letting your body catch up with the altitude.',
                    'Depending on conditions and on how you are feeling, your guide will take you on a gradual acclimatisation walk towards the Mawenzi side of the mountain before you drop back to camp.',
                    'This is the day that makes the six-day Marangu a better bet than the five.',
                ],
                stats: [
                    { label: 'Habitat', value: 'Heathland / alpine zone' },
                ],
                highlight: 'An extra day at 3,700 m, spent acclimatising rather than climbing',
                overnight: 'Horombo Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Horombo Hut – Kibo Hut',
                paragraphs: [
                    'Today you cross the Saddle, the high-altitude desert lying between Mawenzi and Kibo. The vegetation gives out almost entirely and the landscape turns to rock and dust.',
                    'Kibo Hut sits at roughly 4,700 metres. Dinner is early, and so is bed — you will be woken not long after midnight.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,700 m – 4,700 m' },
                    { label: 'Distance', value: 'Approx. 9 km' },
                    { label: 'Hiking', value: '5–6 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                overnight: 'Kibo Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Kibo Hut – Uhuru Peak – Horombo Hut',
                paragraphs: [
                    'Summit day starts shortly after midnight with a hot drink and a light meal, and then the climb under the stars.',
                    'The trail works its way up to Gilman’s Point and Stella Point on the crater rim, and from there along the rim to Uhuru Peak. At 5,895 metres it is the highest point in Africa.',
                    'Take the time you need at the top, then begin the long descent — back down to Kibo Hut, and on to Horombo for the night.',
                ],
                stats: [
                    { label: 'Summit', value: '5,895 m — Uhuru Peak' },
                    { label: 'Ascent', value: 'Approx. 5–7 hours' },
                    { label: 'Descent', value: 'Approx. 5–6 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'Uhuru Peak at sunrise — the Roof of Africa',
                overnight: 'Horombo Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Horombo Hut – Marangu Gate – Arusha',
                paragraphs: [
                    'The last descent runs back down through the heathland and the rainforest to Marangu Gate.',
                    'At the gate you collect your Kilimanjaro certificate and mark the climb with the crew who got you up it.',
                    'Your private transfer then takes you back to Arusha or Moshi, and a shower, a massage and a bed that is not a bunk.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,700 m – 1,860 m' },
                    { label: 'Distance', value: 'Approx. 20 km' },
                    { label: 'Hiking', value: '4–6 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                meals: 'Breakfast & lunch',
            },
        ],
        included: trekIncluded(
            'Hut fees',
            'Mountain hut accommodation',
            'Mess and cooking facilities',
        ),
        excluded: TREK_EXCLUDED,
        faqs: [
            {
                question: 'What is the accommodation like on Marangu?',
                answer:
                    'Marangu is the only main Kilimanjaro route with permanent huts, so you sleep in a bunk under a roof rather than in a tent — at Mandara, Horombo and Kibo. Sleeping mattresses are provided; a warm sleeping bag is not, and you should bring one rated for sub-zero nights.',
            },
            ...TREK_FAQS,
        ],
    },
    {
        slug: '7-day-machame-route-kilimanjaro',
        name: '7-Day Machame Route',
        region: 'Kilimanjaro National Park',
        category: 'Kilimanjaro Trek',
        routes: ['trekking'],
        duration: '7 Days / 6 Nights',
        days: 7,
        nights: 6,
        price: trekCardPrice(7),
        image: '/images/kili-ash-ridge-cloud-1400.webp',
        imageSrcset:
            '/images/kili-ash-ridge-cloud-900.webp 900w, /images/kili-ash-ridge-cloud-1400.webp 1400w, /images/kili-ash-ridge-cloud-1920.webp 1920w',
        imageAlt:
            'A file of trekkers working up a ridge of black volcanic ash in thick cloud, high on the mountain',
        summary:
            'The Whisky Route, and the most scenic way up the mountain — rainforest, the Shira moorland, the Lava Tower acclimatisation climb, the Barranco Wall, and a summit push from Barafu. Seven days rather than six, which is the difference between arriving at the crater rim acclimatised and arriving at it hoping.',
        priceFrom: trekTotal(7),
        priceUnit: 'Per person sharing',
        priceLines: [],
        bestTime: 'January – March & June – October',
        highlights: [
            'The most scenic of Kilimanjaro’s routes, and the one most people climb',
            'Four habitats in seven days — rainforest, moorland, alpine desert and the summit zone',
            'A climb-high-sleep-low acclimatisation day at Lava Tower, 4,640 m',
            'The Barranco Wall — a scramble rather than a technical climb',
            'A seventh day, so the ascent is gradual rather than rushed',
            'Uhuru Peak at 5,895 metres, reached at sunrise',
            'Quality mountain tents, mess and cooking tents, camping chairs and tables',
            'A hot shower and a complimentary massage waiting at the bottom',
        ],
        destinations: [
            'Arusha',
            'Machame Gate',
            'Shira',
            'Barranco',
            'Barafu',
            'Uhuru Peak',
            'Mweka',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Start' },
                { ...PT.kiliMachameGate, label: 'Day 1' },
                { ...PT.kiliMachameCamp, label: 'Day 1' },
                { ...PT.kiliShira2, label: 'Day 2' },
                { ...PT.kiliLavaTower, label: 'Day 3' },
                { ...PT.kiliBarranco, label: 'Day 3' },
                { ...PT.kiliKaranga, label: 'Day 4' },
                { ...PT.kiliBarafu, label: 'Day 5' },
                { ...PT.kiliUhuru, label: 'Day 6' },
                { ...PT.kiliMwekaCamp, label: 'Day 6' },
                { ...PT.kiliMwekaGate, label: 'Day 7' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arusha – Machame Gate – Machame Camp',
                paragraphs: [
                    'After breakfast your private transfer takes you from Arusha to Machame Gate for registration and the park formalities.',
                    'The trek starts in thick rainforest, on a beautiful trail beneath the canopy — birdlife the whole way, and colobus monkeys if you are lucky.',
                    'Five or six hours in you reach Machame Camp, and your first night on the mountain.',
                ],
                stats: [
                    { label: 'Elevation', value: '1,811 m – 3,021 m (+1,210 m)' },
                    { label: 'Hiking', value: '5–6 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                wildlife: ['Colobus monkey', 'Forest birdlife'],
                overnight: 'Machame Camp',
                meals: 'Lunch & dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Machame Camp – Shira Camp',
                paragraphs: [
                    'The rainforest gives way to open moorland as the trail climbs, and the mountain gets very much bigger around you.',
                    'By the time you reach Shira Camp the landscape is wide open, with Kibo ahead and the highlands falling away behind. There is time to rest and take it in.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,021 m – 3,839 m (+818 m)' },
                    { label: 'Hiking', value: '4–5 hours' },
                    { label: 'Habitat', value: 'Moorland' },
                ],
                overnight: 'Shira Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Shira Camp – Lava Tower – Barranco Camp',
                paragraphs: [
                    'The most important day of the climb for acclimatisation, and one of the most memorable to walk.',
                    'You climb gradually to Lava Tower at around 4,640 metres, then descend towards Barranco Camp. Gaining the altitude and then giving it back is what teaches your body to cope with it.',
                    'The volcanic landscape up here is the strangest on the mountain.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,839 m – Lava Tower – approx. 3,986 m' },
                    { label: 'Hiking', value: '5–7 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'Lava Tower at 4,640 m — climb high, sleep low',
                overnight: 'Barranco Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Barranco Camp – Karanga Camp',
                paragraphs: [
                    'The day starts with the Barranco Wall. It looks worse from below than it is — a steady scramble with your hands on rock in places, and no technical climbing at all.',
                    'Above the wall the trail carries on through the Karanga Valley to camp. It is a short day on purpose: the rest and the altitude are doing more for you than the distance would.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,986 m – 4,034 m' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'The Barranco Wall',
                overnight: 'Karanga Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Karanga Camp – Barafu Camp',
                paragraphs: [
                    'On through the alpine desert to Barafu, the last camp before the summit. The ground is bare and the scale of the thing is unmistakable from here.',
                    'You eat well, lay out your summit gear and sleep early. You will be up again around midnight.',
                ],
                stats: [
                    { label: 'Elevation', value: '4,034 m – 4,662 m (+628 m)' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                overnight: 'Barafu Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Barafu Camp – Uhuru Peak – Mweka Camp',
                paragraphs: [
                    'Around midnight your guides wake you for a hot drink and a light meal, and the summit push begins in the dark.',
                    'You climb towards Stella Point on the crater rim, and from there on to Uhuru Peak at 5,895 metres. The sun comes up over Africa somewhere along the way.',
                    'After time at the top you descend to Barafu for a rest and a meal, then carry on down to Mweka Camp for your last night on the mountain.',
                ],
                stats: [
                    { label: 'Summit', value: '5,895 m (+1,233 m)' },
                    { label: 'Ascent', value: '5–7 hours' },
                    { label: 'Descent', value: '5–6 hours, approx. 2,789 m lost' },
                    { label: 'Habitat', value: 'High alpine & summit zone' },
                ],
                highlight: 'Sunrise from Uhuru Peak, the highest point in Africa',
                overnight: 'Mweka Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Mweka Camp – Arusha',
                paragraphs: [
                    'A last descent through the rainforest to Mweka Gate, where your driver is waiting.',
                    'From there it is the transfer back to Arusha or Moshi — a hot shower, a proper bed, and a climb behind you.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,106 m – 1,633 m (−1,473 m)' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                meals: 'Breakfast & lunch',
            },
        ],
        included: trekIncluded(
            'Camping fees',
            'Accommodation in quality mountain tents',
            'Mess and cooking tents, with camping chairs and tables',
        ),
        excluded: TREK_EXCLUDED,
        faqs: [
            {
                question: 'How hard is the Barranco Wall?',
                answer:
                    'Less hard than it looks from the camp below it. It is a steady scramble — you will use your hands on a few sections — rather than a technical climb, and no ropes or equipment are needed. Your guide sets the pace and the crew go up it carrying everything.',
            },
            ...TREK_FAQS,
        ],
    },
    {
        slug: '7-day-rongai-route-kilimanjaro',
        name: '7-Day Rongai Route',
        region: 'Kilimanjaro National Park',
        category: 'Kilimanjaro Trek',
        routes: ['trekking'],
        duration: '7 Days / 6 Nights',
        days: 7,
        nights: 6,
        price: trekCardPrice(7),
        image: '/images/kili-snowfield-ascent-1400.webp',
        imageSrcset:
            '/images/kili-snowfield-ascent-900.webp 900w, /images/kili-snowfield-ascent-1400.webp 1400w, /images/kili-snowfield-ascent-1920.webp 1920w',
        imageAlt:
            'Four trekkers in down jackets walking up a snowfield in single file with poles and full packs, the rounded summit ahead of them under a clear sky',
        summary:
            'The only major route that comes at Kilimanjaro from the north, starting near the Kenyan border. Quieter trails, open country, and an extra acclimatisation day at Mawenzi Tarn beneath the most dramatic camp on the mountain — then across the Saddle to Kibo and the summit.',
        priceFrom: trekTotal(7),
        priceUnit: 'Per person sharing',
        priceLines: [],
        bestTime: 'January – March & June – October',
        highlights: [
            'The only main Kilimanjaro route approaching from the north',
            'The quietest trails on the mountain, and a different view of it',
            'Comparatively drier going when the southern slopes are getting the rain',
            'An extra acclimatisation day at Mawenzi Tarn, beneath Mawenzi Peak',
            'The Saddle — the high desert between Mawenzi and Kibo — crossed on foot',
            'Uhuru Peak at 5,895 metres, reached at sunrise',
            'A descent by the Marangu route, so you come down a different side',
            'A hot shower and a complimentary massage waiting at the bottom',
        ],
        destinations: [
            'Arusha',
            'Rongai Gate',
            'Kikelewa',
            'Mawenzi Tarn',
            'Kibo Hut',
            'Uhuru Peak',
            'Marangu Gate',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.moshi, label: 'Start' },
                { ...PT.kiliRongaiGate, label: 'Day 1' },
                { ...PT.kiliSimba, label: 'Day 1' },
                { ...PT.kiliKikelewa, label: 'Day 2' },
                { ...PT.kiliMawenziTarn, label: 'Days 3–4' },
                { ...PT.kiliKibo, label: 'Day 5' },
                { ...PT.kiliUhuru, label: 'Day 6' },
                { ...PT.kiliHorombo, label: 'Day 6' },
                { ...PT.marangu, label: 'Day 7' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arusha or Moshi – Rongai Gate – Simba Camp',
                paragraphs: [
                    'After breakfast you drive out to Rongai Gate, close to the Kenyan border, for registration and the park formalities.',
                    'From the gate the trail climbs gently through forest and the northern foothills, with birdlife and forest game along the way.',
                    'You reach Simba Camp in the afternoon and settle in for your first evening on the mountain.',
                ],
                stats: [
                    { label: 'Elevation', value: '1,997 m – 2,635 m (+638 m)' },
                    { label: 'Distance', value: 'Approx. 7 km' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                wildlife: ['Forest birdlife'],
                overnight: 'Simba Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Simba Camp – Kikelewa Cave',
                paragraphs: [
                    'The longest day of the climb. The forest opens into moorland as the trail works its way up towards Kikelewa Cave, with lunch somewhere along it.',
                    'By the afternoon the country is wide and open, and the view runs right out across northern Tanzania.',
                ],
                stats: [
                    { label: 'Elevation', value: '2,635 m – 3,600 m (+965 m)' },
                    { label: 'Distance', value: 'Approx. 17 km' },
                    { label: 'Hiking', value: '6–7 hours' },
                    { label: 'Habitat', value: 'Moorland' },
                ],
                overnight: 'Kikelewa Cave Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Kikelewa Cave – Mawenzi Tarn',
                paragraphs: [
                    'A shorter day, but a steeper one, up through high moorland and increasingly broken ground.',
                    'Mawenzi Tarn is the most spectacular camp on Kilimanjaro — a small tarn under the volcanic spires of Mawenzi itself. Settle in and look up.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,600 m – 4,330 m (+730 m)' },
                    { label: 'Distance', value: 'Approx. 7 km' },
                    { label: 'Hiking', value: '4–5 hours' },
                    { label: 'Habitat', value: 'Semi-desert / alpine zone' },
                ],
                highlight: 'Camp beneath the spires of Mawenzi',
                overnight: 'Mawenzi Tarn Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Mawenzi Tarn – Acclimatisation Day',
                paragraphs: [
                    'A day to slow down. You stay at Mawenzi Tarn and take a short acclimatisation walk around the area, which gives your body the time it needs before the summit stages.',
                    'With Mawenzi Peak rising straight out of the camp, it is also the best place on the mountain to stop and take in the size of the thing.',
                ],
                stats: [
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'An extra day at 4,330 m, spent acclimatising rather than climbing',
                overnight: 'Mawenzi Tarn Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Mawenzi Tarn – Kibo Hut',
                paragraphs: [
                    'You leave Mawenzi and cross the Saddle, the broad high-altitude desert between Mawenzi and Kibo. Nothing much grows up here and the walking is stark and strange.',
                    'Kibo Hut sits at around 4,700 metres. Dinner is early and so is bed — the summit attempt starts around midnight.',
                ],
                stats: [
                    { label: 'Elevation', value: '4,330 m – 4,695 m (+365 m)' },
                    { label: 'Distance', value: 'Approx. 8 km' },
                    { label: 'Hiking', value: '4–5 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                overnight: 'Kibo Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Kibo Hut – Uhuru Peak – Horombo Hut',
                paragraphs: [
                    'Shortly after midnight, a hot drink and a light meal, and then the climb under the stars.',
                    'The trail rises to Gilman’s Point and Stella Point before following the crater rim round to Uhuru Peak. At 5,895 metres it is the highest point in Africa, and you will watch the sun come up from it.',
                    'Then the long way down — through Kibo Hut and across the upper slopes to Horombo, where you spend the night.',
                ],
                stats: [
                    { label: 'Summit', value: '5,895 m (+1,233 m)' },
                    { label: 'Ascent', value: '5–7 hours' },
                    { label: 'Descent', value: '5–6 hours, approx. 2,205 m lost' },
                    { label: 'Habitat', value: 'Alpine desert / summit zone' },
                ],
                highlight: 'Sunrise from Uhuru Peak, the highest point in Africa',
                overnight: 'Horombo Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Horombo Hut – Marangu Gate – Arusha or Moshi',
                paragraphs: [
                    'The final descent goes down through heathland and rainforest to Marangu Gate — a different side of the mountain from the one you came up.',
                    'At the gate you collect your summit certificate and mark the climb with your crew.',
                    'Your vehicle then takes you back to Arusha or Moshi for a well-earned rest.',
                ],
                stats: [
                    { label: 'Elevation', value: 'Approx. 3,690 m – 1,860 m' },
                    { label: 'Distance', value: 'Approx. 15–16 km' },
                    { label: 'Hiking', value: '5–6 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                meals: 'Breakfast & lunch',
            },
        ],
        included: trekIncluded(
            'Camping and hut fees',
            'Mountain camps and huts along the route',
            'Quality mountain tents where the route camps rather than uses huts',
            'Mess and cooking facilities',
        ),
        excluded: TREK_EXCLUDED,
        faqs: [
            {
                question: 'Why climb from the north?',
                answer:
                    'Two reasons. Rongai is much the quietest of the main routes, so you share the trail with far fewer people than on Machame or Marangu. And the northern side sits in the mountain’s rain shadow, so when the southern slopes are wet the going up here is often noticeably drier.',
            },
            ...TREK_FAQS,
        ],
    },
    {
        slug: '8-day-lemosho-route-kilimanjaro',
        name: '8-Day Lemosho Route',
        region: 'Kilimanjaro National Park',
        category: 'Kilimanjaro Trek',
        routes: ['trekking'],
        duration: '8 Days / 7 Nights',
        days: 8,
        nights: 7,
        price: trekCardPrice(8),
        image: '/images/kili-snowfield-ascent-1400.webp',
        imageSrcset:
            '/images/kili-snowfield-ascent-900.webp 900w, /images/kili-snowfield-ascent-1400.webp 1400w, /images/kili-snowfield-ascent-1920.webp 1920w',
        imageAlt:
            'Four trekkers in down jackets walking up a snowfield in single file with poles and full packs, the rounded summit ahead of them under a clear sky',
        summary:
            'Our preferred route for anyone who would rather arrive at the summit than merely attempt it. Eight days up the western side — rainforest, two nights crossing the Shira Plateau, Lava Tower, the Barranco Wall and Barafu — with the extra days spent acclimatising and the trails quieter than on Machame.',
        priceFrom: trekTotal(8),
        priceUnit: 'Per person sharing',
        priceLines: [],
        bestTime: 'January – March & June – October',
        highlights: [
            'One of our preferred routes, and the best acclimatisation profile of the four camping climbs',
            'Eight days, so the ascent is gradual rather than rushed',
            'Two days crossing the Shira Plateau, one of Kilimanjaro’s great landscapes',
            'A climb-high-sleep-low acclimatisation day at Lava Tower, 4,640 m',
            'The Barranco Wall — a scramble rather than a technical climb',
            'Quieter trails than the routes that start on the south side',
            'Uhuru Peak at 5,895 metres, reached at first light',
            'A hot shower and a complimentary massage waiting at the bottom',
        ],
        destinations: [
            'Arusha',
            'Londorossi Gate',
            'Shira Plateau',
            'Barranco',
            'Barafu',
            'Uhuru Peak',
            'Mweka',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Start' },
                { ...PT.kiliLondorossiGate, label: 'Day 1' },
                { ...PT.kiliMtiMkubwa, label: 'Day 1' },
                { ...PT.kiliShira1, label: 'Day 2' },
                { ...PT.kiliShira2, label: 'Day 3' },
                { ...PT.kiliLavaTower, label: 'Day 4' },
                { ...PT.kiliBarranco, label: 'Day 4' },
                { ...PT.kiliKaranga, label: 'Day 5' },
                { ...PT.kiliBarafu, label: 'Day 6' },
                { ...PT.kiliUhuru, label: 'Day 7' },
                { ...PT.kiliMwekaCamp, label: 'Day 7' },
                { ...PT.kiliMwekaGate, label: 'Day 8' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arusha – Londorossi Gate – Mti Mkubwa Camp',
                paragraphs: [
                    'After breakfast your private transfer takes you round to Londorossi Gate on the western side of the mountain, where the climb begins.',
                    'The trail winds up through thick rainforest — colobus monkeys and forest game are both possible — and after three or four hours you reach Mti Mkubwa, "Big Tree Camp", for your first night.',
                ],
                stats: [
                    { label: 'Elevation', value: '2,389 m – 2,785 m' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                wildlife: ['Colobus monkey', 'Forest birdlife'],
                overnight: 'Mti Mkubwa Camp',
                meals: 'Lunch & dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Mti Mkubwa – Shira 1 Camp',
                paragraphs: [
                    'The rainforest gives way to open moorland and heather as the trail climbs towards the Shira Plateau.',
                    'The landscape opens dramatically on this stretch, and you get your first wide view of the mountain you are on.',
                ],
                stats: [
                    { label: 'Elevation', value: '2,785 m – 3,504 m' },
                    { label: 'Hiking', value: '4–6 hours' },
                    { label: 'Habitat', value: 'Moorland' },
                ],
                overnight: 'Shira 1 Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Shira 1 – Shira 2 Camp',
                paragraphs: [
                    'A gentler day, and a deliberate one — it exists to let your body catch up with the altitude rather than to cover ground.',
                    'You cross the Shira Plateau itself, an ancient collapsed caldera with sweeping views and high-altitude vegetation found almost nowhere else, and reach Shira 2 in good time.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,504 m – 3,895 m' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Low alpine zone' },
                ],
                highlight: 'Crossing the Shira Plateau',
                overnight: 'Shira 2 Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Shira 2 – Lava Tower – Barranco Camp',
                paragraphs: [
                    'The key acclimatisation day. You climb to Lava Tower at around 4,640 metres, then drop down into the Barranco Valley to sleep — the altitude gained and then given back is what makes the summit possible.',
                    'The valley, and the Barranco Wall standing over the camp, make this one of the most memorable stretches of the route.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,895 m – Lava Tower – approx. 4,000 m' },
                    { label: 'Hiking', value: '5–7 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'Lava Tower at 4,640 m — climb high, sleep low',
                overnight: 'Barranco Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Barranco – Karanga Camp',
                paragraphs: [
                    'The morning starts with the Barranco Wall — a steady scramble rather than a technical climb, and over quicker than you expect.',
                    'Above it the trail runs on through the Karanga Valley with the mountain around you all day. It is a short day on purpose, so the afternoon goes on rest and acclimatisation.',
                ],
                stats: [
                    { label: 'Elevation', value: 'Approx. 3,986 m – 4,034 m' },
                    { label: 'Hiking', value: '4–5 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'The Barranco Wall',
                overnight: 'Karanga Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Karanga – Barafu Camp',
                paragraphs: [
                    'A steady climb through the alpine desert to Barafu, the last camp before the summit.',
                    'You eat well and settle in early. The summit push begins in the middle of the night.',
                ],
                stats: [
                    { label: 'Elevation', value: '4,034 m – 4,662 m' },
                    { label: 'Hiking', value: '4–5 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                overnight: 'Barafu Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Barafu Camp – Uhuru Peak – Mweka Camp',
                paragraphs: [
                    'Around midnight your guides wake you for a hot drink and a light meal, and the climb starts in the dark.',
                    'It is a demanding ascent, but the pace is managed carefully. You reach Stella Point on the crater rim as the first light comes up, and from there carry on to Uhuru Peak at 5,895 metres — the highest point in Africa.',
                    'After time at the top and a rest and a meal back at Barafu, you continue down to Mweka Camp for your last night on the mountain.',
                    'Trekking poles and gaiters earn their place today: the ascent and descent are both on loose volcanic gravel and ash.',
                ],
                stats: [
                    { label: 'Summit', value: '5,895 m — Uhuru Peak' },
                    { label: 'Ascent', value: 'Approx. 5–7 hours' },
                    { label: 'Descent', value: 'Approx. 5–6 hours' },
                    { label: 'Habitat', value: 'High alpine & summit zone' },
                ],
                highlight: 'First light from Uhuru Peak, the highest point in Africa',
                overnight: 'Mweka Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'Mweka Camp – Arusha',
                paragraphs: [
                    'A last descent through the rainforest to Mweka Gate, and a chance to mark the climb with the crew before your private transfer arrives.',
                    'From there it is back to Arusha for a well-earned rest — or straight on to a safari or Zanzibar, if you have booked one on the end.',
                ],
                stats: [
                    { label: 'Hiking', value: 'Approx. 3–4 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                meals: 'Breakfast & lunch',
            },
        ],
        included: trekIncluded(
            'Camping fees',
            'Accommodation in quality mountain tents',
            'Mess and cooking tents, with camping chairs and tables',
        ),
        excluded: TREK_EXCLUDED,
        faqs: [
            {
                question: 'Why Lemosho rather than Machame?',
                answer:
                    'Two reasons. Lemosho starts on the western side, which is much less used than the southern gates, so the first three days are quiet. And the extra day gives a gentler acclimatisation profile than the seven-day Machame — which, on a mountain where almost every failed summit is an altitude problem rather than a fitness one, is the thing that matters most.',
            },
            ...TREK_FAQS,
        ],
    },
    {
        slug: '9-day-northern-circuit-kilimanjaro',
        name: '9-Day Northern Circuit Route',
        region: 'Kilimanjaro National Park',
        category: 'Kilimanjaro Trek',
        routes: ['trekking'],
        duration: '9 Days / 8 Nights',
        days: 9,
        nights: 8,
        price: trekCardPrice(9),
        image: '/images/kili-summit-ridge-climbers-1400.webp',
        imageSrcset:
            '/images/kili-summit-ridge-climbers-900.webp 900w, /images/kili-summit-ridge-climbers-1400.webp 1400w, /images/kili-summit-ridge-climbers-1920.webp 1920w',
        imageAlt:
            'Three climbers in cold-weather kit stopped on bare rock high on the mountain under a deep blue sky',
        summary:
            'Kilimanjaro’s longest route, and a near-complete circuit of the mountain. You come in from the west over the Shira Plateau, turn north around the quiet side — remote valleys, high wilderness, the plains running away towards Kenya — approach Uhuru Peak from the east, and come down the Mweka route.',
        priceFrom: trekTotal(9),
        priceUnit: 'Per person sharing',
        priceLines: [],
        bestTime: 'January – March & June – October',
        highlights: [
            'The longest route on Kilimanjaro, and the most time at altitude before the summit',
            'A wide clockwise circuit of the mountain, up one side and down the other',
            'The remote northern slopes, which almost nobody walks',
            'The Shira Plateau, Lava Tower and the Lent Hills',
            'Views north across the plains towards the Kenyan border',
            'A greater variety of landscape than any shorter route',
            'Uhuru Peak at 5,895 metres, approached from the east',
            'A hot shower and a complimentary massage waiting at the bottom',
        ],
        destinations: [
            'Arusha',
            'Londorossi Gate',
            'Shira Plateau',
            'Moir Hut',
            'Buffalo Camp',
            'School Hut',
            'Uhuru Peak',
            'Mweka',
        ],
        route: {
            start: PT.jro,
            points: [
                { ...PT.arusha, label: 'Start' },
                { ...PT.kiliLondorossiGate, label: 'Day 1' },
                { ...PT.kiliMtiMkubwa, label: 'Day 1' },
                { ...PT.kiliShira1, label: 'Day 2' },
                { ...PT.kiliShira2, label: 'Day 3' },
                { ...PT.kiliLavaTower, label: 'Day 4' },
                { ...PT.kiliMoir, label: 'Day 4' },
                { ...PT.kiliBuffalo, label: 'Day 5' },
                { ...PT.kiliThirdCave, label: 'Day 6' },
                { ...PT.kiliSchoolHut, label: 'Day 7' },
                { ...PT.kiliUhuru, label: 'Day 8' },
                { ...PT.kiliMwekaCamp, label: 'Day 8' },
                { ...PT.kiliMwekaGate, label: 'Day 9' },
            ],
            end: PT.jro,
        },
        itinerary: [
            {
                n: 1,
                label: 'Day 1',
                title: 'Arusha or Moshi – Londorossi Gate – Mti Mkubwa Camp',
                paragraphs: [
                    'The climb begins with a transfer from Arusha or Moshi to Londorossi Gate and the park formalities, then on to the trailhead.',
                    'From there you walk up through the rainforest on the western side of the mountain. The forest is thick with birds, and blue colobus monkeys are common along the trail.',
                    'After several hours you reach Mti Mkubwa — "Big Tree Camp" — for your first night.',
                ],
                stats: [
                    { label: 'Elevation', value: '2,389 m – 2,785 m (+396 m)' },
                    { label: 'Distance', value: 'Approx. 4.8 km' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                wildlife: ['Blue colobus monkey', 'Forest birdlife'],
                overnight: 'Mti Mkubwa Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 2,
                label: 'Day 2',
                title: 'Mti Mkubwa Camp – Shira 1 Camp',
                paragraphs: [
                    'The rainforest gives way to open moorland, heather and high-altitude vegetation.',
                    'The trail climbs steadily over rolling ground and across small streams before it reaches the Shira Plateau. As you come up to Shira 1 the country opens right out, and Kibo appears ahead for the first time.',
                ],
                stats: [
                    { label: 'Elevation', value: '2,785 m – 3,504 m (+719 m)' },
                    { label: 'Distance', value: 'Approx. 7.9 km' },
                    { label: 'Hiking', value: '4–6 hours' },
                    { label: 'Habitat', value: 'Moorland' },
                ],
                overnight: 'Shira 1 Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 3,
                label: 'Day 3',
                title: 'Shira 1 Camp – Shira 2 Camp',
                paragraphs: [
                    'A relatively gentle day across the Shira Plateau, which gives your body more time to adjust to the altitude.',
                    'The trail crosses open meadows and high-altitude vegetation on its way to Shira 2. The views from up here are among the most striking on the mountain — worth the evening it takes to sit and look at them.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,504 m – 3,895 m (+391 m)' },
                    { label: 'Distance', value: 'Approx. 7.9 km' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Low alpine / moorland' },
                ],
                overnight: 'Shira 2 Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 4,
                label: 'Day 4',
                title: 'Shira 2 Camp – Lava Tower – Moir Hut',
                paragraphs: [
                    'East towards Lava Tower, the most distinctive volcanic formation on Kilimanjaro, climbing hard before dropping to the remote Moir Hut on the northern side.',
                    'Going high and then sleeping lower is deliberate, and it is the single most useful acclimatisation day of the route.',
                    'Depending on conditions and what your guide makes of how you are going, there may be time for short walks in the hills around camp.',
                ],
                stats: [
                    { label: 'Elevation', value: 'Approx. 3,895 m – 4,630 m – 4,200 m' },
                    { label: 'Distance', value: 'Approx. 14–18 km' },
                    { label: 'Hiking', value: '5–7 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'Lava Tower at 4,630 m — climb high, sleep low',
                overnight: 'Moir Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 5,
                label: 'Day 5',
                title: 'Moir Hut – Buffalo Camp',
                paragraphs: [
                    'Out of the Moir Valley and up towards the Lent Hills, where the trail joins the Northern Circuit proper.',
                    'From there it crosses remote, rocky country to Buffalo Camp. The day is worth it for the view alone: the northern plains laid out below you, running all the way to the Kenyan border.',
                ],
                stats: [
                    { label: 'Elevation', value: 'Approx. 4,200 m – 4,020 m' },
                    { label: 'Distance', value: 'Approx. 9–12 km' },
                    { label: 'Hiking', value: '5–7 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                highlight: 'The northern plains, out towards the Kenyan border',
                overnight: 'Buffalo Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 6,
                label: 'Day 6',
                title: 'Buffalo Camp – Third Cave',
                paragraphs: [
                    'On around the northern slopes, through remote valleys and open high-altitude country towards Third Cave.',
                    'This is the quietest stretch of the whole route, and the part that feels most like wilderness — the gradual ground means you go on acclimatising while you walk.',
                ],
                stats: [
                    { label: 'Elevation', value: 'Approx. 4,020 m – 3,936 m' },
                    { label: 'Distance', value: 'Approx. 7 km' },
                    { label: 'Hiking', value: '5–7 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                overnight: 'Third Cave Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 7,
                label: 'Day 7',
                title: 'Third Cave – School Hut',
                paragraphs: [
                    'A gradual climb towards the Saddle, the high desert lying between Mawenzi and Kibo.',
                    'The trail carries on to School Hut, your last camp before the summit. Dinner is early, and then a few hours of rest before you start climbing around midnight.',
                ],
                stats: [
                    { label: 'Elevation', value: '3,936 m – 4,717 m (+781 m)' },
                    { label: 'Distance', value: 'Approx. 5 km' },
                    { label: 'Hiking', value: '5–7 hours' },
                    { label: 'Habitat', value: 'Alpine desert' },
                ],
                overnight: 'School Hut',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 8,
                label: 'Day 8',
                title: 'School Hut – Uhuru Peak – Mweka Camp',
                paragraphs: [
                    'Around midnight, a hot drink and a light meal, and then the ascent under the stars.',
                    'The trail climbs to Gilman’s Point, then follows the crater rim round by Stella Point to Uhuru Peak. At 5,895 metres it is the highest point in Africa — take the time you need up there.',
                    'Then the long descent towards Mweka Camp, with a stop for lunch and then down through the upper forest to your last night on the mountain.',
                ],
                stats: [
                    { label: 'Summit', value: '5,895 m (+1,178 m)' },
                    { label: 'Ascent', value: '6–8 hours' },
                    { label: 'Descent', value: '5–6 hours' },
                    { label: 'Habitat', value: 'Alpine desert / upper forest' },
                ],
                highlight: 'Uhuru Peak at sunrise, approached from the east',
                overnight: 'Mweka Camp',
                meals: 'Breakfast, lunch & dinner',
            },
            {
                n: 9,
                label: 'Day 9',
                title: 'Mweka Camp – Mweka Gate – Arusha or Moshi',
                paragraphs: [
                    'The last descent runs down through the rainforest to Mweka Gate.',
                    'At the gate you collect your Kilimanjaro summit certificate and mark nine days on the mountain with the crew who carried it with you.',
                    'Your vehicle meets you there for the transfer back to Arusha or Moshi.',
                ],
                stats: [
                    { label: 'Elevation', value: 'Approx. 3,106 m – 1,633 m' },
                    { label: 'Distance', value: 'Approx. 9–10 km' },
                    { label: 'Hiking', value: '3–4 hours' },
                    { label: 'Habitat', value: 'Rainforest' },
                ],
                meals: 'Breakfast & lunch',
            },
        ],
        included: trekIncluded(
            'Camping fees',
            'Accommodation in quality mountain tents',
            'Mess and cooking facilities',
        ),
        excluded: TREK_EXCLUDED,
        faqs: [
            {
                question: 'Is nine days worth it over seven or eight?',
                answer:
                    'If you want the best odds on the summit, yes. The Northern Circuit puts more days at altitude behind you than any other route on the mountain before you attempt Uhuru Peak, and the summit success rate reflects that. It is also the quietest and the most varied — you go up one side of Kilimanjaro and down the other.',
            },
            ...TREK_FAQS,
        ],
    },
]

/*
 * The two product lines, derived from the tag rather than listed by hand so a
 * new itinerary lands in the right band the moment it is written. `trekking`
 * means the mountain and nothing else (see `RouteTag`).
 *
 * /safari-packages lists both, in a band each: SAFARIS, then TREKS. It is the
 * only page that carries the whole catalogue. /kilimanjaro lists TREKS on
 * their own, because "Kilimanjaro climb" is a far bigger search term than
 * anything on the safari side and a trekker is reading for acclimatisation
 * and crew rather than for camps.
 *
 * The itinerary pages themselves stay under /safari-packages/<slug>/ for both
 * — the climbs were indexed there first and moving them would break links for
 * nothing. That is also why their breadcrumb reads "Safari Packages", which
 * now lands somewhere that actually lists them.
 */
export const TREKS = PACKAGES.filter((pkg) => pkg.routes.includes('trekking'))
export const SAFARIS = PACKAGES.filter((pkg) => !pkg.routes.includes('trekking'))
