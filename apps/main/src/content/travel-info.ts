/**
 * Every word of /travel-information/, in the order the page renders it.
 *
 * The copy is the operator's own "Your Tanzania Safari Travel Guide", supplied
 * as a document and transcribed here rather than paraphrased — the practical
 * numbers in it (15 kg on light aircraft, 158 cm linear, the seasonal
 * temperatures) are the operator's figures, so they are not to be "improved"
 * from general knowledge.
 *
 * Two habits worth keeping if this file is edited:
 *   - nothing here states a medical, visa or insurance requirement as settled.
 *     Malaria prophylaxis, yellow fever certificates, Zanzibar's insurance
 *     rule and visa eligibility all change and all depend on the traveller's
 *     nationality and route, so every one of them points at official sources
 *     or at the safari consultant instead of answering for them.
 *   - the page is one long guide, not a dozen pages. The `id` of every chapter
 *     and section is a published anchor: the chapter bar links to them and the
 *     operator sends guests to them, so renaming one breaks a link someone
 *     has.
 *
 * Shape: four chapters — Seasons, What to Pack, FAQs, Before You Fly —
 * after legendaryexpeditions.co.tz/travel-info, which the client asked this
 * page to read like. `TRAVEL_CHAPTERS` decides the order and which sections
 * sit inside each one; `TRAVEL_SECTIONS` holds the sections themselves, and a
 * section that is not named by a chapter does not render. The practical
 * answers that used to be sections of their own (malaria, visas, money,
 * tipping, drones, connectivity, Zanzibar's insurance rule) are now the
 * questions in `TRAVEL_FAQS`, because a traveller arrives at them with a
 * question rather than reading top to bottom.
 */
import { SITE } from '../config'

/**
 * One photograph, anywhere on this page.
 *
 * `srcset` is absent for the few images in the library that were never cut
 * into widths — they are small enough to serve whole, and every `alt`
 * describes the photograph rather than claiming the place it was taken.
 */
export interface TravelFrame {
    src: string
    srcset?: string
    alt: string
}

/** A frame from the responsive set `<name>-<width>.webp`, as `home.ts` does it. */
const frame = (name: string, widths: readonly number[], alt: string): TravelFrame => ({
    src: `/images/${name}-${widths.includes(1400) ? 1400 : widths[widths.length - 1]}.webp`,
    srcset: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '),
    alt,
})

/** A frame with no responsive set of its own, served at its one width. */
const single = (file: string, alt: string): TravelFrame => ({
    src: `/images/${file}`,
    alt,
})

/** The renderable pieces a section is built from. See TravelSection.blocks. */
export type TravelBlock =
    /** A paragraph of running copy. */
    | { type: 'text'; body: string }
    /**
     * A packing or documents checklist. `columns: 2` sets the list in two
     * columns from `sm` up — for the long ones, where a single column would
     * run to half a screen of dashes.
     */
    | { type: 'list'; label?: string; items: readonly string[]; columns?: 1 | 2 }
    /** An aside on its own surface: "Important", "Tip", "Please note". */
    | { type: 'note'; label: string; body: string }
    /** A heading inside a section, with its own paragraphs. */
    | { type: 'sub'; heading: string; body?: readonly string[] }
    /** The four seasons, in the destination grid's card rhythm. */
    | { type: 'cards'; items: readonly { heading: string; body: string }[] }
    /** Numbered advice — the jet-lag section, and nothing else so far. */
    | { type: 'steps'; items: readonly { heading: string; body: string }[] }
    /** Average temperatures. Kept as a table because it is one. */
    | {
          type: 'table'
          label?: string
          columns: readonly string[]
          rows: readonly (readonly string[])[]
      }
    /**
     * Photographs inside a section — one across the column, or two side by
     * side. They carry nothing the copy does not say, so they are lazy, they
     * are described, and the page reads the same with them switched off.
     */
    | { type: 'figure'; items: readonly TravelFrame[]; caption?: string }

/** One question in the FAQ chapter. `list` renders under the paragraphs. */
export interface TravelFaq {
    question: string
    answer: readonly string[]
    list?: readonly string[]
}

