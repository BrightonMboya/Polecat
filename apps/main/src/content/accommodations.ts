/**
 * Photography for the camps, lodges and hotels the itineraries in
 * `packages.ts` sleep in, keyed to the wording those itineraries use.
 *
 * Source: the operator's own database (`accommodations` +
 * `accommodation_images`), re-exported 2026-09-22. That export both widened
 * the sets already here — most lodges hold sixteen to twenty-five frames, not
 * the ten the first pass took — and added seven of the Kilimanjaro camps,
 * which the first pass had missed entirely because it looked them up by a
 * slug they are not filed under. The files are hotlinked from that bucket
 * rather than copied into `public/images/`, so re-shooting a lodge there
 * re-shoots it here, and nothing has to be rebuilt to pick it up.
 *
 * Still without photography, and rendering without a stay image:
 *
 *   - **Meliá Arusha** (3 nights). The export offers nineteen frames from the
 *     `mount-meru-hotel` row, on the grounds that Meliá rebranded that hotel,
 *     but marks the match unconfirmed and notes the row's url is still the
 *     pre-rebrand one. Held back until somebody confirms it is the same
 *     building — see the entry below. Not Gran Meliá Arusha, which is its own
 *     property and does have a shoot.
 *   - **Pink Flamingo Boutique Hotel**, Marangu (1 night). No row, no source.
 *   - **Twelve Kilimanjaro huts and camps** — Mandara, Horombo, Kibo, School
 *     Hut, Machame, Shira, Moir, Buffalo, Third Cave, Kikelewa Cave, Mawenzi
 *     Tarn and Simba. The export found Wikimedia Commons frames for five of
 *     them; they are not used here. They are thin (one to three each), they
 *     carry an attribution requirement this component has nowhere to put, and
 *     several are of the wrong thing — the "Machame Camp" frames are of
 *     Machame *Gate*, the "Shira Camp" ones of the Shira plateau. A stay
 *     gallery that captions a gate as the camp you sleep at is worse than no
 *     gallery. They need shooting, or sourcing with a licence.
 *
 * The Marangu and Rongai routes therefore still show no stay photography at
 * all; Machame and the Northern Circuit show four nights each, Lemosho seven.
 */

/** The bucket every path below hangs off. */
const CDN = 'https://assets.makisala.com/accommodations'

