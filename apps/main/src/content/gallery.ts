/*
 * The /gallery/ page: the operator's own photographs, every one of them
 * already on the site somewhere, in one place. Linked from the Company
 * column of the footer.
 *
 * Left out on purpose, so the page shows only what the operator shot or owns:
 *   - stand-ins: the dest-* country cards and the travel-information banner
 *     (Unsplash), the nine addon-* photos (rawpixel and Wikimedia Commons)
 *     and the eight zone-* frames sourced from Commons (see trek-zones.ts);
 *   - crops of photographs already here (style-*, exp-*, nav-*);
 *   - serengeti-bush-coffee.jpg and serengeti-cheetah-plains.jpg, which came
 *     with the old design rather than from the operator — confirm before
 *     adding them;
 *   - logos, partner marks and the share image.
 *
 * `src` is the smallest width, `width`/`height` its real size so the browser
 * reserves the space before the image loads. Grouped loosely — wildlife,
 * camp, honeymoons, families, the mountain, the community — so the page
 * reads as a walk through a trip rather than a dump.
 */

export interface GalleryPhoto {
    src: string
    srcset?: string
    width: number
    height: number
    alt: string
}

export const GALLERY: readonly GalleryPhoto[] = [
    {
        src: '/images/migration-herd-vehicle-900.webp',
        srcset: '/images/migration-herd-vehicle-900.webp 900w, /images/migration-herd-vehicle-1400.webp 1400w, /images/migration-herd-vehicle-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'A column of wildebeest and zebra walking past an open safari vehicle, with thousands more spread across the plain behind them',
    },
    {
        src: '/images/serengeti-migration-game-drive.jpg',
        width: 1920,
        height: 1280,
        alt: 'Wildebeest grazing beneath a lone acacia on the Serengeti, a safari vehicle parked beside them',
    },
    {
        src: '/images/hero-tree-climbing-lion-900.webp',
        srcset: '/images/hero-tree-climbing-lion-900.webp 900w, /images/hero-tree-climbing-lion-1600.webp 1600w',
        width: 900,
        height: 599,
        alt: 'A young lion asleep draped along a thick tree branch, a hind leg hanging down below it',
    },
    {
        src: '/images/hero-lionesses.webp',
        width: 1100,
        height: 740,
        alt: 'Two lionesses lying side by side in dry golden grass, both looking towards the camera',
    },
    {
        src: '/images/hero-family-game-viewing-900.webp',
        srcset: '/images/hero-family-game-viewing-900.webp 900w, /images/hero-family-game-viewing-1354.webp 1354w',
        width: 900,
        height: 600,
        alt: 'A girl standing on the bonnet of a safari vehicle while her parents watch and photograph a herd of gazelle and wildebeest on the plain',
    },
    {
        src: '/images/hero-horseback-sunset-900.webp',
        srcset: '/images/hero-horseback-sunset-900.webp 900w, /images/hero-horseback-sunset-1600.webp 1600w',
        width: 900,
        height: 506,
        alt: 'Two riders on a white and a bay horse stopped side by side on open grassland, watching the sun go down',
    },
    {
        src: '/images/hero-acacia-chairs-900.webp',
        srcset: '/images/hero-acacia-chairs-900.webp 900w, /images/hero-acacia-chairs-1400.webp 1400w, /images/hero-acacia-chairs-1920.webp 1920w',
        width: 900,
        height: 506,
        alt: 'Two guests in safari chairs on a camp deck, glasses of wine on a table between them, looking out at an acacia and a flat-topped hill across the grass',
    },
    {
        src: '/images/sundowner-lake-manyara-900.webp',
        srcset: '/images/sundowner-lake-manyara-900.webp 900w, /images/sundowner-lake-manyara-1400.webp 1400w, /images/sundowner-lake-manyara-1920.webp 1920w',
        width: 900,
        height: 506,
        alt: 'Guests in camp chairs around a fire at a sundowner on the shore of Lake Manyara, two Maasai hosts standing with them and the sun going down over the water',
    },
    {
        src: '/images/hero-sundowner-baobab-900.webp',
        srcset: '/images/hero-sundowner-baobab-900.webp 900w, /images/hero-sundowner-baobab-1400.webp 1400w, /images/hero-sundowner-baobab-1920.webp 1920w',
        width: 900,
        height: 600,
        alt: 'Guests on cushions and rugs beneath a great baobab, drinks laid out on a camp table as the sky turns orange',
    },
    {
        src: '/images/family-firepit-sundowners-900.webp',
        srcset: '/images/family-firepit-sundowners-900.webp 900w, /images/family-firepit-sundowners-1400.webp 1400w, /images/family-firepit-sundowners-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'Guests and their guides around a fire pit on the open plains, drinks in hand as the sun sets',
    },
    {
        src: '/images/hero-camp-firepit-dusk-900.webp',
        srcset: '/images/hero-camp-firepit-dusk-900.webp 900w, /images/hero-camp-firepit-dusk-1220.webp 1220w',
        width: 900,
        height: 634,
        alt: 'A fire burning in a pit before canvas camp tents at dusk, director chairs and lanterns set out on the ground around it',
    },
    {
        src: '/images/hero-firepit-dinner-900.webp',
        srcset: '/images/hero-firepit-dinner-900.webp 900w, /images/hero-firepit-dinner-1400.webp 1400w, /images/hero-firepit-dinner-1920.webp 1920w',
        width: 900,
        height: 506,
        alt: 'A couple laughing over dinner at a table laid out in the bush, a fire burning in the foreground and lanterns hung in the trees behind them',
    },
    {
        src: '/images/hero-long-table-lanterns-900.webp',
        srcset: '/images/hero-long-table-lanterns-900.webp 900w, /images/hero-long-table-lanterns-1600.webp 1600w',
        width: 900,
        height: 506,
        alt: 'A long dinner table laid in red under a tree at dusk, lit by hanging lanterns and candles',
    },
    {
        src: '/images/hero-lodge-garden-dinner-900.webp',
        srcset: '/images/hero-lodge-garden-dinner-900.webp 900w, /images/hero-lodge-garden-dinner-1366.webp 1366w',
        width: 900,
        height: 506,
        alt: 'A table laid with white linen and a candle in a hurricane glass on a brick terrace, uplit trees and lanterns in the garden behind',
    },
    {
        src: '/images/hero-baobab-bush-brunch-900.webp',
        srcset: '/images/hero-baobab-bush-brunch-900.webp 900w, /images/hero-baobab-bush-brunch-1400.webp 1400w',
        width: 900,
        height: 506,
        alt: 'Guests standing with drinks around long tables laid for brunch in the shade of a baobab, a game drive vehicle parked behind them',
    },
    {
        src: '/images/hero-bush-daybed-shelter-900.webp',
        srcset: '/images/hero-bush-daybed-shelter-900.webp 900w, /images/hero-bush-daybed-shelter-1600.webp 1600w',
        width: 900,
        height: 600,
        alt: 'A cushioned daybed under a rustic timber shelter on a brick floor, a lantern hanging from a post and woodland all around',
    },
    {
        src: '/images/hero-lodge-games-900.webp',
        srcset: '/images/hero-lodge-games-900.webp 900w, /images/hero-lodge-games-1400.webp 1400w',
        width: 900,
        height: 506,
        alt: 'Four people around a wooden table under a thatched roof, mid-game with tiles laid out between them and forest behind',
    },
    {
        src: '/images/honeymoon-deck-sunrise-900.webp',
        srcset: '/images/honeymoon-deck-sunrise-900.webp 900w, /images/honeymoon-deck-sunrise-1400.webp 1400w, /images/honeymoon-deck-sunrise-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'A couple taking breakfast on a lodge deck at sunrise, the plains opening out below them',
    },
    {
        src: '/images/honeymoon-sundowner-toast-900.webp',
        srcset: '/images/honeymoon-sundowner-toast-900.webp 900w, /images/honeymoon-sundowner-toast-1400.webp 1400w',
        width: 900,
        height: 644,
        alt: 'A couple toasting with champagne on a rocky viewpoint at sunset, two director chairs and a table laid beside them',
    },
    {
        src: '/images/honeymoon-festoon-dinner-900.webp',
        srcset: '/images/honeymoon-festoon-dinner-900.webp 900w, /images/honeymoon-festoon-dinner-1400.webp 1400w',
        width: 900,
        height: 602,
        alt: 'A table laid for two in a clearing after dark, festoon lights strung through the trees above it and lanterns set out around the sand',
    },
    {
        src: '/images/honeymoon-beach-dinner-sunset-900.webp',
        srcset: '/images/honeymoon-beach-dinner-sunset-900.webp 900w, /images/honeymoon-beach-dinner-sunset-1400.webp 1400w',
        width: 900,
        height: 600,
        alt: 'A table laid for two on the sand at sunset, a couple in white walking hand in hand towards the water beneath a palm',
    },
    {
        src: '/images/hero-beach-infinity-pool-900.webp',
        srcset: '/images/hero-beach-infinity-pool-900.webp 900w, /images/hero-beach-infinity-pool-1400.webp 1400w, /images/hero-beach-infinity-pool-1920.webp 1920w',
        width: 900,
        height: 506,
        alt: 'An infinity pool lined with palms and white parasols in front of a thatched beach lodge, the sea beyond it and the palms reflected in the water',
    },
    {
        src: '/images/hero-family-bush-walk-900.webp',
        srcset: '/images/hero-family-bush-walk-900.webp 900w, /images/hero-family-bush-walk-1600.webp 1600w',
        width: 900,
        height: 600,
        alt: 'A family crouched in long grass with two guides, the youngest looking through binoculars, acacias behind them',
    },
    {
        src: '/images/family-walk-maasai-guide-900.webp',
        srcset: '/images/family-walk-maasai-guide-900.webp 900w, /images/family-walk-maasai-guide-1400.webp 1400w, /images/family-walk-maasai-guide-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'A Maasai guide leading a family on a walking safari, a herd of zebra grazing in the grass behind them',
    },
    {
        src: '/images/guided-walk-termite-mound-900.webp',
        srcset: '/images/guided-walk-termite-mound-900.webp 900w, /images/guided-walk-termite-mound-1400.webp 1400w, /images/guided-walk-termite-mound-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'Four guests in sun hats standing with their guide at a termite mound under an acacia, white wildflowers across the grass around them',
    },
    {
        src: '/images/family-deck-viewpoint-900.webp',
        srcset: '/images/family-deck-viewpoint-900.webp 900w, /images/family-deck-viewpoint-1400.webp 1400w',
        width: 900,
        height: 644,
        alt: 'A family of four leaning on a lodge railing, the parents and children pointing out something in the bush below',
    },
    {
        src: '/images/family-lunch-under-acacia-900.webp',
        srcset: '/images/family-lunch-under-acacia-900.webp 900w, /images/family-lunch-under-acacia-1400.webp 1400w',
        width: 900,
        height: 644,
        alt: 'A family at a long lunch table set in the shade of an acacia, with the lake and hills beyond',
    },
    {
        src: '/images/family-mess-tent-dinner-900.webp',
        srcset: '/images/family-mess-tent-dinner-900.webp 900w, /images/family-mess-tent-dinner-1400.webp 1400w',
        width: 900,
        height: 644,
        alt: 'Three generations of a family passing dishes around a long table in the mess tent',
    },
    {
        src: '/images/green-season-river-chairs-900.webp',
        srcset: '/images/green-season-river-chairs-900.webp 900w, /images/green-season-river-chairs-1400.webp 1400w',
        width: 900,
        height: 600,
        alt: 'Four guests sitting in camp chairs set out in the shallows of a river running high and silty, dense green forest and a hillside rising behind them',
    },
    {
        src: '/images/kili-moorland-trail.webp',
        width: 1200,
        height: 858,
        alt: 'A file of trekkers and porters climbing a trail through giant heather on Kilimanjaro under a clear sky',
    },
    {
        src: '/images/kili-heath-traverse-900.webp',
        srcset: '/images/kili-heath-traverse-900.webp 900w, /images/kili-heath-traverse-1400.webp 1400w, /images/kili-heath-traverse-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'A line of trekkers with poles and packs climbing a heathland traverse on Kilimanjaro, cloud banked against the ridge behind them',
    },
    {
        src: '/images/zone-heath-trail-900.webp',
        srcset: '/images/zone-heath-trail-900.webp 900w, /images/zone-heath-trail-1400.webp 1400w, /images/zone-heath-trail-1920.webp 1920w',
        width: 900,
        height: 506,
        alt: 'A line of trekkers strung out along a trail through low heath scrub under a deep blue sky',
    },
    {
        src: '/images/zone-alpine-boulders-900.webp',
        srcset: '/images/zone-alpine-boulders-900.webp 900w, /images/zone-alpine-boulders-1400.webp 1400w, /images/zone-alpine-boulders-1920.webp 1920w',
        width: 900,
        height: 506,
        alt: 'Trekkers picking a way between pale boulders with towering cloud building over the ridge above',
    },
    {
        src: '/images/kili-ash-ridge-cloud-900.webp',
        srcset: '/images/kili-ash-ridge-cloud-900.webp 900w, /images/kili-ash-ridge-cloud-1400.webp 1400w, /images/kili-ash-ridge-cloud-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'A file of trekkers working up a ridge of black volcanic ash in thick cloud, high on the mountain',
    },
    {
        src: '/images/kili-summit-ridge-climbers-900.webp',
        srcset: '/images/kili-summit-ridge-climbers-900.webp 900w, /images/kili-summit-ridge-climbers-1400.webp 1400w, /images/kili-summit-ridge-climbers-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'Three climbers in cold-weather kit stopped on bare rock high on the mountain under a deep blue sky',
    },
    {
        src: '/images/kili-snowfield-ascent-900.webp',
        srcset: '/images/kili-snowfield-ascent-900.webp 900w, /images/kili-snowfield-ascent-1400.webp 1400w, /images/kili-snowfield-ascent-1920.webp 1920w',
        width: 900,
        height: 644,
        alt: 'Four trekkers in down jackets walking up a snowfield in single file with poles and full packs, the rounded summit ahead of them under a clear sky',
    },
    {
        src: '/images/impact-materuni.webp',
        width: 750,
        height: 550,
        alt: 'The Materuni waterfall dropping down a cliff of dense green rainforest on the slopes of Kilimanjaro',
    },
    {
        src: '/images/impact-schoolchildren.webp',
        width: 2400,
        height: 1600,
        alt: 'Schoolchildren in uniform sitting together on a grassy hillside, listening, with the highlands behind them',
    },
    {
        src: '/images/packing-kit-flatlay-900.webp',
        srcset: '/images/packing-kit-flatlay-900.webp 900w, /images/packing-kit-flatlay-1400.webp 1400w',
        width: 900,
        height: 600,
        alt: 'Outdoor kit laid out in rows on a wooden floor: a red rucksack, walking boots, a folded blue jacket and jeans, a camera and lens, binoculars, a water bottle, a phone, a watch, sunglasses and a radio',
    },
    {
        src: '/images/packing-bag-flatlay-900.webp',
        srcset: '/images/packing-bag-flatlay-900.webp 900w, /images/packing-bag-flatlay-1400.webp 1400w',
        width: 900,
        height: 600,
        alt: 'A red framed rucksack lying on floorboards with a pair of telescopic walking poles above it',
    },
]