export interface TravelSection {
    /** Published anchor. Also what the index at the top of the page links to. */
    id: string
    heading: string
    /** Standfirst under the heading, in the left rail beside the blocks. */
    standfirst?: string
    blocks: readonly TravelBlock[]
}

export const TRAVEL_INTRO = {
    /** Over the banner photograph. */
    heading: 'Travel Information',
    standfirst: 'Everything you need to know before you travel with Polecat Safaris.',
    /** Under it, on the page's own ground, over the opening paragraphs. */
    guideHeading: 'Your Tanzania safari travel guide',
    paragraphs: [
        'A safari is meant to feel effortless. From the moment you arrive in Tanzania to your final flight home, our aim is to make your journey comfortable, well prepared and wonderfully uncomplicated.',
        'This guide covers the practical details you need before travelling with us — from luggage and clothing to weather, essential documents, health considerations and travelling between Tanzania and Zanzibar.',
        'Pack lightly, travel comfortably and leave a little room for the memories you will take home.',
    ],
    /*
     * Full-bleed banner across the top of the page, which is the shape the
     * reference uses, and the page title now sits on it. Guests walking out to
     * a waiting vehicle — the moment all this packing is for. It used to be
     * the 13-Day Great Migration itinerary's card photograph; that itinerary
     * now has the operator's own migration frame, so this one is only used
     * here.
     *
     * The frame is bright from edge to edge — white sky, dust, a white shirt —
     * so white type needs real weight under it: measured the way
     * scripts/hero-scrim.py measures the homepage, the brightest pixel under
     * the title column is (255,255,255) in every band, which needs 0.48 alpha
     * for the title and 0.61 for the line under it. Hence the gradient in
     * travel-information.astro, which is heavier at the foot than the
     * itinerary heroes' because those photographs are darker where the title
     * lands. Swapping this photograph means measuring it again.
     */
    image: '/images/guests-boarding-game-drive.webp',
    imageAlt:
        'Two guests walking hand in hand to an open safari vehicle where their guide is waiting',
} as const

/**
 * The four chapters, in order, and the sections inside each. A chapter is a
 * band on the page with its own heading; `sections` are the ids it renders,
 * in the order given here rather than the order they happen to sit in
 * TRAVEL_SECTIONS. The FAQs chapter has no sections — it renders
 * TRAVEL_FAQS instead.
 */
