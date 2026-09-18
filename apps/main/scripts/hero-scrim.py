#!/usr/bin/env python3
"""
Measures the hero scrim in src/components/Hero.astro against every slide in
the loop, and prints the alpha each one needs for white type to clear WCAG AA.

    python3 scripts/hero-scrim.py

Run it whenever a slide is added, removed or re-cropped, and copy the worst
case into the gradient in Hero.astro. The hero cycles five photographs now, so
the scrim cannot be fitted to one of them — it has to clear the brightest
pixel any of them puts under the copy column.

The method is the one the single-image scrim was built with: take the frame the
copy actually sits in (a 1440x780 desktop hero, object-cover), find the
brightest pixel under the centred copy column in each horizontal band, and
solve for the least alpha of the scrim colour that brings white type over that
pixel to 4.5:1 for the sub-head and 3:1 for the headline. White type over a
composite is contrast (1.05) / (L + 0.05), so AA needs L <= 0.1833 at 4.5:1
and L <= 0.30 at 3:1.

Needs Pillow. Reads the .webp files straight out of public/images.
"""

from PIL import Image
from pathlib import Path

# The frame at desktop: lg:h-195 is 780px, measured at a 1440px viewport
# because object-cover crops a phone down to a slice of the middle and the
# wide viewport is where the most sky, fire and white shirt reach the copy.
VIEWPORT = (1440, 780)
# The copy column is max-w-270 at lg, centred.
COLUMN = 1080
# The scrim colour. Only its alpha is measured here.
SCRIM = (35, 32, 27)

# Bands to report, as a percentage of the frame's height. The stack is pinned
# to the floor of the frame (justify-end), so the headline lands around 40–60%
# and the sub-head and button below it.
BANDS = [(40, 56), (56, 70), (70, 86), (86, 100)]

IMAGES = Path(__file__).resolve().parent.parent / 'public' / 'images'
# Widest variant of each slide, in the order Hero.astro cycles them.
SLIDES = [
    'hero-firepit-dinner-1920.webp',
    'hero-campfire-wine-1600.webp',
    'hero-lantern-dinner-1600.webp',
    'hero-lodge-games-1400.webp',
]

L_SMALL = 1.05 / 4.5 - 0.05   # sub-head, 22px italic — not large text
L_LARGE = 1.05 / 3.0 - 0.05   # headline, 62px


def _linear(channel):
    c = channel / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (_linear(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def alpha_for(rgb, target):
    """Least scrim alpha over `rgb` that gets its luminance down to `target`."""
    low, high = 0.0, 1.0
    for _ in range(40):
        alpha = (low + high) / 2
        mixed = tuple(alpha * s + (1 - alpha) * p for s, p in zip(SCRIM, rgb))
        if luminance(mixed) <= target:
            high = alpha
        else:
            low = alpha
    return high


def framed(path):
    """The image as object-cover renders it into the hero frame."""
    width, height = VIEWPORT
    im = Image.open(path).convert('RGB')
    scale = max(width / im.width, height / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    left, top = (im.width - width) // 2, (im.height - height) // 2
    return im.crop((left, top, left + width, top + height))


def main():
    width, height = VIEWPORT
    x0 = (width - COLUMN) // 2
    worst = {}

    for name in SLIDES:
        im = framed(IMAGES / name)
        print(name)
        for low, high in BANDS:
            band = im.crop((x0, height * low // 100, x0 + COLUMN, height * high // 100))
            hot = max(band.getdata(), key=luminance)
            large, small = alpha_for(hot, L_LARGE), alpha_for(hot, L_SMALL)
            previous = worst.get((low, high), (0.0, 0.0))
            worst[(low, high)] = (max(previous[0], large), max(previous[1], small))
            print(f'  {low:3}-{high:3}%  brightest {str(hot):>18}'
                  f'   headline {large:.2f}   sub-head {small:.2f}')
        print()

    print('worst case across every slide — the scrim has to meet these')
    for (low, high), (large, small) in sorted(worst.items()):
        print(f'  {low:3}-{high:3}%   headline 3:1 needs {large:.2f}'
              f'   sub-head 4.5:1 needs {small:.2f}')


if __name__ == '__main__':
    main()
