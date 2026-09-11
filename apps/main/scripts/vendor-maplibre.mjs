// MapLibre v6 is ESM-only and loads its web worker with
// `new URL("./maplibre-gl-worker.mjs", import.meta.url)`. Vite does not emit
// that sibling module when it bundles the library, so the worker 404s and the
// map never paints. Serving the worker (and the chunk it imports) as static
// assets lets `setWorkerUrl` point at a copy whose relative imports resolve;
// see src/components/RouteMap.astro.
import { copyFile, mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
export const VENDOR_DIR = join(ROOT, 'public/vendor/maplibre')

// Resolved rather than hard-coded: this is a workspace, so the package may be
// hoisted to the repo root instead of living under apps/main/node_modules.
const require = createRequire(import.meta.url)
const FROM = dirname(require.resolve('maplibre-gl/dist/maplibre-gl.mjs'))

// The worker, plus the shared chunk it imports.
const FILES = ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']

export async function vendorMaplibre() {
    await mkdir(VENDOR_DIR, { recursive: true })
    await Promise.all(FILES.map((file) => copyFile(join(FROM, file), join(VENDOR_DIR, file))))
}

/** Astro integration so the copy runs for `astro dev` and `astro build` alike. */
export default function maplibreAssets() {
    return {
        name: 'vendor-maplibre',
        hooks: {
            'astro:config:setup': () => vendorMaplibre(),
        },
    }
}