export const TRAVEL_CHAPTERS: readonly {
    id: string
    label: string
    heading: string
    standfirst: string
    sections: readonly string[]
    /** Photographs under the chapter head, before its first section. */
    images?: readonly TravelFrame[]
}[] = [
    {
        id: 'seasons',
        label: 'Seasons',
        heading: 'Seasons, and what the weather does',
        standfirst:
            'Tanzania is a year-round safari destination. The season you choose changes the safari more than anything else you will decide, so it comes first.',
        sections: ['weather'],
        /* Dry, green and the hour everyone remembers — the three things the
           four cards below describe, in the order they describe them. */
        images: [
            single(
                'serengeti-migration-game-drive.jpg',
                'A small herd of wildebeest grazing beside an open safari vehicle under a lone flat-topped acacia, the plains running hazy to the horizon'
            ),
            frame(
                'green-season-river-chairs',
                [900, 1400],
                'Four guests sitting in camp chairs set out in the shallows of a river running high and silty, dense green forest and a hillside rising behind them'
            ),
            frame(
                'hero-acacia-chairs',
                [900, 1400, 1920],
                'Two guests in safari chairs on a camp deck, glasses of wine on a table between them, looking out at an acacia and a flat-topped hill across the grass'
            ),
        ],
    },
    {
        id: 'what-to-pack',
        label: 'What to pack',
        heading: 'What to pack',
        standfirst:
            'Soft bags, neutral colours, layers, and less than you think. Laundry at the camps does the rest.',
        sections: ['luggage', 'what-to-wear', 'toiletries', 'safari-essentials'],
        /*
         * The client's two packing photographs, added at their request.
         *
         * Both are generic outdoor-kit flat-lays rather than safari ones, and
         * they disagree with the lists they illustrate: a framed rucksack
         * where the page asks for a soft duffel, red and bright blue where it
         * asks for khaki, olive and brown, and blue jeans. The second frame
         * also had ski gloves and snow goggles in its right third, which is
         * cropped out here — see the crop in the note below.
         *
         * Left in because they were asked for, and the alt text describes what
         * is actually in them rather than what the page recommends. If the
         * operator ever shoots a real one — a khaki duffel, neutral layers, a
         * wide-brimmed hat, binoculars — it replaces both of these and the
         * contradiction goes away.
         */
        images: [
            frame(
                'packing-kit-flatlay',
                [900, 1400],
                'Outdoor kit laid out in rows on a wooden floor: a red rucksack, walking boots, a folded blue jacket and jeans, a camera and lens, binoculars, a water bottle, a phone, a watch, sunglasses and a radio'
            ),
            frame(
                'packing-bag-flatlay',
                [900, 1400],
                'A red framed rucksack lying on floorboards with a pair of telescopic walking poles above it'
            ),
        ],
    },
    {
        id: 'faqs',
        /* "FAQs", in the chapter bar and over the chapter, at the client's
           request. It read "Questions we are asked" until they asked for the
           plainer word; the anchor is unchanged, so every link still lands. */
        label: 'FAQs',
        heading: 'FAQs',
        standfirst:
            'Health, money, visas and the local rules. Where an answer depends on your nationality or your doctor, we say so rather than answer for them.',
        sections: [],
        images: [
            frame(
                'hero-lodge-games',
                [900, 1400],
                'Four people around a wooden table under a thatched roof, mid-game with tiles laid out between them and forest behind'
            ),
            frame(
                'family-lunch-under-acacia',
                [900, 1400],
                'A family at a long lunch table set in the shade of an acacia, with the lake and hills beyond'
            ),
        ],
    },
    {
        id: 'before-you-fly',
        label: 'Before you fly',
        heading: 'Before you fly',
        standfirst:
            'What to carry, what to leave a copy of, and how to arrive in a state to enjoy the first morning.',
        sections: ['before-you-depart', 'jet-lag'],
        /*
         * No frames under this chapter head. It had three — breakfast at
         * sunrise, a lantern dinner, trekkers on the mountain — and none of
         * them said anything about a passport, a travel pouch or a time
         * zone, which is what the two sections under it are about. There is
         * no photograph in the library that does. The jet-lag section keeps
         * its own pair, because "arrive in a state to enjoy the first
         * morning" is a thing a photograph can show.
         */
    },
] as const

