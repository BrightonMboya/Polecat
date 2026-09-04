/* ============================================================================
 * AFRICAN POLECAT SAFARIS — TANZANIA SAFARI LANDING PAGE CONFIG
 * ----------------------------------------------------------------------------
 * Language-agnostic campaign data — contact details, pricing, tracking IDs,
 * images. All user-facing copy (headlines, itinerary text, form labels,
 * WhatsApp messages) lives in src/content/fr.ts so translating or adding a
 * language never touches this file.
 *
 * The page is French-only as of 2026-09-04: it serves a Google Search
 * campaign in France on general "safari en Tanzanie" intent (it used to be a
 * bilingual honeymoon page — English at `/`, French at `/fr`; the English
 * version was dropped and `/fr` now redirects to `/`).
 * ==========================================================================*/

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                    */
/* -------------------------------------------------------------------------- */
export const CONTACT = {
    /** Digits only, full international format, no "+" or spaces. Used in wa.me links. */
    whatsappNumber: '255654592688',
    /** Human-readable version shown on buttons/labels. */
    whatsappDisplay: '+255 654 592 688',
    /** Used for the tel: link. */
    phone: '+255654592688',
    /** Used for the mailto: link + contact section. */
    email: 'info@africanpolecatsafaris.com',
}

/**
 * A ready-to-use wa.me link. `message` is required rather than defaulted —
 * the greeting is user-facing copy, so it comes from the active locale's
 * content file (`content.whatsappGreeting`), not from this language-agnostic
 * config.
 */
export const whatsappLink = (message: string) =>
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

/* -------------------------------------------------------------------------- */
/*  LEAD EMAIL — Web3Forms delivers each form submission to your inbox.        */
/*  No backend, no database: the browser POSTs the fields to Web3Forms and     */
/*  they email the address you registered the key with. This runs IN PARALLEL  */
/*  with the WhatsApp handoff, so a lead is captured even if the visitor never  */
/*  sends the WhatsApp message.                                                 */
/* -------------------------------------------------------------------------- */
export const WEB3FORMS = {
    /**
     * Web3Forms access key. Delivers each form submission to the inbox this key
     * was registered with at https://web3forms.com (free tier: 250/month).
     */
    accessKey: '6da1efcc-d6a1-4a56-819d-445a39587ce5',
    endpoint: 'https://api.web3forms.com/submit',
}

/* -------------------------------------------------------------------------- */
/*  LEAD SOURCE — stamped on every lead email.                                 */
/*  African Polecat Safaris also takes enquiries through their main site and   */
/*  by phone, so the inbox needs to be able to tell at a glance which leads    */
/*  this campaign actually paid for. InquiryForm pairs these with the page URL */
/*  and the gclid/utm_* on the click.                                          */
/* -------------------------------------------------------------------------- */
export const LEAD_SOURCE = {
    /** Short tag prefixed to the email subject, e.g. "[Landing Page FR]". */
    tag: 'Landing Page FR',
    /** Human-readable line shown at the top of the email body. */
    label: 'French Tanzania safari landing page (Google Ads campaign)',
}

/* -------------------------------------------------------------------------- */
/*  GOOGLE ADS — conversion tracking.                                          */
/*  The base gtag + Consent Mode v2 live in Layout.astro, driven by `id` below.*/
/*  `conversionSendTo` is the specific conversion action fired on form submit; */
/*  value/currency come from that conversion action's defaults in Google Ads.  */
/* -------------------------------------------------------------------------- */
export const GOOGLE_ADS = {
    id: 'AW-17672655754',
    conversionSendTo: 'AW-17672655754/YwbaCLanregcEIqn_epB',
}

/* -------------------------------------------------------------------------- */
/*  OFFER                                                                      */
/* -------------------------------------------------------------------------- */
export const OFFER = {
    /** Proper noun — same spelling in every locale. */
    company: 'African Polecat Safaris',
    /** Length of the example itinerary shown on the page, in days. */
    tripLengthDays: 6,
    /**
     * Confirmed price per person, double occupancy, for the 6-day example
     * itinerary below — from the client's own itinerary document.
     *
     * ⚠️ This is the price of THAT itinerary, not a "from" price for every
     * safari we sell — we have no confirmed floor price. Never render it as
     * "à partir de"; always tie it to the 6-day example.
     */
    pricePerPerson: 2800,
}

/* -------------------------------------------------------------------------- */
/*  CURRENCY                                                                   */
/*  The safari is quoted and invoiced by the operator in US dollars — that is  */
/*  the contractual price. This campaign runs in France, so the page LEADS     */
/*  with a euro figure, but it is an indicative conversion, never a second     */
/*  price the business has committed to. Everywhere it appears it is marked    */
/*  "≈" and paired with the firm USD amount and the rate it came from.         */
/* -------------------------------------------------------------------------- */
export const FX = {
    /**
     * USD → EUR. Taken 2026-09-04 from the ECB euro foreign-exchange reference
     * rate published for 2026-09-03 (EUR/USD 1.1615 → 1 USD = 0.86095 EUR),
     * cross-checked against frankfurter.app (0.86096) and exchangerate-api
     * (0.861) — all three agreed to four decimals.
     *
     * ⚠️ THIS GOES STALE. It is a hardcoded snapshot, not a live rate: a
     * static ads page should not depend on an FX API at runtime. A few
     * percent of drift moves the displayed euro figure by ~€50, so re-check
     * it before each campaign period (`curl -sL
     * 'https://api.frankfurter.app/latest?base=USD&symbols=EUR'`) and update
     * `rate` and `asOf` together.
     */
    rate: 0.86095,
    /** Human-readable date of the rate above, as shown to the visitor. */
    asOf: '3 septembre 2026',
    /** Shown to the visitor so the conversion is checkable. */
    source: 'BCE',
}

