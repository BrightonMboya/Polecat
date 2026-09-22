#!/usr/bin/env python3
"""
Measures the itinerary hero scrim in src/components/ItineraryHero.astro
against every package photograph, and prints the alpha each band needs for
the type over it to clear WCAG AA.

    python3 scripts/itinerary-scrim.py

Run it after adding a package, re-cropping one of these photographs or
changing an `imageFocus`, and copy the worst case into the gradient in
ItineraryHero.astro.

Same method as scripts/hero-scrim.py, with two differences that matter here.

First, this hero has type at *both* ends: a breadcrumb along the top and the
title, eyebrow and facts along the floor. A single ramp that starts dark
enough for the breadcrumb washes the whole photograph — the picture arrives
a third less bright and a third less saturated than the same frame does on
its card, which is what this scrim used to do. So the gradient is measured
as two ends with the middle left to the photograph.

Second, not all of the type is white. The breadcrumb is white at 70%, the
eyebrow is gold and the units beside the figures are sage, so each band is
solved against its own foreground rather than against white.

Needs Pillow. Reads the .webp files straight out of public/images.
"""

import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / 'public' / 'images'
PACKAGES = ROOT / 'src' / 'content' / 'packages.ts'

# The frame at desktop: lg:h-150 is 600px, measured at a 1440px viewport.
VIEWPORT = (1440, 600)
GUTTER = 52
SCRIM = (35, 32, 27)

WHITE = (255, 255, 255)
GOLD = (241, 202, 100)
SAGE = (195, 208, 202)

# Where each run of type lands in the frame, as a percentage of its height,
# with the foreground colour, its opacity, and the ratio it owes.
#
#   breadcrumb  11px caps, white/70, pt-9 from the top
#   eyebrow     11px caps, gold, above the title
#   title       66px light, white — large text
#   facts       30px light white figures with 12px sage caps beside them, so
#               the band is solved for the sage at 4.5:1, which is stricter
# The stops in ItineraryHero.astro, as (position, alpha). Every band above is
# checked against the least alpha this gradient reaches anywhere inside it.
STOPS = [
    (0.00, 0.66), (0.09, 0.62), (0.16, 0.26), (0.24, 0.05), (0.50, 0.05),
    (0.62, 0.30), (0.71, 0.76), (0.84, 0.82), (1.00, 0.88),
]

BANDS = [
    ('breadcrumb', 5, 9, (0, 400), WHITE, 1.0, 4.5),
    ('eyebrow', 71, 78, None, GOLD, 1.0, 4.5),
    ('title', 78, 92, None, WHITE, 1.0, 3.0),
    ('facts', 84, 92, None, SAGE, 1.0, 4.5),
]


def scrim_at(position):
    """The gradient's alpha at `position` down the frame."""
    for (p0, a0), (p1, a1) in zip(STOPS, STOPS[1:]):
        if p0 <= position <= p1:
            return a0 if p1 == p0 else a0 + (a1 - a0) * (position - p0) / (p1 - p0)
    return STOPS[-1][1]


def _linear(channel):
    c = channel / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (_linear(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(fg, bg):
    a, b = luminance(fg), luminance(bg)
    if a < b:
        a, b = b, a
    return (a + 0.05) / (b + 0.05)


def alpha_for(pixel, colour, opacity, ratio):
    """Least scrim alpha over `pixel` that gets `colour` to `ratio` over it."""
    low, high = 0.0, 1.0
    for _ in range(40):
        alpha = (low + high) / 2
        bg = tuple(alpha * s + (1 - alpha) * p for s, p in zip(SCRIM, pixel))
        fg = tuple(opacity * c + (1 - opacity) * b for c, b in zip(colour, bg))
        if contrast(fg, bg) >= ratio:
            high = alpha
        else:
            low = alpha
    return high


def focuses():
    """slug-less map of image base name -> the object-position y it renders at."""
    source = PACKAGES.read_text()
    default = 0.55
    found = {}
    for image, focus in re.findall(
        r"image: '/images/([a-z0-9-]+)-\d+\.webp',(.*?)\n        imageAlt:",
        source,
        re.S,
    ):
        match = re.search(r"imageFocus: '50% (\d+)%'", focus)
        found[image] = int(match.group(1)) / 100 if match else default
    return found


def framed(name, focus):
    """The photograph as object-cover renders it into the hero frame."""
    width, height = VIEWPORT
    widest = max(
        int(p.stem.rsplit('-', 1)[1]) for p in IMAGES.glob(f'{name}-*.webp')
    )
    im = Image.open(IMAGES / f'{name}-{widest}.webp').convert('RGB')
    scale = max(width / im.width, height / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    top = round((im.height - height) * focus)
    left = (im.width - width) // 2
    return im.crop((left, top, left + width, top + height))


def main():
    width, height = VIEWPORT
    worst = {}

    for name, focus in sorted(focuses().items()):
        im = framed(name, focus)
        print(f'{name}  (object-position 50% {focus:.0%})')
        for label, low, high, column, colour, opacity, ratio in BANDS:
            x0, x1 = column if column else (GUTTER, width - GUTTER)
            band = im.crop((x0, height * low // 100, x1, height * high // 100))
            hot = max(band.getdata(), key=luminance)
            need = alpha_for(hot, colour, opacity, ratio)
            worst[label] = max(worst.get(label, 0.0), need)
            print(f'  {label:11s} {low:3}-{high:3}%  brightest {str(hot):>18}'
                  f'   needs {need:.2f}')
        print()

    print('worst case across every package, against the gradient in STOPS')
    failed = False
    for label, low, high, _, _, _, ratio in BANDS:
        # The thinnest ink anywhere in the band is what the type has to live on.
        have = min(scrim_at(low / 100), scrim_at(high / 100))
        ok = have >= worst[label]
        failed = failed or not ok
        print(f'  {label:11s} {low:3}-{high:3}%   {ratio}:1 needs {worst[label]:.2f}'
              f'   scrim gives {have:.2f}   {"ok" if ok else "SHORT"}')
    if failed:
        raise SystemExit('the gradient does not clear AA — adjust STOPS')


if __name__ == '__main__':
    main()