export const TRAVEL_SECTIONS: readonly TravelSection[] = [
    {
        id: 'luggage',
        heading: 'Luggage allowance',
        standfirst:
            'If your safari includes light aircraft flights, luggage allowances are generally more restricted than on international flights.',
        blocks: [
            {
                type: 'list',
                label: 'We recommend travelling with',
                items: [
                    'One soft-sided duffel bag per person',
                    'Approximately 15 kg (33 lbs) per person, including hand luggage, where this is the applicable airline allowance',
                    'A maximum linear dimension of approximately 158 cm / 62 inches, where applicable',
                    'A small daypack or handbag for items you need during the day',
                ],
            },
            {
                type: 'text',
                body: 'Soft bags are strongly recommended. They are easier to store in safari vehicles and aircraft luggage compartments than hard suitcases.',
            },
            {
                type: 'figure',
                items: [
                    single(
                        'style-fly-in.webp',
                        'A pilot in uniform carrying two kit bags away from a single-engine Cessna parked on a gravel bush airstrip'
                    ),
                ],
                caption: 'The reason for the soft bag: on a bush flight it has to fit the hold of an aircraft this size.',
            },
            {
                type: 'note',
                label: 'Important',
                body: 'Luggage allowances vary between domestic and scheduled airlines. If your itinerary includes several internal flights, we will advise you of the applicable allowance before departure.',
            },
            {
                type: 'sub',
                heading: 'What to keep in your daypack',
                body: ['Keep your most important personal items easily accessible.'],
            },
            {
                type: 'list',
                columns: 2,
                items: [
                    'Passport and travel documents',
                    'Wallet and money',
                    'Medication',
                    'Sunglasses',
                    'Camera and phone',
                    'Water bottle',
                    'Binoculars',
                    'A light jacket or fleece',
                    'Any personal essentials you may need during the day',
                ],
            },
            {
                type: 'sub',
                heading: 'Travelling with excess luggage?',
                body: [
                    'If you are combining a safari with Zanzibar or another destination and need additional luggage, speak to us before your trip. We can advise you on practical luggage arrangements based on your itinerary.',
                ],
            },
        ],
    },
    {
        id: 'before-you-depart',
        heading: 'What to carry with you',
        standfirst:
            'A little preparation before leaving home makes a big difference once you arrive in Africa.',
        blocks: [
            {
                type: 'text',
                body: 'Keep your essential documents together in a secure and easily accessible travel pouch.',
            },
            {
                type: 'list',
                label: 'We recommend carrying',
                columns: 2,
                items: [
                    'Valid passport',
                    'Tanzania visa, where required',
                    'International flight details',
                    'Domestic flight confirmations',
                    'Travel and medical insurance information',
                    'Emergency contact details',
                    'Copies of important documents',
                    'Credit and debit cards',
                    'Some US dollars in cash',
                    'Any required health certificates',
                    'Prescription medication',
                    'Personal identification',
                ],
            },
            {
                type: 'note',
                label: 'Keep a digital set too',
                body: 'We also recommend keeping copies of your passport, insurance details and important travel documents securely on your phone or in cloud storage.',
            },
        ],
    },
    {
        id: 'what-to-wear',
        heading: 'What to wear on safari',
        standfirst:
            'Safari clothing does not need to be complicated. Think light, comfortable and practical.',
        blocks: [
            {
                type: 'text',
                body: 'Neutral and earthy colours such as khaki, beige, olive, brown and soft grey work particularly well in the bush. They are comfortable for game drives and blend naturally into the environment.',
            },
            {
                type: 'text',
                body: 'Avoid excessively bright colours and camouflage-style clothing.',
            },
            {
                type: 'figure',
                items: [
                    single(
                        'serengeti-bush-coffee.jpg',
                        'A guest in a linen shirt and hat leaning on the front of a safari vehicle above a river while two guides pour coffee from a flask at a laid table'
                    ),
                    frame(
                        'guided-walk-termite-mound',
                        [900, 1400, 1920],
                        'Four guests in sun hats standing with their guide at a termite mound under an acacia, white wildflowers across the grass around them'
                    ),
                ],
                caption: 'Khaki, beige, olive, soft grey — and a hat, on every one of them.',
            },
            {
                type: 'sub',
                heading: 'Layering is the secret',
                body: [
                    'Tanzania can feel surprisingly cool during early-morning game drives and warm during the afternoon. Rather than packing one heavy jacket, bring several lightweight layers that you can add or remove throughout the day.',
                ],
            },
            {
                type: 'list',
                label: 'Suggested safari wardrobe',
                columns: 2,
                items: [
                    '3 pairs of lightweight trousers',
                    '2–3 pairs of comfortable shorts',
                    '2 long-sleeved shirts',
                    '2 short-sleeved shirts or T-shirts',
                    '2 lightweight undershirts',
                    'Lightweight fleece or sweater',
                    'Light windbreaker or bush jacket',
                    'Lightweight rain jacket',
                    'Comfortable walking shoes',
                    'Lightweight hiking shoes or boots, if your itinerary includes walking',
                    'Sandals or flip-flops',
                    'Swimwear',
                    'Comfortable sleepwear',
                    'Socks and underwear',
                    'Sun hat or wide-brimmed hat',
                    'Scarf or buff',
                    'Comfortable activewear',
                ],
            },
            {
                type: 'note',
                label: 'Pack light',
                body: 'Most of our lodges and camps offer laundry services, making it unnecessary to bring a large wardrobe. For many safari itineraries, less is more — a carefully chosen selection of comfortable clothing is all you need.',
            },
        ],
    },
    {
        id: 'toiletries',
        heading: 'Toiletries and personal care',
        standfirst:
            'Our lodges and camps provide many essential bathroom amenities, but guests with preferred brands or specific personal requirements should bring their own.',
        blocks: [
            {
                type: 'list',
                label: 'Useful items to pack',
                columns: 2,
                items: [
                    'Toothbrush and toothpaste',
                    'Dental floss',
                    'Deodorant',
                    'Shampoo and conditioner, if you prefer your own',
                    'Body lotion',
                    'Personal soap',
                    'Sunscreen',
                    'Lip balm with SPF',
                    'Insect repellent',
                    'Hairbrush or comb',
                    'Shaving kit',
                    'Personal cosmetics',
                    'Feminine hygiene products',
                    'Contact lenses, solution and case',
                    'Spare glasses',
                    'Prescription medication',
                    'Small personal first-aid kit',
                    'Any medication for allergies, headaches or other minor conditions',
                    'Small sewing kit',
                ],
            },
            {
                type: 'note',
                label: 'Tip',
                body: 'Keep essential medication in your hand luggage rather than your checked luggage.',
            },
        ],
    },
    {
        id: 'safari-essentials',
        heading: 'Safari essentials',
        standfirst:
            'A few things make a safari considerably more comfortable — and help you capture those unforgettable moments.',
        blocks: [
            {
                type: 'list',
                label: 'We recommend bringing',
                columns: 2,
                items: [
                    'Sunglasses',
                    'Sunscreen',
                    'Binoculars',
                    'Camera and spare batteries',
                    'Extra memory cards',
                    'Phone and charging cable',
                    'Power bank',
                    'Universal travel adapter',
                    'Headphones',
                    'Small flashlight or headlamp',
                    'Reusable water bottle',
                    'Journal or notebook',
                    'Pen',
                    'Small daypack',
                ],
            },
            {
                type: 'figure',
                items: [
                    single(
                        'serengeti-cheetah-plains.jpg',
                        'A cheetah standing on open Serengeti grassland in early morning light'
                    ),
                    frame(
                        'family-walk-maasai-guide',
                        [900, 1400, 1920],
                        'A Maasai guide leading a family on a walking safari, a herd of zebra grazing in the grass behind them'
                    ),
                ],
                caption: 'A pair of binoculars changes what you see out here more than any lens you can carry.',
            },
            {
                type: 'text',
                body: 'And, of course, your sense of curiosity. You never quite know what the next bend in the road will reveal.',
            },
        ],
    },
    {
        id: 'weather',
        heading: 'Month by month',
        standfirst:
            'Tanzania is a year-round safari destination, although the experience changes with the seasons.',
        blocks: [
            {
                type: 'cards',
                items: [
                    {
                        heading: 'December – March',
                        body: 'Generally warm, with green landscapes and excellent conditions for wildlife viewing. This period also includes the spectacular calving season in the southern Serengeti ecosystem.',
                    },
                    {
                        heading: 'April – May',
                        body: 'The traditional long-rain period. Landscapes become exceptionally lush and dramatic, with fewer visitors in many areas. Rainfall can vary considerably from year to year.',
                    },
                    {
                        heading: 'June – October',
                        body: 'The main dry season, bringing generally clear skies, drier landscapes and excellent wildlife viewing. It is also a popular period for the Great Migration in the northern Serengeti, depending on the movement of the herds.',
                    },
                    {
                        heading: 'November – early December',
                        body: 'The short rains refresh the landscape, bringing new greenery and beautiful skies. Wildlife remains present, while visitor numbers can be lower in many areas.',
                    },
                ],
            },
            {
                type: 'figure',
                items: [
                    frame(
                        'migration-herd-vehicle',
                        [900, 1400, 1920],
                        'A column of wildebeest and zebra walking past an open safari vehicle, with thousands more spread across the plain behind them'
                    ),
                    single(
                        'hero-lionesses.webp',
                        'Two lionesses lying together in dry golden grass under a thicket, both watching the camera'
                    ),
                ],
                caption: 'June to October: pale grass, thin cover and the wildlife gathered on what water is left.',
            },
            {
                type: 'table',
                label: 'Average temperatures',
                columns: ['Period', 'Average daytime', 'Average night'],
                rows: [
                    ['January – March', 'Around 28°C / 83°F', 'Around 14°C / 57°F'],
                    ['April – June', 'Around 23°C / 74°F', 'Around 12–14°C / 54–57°F'],
                    ['July – September', 'Around 25°C / 77°F', 'Around 12°C / 54°F'],
                    ['October – December', 'Around 27°C / 81°F', 'Around 14°C / 57°F'],
                ],
            },
            {
                type: 'note',
                label: 'Please note',
                body: 'Tanzania’s weather is naturally variable, and temperatures differ between Arusha, the Serengeti, Ngorongoro, Tarangire, the coast and Zanzibar.',
            },
        ],
    },
    {
        id: 'jet-lag',
        heading: 'Preventing jet lag and dehydration',
        standfirst:
            'After a long international flight, your body may need some time to adjust to East Africa Time (GMT+3). A few simple habits help.',
        blocks: [
            {
                type: 'steps',
                items: [
                    {
                        heading: 'Start adjusting before departure',
                        body: 'Gradually move your sleeping and meal schedule closer to Tanzania time if that is practical.',
                    },
                    {
                        heading: 'Stay hydrated',
                        body: 'Drink water regularly before, during and after your flight.',
                    },
                    {
                        heading: 'Sleep well',
                        body: 'Arriving well rested makes the first days of your safari more enjoyable.',
                    },
                    {
                        heading: 'Limit alcohol',
                        body: 'Alcohol can contribute to dehydration and disturb your sleep.',
                    },
                    {
                        heading: 'Enjoy natural light',
                        body: 'Spending time outdoors after arrival can help your body adjust to the new time zone.',
                    },
                    {
                        heading: 'Move during your flight',
                        body: 'Stretch your legs and move around periodically on a long flight.',
                    },
                    {
                        heading: 'Eat lightly',
                        body: 'Choose nutritious meals and avoid excessively heavy or salty food.',
                    },
                    {
                        heading: 'Pack your flight essentials',
                        body: 'A neck pillow, eye mask, headphones and comfortable clothing make a long journey easier.',
                    },
                    {
                        heading: 'Give yourself time',
                        body: 'Where your itinerary allows, avoid planning an exhausting activity immediately after a long international flight.',
                    },
                    {
                        heading: 'Listen to your body',
                        body: 'A safari is not a race. Rest when you need to and enjoy the journey at your own pace.',
                    },
                ],
            },
            {
                type: 'figure',
                items: [
                    frame(
                        'family-mess-tent-dinner',
                        [900, 1400],
                        'Three generations of a family passing dishes around a long table in the mess tent'
                    ),
                    frame(
                        'hero-firepit-dinner',
                        [900, 1400, 1920],
                        'A couple laughing over dinner at a table laid out in the bush, a fire burning in the foreground and lanterns hung in the trees behind them'
                    ),
                ],
                caption: 'Land with a day in hand and the first dinner is the trip beginning rather than the flight ending.',
            },
        ],
    },
] as const

