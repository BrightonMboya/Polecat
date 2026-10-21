#!/usr/bin/env python3
"""
Cuts homepage card frames out of photographs already in public/images/: the
3:4 portraits for the "Every safari has its own story" carousel
(src/components/Experiences.astro), and the "What kind of safari speaks to
you?" frames (src/components/TravelStyles.astro) that are not used whole.

    python3 scripts/experience-cards.py            # every card
    python3 scripts/experience-cards.py exp-solo   # just the ones named

Each card is cropped around `focus` — where the subject sits across the
source, from 0 (left edge) to 1 (right edge) — to the card's aspect ratio,
and written once at `MAX_WIDTH` or as wide as the source allows. A portrait
cut from a landscape frame 900–1300px tall is 555–960px wide: enough for a
card that renders at about 300px, not enough to be worth a second size.

Exp-family and exp-honeymoon are not here: they are 3:4 originals, used whole.
Neither are style-migration and style-fly-in.

After changing a source or a focus, re-run scripts/style-card-scrim.py (with
`--experiences` for the carousel) and copy the worst case into the gradient
in the component.
"""

import sys
from pathlib import Path

from PIL import Image

IMAGES = Path(__file__).resolve().parent.parent / 'public' / 'images'

# output name: (source, focus, width:height)
CARDS = {
    # Carousel — who is travelling.
    # Four friends in camp chairs set in the shallows of a green-season river.
    'exp-friends': ('green-season-river-chairs-1400.webp', 0.5, 3 / 4),
    # The right-hand rider of the two, alone against the sunset.
    'exp-solo': ('hero-horseback-sunset-1600.webp', 0.6, 3 / 4),
    # Kinds of safari — the first three slots are portrait, the last two 3:2.
    'style-big-five': ('hero-lionesses.webp', 0.62, 3 / 4),
    # The beach path at Tulia Zanzibar Unique Beach Resort, where the 8-Day
    # Tanzania & Zanzibar Honeymoon ends. Not in public/images: fetched from
    # the operator's bucket (see accommodations.ts) as BEACH_SOURCE below.
    'style-safari-beach': ('tulia-beach-path', 0.45, 3 / 4),
    'style-adventure-culture': ('family-walk-maasai-guide-1920.webp', 0.5, 3 / 2),
}

MAX_WIDTH = {3 / 4: 900, 3 / 2: 1400}

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


def crop(im, focus, ratio):
    if im.width / im.height > ratio:
        width = round(im.height * ratio)
        left = min(max(round(im.width * focus - width / 2), 0), im.width - width)
        return im.crop((left, 0, left + width, im.height))
    height = round(im.width / ratio)
    top = (im.height - height) // 2
    return im.crop((0, top, im.width, top + height))


def main():
    wanted = sys.argv[1:] or list(CARDS)
    for name in wanted:
        source, focus, ratio = CARDS[name]
        frame = crop(load(source).convert('RGB'), focus, ratio)
        width = min(MAX_WIDTH[ratio], frame.width)
        height = round(width / ratio)
        out = IMAGES / f'{name}.webp'
        frame.resize((width, height), Image.LANCZOS).save(out, quality=80, method=6)
        print(f'{out.name}  {width}x{height}  {out.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
