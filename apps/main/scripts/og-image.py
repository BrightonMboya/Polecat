#!/usr/bin/env python3
"""
Builds public/images/og-default.jpg — the Open Graph card every page of the
site shares. 1200x630, the size Facebook, LinkedIn, WhatsApp and X all crop
from; anything else gets letterboxed or centre-cropped by one of them.

JPEG, not the .webp every other image on this site uses: link unfurlers are
not browsers, and several of them (LinkedIn and older WhatsApp among them)
still skip a WebP og:image and show a bare link instead.

Run it again after changing the photograph, the tagline or the wordmark:

    python3 scripts/og-image.py

Needs Pillow, and the site's two brand fonts. Cormorant Garamond and Karla are
loaded from Google Fonts at runtime by the site itself, so they are not in the
repo — the script caches them under scripts/.fonts/ (gitignored) and fetches
them from google/fonts on first run. Deliberately not wired into `astro build`:
the output is a committed asset, and a build should not need the network.

Nothing here reads src/config.ts, so EYEBROW/HEADLINE/DOMAIN below have to be
kept in step with SITE.tagline and SITE.wordmark by hand. They are the only
copy in the image.
"""

import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path(__file__).resolve().parent / '.fonts'
OUT = ROOT / 'public' / 'images' / 'og-default.jpg'

# The sundowner frame: warm, strongly silhouetted, and it still reads as a
# safari at the ~250px wide thumbnail X and Slack render it at. The 1920 width
# is the source because this crops to 1200 and downscaling beats upscaling.
PHOTO = ROOT / 'public' / 'images' / 'hero-sundowner-baobab-1920.webp'
MARK = ROOT / 'public' / 'images' / 'logo-mark.png'

W, H = 1200, 630
PAD = 72

CREAM = (252, 252, 250)
GOLD = (241, 202, 100)
# The scrim is mixed from the brand green rather than black, so the shadows
# stay warm against the sunset instead of going grey.
SCRIM = (10, 26, 22)

EYEBROW = 'ARUSHA · TANZANIA'
HEADLINE = ['Private, tailor-made safaris', 'in Tanzania & Zanzibar']
DOMAIN = 'africanpolecatsafaris.com'

FONTS = {
    'cormorant.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf',
    'karla.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/karla/Karla%5Bwght%5D.ttf',
}


def font(name: str, size: int, weight: int) -> ImageFont.FreeTypeFont:
    """A brand font at one size and one weight off its variable axis."""
    FONT_DIR.mkdir(exist_ok=True)
    path = FONT_DIR / name
    if not path.exists():
        print(f'fetching {name}…')
        subprocess.run(
            ['curl', '-sSLf', '--max-time', '30', FONTS[name], '-o', str(path)], check=True
        )
    f = ImageFont.truetype(str(path), size)
    f.set_variation_by_axes([weight])
    return f


def tracked(draw, xy, text, f, fill, tracking=0.0):
    """
    Draw `text` with letter-spacing, in ems, and return the width drawn.

    Pillow has no tracking, and the wordmark and eyebrows on this site are all
    set wide, so each glyph is placed by hand.
    """
    x, y = xy
    extra = tracking * f.size
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + extra
    return x - xy[0] - (extra if text else 0)


def scrim_layer() -> Image.Image:
    """
    A deep band up from the bottom edge, plus a thin veil at the very top for
    the lockup. The photograph's own subjects sit low in the frame, so the band
    has to be dark enough to read as a deliberate base rather than a haze —
    everything above 45% is left almost untouched, which is where the sunset
    that makes this frame worth using actually lives.
    """
    alpha = Image.new('L', (W, H), 0)
    px = alpha.load()
    for y in range(H):
        t = y / H
        band = 0.86 * max(0.0, (t - 0.38) / 0.62) ** 1.12
        veil = 0.34 * max(0.0, 1 - t / 0.26) ** 1.1
        row = max(band, veil, 0.06)
        # The copy column gets a little extra, but only where the copy is:
        # the eyebrow lands on the brightest part of the horizon haze, and
        # tracked-out gold at 15px has nothing to spare. Fading this in below
        # 45% keeps it out of the sky.
        column = 0.30 * min(1.0, max(0.0, (t - 0.45) / 0.12))
        for x in range(W):
            px[x, y] = int(255 * min(0.90, row + column * max(0.0, 1 - x / (W * 0.58)) ** 1.2))
    layer = Image.new('RGBA', (W, H), SCRIM)
    layer.putalpha(alpha)
    return layer


def main() -> int:
    if not PHOTO.exists():
        print(f'missing photograph: {PHOTO}', file=sys.stderr)
        return 1

    # Cover-crop: scale to fill 1200x630, then take the middle horizontally and
    # bias upwards, which keeps the sun and the baobab canopy and loses only
    # foreground grass.
    base = Image.open(PHOTO).convert('RGB')
    scale = max(W / base.width, H / base.height)
    resized = base.resize((round(base.width * scale), round(base.height * scale)), Image.LANCZOS)
    left = (resized.width - W) // 2
    top = int((resized.height - H) * 0.34)
    card = resized.crop((left, top, left + W, top + H))

    card = Image.alpha_composite(card.convert('RGBA'), scrim_layer())
    draw = ImageDraw.Draw(card)

    # ---- lockup, top left: mark, then the two-line wordmark beside it -------
    # The mark ships in brand green, which disappears against the scrim — the
    # alpha channel is the artwork, so recolouring it cream is lossless.
    mark = Image.open(MARK).convert('RGBA').resize((58, 58), Image.LANCZOS)
    mark = Image.merge('RGBA', (*(im.point(lambda _v, c=c: c) for im, c in
                                 zip(mark.split()[:3], CREAM)), mark.split()[3]))
    card.paste(mark, (PAD, PAD - 4), mark)

    wx = PAD + 58 + 18
    top_f = font('cormorant.ttf', 38, 500)
    tracked(draw, (wx, PAD - 9), 'POLECAT', top_f, CREAM, 0.13)
    bottom_f = font('karla.ttf', 12, 500)
    tracked(draw, (wx + 2, PAD + 30), 'SAFARIS', bottom_f, CREAM, 0.40)

    # ---- headline block, bottom left ---------------------------------------
    head_f = font('cormorant.ttf', 58, 400)
    eyebrow_f = font('karla.ttf', 16, 700)
    domain_f = font('karla.ttf', 15, 500)

    line_h = 68
    baseline = H - PAD - 6  # top of the domain line
    head_top = baseline - 26 - len(HEADLINE) * line_h
    tracked(draw, (PAD, head_top - 40), EYEBROW, eyebrow_f, GOLD, 0.28)
    for i, line in enumerate(HEADLINE):
        draw.text((PAD - 2, head_top + i * line_h), line, font=head_f, fill=CREAM)

    # A short gold rule, then the domain — the only thing in the frame telling
    # someone which site the link goes to.
    draw.line([(PAD, baseline + 8), (PAD + 46, baseline + 8)], fill=GOLD, width=2)
    tracked(draw, (PAD + 66, baseline - 3), DOMAIN, domain_f, CREAM, 0.16)

    card = card.convert('RGB')
    card.save(OUT, 'JPEG', quality=86, optimize=True, progressive=True)
    print(f'{OUT.relative_to(ROOT)} — {card.size[0]}x{card.size[1]}, {OUT.stat().st_size // 1024} KB')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