/**
 * The FAQs chapter. These were six sections of their own before the page
 * was reshaped; as questions they are easier to scan and easier to link a
 * guest to, and nothing was dropped in the move.
 *
 * Every answer that depends on a nationality, a doctor or an immigration
 * officer says so and points at the official source. That is deliberate and
 * should survive editing: this page is not the authority on any of it.
 */
export const TRAVEL_FAQS: readonly TravelFaq[] = [
    {
        question: 'Do I need to take anything for malaria?',
        answer: [
            'Malaria occurs in Tanzania, and the answer depends on you rather than on the itinerary — so it is a question for a qualified travel-health professional well before you fly, not for us.',
            'Speak to them about prevention and about any recommended medication, and keep whatever you are prescribed in your hand luggage rather than your checked bag.',
        ],
    },
    {
        question: 'Will I need a yellow fever certificate?',
        answer: [
            'It depends on where you have been. If you are travelling from, or have recently transited through, a country where yellow fever transmission occurs, you may be required to show a valid vaccination certificate on entry to Tanzania.',
            'Requirements change, so check the latest official guidance for your route before departure.',
        ],
    },
    {
        question: 'What should my travel insurance cover?',
        answer: [
            'We strongly recommend comprehensive cover, and for safari travel it is worth checking the policy specifically covers the activities on your itinerary — walking safaris, balloon flights and trekking are the ones policies tend to exclude.',
        ],
        list: [
            'Medical treatment',
            'Emergency evacuation',
            'Trip cancellation or interruption',
            'Lost or delayed luggage',
            'Personal belongings',
        ],
    },
    {
        question: 'Is travel insurance compulsory for Zanzibar?',
        answer: [
            'Zanzibar has had its own entry and travel-insurance requirements, and they have changed more than once. Check the current rules before departure.',
            'If your itinerary includes Zanzibar, we will tell you what applies to your trip and your nationality as part of your final travel documents.',
        ],
    },
    {
        question: 'Do I need a visa?',
        answer: [
            'Depending on your nationality, yes. Where a visa applies we recommend arranging it before travelling and checking the latest official immigration requirements well in advance.',
            'Your passport also needs sufficient remaining validity and blank pages for immigration. We can guide you through the general process, but approval and entry are decisions for the Tanzanian authorities, not for us.',
        ],
    },
    {
        question: 'What money should I bring?',
        answer: [
            'The official currency is the Tanzanian Shilling (TZS), and US dollars are widely used across the tourism industry. Cards work where they are accepted.',
            'Bring some small-denomination US dollar notes for personal expenses and tipping, and check they meet current acceptance requirements — older or damaged notes are often refused.',
        ],
    },
    {
        question: 'How does tipping work?',
        answer: [
            'Tipping is not compulsory. It is customary as a way of showing appreciation for good service, and the amount is entirely yours to decide.',
            'We would encourage you to think about the whole team rather than only the guide — camp and lodge staff, chefs, porters and the people you do not see. Your safari consultant can give you current guidance for your itinerary and the style of accommodation on it.',
        ],
    },
    {
        question: 'Can I bring a drone?',
        answer: [
            'Not unless you have the appropriate permits. Drone regulations in Tanzania are strict, and the penalties are real.',
            'Even with permission, a drone is never to be flown over wildlife, people, protected areas or safari vehicles without the required authorisation. Assume the answer is no and ask us before you pack one.',
        ],
    },
    {
        question: 'Is there anything I should not pack?',
        answer: [
            'Tanzania restricts certain single-use plastic items, so leave unnecessary plastic packaging at home and bring reusable alternatives — a refillable water bottle above all.',
            'Camouflage-style clothing is also best left behind: it is associated with the military here and can cause problems that have nothing to do with fashion.',
        ],
    },
    {
        question: 'Will I have phone signal or Wi-Fi?',
        answer: [
            'Often, but not reliably. Many of our vehicles and lodges have mobile coverage or Wi-Fi, and it varies a great deal in remote areas. Where a Tanzanian SIM or internet access is part of your package we will arrange it.',
            'Some of the best moments out there happen with the phone away, and the coverage gaps are not the worst thing about a safari.',
        ],
    },
] as const

