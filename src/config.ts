/* ============================================================================
 * POLECAT SAFARIS — HONEYMOON LANDING PAGE CONFIG
 * ----------------------------------------------------------------------------
 * Language-agnostic campaign data shared by every locale (English at `/`,
 * French at `/fr`) — contact details, pricing, tracking IDs, images. All
 * user-facing copy (headlines, itinerary text, form labels, WhatsApp
 * messages) lives per-locale in src/content/en.ts and src/content/fr.ts so
 * translating or adding a language never touches this file.
 * Fields marked TODO still need real values before this goes live.
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
     *
     * TODO: create a free Web3Forms account for info@africanpolecatsafaris.com
     * and paste the access key here. Left empty for now — the form still opens
     * WhatsApp, it just skips the parallel email step until this is set.
     */
    accessKey: '',
    endpoint: 'https://api.web3forms.com/submit',
}

/* -------------------------------------------------------------------------- */
/*  GOOGLE ADS — conversion tracking.                                          */
/*  The base gtag + Consent Mode v2 live in Layout.astro, driven by `id` below.*/
/*  `conversionSendTo` is the specific conversion action fired on form submit; */
/*  value/currency come from that conversion action's defaults in Google Ads.  */
/* -------------------------------------------------------------------------- */
export const GOOGLE_ADS = {
    /** TODO: replace with Polecat Safaris' real Google Ads account tag ("AW-XXXXXXXXX"). */
    id: 'AW-XXXXXXXXX',
    /** TODO: full `send_to` ("AW-<id>/<label>") from the conversion event snippet. */
    conversionSendTo: '',
}

/* -------------------------------------------------------------------------- */
/*  OFFER                                                                      */
/* -------------------------------------------------------------------------- */
export const OFFER = {
    /** Proper noun — same spelling in every locale. */
    company: 'Polecat Safaris',
    /** Number of days/nights on the ground, used for the schema.org duration ("P6D"). */
    tripLengthDays: 6,
    /** Confirmed price per person, double occupancy — from the client's itinerary. */
    pricePerPerson: 2800,
}

/**
 * Format a number as a US-style dollar price: 2800 → "$2,800".
 * Done by hand rather than via toLocaleString('en-US') — keeps the same
 * dependency-free approach as the rest of this config regardless of the
 * build environment's ICU data.
 */
export const usd = (n: number) => `$${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

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
    // Served from /public. Swap the file to change it.
    // Real Polecat Safaris photography (their own safari vehicle and guests
    // with wildebeest during the migration), pulled from africanpolecatsafaris.com
    // and downloaded locally — resized/re-compressed for page weight.
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