export interface Accommodation {
    /** The property's name as the operator's database holds it. */
    name: string
    slug: string
    /** Where it sits. Used for the photograph's alt text. */
    region: string
    /**
     * Gallery order. Ten photographs for most, eight or nine for two, and
     * empty for a property the operator's database has no shoot for yet —
     * ItineraryDays skips the gallery rather than rendering a broken frame.
     */
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
    /** The database's id for the property. Empty until it has a shoot. */
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
            '01-safari-tent-sunset-ol-doinyo-lengai.webp',
            '02-luxury-glamping-tent-exterior-deck.webp',
            '03-aerial-lodge-pool-and-tents.webp',
            '04-swimming-pool-volcano-view.webp',
            '05-main-building-walkway-entrance.webp',
            '06-restaurant-thatched-interior.webp',
            '07-restaurant-dining-with-guests.webp',
            '08-bar-counter.webp',
            '09-tent-deck-lounge-chairs.webp',
            '10-luxury-glamping-tent-lounge.webp',
            '11-bungalow-bedroom-mosquito-net.webp',
            '12-bedroom-twin-red-linen.webp',
            '13-safari-tent-twin-beds-interior.webp',
            '14-ngare-sero-gorge-river-walk.webp',
            '15-rift-valley-gorge-and-volcano-view.webp',
            '16-safari-vehicle-at-camp-volcano.webp',
            '17-pool-loungers-and-parasols.webp',
        ],
    },
    {
        name: 'Arusha Serena Hotel, Resort & Spa',
        slug: 'arusha-serena-hotel',
        region: 'Arusha / Lake Duluti',
        id: 'ce56dd0d-76eb-4284-9c3a-a5bd7515abd7',
        files: [
            '3.jpg',
            '1.jpg',
            '7.jpg',
            '15.jpg',
            '17.jpg',
            '19.jpg',
            '22.jpg',
            '2.jpg',
            '4.jpg',
            '6.jpg',
            '12.jpg',
            '9.jpg',
            '8.jpg',
            '14.jpg',
            '13.jpg',
            '18.jpg',
            '21.jpg',
            '23.jpg',
            '20.jpg',
        ],
    },
    {
        name: 'Barafu Camp',
        slug: 'barafu-camp',
        region: 'Mount Kilimanjaro',
        id: '5d29cf5c-3f9f-4266-90b5-fa7eaa2a399f',
        files: [
            'barafu-camp-huts.jpg',
            'barafu-camp-tents.jpg',
            'camp-huts-kibo-dome.jpg',
            'camping-site-at-dusk.jpg',
            'dawn-hut-silhouette-meru.jpg',
            'ridge-above-barafu-acclimatisation.jpg',
            'tent-on-exposed-ridge.jpg',
            'tent-stars-night-kibo.jpg',
        ],
    },
    {
        name: 'Barranco Camp',
        slug: 'barranco-camp',
        region: 'Mount Kilimanjaro',
        id: '4598dd52-0745-49cf-aabe-ab30a9f32161',
        files: [
            'un-tent-night-sky-stars.jpg',
            'un-tent-rocky-area-snow.jpg',
            'un-tents-in-field.jpg',
            'wm-rainbow-barranco-wall-camp.jpg',
        ],
    },
    {
        name: 'Elewana Arusha Coffee Lodge',
        slug: 'elewana-arusha-coffee-lodge',
        region: 'Arusha',
        id: '1e0518a5-5644-4186-88ad-e3418befdc9a',
        files: [
            '2.jpg',
            '3.jpg',
            '6.jpg',
            '19.jpg',
            '22.jpg',
            '23.jpg',
            '14.jpg',
            '15.jpg',
            '16.jpg',
            '25.jpg',
            '1.jpg',
            '8.jpg',
            '4.jpg',
            '17.jpg',
            '21.jpg',
            '20.jpg',
            '24.jpg',
            '18.jpg',
            '7.jpg',
            '10.jpg',
            '11.jpg',
            '12.jpg',
            '9.jpg',
            '13.jpg',
        ],
    },
    {
        name: 'Gran Melia Arusha',
        slug: 'gran-melia-arusha',
        region: 'Arusha',
        id: 'aa75a5c7-3e97-4c31-80a2-75406fb6e4a8',
        files: [
            '1767861025904-104mGranMeliaArusha-Deluxe Room Mountain Meru View Twin.webp',
            '1767861029933-102oGranMeliaArusha-Deluxe Room Bathroom.webp',
            '1767861035214-007jGranMeliaArusha-Lobby.webp',
            '1767861042432-002eGranMeliaArusha-General Facade.webp',
            '1767861053257-002iGranMeliaArusha-General Facade.webp',
            '1767861063434-007aGranMeliaArusha-Lobby.webp',
            '1767861068730-104oGranMeliaArusha-Deluxe Room Mountain Meru View.webp',
            '1767861019500-055cGranMeliaArusha-Red Level Lounge.webp',
            '1767861027695-104cGranMeliaArusha-Deluxe Room Mountain Meru View twin.webp',
            '1767861031990-104tGranMeliaArusha-Deluxe Room Mountain Meru View balcony.webp',
            '1767861038407-002sGranMeliaArusha-General Facade.webp',
            '1767861048494-005cGranMeliaArusha-Reception.webp',
            '1767861058581-002oGranMeliaArusha-Facade Entrance.webp',
            '1767861065822-104vGranMeliaArusha-Deluxe Room Mountain Meru View balcony.webp',
            '1767861071017-104pGranMeliaArusha-Deluxe Room Mountain Meru View.webp',
        ],
    },
    {
        name: 'Hamerkop House by Lemala',
        slug: 'hamerkop-house-by-lemala',
        region: 'Mount Meru foothills',
        id: 'c5c3ed3f-5f1a-4bac-94e6-1898e0f2c4fd',
        files: [
            '1.jpg',
            '5.jpg',
            '6.jpg',
            '15.jpg',
            '19.jpg',
            '23.jpg',
            '11.jpg',
            '13.jpg',
            '18.jpg',
            '24.jpg',
            '3.jpg',
            '4.jpg',
            '2.jpg',
            '8.jpg',
            '12.jpg',
            '10.jpg',
            '14.jpg',
            '17.jpg',
            '16.jpg',
            '21.jpg',
            '9.jpg',
            '7.jpg',
            '20.jpg',
            '22.jpg',
            '25.jpg',
        ],
    },
    {
        name: 'Karanga Camp',
        slug: 'karanga-camp',
        region: 'Mount Kilimanjaro',
        id: 'e7c7a7a0-a7f7-4c70-88b9-211e0a87fc78',
        files: [
            'karanga-camp-kibo-view.jpg',
            'unsplash-tent-rocky-area-2.jpg',
            'unsplash-tent-rocky-area-snow.jpg',
            'unsplash-tents-in-field.jpg',
        ],
    },
    {
        name: 'Kisima Ngeda Tented Camp',
        slug: 'kisima-ngeda-camp',
        region: 'Lake Eyasi',
        id: 'e82abae7-6e00-463e-b22e-8298d99e80e2',
        files: [
            '2.jpg',
            '5.jpg',
            '4.jpg',
            '6.jpg',
            '7.jpg',
            '8.jpg',
            '12.jpg',
            '14.jpg',
            '15.jpg',
            '11.jpg',
            '19.jpg',
            '20.jpg',
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
            '4.jpg',
            '10.jpg',
            '18.jpg',
            '20.jpg',
            '12.jpg',
            '13.jpg',
            '16.jpg',
            '24.jpg',
            '3.jpg',
            '2.jpg',
            '6.jpg',
            '15.jpg',
            '25.jpg',
            '8.jpg',
        ],
    },
    {
        name: 'Koroi Forest Camp',
        slug: 'koroi-forest-camp',
        region: 'Arusha National Park',
        id: '26025fb7-6a6e-4cbd-9ae1-28aa69ffb19b',
        files: [
            '01-forest-chalet-from-above.webp',
            '02-forest-chalets-exterior.webp',
            '03-forest-chalet-deck-exterior.webp',
            '04-raised-chalet-fig-trees.webp',
            '05-chalet-veranda-into-room.webp',
            '06-chalet-interior-wide.webp',
            '07-chalet-bedroom.webp',
            '08-chalet-bedroom-forest-view.webp',
            '09-chalet-window-daybed.webp',
            '10-chalet-fireplace-and-bed.webp',
            '11-chalet-fireplace-corner.webp',
        ],
    },
    {
        name: 'Kubu Kubu Tented Lodge',
        slug: 'kubu-kubu-tented-lodge',
        region: 'Central Serengeti',
        id: 'a53c734d-50ca-4221-b4db-c4fa27eeaa52',
        files: [
            '9.jpg',
            '12.jpg',
            '14.jpg',
            '13.jpg',
            '24.jpg',
            '25.jpg',
            '3.jpg',
            '2.jpg',
            '8.jpg',
            '5.jpg',
            '7.jpg',
            '15.jpg',
            '20.jpg',
            '16.jpg',
            '22.jpg',
            '21.jpg',
            '18.jpg',
            '17.jpg',
            '23.jpg',
            '10.jpg',
        ],
    },
    {
        name: 'Lahia Tented Lodge',
        slug: 'lahia-tented-lodge',
        region: 'Western Serengeti',
        id: '6c7a23b8-7a08-4179-b0c1-6d2a1ad012c2',
        files: [
            '6.jpg',
            '7.jpg',
            '8.jpg',
            '15.jpg',
            '17.jpg',
            '18.jpg',
            '3.jpg',
            '4.jpg',
            '9.jpg',
            '10.jpg',
            '11.jpg',
            '22.jpg',
            '2.jpg',
            '5.jpg',
            '16.jpg',
            '21.jpg',
            '20.jpg',
            '19.jpg',
        ],
    },
    {
        name: 'Lake Burunge Baobab Tented Camp',
        slug: 'lake-burunge-baobab-tented-lodge',
        region: 'Lake Burunge',
        id: '23ffc7b3-7301-4e82-91dc-3c362ecfe7d5',
        files: [
            '5.jpg',
            '15.jpg',
            '16.jpg',
            '19.jpg',
            '10.jpg',
            '17.jpg',
            '18.jpg',
            '8.jpg',
            '9.jpg',
            '4.jpg',
            '13.jpg',
            '6.jpg',
            '14.jpg',
            '7.jpg',
            '12.jpg',
            '11.jpg',
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
            '0.jpg',
            '3.jpg',
            '5.jpg',
            '8.jpg',
            '9.jpg',
        ],
    },
    {
        name: 'Lemala Mpingo Ridge',
        slug: 'lemala-mpingo-ridge-lodge',
        region: 'Tarangire',
        id: '64410932-f625-4cfa-92b6-6f22add58d9f',
        files: [
            '3.jpg',
            '12.jpg',
            '13.jpg',
            '24.jpg',
            '4.jpg',
            '6.jpg',
            '9.jpg',
            '11.jpg',
            '2.jpg',
            '7.jpg',
            '14.jpg',
            '18.jpg',
            '19.jpg',
            '1.jpg',
            '8.jpg',
            '10.jpg',
            '15.jpg',
            '21.jpg',
            '23.jpg',
            '25.jpg',
            '5.jpg',
            '17.jpg',
            '16.jpg',
            '20.jpg',
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
            '1767791523635-RC_Double_3.webp',
            '1767791529008-RC_General_1.webp',
            '1767791530759-RC_Double_1.webp',
            '1767791534111-RC_Double_6.webp',
            '1767791537791-RC_General_2.webp',
            '1767791541329-RC_Dining_1.webp',
            '1767791543698-RC_Lounge_1.webp',
        ],
    },
    {
        name: 'Melia Serengeti Lodge',
        slug: 'melia-serengeti-lodge',
        region: 'Central Serengeti',
        id: '37d7cc59-5866-41b7-a829-a296fa75762c',
        files: [
            '1767861418144-110cSerengetiLodge_MeliaCollection-Suite Bedroom.webp',
            '1767861424354-103bSerengetiLodge_MeliaCollection-Lagon Terrace.webp',
            '1767861428888-021SerengetiLodge_MeliaCollection-Exterior hotel.webp',
            '1767861436659-115bSerengetiLodge_MeliaCollection-Suite terrace.webp',
            '1767861440454-110berengetiLodge_MeliaCollection-Suite Bedroom.webp',
            '1767861442670-008SerengetiLodge_MeliaCollection-Lobby.webp',
            '1767861448970-155fSerengetiLodge_MeliaCollection-Melia Lagoon View.webp',
            '1767861452921-006cSerengetiLodge_MeliaCollection-Lobby.webp',
            '1767861421541-100aSerengetiLodge_MeliaCollection-Melia Lagoon Twin room.webp',
            '1767861427238-108aSerengetiLodge_MeliaCollection-Melia Panoramic room.webp',
            '1767861434905-104aSerengetiLodge_MeliaCollection-Melia Lagoon King room.webp',
            '1767861432288-006SerengetiLodge_MeliaCollection-Lobby.webp',
            '1767861438569-003cSerengetiLodge_MeliaCollection-Entrance hotel.webp',
            '1767861445336-130fSerengetiLodge_MeliaCollection-Lagoon View 1 Bedroom.webp',
            '1767861447184-145cSerengetiLodge_MeliaCollection-Suite Savannah 2 Bedroom.webp',
            '1767861451043-140hSerengetiLodge_MeliaCollection-Suite Lagoon 2 Bedroom.webp',
            '1767861455916-135eSerengetiLodge_MeliaCollection-Savannah Panoramic 1 Bedroom.webp',
            '1767861457935-130mSerengetiLodge_MeliaCollection-Lagoon View 1 Bedroom.webp',
        ],
    },
    {
        name: 'Mount Meru Game Lodge',
        slug: 'mount-meru-game-lodge',
        region: 'Arusha',
        id: '905c3207-5949-48ad-a491-1b765450c4fa',
        files: [
            '20.jpg',
            '19.JPG',
            '22.jpg',
            '4.jpg',
            '9.jpg',
            '14.jpg',
            '16.jpg',
            '21.jpg',
            '23.jpg',
            '2.jpg',
            '11.jpg',
            '1.jpg',
            '6.jpg',
            '5.jpg',
            '7.jpg',
            '8.jpg',
            '12.jpg',
            '3.jpg',
            '10.jpg',
            '13.jpg',
            '15.jpg',
        ],
    },
    {
        name: 'Mti Mkubwa Camp',
        slug: 'mti-mkubwa-camp',
        region: 'Mount Kilimanjaro',
        id: '4b3c8f7c-773a-4f90-ba7a-de3e15c37a0a',
        files: [
            'mti-mkubwa-camp-elevation-signboard.jpg',
            'mti-mkubwa-camp-tents-huts-forest.jpg',
            'mti-mkubwa-signpost-campsite-dusk.jpg',
            'mti-mkubwa-tents-under-big-tree.jpg',
        ],
    },
    {
        name: 'Mweka Camp',
        slug: 'mweka-camp',
        region: 'Mount Kilimanjaro',
        id: 'aa2688db-d6b8-445a-9273-4679fb737d48',
        files: [
            'mweka-camp-ranger-hut-tranquilkilimanjaro.jpg',
            'mweka-camp-tented-site-1-tranquilkilimanjaro.jpg',
            'mweka-camp-tented-site-2-tranquilkilimanjaro.jpg',
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
            'lp-restaurant-dining-5abea1dbc0e6.jpg',
            'lp-tent-exterior-trees-18bf444c86e9.jpg',
            'lp-tent-interior-bathroom-view-0e3768cf95e3.jpg',
            'lp-tent-interior-family-1bbc8488c94c.jpg',
            'lp-tent-interior-honeymoon-85f56955f2b1.jpg',
            'lp-tent-interior-twin-152a2f05721b.jpg',
        ],
    },
    {
        name: 'Melia Ngorongoro',
        slug: 'ngorongoro-lodge-melia-collection',
        region: 'Ngorongoro Highlands',
        id: 'bab3726b-34a0-4710-8e4f-cffef0305ace',
        files: [
            '1767861232003-016cNgorongoroLodge_MeliaCollection-Crater View.webp',
            '1767861237133-120cNgorongoroLodge_MeliaCollection-Crater Suite balcony.webp',
            '1767861241993-110hNgorongoroLodge_MeliaCollection-Enkaji Junior Suite.webp',
            '1767861247761-014NgorongoroLodge_MeliaCollection-Terrace.webp',
            '1767861253269-120dNgorongoroLodge_MeliaCollection-Crater Suite balcony.webp',
            '1767861257587-101aNgorongoroLodge_MeliaCollection-The Rim Room Twin bed.webp',
            '1767861262808-008cNgorongoroLodge_MeliaCollection-Lobby.webp',
            '1767861267993-101cNgorongoroLodge_MeliaCollection-The Rim Room bathroom.webp',
            '1767861228032-105bNgorongoroLodge_MeliaCollection-Family Room.webp',
            '1767861234863-110aNgorongoroLodge_MeliaCollection-Enkaji Junior Suite with out wall.webp',
            '1767861239074-110tNgorongoroLodge_MeliaCollection-Enkaji Junior Suite Bathroom.webp',
            '1767861244492-116cNgorongoroLodge_MeliaCollection-Ngorongoro Suite.webp',
            '1767861250917-102NgorongoroLodge_MeliaCollection-The Rim Room King Bed.webp',
            '1767861255095-113aNgorongoroLodge_MeliaCollection-Enkaji Junior Suite with wall.webp',
            '1767861260087-011NgorongoroLodge_MeliaCollection-TV Lounge Area.webp',
            '1767861265647-116rNgorongoroLodge_MeliaCollection-Ngorongoro Suite.webp',
            '1767861270737-015NgorongoroLodge_MeliaCollection-Terrace.webp',
            '1767861276614-010NgorongoroLodge_MeliaCollection-TV Lounge Area.webp',
        ],
    },
    {
        name: 'Shira 1 Camp',
        slug: 'shira-1-camp',
        region: 'Mount Kilimanjaro',
        id: '1a37e73d-2ea1-44fa-a0e9-e3bc8126c84d',
        files: [
            'camp-on-lemosho-route.jpg',
            'camp-tents-with-kibo-view.jpg',
            'shira-1-camp-sunrise.jpg',
            'shira-cave-camp-20-2827415155_7843151847_h.jpg',
            'shira-cave-camp-22-32206040026_bf82524aac_o.jpg',
            'shira-cave-camp-23-9685149730_80dff8000b_k.jpg',
            'shira-cave-camp-24-4997049530_9acf2698d1_b.jpg',
            'shira-cave-camp-25-4997046692_6b371579b0_b.jpg',
            'shira-cave-camp-26-6751860645_56dfe200c3_k.jpg',
            'shira-cave-camp-27-21077837803_6c652bd2eb_k.jpg',
            'shira-cave-camp-28-28672574392_58b5585e99_k.jpg',
            'shira-cave-camp-30-6920036653_5682b9b7ac_k.jpg',
            'shira-cave-camp-31-shira-cave-camp.jpg',
            'tent-camp-above-the-clouds.jpg',
            'tent-with-kibo-backdrop.jpg',
        ],
    },
    {
        name: 'Shira 2 Camp',
        slug: 'shira-2-camp',
        region: 'Mount Kilimanjaro',
        id: 'e097aade-69bf-42bd-9ea2-ba16bbdccf0e',
        files: [
            'camping-site-at-dusk.jpg',
            'shira-2-camp-at-night.jpg',
            'shira-2-camp-gallery-1.jpg',
            'shira-2-camp-gallery-10.jpg',
            'shira-2-camp-gallery-2.jpg',
            'shira-2-camp-gallery-3.jpg',
            'shira-2-camp-gallery-4.jpg',
            'shira-2-camp-gallery-5.jpg',
            'shira-2-camp-gallery-6.jpg',
            'shira-2-camp-gallery-8.jpg',
            'shira-2-camp-gallery-9.jpg',
            'shira-2-camp-hero.jpg',
            'shira-2-camp-view.jpg',
        ],
    },
    {
        name: 'Elephant Springs by Karibu Camps',
        slug: 'tarangire-elephant-springs',
        region: 'Tarangire (inside park)',
        id: 'a5bfcc28-84c7-496b-8253-c246dadd113c',
        files: [
            '1.jpg',
            '4.jpg',
            '11.jpg',
            '17.jpg',
            '21.jpg',
            '25.jpg',
            '5.jpg',
            '9.jpg',
            '2.jpg',
            '6.jpg',
            '3.jpg',
            '7.jpg',
            '8.jpg',
            '12.jpg',
            '10.jpg',
            '13.jpg',
            '14.jpg',
            '16.jpg',
            '19.jpg',
            '15.jpg',
            '18.jpg',
            '20.jpg',
            '22.jpg',
            '23.jpg',
            '24.jpg',
        ],
    },
    {
        name: 'The Neela Boutique Hotel',
        slug: 'the-neela-boutique-hotel',
        region: 'Stone Town, Zanzibar',
        id: 'f99a984f-17f5-4e07-b5a9-e5bbf7c86fe3',
        files: [
            '1783361073673-neela-stone-town-boutique-hotel-gallery-DSC03275.jpg',
            '1783361073103-neela-stone-town-accommodation-art-tanzania-zanzibar-scaled.jpg',
            '1783361130586-neela-stone-town-boutique-hotel-gallery-DSC00799.jpg',
            '1783361131254-neela-stone-town-boutique-hotel-gallery-DSC04748.jpg',
            '1783361166418-neela-stone-town-boutique-hotel-gallery-DSC00957.jpg',
            '1783361208308-DSC04691.jpg',
            '1783361208669-parlour-placeholder.jpeg',
            '1783361166840-neela-stone-town-boutique-hotel-gallery-DSC00755.jpg',
            '1783361209033-neela-stone-town-boutique-hotel-gallery-DSC00741.jpg',
        ],
    },
    {
        name: 'Tulia Zanzibar Unique Beach Resort',
        slug: 'tulia-zanzibar-unique-beach-resort',
        region: 'Pongwe Beach, Zanzibar',
        id: '2c111934-4dbe-46d4-b0cf-e53c0cc1e32e',
        files: [
            '4.jpg',
            '9.jpg',
            '12.jpg',
            '15.jpg',
            '21.jpg',
            '23.jpg',
            '2.jpg',
            '1.jpg',
            '6.jpg',
            '5.jpeg',
            '3.jpg',
            '7.jpg',
            '10.jpg',
            '11.jpg',
            '14.jpg',
            '13.jpg',
            '22.jpg',
            '20.jpg',
            '25.JPG',
            '24.jpg',
        ],
    },
    /*
     * Still no shoot. The operator's export offers nineteen photographs
     * from the `mount-meru-hotel` row on the grounds that Meliá rebranded
     * that hotel, but flags the match unconfirmed and its stored url is
     * still the pre-rebrand one. Putting the wrong building on three
     * itineraries is worse than putting none, so it waits. The property
     * is here so the three ways the documents spell it resolve to one
     * thing; the day renders without a gallery until `files` is filled.
     * It is a different hotel from Gran Meliá Arusha above.
     */
    {
        name: 'Meliá Arusha',
        slug: 'melia-arusha',
        region: 'Arusha',
        id: '',
        files: [],
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
 * The three Meliá Arusha spellings are aliased to one property that has no
 * photography yet, so the nights group correctly now and light up the moment
 * its files land. Still absent: "Pink Flamingo Boutique Hotel, Marangu".
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
    ['Melia Arusha', 'melia-arusha'],
    ['Melia, Arusha', 'melia-arusha'],
    ['Meliá Arusha', 'melia-arusha'],
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