/**
 * The support band. The name is the operator's client-handling contact; the
 * numbers and the address are in src/config.ts, because they are true of the
 * business rather than of this page.
 */
export const TRAVEL_SUPPORT = {
    eyebrow: 'While You Are Travelling With Us',
    heading: 'You are not handed an itinerary and left to it',
    paragraphs: [
        'Once you arrive in Tanzania, our team is here to support you throughout your journey. If you need assistance during your safari, contact your Polecat Safaris client handling team or your safari consultant.',
        'For urgent situations, use the emergency contact details provided in your final travel documents. For anything less urgent, WhatsApp is usually the quickest way to reach us.',
    ],
    contactName: 'James Mbise',
    contactRole: 'Client handling, Polecat Safaris',
} as const

/** The closing band, on green. The operator's own sign-off, kept verbatim. */
export const TRAVEL_CLOSING = {
    eyebrow: 'One Last Thing Before You Pack',
    heading: 'Travel light. Travel comfortably. And leave room for Africa.',
    paragraphs: [
        'Do not worry about bringing everything. Bring what you need, leave room for comfort, and remember that Tanzania is not only about ticking animals off a list.',
        'It is about the cool air of an early-morning game drive, the sound of a lion somewhere beyond the vehicle, the colour of the Serengeti after rain, a quiet sundowner beneath an endless sky, and the people you meet along the way.',
    ],
    welcome: 'Welcome to Tanzania.',
    signoff: `${SITE.name} — ${SITE.slogan}`,
} as const
