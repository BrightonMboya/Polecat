#!/usr/bin/env python3
"""
Cuts the 3:4 portrait frames for the homepage's "Every safari has its own
story" carousel (src/components/Experiences.astro) out of photographs already
in public/images/.

    python3 scripts/experience-cards.py

Each card is cropped around `focus` — where the subject sits across the
source, from 0 (left edge) to 1 (right edge) — and written once, as
exp-<slug>.webp, at 900px wide or as wide as the source allows. Most of these
sources are landscape frames 900–1300px tall, so a portrait cut from them is
555–960px wide: enough for a card that renders at about 300px, not enough to
be worth a second size.

After changing a source or a focus, re-run scripts/style-card-scrim.py with
`--experiences` and copy the worst case into the gradient in Experiences.astro.
"""

from pathlib import Path

from PIL import Image

IMAGES = Path(__file__).resolve().parent.parent / 'public' / 'images'

# slug: (source, focus)
CARDS = {
    'migration': ('serengeti-migration-game-drive.jpg', 0.5),
    'photography': ('hero-lionesses.webp', 0.62),
    # The beach path at Tulia Zanzibar Unique Beach Resort, where the 8-Day
    # Tanzania & Zanzibar Honeymoon ends. Not in public/images: fetched from
    # the operator's bucket (see accommodations.ts) as BEACH_SOURCE below.
    'beach': ('tulia-beach-path', 0.45),
    # The right half of the frame the Fly-In travel-style card uses whole —
    # wing, windows and airstrip rather than the pilot — so the two cards on
    # the same page do not read as one photograph twice.
    'fly-in': ('style-fly-in.webp', 0.82),
}

MAX_WIDTH = 900

BEACH_SOURCE = (
    'https://assets.makisala.com/accommodations/2c111934-4dbe-46d4-b0cf-e53c0cc1e32e/9.jpg'
)


def load(source):
    if source == 'tulia-beach-path':
        from io import BytesIO
        from urllib.request import Request, urlopen

        # The bucket refuses urllib's default user agent.
        request = Request(BEACH_SOURCE, headers={'User-Agent': 'Mozilla/5.0'})
        return Image.open(BytesIO(urlopen(request).read()))
    return Image.open(IMAGES / source)


def main():
    for slug, (source, focus) in CARDS.items():
        im = load(source).convert('RGB')
        width = round(im.height * 3 / 4)
        left = min(max(round(im.width * focus - width / 2), 0), im.width - width)
        frame = im.crop((left, 0, left + width, im.height))
        target = min(MAX_WIDTH, frame.width)
        out = IMAGES / f'exp-{slug}.webp'
        frame.resize((target, target * 4 // 3), Image.LANCZOS).save(out, quality=80, method=6)
        print(f'{out.name}  {target}x{target * 4 // 3}  {out.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
