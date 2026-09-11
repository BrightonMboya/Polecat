/**
 * Photography for the camps, lodges and hotels the itineraries in
 * `packages.ts` sleep in, keyed to the wording those itineraries use.
 *
 * Source: `~/web/makisala/polecat-accommodation-images.json`, generated
 * 2026-09-08 out of the operator's own database (`accommodations` +
 * `accommodation_images`). The files are hotlinked from that bucket rather
 * than copied into `public/images/`, so re-shooting a lodge there re-shoots it
 * here — and so nothing about this site has to be rebuilt to pick it up.
 *
 * Three nights have no photography and render without a stay image:
 * **Meliá Arusha** (written three ways across the docs) has no row in the
 * source database at all — it is a different property from Gran Meliá Arusha,
 * which does — and neither does **Pink Flamingo Boutique Hotel** in Marangu.
 * Both need seeding upstream, not patching here.
 */

/** The bucket every path below hangs off. */
const CDN = 'https://assets.makisala.com/accommodations'

export interface Accommodation {
    /** The property's name as the operator's database holds it. */
    name: string
    slug: string
    /** Where it sits. Used for the photograph's alt text. */
    region: string
    /** Gallery order. Ten photographs for most, eight or nine for two. */
    images: string[]
}

/**
 * Filenames rather than URLs, so a 36-character id isn't repeated ten times a
 * property. `images` below assembles them.
 */
interface Source {
    name: string
    slug: string
    region: string
    id: string
    files: string[]
}