/**
 * The euro equivalent of a USD amount, rounded to the nearest 10 € so the page
 * shows "≈ 2 410 €" rather than a false-precision "2 410,66 €". Always render
 * the result behind an "≈" — see FX above.
 */
export const eurEquivalent = (usd: number) => Math.round((usd * FX.rate) / 10) * 10

/** Format a euro amount for a French reader: 2410 → "2 410 €". */
export const eurFr = (n: number) =>
    `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}\u00A0€`

/**
 * Format a USD amount for a French reader: 2800 → "2 800 $US".
 * French convention puts the unit after the number with a non-breaking space
 * and groups thousands with a space, not a comma. The company quotes in US
 * dollars, so the currency is spelled "$US" rather than a bare "$" — a bare
 * "$" reads ambiguously in France.
 *
 * Done by hand rather than via toLocaleString('fr-FR') — keeps the same
 * dependency-free approach as the rest of this config regardless of the
 * build environment's ICU data. \u00A0 is a non-breaking space.
 */
export const usdFr = (n: number) =>
    `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}\u00A0$US`

/* -------------------------------------------------------------------------- */
/*  TRIPADVISOR                                                                */
/*  URL, rating and review count confirmed by the user 2026-08-25 (TripAdvisor */
/*  blocks scraping with a 403, so these came from the client directly rather  */
/*  than an automated fetch — verify again before launch if it's been a while). */
/*  Individual testimonial quotes are still pending — see `testimonials` in    */
/*  each locale's content file. The rating badge renders without them; the     */
/*  quote cards only render once real quotes are added.                       */
/* -------------------------------------------------------------------------- */
export const TRIPADVISOR = {
    url: 'https://www.tripadvisor.com/Attraction_Review-g297913-d17175044-Reviews-Polecat_Safaris-Arusha_Arusha_Region.html',
    rating: '5.0' as string | null,
    /** Client said "185+" — displayed with a trailing "+" wherever it's shown. */
    reviewCount: 185 as number | null,
}

export type Testimonial = {
    name: string
    location: string
    initials: string
    avatar?: string
    title: string
    text: string
}

/** TODO: paste real TripAdvisor reviews here once available — see comment above. */
export const TESTIMONIALS: Testimonial[] = []

/* -------------------------------------------------------------------------- */
/*  IMAGES                                                                     */
/* -------------------------------------------------------------------------- */
export const IMAGES = {
    // ⚠️ Currently an EXTERNAL HOTLINK to theroyalportfolio.com — a third
    // party's image on a third party's server. It can break or change without
    // warning, it costs a cross-origin connection on the LCP element, and it
    // is not licensed to this business. Real Polecat Safaris photography is
    // already vendored at /public/hero-serengeti-safari-vehicle.jpg (their own
    // vehicle among wildebeest during the migration, 1920×1280, ~323KB);
    // switch back to it, or vendor a licensed replacement.
    hero: 'https://wp.theroyalportfolio.com/app/uploads/2022/06/CW2_0761-scaled.jpg',
    /** Real brand mark, pulled from africanpolecatsafaris.com — white text, for dark backgrounds (hero). */
    logoWhite: '/logo-horizontal-white.png',
    /** Same logo, full color — for light backgrounds (footer). */
    logoColor: '/logo-horizontal-color.png',
}

/* -------------------------------------------------------------------------- */
/*  LODGE PHOTOGRAPHY — reused from Ratiba, not copied into this repo.         */
/* -------------------------------------------------------------------------- */
/**
 * Ratiba's R2 bucket, served over a custom domain with Cloudflare Image
 * Transformations enabled on the zone. Photo `key`s below are the object paths
 * from Ratiba's `accommodation_images` table, so the two stay in sync: replace
 * a lodge's photos there and this page follows.
 */
export const R2_BASE = 'https://assets.makisala.com'

/**
 * Resize + re-encode through Cloudflare on the way out — the originals are
 * ~230KB desktop JPEGs, and most of this page's traffic is expected on mobile.
 * `format=auto` serves WebP to browsers that accept it (~115KB at 800px).
 */
const cfImage = (key: string, opts: string) => `${R2_BASE}/cdn-cgi/image/${opts}${key}`

/** Full-size gallery photo. */
export const lodgePhoto = (key: string) =>
    cfImage(key, 'format=auto,quality=85,fit=scale-down,width=800')

/** 48px summary thumbnail at 2x — ~3KB, vs ~115KB for the gallery size. */
export const lodgeThumb = (key: string) =>
    cfImage(key, 'format=auto,quality=85,fit=cover,width=96,height=96')
