#!/usr/bin/env python3
"""
Measures the scrim on the "How do you want to travel?" cards in
src/components/TravelStyles.astro, the same way scripts/hero-scrim.py measures
the hero.

    python3 scripts/style-card-scrim.py

Both the card's title and its line of copy are white over the photograph, so
each band of each card has to be dark enough underneath. Run this after adding
or re-cropping a card image and copy the worst case into the gradient in
TravelStyles.astro.

White type over a composite is (1.05) / (L + 0.05), so AA needs L <= 0.1833
for the 15px copy (4.5:1) and L <= 0.30 for the 27px title, which is large
text (3:1).
"""

from PIL import Image
from pathlib import Path

SCRIM = (35, 32, 27)
IMAGES = Path(__file__).resolve().parent.parent / 'public' / 'images'
CARDS = [
    'style-family.webp',
    'style-honeymoon.webp',
    'style-migration.webp',
    'style-trekking.webp',
    'style-fly-in.webp',
]

# Percentages of the card's height. The title is pinned to the top of the
# frame and wraps to two lines at the narrowest column; the copy is pinned to
# the floor and runs to three.
BANDS = {'title': (0, 22), 'copy': (60, 100)}
TARGETS = {'title': 1.05 / 3.0 - 0.05, 'copy': 1.05 / 4.5 - 0.05}


def _linear(channel):
    c = channel / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (_linear(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def alpha_for(rgb, target):
    low, high = 0.0, 1.0
    for _ in range(40):
        alpha = (low + high) / 2
        mixed = tuple(a * s + (1 - a) * p for a, s, p in ((alpha, s, p) for s, p in zip(SCRIM, rgb)))
        if luminance(mixed) <= target:
            high = alpha
        else:
            low = alpha
    return high


def main():
    worst = {band: 0.0 for band in BANDS}
    for name in CARDS:
        im = Image.open(IMAGES / name).convert('RGB')
        print(name)
        for band, (low, high) in BANDS.items():
            strip = im.crop((0, im.height * low // 100, im.width, im.height * high // 100))
            hot = max(strip.getdata(), key=luminance)
            alpha = alpha_for(hot, TARGETS[band])
            worst[band] = max(worst[band], alpha)
            print(f'  {band:6} {low:3}-{high:3}%  brightest {str(hot):>18}  needs {alpha:.2f}')
        print()

    print('worst case across every card — the gradient has to meet these')
    for band, alpha in worst.items():
        print(f'  {band:6} needs {alpha:.2f}')


if __name__ == '__main__':
    main()
