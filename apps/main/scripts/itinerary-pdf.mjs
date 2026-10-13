/**
 * Prints every /safari-packages/<slug>/brochure/ page in dist/ to
 * public/itineraries/<slug>.pdf with headless Chrome, which is what the
 * "Download Itinerary" button on those itineraries links to.
 *
 *   bun run build && bun scripts/itinerary-pdf.mjs && bun run build
 *
 * The second build copies the fresh PDF into dist/. Needs Google Chrome (or
 * set CHROME to another Chromium) and a network connection: the lodge
 * photographs are hotlinked and the fonts come from Google Fonts.
 *
 * Chrome embeds every WebP losslessly and at full size, which put the first
 * print at 22 MB. Each PDF is then re-encoded with PyMuPDF
 * (`pip install pymupdf`) as JPEG, halving any photograph held at more than
 * 100 dpi at the size it prints — about 2.5 MB rather than 22. Set
 * NO_SHRINK=1 to keep Chrome's own output.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const out = join(root, 'public', 'itineraries')
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const packagesDir = join(dist, 'safari-packages')
const slugs = readdirSync(packagesDir).filter((slug) =>
    existsSync(join(packagesDir, slug, 'brochure', 'index.html')),
)
if (slugs.length === 0) throw new Error('No brochure pages in dist/ — run `bun run build` first.')

// Root-relative image paths need a server; file:// would resolve them to the disk root.
const server = Bun.serve({
    port: 0,
    async fetch(req) {
        let path = join(dist, decodeURIComponent(new URL(req.url).pathname))
        if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html')
        const file = Bun.file(path)
        return (await file.exists()) ? new Response(file) : new Response('Not found', { status: 404 })
    },
})

const SHRINK = process.env.NO_SHRINK ? null : `
import sys, fitz
doc = fitz.open(sys.argv[1])
doc.rewrite_images(dpi_threshold=100, dpi_target=96, quality=72)
# garbage above 1 drops Chrome's Type 3 font resources and blanks the text.
doc.save(sys.argv[1] + '.tmp', garbage=1, deflate=True)
import os; os.replace(sys.argv[1] + '.tmp', sys.argv[1])
`

mkdirSync(out, { recursive: true })
try {
    for (const slug of slugs) {
        const target = join(out, `${slug}.pdf`)
        // Async: a blocking spawn would stall the server Chrome is fetching from.
        const proc = Bun.spawn(
            [
                chrome,
                '--headless=new',
                '--disable-gpu',
                '--no-pdf-header-footer',
                '--virtual-time-budget=20000',
                `--print-to-pdf=${target}`,
                `http://localhost:${server.port}/safari-packages/${slug}/brochure/`,
            ],
            { stdout: 'ignore', stderr: 'pipe' },
        )
        if ((await proc.exited) !== 0 || !existsSync(target)) {
            throw new Error(`Chrome failed on ${slug}:\n${await new Response(proc.stderr).text()}`)
        }
        if (!SHRINK) continue
        const shrink = Bun.spawn(['python3', '-I', '-c', SHRINK, target], { stderr: 'inherit' })
        if ((await shrink.exited) !== 0) throw new Error(`Could not recompress ${slug}.pdf`)
        console.log(`${slug}.pdf  ${(statSync(target).size / 1024 / 1024).toFixed(1)} MB`)
    }
} finally {
    server.stop(true)
}
