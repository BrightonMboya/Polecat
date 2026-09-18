/**
 * The fourteen add-on activities the operator sells alongside the itineraries.
 *
 * Source: fourteen "<Activity> in Tanzania" documents from the client, each a
 * few thousand words of brochure copy with three price tiers and five
 * locations. What survives here is what a guest needs in order to decide:
 * where it is genuinely offered, how long it takes, what it costs, and who
 * cannot do it. The facts are all theirs; the wording is this site's, because
 * the documents are written in a different voice from every other page here.
 *
 * Two rules this file exists to enforce:
 *
 *   1. `places` is a whitelist, not a description. An add-on is only offered
 *      on a day that reaches one of its places — night drives on Manyara and
 *      Tarangire days and nowhere else, because no other northern park permits
 *      them; balloons over the central and southern Serengeti and Tarangire,
 *      because that is where the operators launch. Adding a place here makes
 *      the activity offerable on more itinerary days, so a place goes in only
 *      when the operator says they run it there.
 *
 *   2. `price` never guesses. Four of the fourteen arrived without a figure —
 *      balloon, night game drive, walking safari and, in its own document,
 *      horse riding — and those read "On request" until the operator gives us
 *      one. The horse-riding rate below is the operator's own, taken from the
 *      9-Day Romantic Luxury Safari document rather than from the add-on one.
 *      Where a document quoted a range, the low end becomes a "From" and the
 *      quote settles the rest; the luxury and multi-day tiers are a
 *      conversation with a consultant, not a row on a web page.
 *
 * Three things in the documents are deliberately not here: the Kondoa rock-art
 * site (their own copy says it needs a dedicated day trip from Arusha or
 * Tarangire, so it is not an add-on to an existing day), the multi-day horse
 * and bike expeditions (those are itineraries), and the spa's manicure tier.
 *
 * Each record is published at /safari-add-ons/#<slug> and referenced from the
 * itineraries by slug — see `DayExtra` in ./packages.ts. The slug is a
 * published anchor: renaming one breaks both the link and the itinerary data.
 */

export type AddonSlug =
    | 'balloon'
    | 'night-game-drive'
    | 'walking-safari'
    | 'bush-breakfast'
    | 'sundowner'
    | 'maasai-village'
    | 'olduvai-gorge'
    | 'treetop-walk'
    | 'zipline'
    | 'quad-biking'
    | 'biking'
    | 'canoeing'
    | 'horse-riding'
    | 'spa'

export interface Addon {
    slug: AddonSlug
    name: string
    /** One line, used on the index and under the section heading. */
    line: string
    /** The fact rail, and the small print on the itinerary row. */
    where: string
    duration: string
    /** "From US$ 50 pp", or "On request" where no figure was supplied. */
    price: string
    /** Fees the price does not cover. */
    priceNote?: string
    /** Age, weight and fitness limits. Only where one actually applies. */
    who?: string
    bestTime?: string
    /** Two or three paragraphs. The operator's substance, this site's voice. */
    body: readonly string[]
    /** Where it is actually run. Also the whitelist — see the file header. */
    places: readonly { name: string; note: string }[]
}

