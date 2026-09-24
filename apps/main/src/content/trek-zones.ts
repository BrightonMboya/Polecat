/**
 * Photography for the altitude zones a Kilimanjaro day crosses, keyed to the
 * `Habitat` stat the trek itineraries in `packages.ts` already carry.
 *
 * Why this exists. A safari day shows the lodge it sleeps at, via
 * `accommodations.ts`. A climb sleeps in a hut or a tented camp, and the
 * operator's database holds photography for only seven of the nineteen it
 * uses — none of them on Marangu or Rongai, which left those two itineraries
 * with no photograph anywhere in the day-by-day and the other three with
 * gaps. Twenty-two of the thirty-seven trek days had nothing at all.
 *
 * So a day without a camp of its own shows the ground it walks over instead.
 * That is a different claim from the stay gallery and is captioned as one —
 * the zone, not a property — and the alt text describes the photograph rather
 * than asserting where on the mountain it was taken. What it must never do is
 * pass a landscape off as the camp you sleep at.
 *
 * `frames` is a list per zone because a route can cross the same band on four
 * separate days, and the same photograph four times down one page reads worse
 * than one. `createTrekZoneRotation` hands out a different frame each time a
 * band comes round within one climb, so a band needs at least as many frames
 * as the longest route spends days in it:
 *
 *     Rainforest        2   every route starts and ends in it
 *     Heath & moorland  2   Marangu crosses it on two days
 *     Alpine desert     4   the Northern Circuit spends four days in it
 *     Summit zone       1   no route has two summit days
 *
 * Two frames are the operator's own. The other eight were sourced from
 * Wikimedia Commons; the file each one came from is recorded beside it below,
 * so the original is findable without opening this repo's history.
 */

export interface TrekZoneFrame {
    /** Default src — the middle width, as the heroes in `home.ts` do it. */
    image: string
    srcset: string
    /** Describes the photograph, not the place it is standing in for. */
    alt: string
}

export interface TrekZone {
    /** The caption over the foot of the frame. */
    label: string
    frames: TrekZoneFrame[]
}

const frame = (name: string, widths: number[], alt: string): TrekZoneFrame => ({
    image: `/images/${name}-1400.webp`,
    srcset: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '),
    alt,
})

const W = [900, 1400, 1920]

/*
 * The operator's own library gave up two frames and no more. Five were cut on
 * the first review of it:
 *
 *   - a camp at sunrise carried a *competing Kilimanjaro operator's* logo on
 *     a water bottle, front and centre, plus an apparel mark on the jacket;
 *   - two more carried legible gear brands on a beanie and a trouser leg;
 *   - one was snowy steppe below a flat-topped mesa, with dry grass and
 *     casual winter clothing — nothing like the bare volcanic scree above
 *     5,000 m it was standing in for;
 *   - one was a lush green volcanic ridge walked in jeans, which is not
 *     Kilimanjaro moorland either.
 *
 * Nobody else's mark goes on this site, and a photograph here may not claim
 * to be somewhere it is not. Both rules held when the Commons frames below
 * were picked: every one of them is catalogued as Kilimanjaro, and the two
 * with a figure close enough to read were checked at full size for legible
 * brands before being cropped.
 */
