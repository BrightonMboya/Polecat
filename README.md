# polycate

African Polecat Safaris' websites, in one repo. Every app is Astro + Tailwind v4
and builds to static HTML, but each has its own origin, its own analytics and its
own content — they are deployed separately and share nothing at runtime.

```
apps/
  main/                 africanpolecatsafaris.com — the brand site
  marketing/
    polecat-lp/         lp.africanpolecatsafaris.com — French Google Ads landing page
packages/               (empty; for anything genuinely shared later)
```

Bun workspaces. Dependencies hoist to the root `node_modules`.

## Commands

```sh
bun install            # once, from the repo root

bun run dev            # apps/main on :4321
bun run dev:lp         # the landing page on :4321

bun run build          # every app
bun run build:main
bun run build:lp
```

Each app can also be driven directly — `cd apps/main && bun run dev` — which is
what you want when running two of them at once, since they'd otherwise fight
over the port.

## Deploying

Each app is a separate static site. Point the host at the app directory and use:

| | build command | output |
|---|---|---|
| `apps/main` | `bun run build:main` | `apps/main/dist` |
| `apps/marketing/polecat-lp` | `bun run build:lp` | `apps/marketing/polecat-lp/dist` |

`site` in each app's `astro.config.mjs` is the real deployed origin — canonical
URLs, `og:url` and structured data all derive from it, so it has to match where
the app actually lands.

## apps/main

Built from the "Polecat" artboard in the Paper file *Atlas Safaris*. Copy,
prices and imagery live in `src/content/home.ts`; the components under
`src/components/` are layout only.

**The camps, itineraries and prices in there are placeholder inventory** taken
from the design. They read as real because the design needed them to, but none
of them have been checked against what the operator actually sells. Confirm
them before this site takes real traffic.

The newsletter form posts to the same Web3Forms account the landing page uses —
free tier, 250 submissions a month across both. Move to a real list provider
before that matters.