export const ADDONS: readonly Addon[] = [
    {
        slug: 'balloon',
        name: 'Hot air balloon safari',
        line: 'A sunrise flight over the plains, then a champagne breakfast under an acacia.',
        where: 'Central & southern Serengeti, Tarangire',
        duration: '3–4 hours, pre-dawn pick-up',
        price: 'On request',
        who: 'Ages 7+ · about 120 kg per person',
        bestTime:
            'June–October for the migration in the north and Tarangire at its driest; December–March over the calving grounds at Ndutu.',
        body: [
            'You are collected from camp between 04:30 and 05:00 and driven to the launch site, where the balloon is inflated in the dark. Take-off is around 06:30, and the flight itself lasts 45 to 60 minutes — the pilot works the altitude, skimming the treetops for the wildlife and climbing for the scale of the thing.',
            'Baskets are shared, usually 8 to 16 passengers. You land somewhere in the wilderness, drink the traditional glass of champagne, and are taken to a private site for a full bush breakfast laid on linen. It is the one activity on this list worth booking months ahead; peak-season flights sell out.',
            'It is not flown during pregnancy, and the operators ask anyone with back, neck or heart trouble, or recent surgery, to speak to their doctor first.',
        ],
        places: [
            {
                name: 'Serengeti',
                note: 'Launches from the central Seronera area or from Ndutu in the south, depending on the season.',
            },
            {
                name: 'Tarangire',
                note: 'Northern and central zones, over the river, the baobabs and the elephant herds. Quieter than the Serengeti flights.',
            },
        ],
    },
    {
        slug: 'night-game-drive',
        name: 'Night game drive',
        line: 'Two or three hours after sunset with a spotlight, for the animals the day never shows you.',
        where: 'Lake Manyara and Tarangire only',
        duration: '2–3 hours, starting just after sunset',
        price: 'On request',
        bestTime: 'Year-round. Take a warm jacket — the bush gets cold after dark.',
        body: [
            'Only two parks in the north permit driving after dark, and both are on these itineraries. You go out in an open vehicle with your guide and a spotlight operator, and the cast changes completely: civets, genets, porcupines, bush babies, hippos out of the water and grazing, and the predators that spend the day asleep under a bush.',
            'The sky is half the reason to go. There is almost no light pollution out there, and guides will help you set up a long exposure rather than a flash.',
        ],
        places: [
            {
                name: 'Lake Manyara',
                note: 'Hippos come ashore, bush babies work the canopy, and the tree-climbing lions are occasionally out hunting.',
            },
            {
                name: 'Tarangire',
                note: 'Fewer vehicles and more space. Baobab country in the dark, with elephant somewhere close.',
            },
        ],
    },
    {
        slug: 'walking-safari',
        name: 'Walking safari',
        line: 'The same ground as the animals, on foot, with an armed ranger and a naturalist.',
        where: 'Arusha NP, Ngorongoro highlands, Tarangire, select Serengeti areas',
        duration: '2–4 hours over uneven ground',
        price: 'On request',
        who: 'Ages 8+ · moderate fitness',
        bestTime: 'Dry season, when the grass is short and the tracks are readable.',
        body: [
            'A walking safari is slow on purpose. You stop for tracks, for dung, for a medicinal plant, for the ant lion and the leopard tortoise that nobody photographs from a vehicle — and you watch the big animals from a distance a guide chooses rather than one you drive up to.',
            'You are never out there alone: an armed ranger and a trained naturalist walk with you, and the route avoids anything that needs avoiding. Expect two to four hours on uneven ground. Gentler nature walks in less predatory areas can take children from about four; anything in big-game country is eight and up. Wear neutral colours — khaki, olive, brown. Bright colours and white are discouraged for a reason.',
        ],
        places: [
            {
                name: 'Arusha National Park',
                note: 'The best place to start: forest, waterfalls and glades, colobus monkeys, giraffe and buffalo around the Momella Lakes.',
            },
            {
                name: 'Ngorongoro highlands',
                note: 'The crater rim for the view down, or the descent into Empakaai, where the flamingos are.',
            },
            {
                name: 'Tarangire',
                note: 'The riverine stretches, among the baobabs and the elephant.',
            },
            {
                name: 'Serengeti',
                note: 'Permitted in select areas only, and usually paired with a drive.',
            },
        ],
    },
    {
        slug: 'bush-breakfast',
        name: 'Bush breakfast',
        line: 'A table laid in the open, found at the end of a pre-dawn game drive.',
        where: 'Serengeti, Ngorongoro crater rim, Tarangire',
        duration: 'A morning, after the first drive',
        price: 'From US$ 50 pp',
        priceNote:
            'Some lodges include one bush meal per stay — worth checking before you add it.',
        bestTime:
            'Dry season for clear skies and short grass; January–February on the calving plains for the drama.',
        body: [
            'You go out for the early drive, round a corner, and find a table set in a scenic spot — above a river full of hippos, or on a ridge over the plains. A chef cooks eggs to order; there is fruit, pastry, Tanzanian honey and coffee, and sparkling wine if you want the champagne version.',
            'The site is scouted in advance and an armed ranger or your guide stays with you, which is what lets you sit down and eat slowly in the middle of a national park.',
        ],
        places: [
            {
                name: 'Serengeti',
                note: 'Open plains, and the migration somewhere on the horizon if the timing is right.',
            },
            {
                name: 'Ngorongoro crater rim',
                note: 'Cold, clear highland air and the whole caldera below you.',
            },
            {
                name: 'Tarangire',
                note: 'Under a baobab, with elephant moving in the distance.',
            },
        ],
    },
    {
        slug: 'sundowner',
        name: 'Sundowner',
        line: 'Chairs, a small fire and a drink at a spot your guide has picked, as the light goes.',
        where: 'Serengeti, Tarangire, Ngorongoro crater rim',
        duration: 'The last hour of the afternoon drive',
        price: 'From US$ 50 pp',
        bestTime:
            'Any day of the year. The dry season gives the cleanest gold; the green season gives you storm clouds.',
        body: [
            'The afternoon drive ends somewhere chosen rather than convenient — a kopje in the Serengeti, a bend of the Tarangire river, a ridge on the crater rim. Waiting there: safari chairs, a linen-covered table, a small fire and a bar, with biltong, nuts, samosas and canapés.',
            'The classic is a gin and tonic, originally for the quinine. There is also South African wine, Tanzanian beer, cocktails and juice. Ask us in advance and the same setup does proposals, anniversaries and birthdays.',
        ],
        places: [
            {
                name: 'Serengeti',
                note: 'A rocky kopje, a lone acacia, and the predators starting to stir.',
            },
            { name: 'Tarangire', note: 'Baobab silhouettes against a purple sky.' },
            {
                name: 'Ngorongoro crater rim',
                note: 'High, cool and panoramic, with the caldera floor falling into shadow.',
            },
        ],
    },
    {
        slug: 'maasai-village',
        name: 'Maasai boma visit',
        line: 'Time inside a working homestead — the welcome dance, the house, the herd, the beadwork.',
        where: 'Ngorongoro, Serengeti buffer zones, Longido & West Kilimanjaro',
        duration: 'A short stop, or a half-day medicine walk',
        price: 'From US$ 20 pp',
        priceNote:
            'The deeper bush-and-elder version runs US$ 70–120 pp. Fees generally go to community funds — water, school fees, healthcare.',
        body: [
            'You are usually met with the adumu, the jumping dance, and then taken inside a boma — mud, sticks and grass, cool and dark — where an elder talks about the family, the cattle that measure their wealth, and their claim on the land. Depending on the hour you may see the herd brought in, beadwork being made, or a fire started with two sticks.',
            'How we run it matters more than what it costs. Photographs are asked for, not taken; your guide handles that. Rather than handing out sweets or cash, we would rather you bought the beadwork or put something into the village school fund.',
        ],
        places: [
            {
                name: 'Ngorongoro Conservation Area',
                note: 'Highland bomas where the Maasai live alongside grazing wildlife, under the crater rim.',
            },
            {
                name: 'Serengeti buffer zones',
                note: 'Communities on the park boundary, inside the conservation arrangements the migration runs through.',
            },
            {
                name: 'Longido & West Kilimanjaro',
                note: 'Further off the route, and the place for a medicine walk through the volcanic foothills.',
            },
        ],
    },
    {
        slug: 'olduvai-gorge',
        name: 'Olduvai Gorge',
        line: 'The Leakeys’ dig, the 1.75-million-year-old skull, and a museum on the rim of the gorge.',
        where: 'On the Ngorongoro–Serengeti drive',
        duration: 'A stop of an hour or so, on the way through',
        price: 'US$ 35–40 pp',
        priceNote: 'On top of the Ngorongoro Conservation Area fees you are already paying.',
        bestTime:
            'June–October, when the roads are dry and the geology is not hidden by foliage.',
        body: [
            'The road between the crater and the Serengeti runs past the most famous archaeological site in the world. This is where Louis and Mary Leakey worked for decades and where the 1.75-million-year-old "Zinjanthropus" came out of the ground, and the site museum on the rim is genuinely good — real fossils, Oldowan stone tools, and an explanation of how volcanic ash kept any of it.',
            'It costs you an hour of a drive you are making anyway, and it changes the scale of the landscape you spend the next week in.',
        ],
        places: [
            {
                name: 'Olduvai Gorge',
                note: 'Between Ngorongoro and the Serengeti, with a lecture at the museum overlooking the gorge.',
            },
        ],
    },
    {
        slug: 'treetop-walk',
        name: 'Lake Manyara treetop walk',
        line: 'Nine suspension bridges through the canopy, at the park gate.',
        where: 'Lake Manyara, at the entrance gate',
        duration: '30–60 minutes',
        price: 'From US$ 20 pp',
        priceNote: 'Lake Manyara park entry (about US$ 59) is separate.',
        who: 'Ages 5+ · under-fives are not permitted on the bridges',
        bestTime:
            'Dry season for the light and the sightlines; green season for a forest at its most vivid.',
        body: [
            'The walkway starts at ground level and climbs into the canopy across nine netted suspension bridges. It is a short, easy thing to do — blue monkeys, baboons, butterflies, and a guide pointing out the plants of a groundwater forest that exists because of the springs under it.',
            'It sits right at the Manyara gate, which makes it the natural start or finish to a day in the park rather than an excursion of its own.',
        ],
        places: [
            {
                name: 'Lake Manyara National Park',
                note: 'At the entrance gate, so it slots into the morning you drive in or the afternoon you leave.',
            },
        ],
    },
    {
        slug: 'zipline',
        name: 'Zipline at Mto wa Mbu',
        line: 'Four or five zips off the Rift Valley escarpment, above the Maasai Steppe.',
        where: 'Mto wa Mbu, at the foot of the escarpment',
        duration: '2–3 hours, including the ride out',
        price: 'From US$ 55 pp',
        who: 'Ages 7+ · 23–130 kg',
        bestTime:
            'June–October and January–March, when the platforms are dry and the valley is clear.',
        body: [
            'The only world-class zipline course on the northern circuit is built into the foothills of the Rift Valley escarpment at Mto wa Mbu — which every one of these itineraries drives through on the way to Manyara or the crater. You are kitted out at the village office, then taken on a 20-minute open-air ride through Maasailand to the course.',
            'Four to five zips of different lengths link six platforms, and the last one is the long one, out over the valley. Guides are trained to international standards and the gear is theirs. It is not run during pregnancy.',
        ],
        places: [
            {
                name: 'Mto wa Mbu',
                note: 'Between Arusha and the parks, at the base of the Great Rift Valley escarpment.',
            },
        ],
    },
    {
        slug: 'quad-biking',
        name: 'Quad biking',
        line: 'Automatic 450cc quads through the highland farms and the buffer zones. No experience needed.',
        where: 'Karatu & the Ngorongoro highlands, Arusha, Lake Manyara buffer',
        duration: '2 hours, or a half day',
        price: 'From US$ 100 pp',
        priceNote: 'Half-day wilderness expeditions run US$ 180–250 pp.',
        bestTime:
            'Dry season for firm, fast trails and a great deal of dust; January–March for green hills and a more technical, muddier ride.',
        body: [
            'It starts with a briefing and a practice loop, because most people have never ridden one. Helmets, goggles and dust masks are provided, the bikes are automatic, and a lead rider sets a pace that suits whoever is slowest.',
            'The routes go through brick-making villages, coffee plantations and grazing land, with stops at the viewpoints. You will get dusty or muddy, and then you will go back to the lodge for a shower and a drink.',
        ],
        places: [
            {
                name: 'Karatu & the Ngorongoro highlands',
                note: 'Green foothills, coffee farms and the volcanic escarpment behind them.',
            },
            {
                name: 'Arusha & the Meru foothills',
                note: 'Forest edges and Maasai grazing land, with Meru and Kilimanjaro in view.',
            },
            {
                name: 'Lake Manyara buffer zones',
                note: 'Flat, dusty, sun-cracked plains, with zebra and wildebeest out on them.',
            },
        ],
    },
    {
        slug: 'biking',
        name: 'Biking',
        line: 'Mountain bikes through villages, plantations and one of the few parks that allows them.',
        where: 'Mto wa Mbu & Manyara, Arusha NP, Kilimanjaro foothills',
        duration: '2–4 hours, or a full day',
        price: 'From US$ 50 pp',
        priceNote:
            'A full-day ride with a support vehicle and a private picnic runs US$ 120–180 pp.',
        bestTime:
            'June–October, when the trails are firm. Avoid April and May — the long rains turn most of them to mud.',
        body: [
            'Bikes, helmets and hydration packs are provided, and on longer routes a support vehicle stays near with cold water and a seat if you have had enough. The ground is a mix of red dirt, sandy village paths and the occasional stretch of tarmac.',
            'You will not be cycling among lions, but in the buffer zones and the conservancies you ride within sight of zebra, giraffe and gazelle — and at eye level with everyone you pass, which is the real difference from a vehicle.',
        ],
        places: [
            {
                name: 'Mto wa Mbu & Lake Manyara',
                note: 'The village ride: rice paddies, market, forest galleries, and the lakeshore with its flamingos and hippos.',
            },
            {
                name: 'Arusha National Park',
                note: 'One of the few parks you may cycle inside — past the Momella Lakes, with Meru above you.',
            },
            {
                name: 'Kilimanjaro foothills',
                note: 'Steep climbs and fast descents through Chagga farmland, in the shadow of the mountain.',
            },
        ],
    },
    {
        slug: 'canoeing',
        name: 'Canoeing',
        line: 'Two or three hours on flat water, at eye level with the birds and the hippos.',
        where: 'Lake Manyara, Momella Lakes, Lake Duluti',
        duration: '2–3 hours',
        price: 'From US$ 60 pp',
        priceNote:
            'Park entry is extra at Manyara and Arusha NP. A combined hike-and-paddle day runs US$ 120–150 pp.',
        bestTime:
            'Dry season for calm water and concentrated wildlife; January–March for the migratory birds. Manyara depends on water levels — worth checking.',
        body: [
            'Stable two-person canoes, life jackets, a briefing and a guide who keeps a respectful distance from the hippos. The pace is gentle and first-timers are fine.',
            'It is the birding activity on this list — flamingos in their thousands, malachite kingfishers, herons — with buffalo, bushbuck and monkeys along the wooded banks.',
        ],
        places: [
            {
                name: 'Lake Manyara',
                note: 'When the water is high: flamingos, and elephant grazing the floodplain. Seasonal.',
            },
            {
                name: 'Momella Lakes, Arusha NP',
                note: 'Hippo and buffalo from the water, with Meru and Kilimanjaro behind.',
            },
            {
                name: 'Lake Duluti',
                note: 'A forested crater lake twenty minutes from Arusha. Quiet, and full of birds.',
            },
        ],
    },
    {
        slug: 'horse-riding',
        name: 'Horse riding',
        line: 'Out among the plains game on horseback, which lets you get closer than a vehicle does.',
        where: 'Dolly Estate (Arusha & Kilimanjaro), Manyara Ranch',
        duration: 'Two hours, longer for experienced riders',
        price: 'From US$ 150 pp',
        priceNote:
            'Two hours, as quoted in the operator’s own Arusha itinerary. Multi-day riding safaris are a separate trip.',
        who: 'Ages 7+ · 90–95 kg maximum',
        body: [
            'Wildlife reads a horse as another animal rather than as a threat, so giraffe, eland and antelope let you come far closer than they would a vehicle. The horses are chosen for temperament and stamina, helmets are provided and mandatory, and the guides are professional equestrians.',
            'Beginners walk through the game corridors and look at the scenery. If you can ride, there are canters and gallops along old wildlife trails. Bring long trousers and closed shoes with a small heel, in neutral colours; the weight limit is for the horses’ sake, and multi-day rides are for intermediate riders and up, aged twelve and over.',
        ],
        places: [
            {
                name: 'Dolly Estate, Arusha',
                note: 'All levels, families included. Meru and Kilimanjaro in view, with eland, zebra and the occasional gerenuk.',
            },
            {
                name: 'Manyara Ranch',
                note: 'A private wildlife corridor with elephant and giraffe and almost no traffic.',
            },
        ],
    },
    {
        slug: 'spa',
        name: 'Spa treatment',
        line: 'A massage at the lodge, sometimes on your own deck, usually with a view.',
        where: 'Serengeti camps, Ngorongoro highlands, Zanzibar',
        duration: '60–90 minutes',
        price: 'From US$ 80 pp',
        priceNote: 'A full-body ritual or scrub runs US$ 120–200 pp.',
        bestTime:
            'Any time. Most welcome after the dusty days, or at the end of a trekking or walking itinerary.',
        body: [
            'Depending on the property this is a glass-fronted room, a tented pavilion over a waterhole, or a table set up on your own deck. Therapists at the lodges we use are trained to international standards.',
            'The signature treatments are worth asking for by name: a foot ritual with volcanic sand and local herbs, a hot-stone massage using river stones, and a body scrub made with Tanzanian coffee.',
        ],
        places: [
            {
                name: 'Serengeti camps',
                note: 'In-tent treatments at the high-end camps, mobile therapists at the rest.',
            },
            {
                name: 'Ngorongoro highlands',
                note: 'Cool, green and misty — the forest-sanctuary version.',
            },
            {
                name: 'Zanzibar',
                note: 'The spice spas, where clove, nutmeg and cinnamon go into the treatments.',
            },
        ],
    },
] as const

const BY_SLUG = new Map(ADDONS.map((addon) => [addon.slug, addon]))

/** Resolve a slug from an itinerary day. Throws rather than rendering a hole. */
export function findAddon(slug: AddonSlug): Addon {
    const addon = BY_SLUG.get(slug)
    if (addon == null) throw new Error(`Unknown add-on slug: ${slug}`)
    return addon
}