const SOURCES: Source[] = [
    {
        name: 'Africa Safari Lake Natron',
        slug: 'africa-safari-lake-natron',
        region: 'Lake Natron',
        id: 'b0bd9b3b-6422-4196-81d5-c38205484a8a',
        files: [
            '01-africa-safari-lake-natron.webp',
            '02-africa-safari-lake-natron.webp',
            '03-africa-safari-lake-natron.webp',
            '04-africa-safari-lake-natron.webp',
            '05-africa-safari-lake-natron.webp',
            '06-africa-safari-lake-natron.png',
            '07-africa-safari-lake-natron.webp',
            '08-africa-safari-lake-natron.png',
        ],
    },
    {
        name: 'Arusha Serena Hotel, Resort & Spa',
        slug: 'arusha-serena-hotel',
        region: 'Arusha / Lake Duluti',
        id: 'ce56dd0d-76eb-4284-9c3a-a5bd7515abd7',
        files: [
            '1.jpg',
            '7.jpg',
            '11.jpg',
            '15.jpg',
            '17.jpg',
            '19.jpg',
            '22.jpg',
            '5.jpg',
            '2.jpg',
            '3.jpg',
        ],
    },
    {
        name: 'Elephant Springs by Karibu Camps',
        slug: 'tarangire-elephant-springs',
        region: 'Tarangire (inside park)',
        id: 'a5bfcc28-84c7-496b-8253-c246dadd113c',
        files: [
            '4.jpg',
            '11.jpg',
            '17.jpg',
            '21.jpg',
            '25.jpg',
            '5.jpg',
            '9.jpg',
            '2.jpg',
            '6.jpg',
            '1.jpg',
        ],
    },
    {
        name: 'Elewana Arusha Coffee Lodge',
        slug: 'elewana-arusha-coffee-lodge',
        region: 'Arusha',
        id: '1e0518a5-5644-4186-88ad-e3418befdc9a',
        files: [
            '3.jpg',
            '6.jpg',
            '19.jpg',
            '22.jpg',
            '23.jpg',
            '14.jpg',
            '15.jpg',
            '16.jpg',
            '25.jpg',
            '2.jpg',
        ],
    },
    {
        name: 'Gran Melia Arusha',
        slug: 'gran-melia-arusha',
        region: 'Arusha',
        id: 'aa75a5c7-3e97-4c31-80a2-75406fb6e4a8',
        files: [
            '1767861029933-102oGranMeliaArusha-Deluxe Room Bathroom.webp',
            '1767861035214-007jGranMeliaArusha-Lobby.webp',
            '1767861042432-002eGranMeliaArusha-General Facade.webp',
            '1767861053257-002iGranMeliaArusha-General Facade.webp',
            '1767861063434-007aGranMeliaArusha-Lobby.webp',
            '1767861068730-104oGranMeliaArusha-Deluxe Room Mountain Meru View.webp',
            '1767861019500-055cGranMeliaArusha-Red Level Lounge.webp',
            '1767861027695-104cGranMeliaArusha-Deluxe Room Mountain Meru View twin.webp',
            '1767861031990-104tGranMeliaArusha-Deluxe Room Mountain Meru View balcony.webp',
            '1767861025904-104mGranMeliaArusha-Deluxe Room Mountain Meru View Twin.webp',
        ],
    },
    {
        name: 'Hamerkop House by Lemala',
        slug: 'hamerkop-house-by-lemala',
        region: 'Mount Meru foothills',
        id: 'c5c3ed3f-5f1a-4bac-94e6-1898e0f2c4fd',
        files: [
            '5.jpg',
            '6.jpg',
            '15.jpg',
            '19.jpg',
            '23.jpg',
            '11.jpg',
            '13.jpg',
            '18.jpg',
            '24.jpg',
            '1.jpg',
        ],
    },
    {
        name: 'Kisima Ngeda Tented Camp',
        slug: 'kisima-ngeda-camp',
        region: 'Lake Eyasi',
        id: 'e82abae7-6e00-463e-b22e-8298d99e80e2',
        files: [
            '9.jpg',
            '1.png',
            '13.jpg',
            '23.jpg',
            '21.jpg',
            '2.jpg',
            '5.jpg',
            '4.jpg',
            '6.jpg',
            '3.jpg',
        ],
    },
    {
        name: 'Kitela Lodge',
        slug: 'kitela-lodge',
        region: 'Karatu',
        id: '95fcb7ac-8c4a-41d2-a5b5-95b10f56f2d7',
        files: [
            '14.jpg',
            '22.jpg',
            '1.jpg',
            '4.jpg',
            '10.jpg',
            '18.jpg',
            '20.jpg',
            '12.jpg',
            '13.jpg',
            '11.jpg',
        ],
    },
    {
        name: 'Koroi Forest Camp',
        slug: 'koroi-forest-camp',
        region: 'Arusha National Park',
        id: '26025fb7-6a6e-4cbd-9ae1-28aa69ffb19b',
        files: [
            '10.jpg',
            '2.jpg',
            '1.jpg',
            '5.jpg',
            '16.jpg',
            '13.jpg',
            '22.jpg',
            '3.jpg',
            '8.jpg',
            '7.jpg',
        ],
    },
    {
        name: 'Kubu Kubu Tented Lodge',
        slug: 'kubu-kubu-tented-lodge',
        region: 'Central Serengeti',
        id: 'a53c734d-50ca-4221-b4db-c4fa27eeaa52',
        files: [
            '9.jpg',
            '4.jpg',
            '12.jpg',
            '14.jpg',
            '13.jpg',
            '19.jpg',
            '24.jpg',
            '25.jpg',
            '3.jpg',
            '1.jpg',
        ],
    },
    {
        name: 'Lahia Tented Lodge',
        slug: 'lahia-tented-lodge',
        region: 'Western Serengeti',
        id: '6c7a23b8-7a08-4179-b0c1-6d2a1ad012c2',
        files: [
            '7.jpg',
            '12.jpg',
            '13.jpg',
            '8.jpg',
            '15.jpg',
            '17.jpg',
            '18.jpg',
            '3.jpg',
            '4.jpg',
            '6.jpg',
        ],
    },
    {
        name: 'Lake Burunge Baobab Tented Camp',
        slug: 'lake-burunge-baobab-tented-lodge',
        region: 'Lake Burunge',
        id: '23ffc7b3-7301-4e82-91dc-3c362ecfe7d5',
        files: [
            '3.jpg',
            '5.jpg',
            '1.jpg',
            '15.jpg',
            '16.jpg',
            '19.jpg',
            '10.jpg',
            '17.jpg',
            '18.jpg',
            '2.jpg',
        ],
    },
    {
        name: 'Lala Salama Serengeti Camp',
        slug: 'lala-salama-serengeti',
        region: 'Central Serengeti',
        id: '23629128-f9cb-4af8-b7b4-39619d240f9d',
        files: [
            '1.jpg',
            '2.jpg',
            '4.jpg',
            '6.jpg',
            '7.jpg',
            '10.jpg',
            '0.jpg',
            '3.jpg',
            '5.jpg',
            '8.jpg',
        ],
    },
    {
        name: 'Lemala Mpingo Ridge',
        slug: 'lemala-mpingo-ridge-lodge',
        region: 'Tarangire',
        id: '64410932-f625-4cfa-92b6-6f22add58d9f',
        files: [
            '12.jpg',
            '13.jpg',
            '24.jpg',
            '4.jpg',
            '6.jpg',
            '9.jpg',
            '11.jpg',
            '2.jpg',
            '7.jpg',
            '3.jpg',
        ],
    },
    {
        name: 'Lion\'s Paw Camp',
        slug: 'ngorongoro-lion-s-paw',
        region: 'Ngorongoro crater rim',
        id: 'f291e019-2b9a-4e04-952b-251294936056',
        files: [
            'lp-aerial-crater-forest-37144c341e9d.jpg',
            'lp-aerial-crater-sunrise-129ada0e1ee4.jpg',
            'lp-bar-lounge-17266aeffd53.jpg',
            'lp-bathroom-08eda320260a.jpg',
            'lp-camp-exterior-dusk-8bc0e6ac05cb.jpg',
            'lp-exterior-aerial-dusk-f7992f3bc4a3.jpg',
            'lp-lounge-deck-exterior-abf88cab5d47.jpg',
            'lp-lounge-fireplace-affbaca59fef.jpg',
            'lp-maasai-portrait-846a93493739.jpg',
            'lp-restaurant-dining-5abea1dbc0e6.jpg',
        ],
    },
    {
        name: 'Mara River Camp',
        slug: 'mara-river-camp',
        region: 'Northern Serengeti',
        id: '85785578-8943-438e-8ae5-451ddd53e83c',
        files: [
            '1767791527388-RC_Double_7.webp',
            '1767791532281-RC_Double_4.webp',
            '1767791535814-RC_Double_9.webp',
            '1767791539618-RC_General_7.webp',
            '1767791546039-RC_Scenery_4.webp',
            '1767791523635-RC_Double_3.webp',
            '1767791529008-RC_General_1.webp',
            '1767791530759-RC_Double_1.webp',
            '1767791534111-RC_Double_6.webp',
            '1767791537791-RC_General_2.webp',
        ],
    },
    {
        name: 'Melia Ngorongoro',
        slug: 'ngorongoro-lodge-melia-collection',
        region: 'Ngorongoro Highlands',
        id: 'bab3726b-34a0-4710-8e4f-cffef0305ace',
        files: [
            '1767861237133-120cNgorongoroLodge_MeliaCollection-Crater Suite balcony.webp',
            '1767861241993-110hNgorongoroLodge_MeliaCollection-Enkaji Junior Suite.webp',
            '1767861247761-014NgorongoroLodge_MeliaCollection-Terrace.webp',
            '1767861253269-120dNgorongoroLodge_MeliaCollection-Crater Suite balcony.webp',
            '1767861257587-101aNgorongoroLodge_MeliaCollection-The Rim Room Twin bed.webp',
            '1767861262808-008cNgorongoroLodge_MeliaCollection-Lobby.webp',
            '1767861267993-101cNgorongoroLodge_MeliaCollection-The Rim Room bathroom.webp',
            '1767861228032-105bNgorongoroLodge_MeliaCollection-Family Room.webp',
            '1767861234863-110aNgorongoroLodge_MeliaCollection-Enkaji Junior Suite with out wall.webp',
            '1767861232003-016cNgorongoroLodge_MeliaCollection-Crater View.webp',
        ],
    },
    {
        name: 'Melia Serengeti Lodge',
        slug: 'melia-serengeti-lodge',
        region: 'Central Serengeti',
        id: '37d7cc59-5866-41b7-a829-a296fa75762c',
        files: [
            '1767861424354-103bSerengetiLodge_MeliaCollection-Lagon Terrace.webp',
            '1767861428888-021SerengetiLodge_MeliaCollection-Exterior hotel.webp',
            '1767861436659-115bSerengetiLodge_MeliaCollection-Suite terrace.webp',
            '1767861440454-110berengetiLodge_MeliaCollection-Suite Bedroom.webp',
            '1767861442670-008SerengetiLodge_MeliaCollection-Lobby.webp',
            '1767861448970-155fSerengetiLodge_MeliaCollection-Melia Lagoon View.webp',
            '1767861452921-006cSerengetiLodge_MeliaCollection-Lobby.webp',
            '1767861421541-100aSerengetiLodge_MeliaCollection-Melia Lagoon Twin room.webp',
            '1767861427238-108aSerengetiLodge_MeliaCollection-Melia Panoramic room.webp',
            '1767861418144-110cSerengetiLodge_MeliaCollection-Suite Bedroom.webp',
        ],
    },
    {
        name: 'Mount Meru Game Lodge',
        slug: 'mount-meru-game-lodge',
        region: 'Arusha',
        id: '905c3207-5949-48ad-a491-1b765450c4fa',
        files: [
            '18.jpg',
            '20.jpg',
            '19.JPG',
            '24.jpg',
            '22.jpg',
            '4.jpg',
            '9.jpg',
            '14.jpg',
            '16.jpg',
            '17.jpg',
        ],
    },
    {
        name: 'The Neela Boutique Hotel',
        slug: 'the-neela-boutique-hotel',
        region: 'Stone Town, Zanzibar',
        id: 'f99a984f-17f5-4e07-b5a9-e5bbf7c86fe3',
        files: [
            '1783361166840-neela-stone-town-boutique-hotel-gallery-DSC00755.jpg',
            '1783361209033-neela-stone-town-boutique-hotel-gallery-DSC00741.jpg',
            '1783361073673-neela-stone-town-boutique-hotel-gallery-DSC03275.jpg',
            '1783361073103-neela-stone-town-accommodation-art-tanzania-zanzibar-scaled.jpg',
            '1783361130586-neela-stone-town-boutique-hotel-gallery-DSC00799.jpg',
            '1783361131254-neela-stone-town-boutique-hotel-gallery-DSC04748.jpg',
            '1783361166418-neela-stone-town-boutique-hotel-gallery-DSC00957.jpg',
            '1783361208308-DSC04691.jpg',
            '1783361208669-parlour-placeholder.jpeg',
        ],
    },
    {
        name: 'Tulia Zanzibar Unique Beach Resort',
        slug: 'tulia-zanzibar-unique-beach-resort',
        region: 'Pongwe Beach, Zanzibar',
        id: '2c111934-4dbe-46d4-b0cf-e53c0cc1e32e',
        files: [
            '8.jpg',
            '9.jpg',
            '12.jpg',
            '15.jpg',
            '16.jpg',
            '21.jpg',
            '23.jpg',
            '2.jpg',
            '1.jpg',
            '4.jpg',
        ],
    },
]

