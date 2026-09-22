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
 * `frames` is a list per zone rather than a single image because a route can
 * cross the same band on four separate days, and the same photograph four
 * times down one page reads worse than one. `findTrekZone` rotates through
 * them by day number — today every band holds one frame, so nothing rotates
 * yet, but adding a second to a band spreads it across a route immediately.
 *
 * Rainforest has no entry, and nor does the summit. Every route starts in
 * the forest and comes back down through it, which is eight days, and there
 * is no Kilimanjaro forest photograph in the library at all. Add one here
 * and those days light up.
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

/*
 * Two frames, not seven. Five were cut on the first review of them:
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
 * to be somewhere it is not. Both rules cost more than they are comfortable
 * to, which is why `Summit zone` is now an empty band.
 */
const ZONES: TrekZone[] = [
    {
        label: 'Heath & moorland',
        frames: [
            frame('zone-heath-trail', [900, 1400, 1920],
                'A line of trekkers strung out along a trail through low heath scrub under a deep blue sky'),
        ],
    },
    {
        label: 'Alpine desert',
        frames: [
            frame('zone-alpine-boulders', [900, 1400, 1920],
                'Trekkers picking a way between pale boulders with towering cloud building over the ridge above'),
        ],
    },
    /* No frame yet — see the note above. A summit day falls through to the
       alpine desert below it, which it does in fact cross. */
    { label: 'Summit zone', frames: [] },
]

/*
 * The `Habitat` values the itineraries actually use, in the operator's own
 * wording: "Rainforest", "Heathland", "Moorland", "Heathland / alpine zone",
 * "Alpine desert", "Semi-desert / alpine zone", "Alpine desert / summit
 * zone". Matched on the first of these that appears in the string, so a
 * compound like "Alpine desert / summit zone" resolves to the summit rather
 * than to the band below it.
 */
const MATCHES: [needle: string, label: string][] = [
    ['summit', 'Summit zone'],
    ['alpine desert', 'Alpine desert'],
    ['semi-desert', 'Alpine desert'],
    ['moorland', 'Heath & moorland'],
    ['heathland', 'Heath & moorland'],
    ['heath', 'Heath & moorland'],
]

const BY_LABEL = new Map(ZONES.map((zone) => [zone.label, zone]))

/**
 * The zone photograph for a day, or undefined where there is none — today
 * that means rainforest, and any habitat wording nobody has mapped yet.
 *
 * `index` spreads the frames within a zone across the days of one route, so a
 * climb that spends four days in the alpine desert does not show the same
 * boulder field four times.
 */
export function findTrekZone(
    habitat: string | undefined,
    index: number
): { label: string; frame: TrekZoneFrame } | undefined {
    if (!habitat) return undefined
    const needle = habitat.toLowerCase()
    // First match that both applies and has a photograph. "Alpine desert /
    // summit zone" hits the summit band first, which is empty, so it falls
    // through to the alpine desert — a band that day genuinely crosses.
    for (const [term, label] of MATCHES) {
        if (!needle.includes(term)) continue
        const zone = BY_LABEL.get(label)
        if (!zone || zone.frames.length === 0) continue
        return { label: zone.label, frame: zone.frames[index % zone.frames.length] }
    }
    return undefined
}