const ZONES: TrekZone[] = [
    {
        label: 'Montane rainforest',
        frames: [
            // Commons: Lascar_Montane_rainforests_biome_(4466414438).jpg
            frame('zone-forest-mossy-trail', W,
                'A trail running into montane forest between trees hung with moss and lichen'),
            // Commons: Lascar_Exuberant_vegetation_(Montane_rainforests_biome)_(4460864208).jpg
            frame('zone-forest-understory', W,
                'Dense forest understory, every branch thick with moss and the canopy closed overhead'),
        ],
    },
    {
        label: 'Heath & moorland',
        frames: [
            frame('zone-heath-trail', W,
                'A line of trekkers strung out along a trail through low heath scrub under a deep blue sky'),
            // Commons: Shira_moorlands_on_Kilimanjaro.jpg
            frame('zone-shira-moorland-trail', W,
                'A worn path climbing between silver-leaved everlasting shrubs and dark lava rock, cloud building over the ridge'),
        ],
    },
    {
        label: 'Alpine desert',
        frames: [
            frame('zone-alpine-boulders', W,
                'Trekkers picking a way between pale boulders with towering cloud building over the ridge above'),
            // Commons: Lava_Tower.jpg
            frame('zone-lava-tower', W,
                'Two trekkers on a stony path crossing open ground below a dark crag, tussock grass and mist behind them'),
            // Commons: Mweka_Route_to_Barafu_Huts.jpg
            frame('zone-barafu-approach', W,
                'A single trekker walking up a bare grey slope toward a rock ridge, with nothing growing anywhere in the frame'),
            // Commons: Lascar_As_we_climb_we_see_less_vegetation..._(4464694182).jpg
            frame('zone-alpine-last-vegetation', W,
                'A meltwater channel running down through lava boulders and the last of the scrub, a snow-streaked cone on the skyline'),
        ],
    },
    {
        label: 'Summit zone',
        frames: [
            // Commons: Lascar_Amazing_landscape_-_Descending_from_the_summit_(4468190865).jpg
            frame('zone-summit-descent', W,
                'A trekker on a broad scree slope high above a sea of cloud, the plains far below showing through the haze'),
        ],
    },
]

/*
 * The `Habitat` values the itineraries actually use, in the operator's own
 * wording: "Rainforest", "Heathland", "Moorland", "Heathland / alpine zone",
 * "Low alpine zone", "Low alpine / moorland", "Alpine desert", "Semi-desert /
 * alpine zone", "High alpine & summit zone", "Alpine desert / summit zone",
 * "Alpine desert / upper forest". Matched on the first of these that appears
 * in the string, so a compound like "Alpine desert / summit zone" resolves to
 * the summit rather than to the band below it, and "Alpine desert / upper
 * forest" resolves to the desert rather than to the forest it is descending
 * into. "Rainforest" is matched in full for that reason — a bare "forest"
 * would catch that last one too.
 */
const MATCHES: [needle: string, label: string][] = [
    ['summit', 'Summit zone'],
    ['alpine desert', 'Alpine desert'],
    ['semi-desert', 'Alpine desert'],
    ['moorland', 'Heath & moorland'],
    ['heathland', 'Heath & moorland'],
    ['heath', 'Heath & moorland'],
    ['rainforest', 'Montane rainforest'],
]

const BY_LABEL = new Map(ZONES.map((zone) => [zone.label, zone]))

/** The band a habitat falls in, or undefined if nothing maps it. */
function resolveZone(habitat: string | undefined): TrekZone | undefined {
    if (!habitat) return undefined
    const needle = habitat.toLowerCase()
    // First match that both applies and has a photograph, so a band added to
    // MATCHES before its frames exist falls through to the one below it
    // rather than showing nothing.
    for (const [term, label] of MATCHES) {
        if (!needle.includes(term)) continue
        const zone = BY_LABEL.get(label)
        if (!zone || zone.frames.length === 0) continue
        return zone
    }
    return undefined
}

/**
 * A rotation over the days of one climb.
 *
 * Picking the frame by day number cannot keep two days off the same
 * photograph: every route walks the rainforest on its first day and again on
 * its last, and no arithmetic on 1 and 7 lands them on different frames of a
 * two-frame band. So the rotation counts how many days of *this* climb have
 * already shown each band and hands out the next frame in the list, which
 * makes every day distinct as long as the band holds enough frames.
 *
 * Create one per itinerary and call it in day order. A day showing its own
 * camp's photography must not call it at all — it would take the frame the
 * next day in that band should have had.
 */
export function createTrekZoneRotation() {
    const shown = new Map<string, number>()

    return (habitat: string | undefined) => {
        const zone = resolveZone(habitat)
        if (!zone) return undefined
        const seen = shown.get(zone.label) ?? 0
        shown.set(zone.label, seen + 1)
        return { label: zone.label, frame: zone.frames[seen % zone.frames.length] }
    }
}