export const ACCOMMODATIONS: Accommodation[] = SOURCES.map(({ id, files, ...rest }) => ({
    ...rest,
    // Several filenames carry spaces, which have to survive as %20.
    images: files.map((file) => `${CDN}/${id}/${encodeURIComponent(file)}`),
}))

const BY_SLUG = new Map(ACCOMMODATIONS.map((stay) => [stay.slug, stay]))

/**
 * The itineraries name the same lodge several different ways — "Elephant
 * Springs", "Elephant Springs Camp, Tarangire" and "Elephant Springs by Karibu
 * Camps, Tarangire" are one property — because the operator's documents do.
 * Rather than rewrite `packages.ts` to a house style, every spelling that
 * appears in an `overnight` field is listed here against the property it means.
 *
 * Deliberately absent: "Melia Arusha" / "Meliá Arusha" / "Melia, Arusha" and
 * "Pink Flamingo Boutique Hotel, Marangu" — see the note at the top. Guessing
 * Gran Meliá Arusha for the first would put the wrong hotel on the page.
 */
const OVERNIGHT_ALIASES: [overnight: string, slug: string][] = [
    ['Africa Safari Lake Natron', 'africa-safari-lake-natron'],
    ['Arusha Coffee Lodge, Arusha', 'elewana-arusha-coffee-lodge'],
    ['Arusha Serena Hotel, Resort & Spa', 'arusha-serena-hotel'],
    ['Elephant Springs', 'tarangire-elephant-springs'],
    ['Elephant Springs Camp, Tarangire', 'tarangire-elephant-springs'],
    ['Elephant Springs by Karibu Camps, Tarangire', 'tarangire-elephant-springs'],
    ['Elephant Springs, Tarangire', 'tarangire-elephant-springs'],
    ['Elewana Arusha Coffee Lodge, Arusha', 'elewana-arusha-coffee-lodge'],
    ['Gran Meliá Arusha', 'gran-melia-arusha'],
    ['Hamerkop House by Lemala, Arusha', 'hamerkop-house-by-lemala'],
    ['Kisima Ngeda Tented Camp, Lake Eyasi', 'kisima-ngeda-camp'],
    ['Kitela Lodge, Karatu', 'kitela-lodge'],
    ['Koroi Forest Camp, Arusha National Park', 'koroi-forest-camp'],
    ['Kubu Kubu Tented Lodge, Central Serengeti', 'kubu-kubu-tented-lodge'],
    ['Kubu Kubu — Honeymoon Tent, Central Serengeti', 'kubu-kubu-tented-lodge'],
    ['Kubu Kubu, Central Serengeti', 'kubu-kubu-tented-lodge'],
    ['Lahia Tented Lodge, Western Serengeti', 'lahia-tented-lodge'],
    ['Lake Burunge Baobab Tented Camp, Tarangire', 'lake-burunge-baobab-tented-lodge'],
    ['Lala Salama Camp, Serengeti', 'lala-salama-serengeti'],
    ['Lala Salama Serengeti Camp, Central Serengeti', 'lala-salama-serengeti'],
    ['Lemala Mpingo Ridge, Tarangire', 'lemala-mpingo-ridge-lodge'],
    ['Lion’s Paw Camp, Ngorongoro Crater rim', 'ngorongoro-lion-s-paw'],
    ['Lion’s Paw by Karibu Camps, Ngorongoro Crater rim', 'ngorongoro-lion-s-paw'],
    ['Mara River Camp, Northern Serengeti', 'mara-river-camp'],
    ['Melia Serengeti, Central Serengeti', 'melia-serengeti-lodge'],
    ['Meliá Ngorongoro, Ngorongoro Highlands', 'ngorongoro-lodge-melia-collection'],
    ['Meliá Serengeti Lodge, Central Serengeti', 'melia-serengeti-lodge'],
    ['Mount Meru Game Lodge, Arusha', 'mount-meru-game-lodge'],
    ['The Neela Boutique Hotel, Stone Town', 'the-neela-boutique-hotel'],
    ['Tulia Zanzibar Unique Beach Resort, Pongwe', 'tulia-zanzibar-unique-beach-resort'],
]

/**
 * Overnight strings are matched loosely — case, accents, curly apostrophes and
 * dash width all drift between documents, and none of that should cost a lodge
 * its photographs.
 */
function normalize(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
}

const BY_OVERNIGHT = new Map<string, Accommodation>()
for (const [overnight, slug] of OVERNIGHT_ALIASES) {
    const stay = BY_SLUG.get(slug)
    if (stay) BY_OVERNIGHT.set(normalize(overnight), stay)
}
// A property's own name and slug always resolve, so a new itinerary that spells
// a lodge the way the database does needs no alias.
for (const stay of ACCOMMODATIONS) {
    BY_OVERNIGHT.set(normalize(stay.name), stay)
    BY_OVERNIGHT.set(stay.slug, stay)
}

/** The property a day's `overnight` field means, when we hold photographs. */
export function findAccommodation(overnight: string | undefined): Accommodation | undefined {
    if (!overnight) return undefined
    return BY_OVERNIGHT.get(normalize(overnight))
}
