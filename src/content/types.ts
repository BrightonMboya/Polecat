/* ============================================================================
 * Shape of the landing page's copy (src/content/fr.ts).
 *
 * The page is French-only since 2026-09-04 — the campaign it serves runs in
 * France on general "safari en Tanzanie" intent. The locale indirection is
 * kept deliberately: all copy lives in one content file implementing this
 * interface, so adding a second language later means adding a file, not
 * unpicking strings out of the markup. Numbers, IDs and other
 * language-agnostic facts stay in src/config.ts and are threaded into the
 * copy functions below rather than duplicated here.
 * ==========================================================================*/
import type { Testimonial } from '../config'

/** Icon names must exist in src/components/Icon.astro. */
export type IconName =
    | 'bed' | 'binoculars' | 'check' | 'clock' | 'heart' | 'mapPin'
    | 'messageCircle' | 'mountain' | 'phone' | 'quote' | 'shield'
    | 'star' | 'treePine' | 'users' | 'utensils'

export type Feature = { icon: IconName; title: string; desc: string }
export type IncludedItem = Feature & { value?: string }
/** No icon — the "why book" list renders a check mark for every row. */
export type WhyBookItem = { title: string; desc: string }
export type Faq = { question: string; answer: string }
export type TrustSignal = { icon: IconName; text: string }

export type ItineraryLodge = { name: string; area: string } | null
/**
 * `anchor` is optional and, where set, becomes the day card's id — this is how
 * the #serengeti / #ngorongoro / #tarangire Google Ads sitelinks land on the
 * day that actually visits that park, without the page carrying a separate
 * destinations section for them.
 */
export type ItineraryDay = {
    name: string
    description: string
    lodge: ItineraryLodge
    anchor?: string
}

export type FormCopy = {
    badgeText: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    whatsappNumberLabel: string
    whatsappNumberPlaceholder: string
    /** Label for the single month+year travel-window select. */
    travelLabel: string
    travelPlaceholder: string
    /** The explicit "no fixed dates yet" option at the end of that select. */
    travelFlexibleLabel: string
    /** 12 month names in order — used to build "Mars 2027" option labels. */
    months: string[]
    travellersLabel: string
    messageLabel: string
    messagePlaceholder: string
    /** "(facultatif)" — shown after the WhatsApp-number and message labels. */
    optionalSuffix: string
    submitLabelDefault: string
    disclaimerPrefix: string
    disclaimerLinkText: string
    successHeading: string
    successBody: string
    successLinkText: string
    /**
     * Pieces used by InquiryForm's client script to assemble the WhatsApp
     * message client-side (plain data, not a function — frontmatter values
     * can't cross into a page <script>).
     */
    waIntro: string
    waLabels: {
        name: string
        email: string
        whatsapp: string
        travel: string
        travellers: string
        notes: string
        page: string
    }
}

export type LandingCopy = {
    lang: 'fr'
    ogLocale: string

    /* ---- head ---- */
    metaTitle: string
    metaDescription: string
    schemaTripName: string
    whatsappGreeting: string

    /* ---- 1. hero ---- */
    heroImageAlt: string
    heroBadge: string
    heroHeadline: string
    heroSubtitle: string
    /**
     * Price strip under the hero subtitle. Takes the indicative euro label and
     * the firm USD label — both, always: the euro figure is a conversion, not
     * a price the business has committed to (see FX in src/config.ts).
     */
    heroPriceLine: (eurLabel: string, usdLabel: string) => string
    ctaPrimaryLabel: string
    ctaSecondaryLabel: string
    whatsappCtaLabel: string
    stickyCtaLabel: string
    formHeading: string
    formSubheading: string
    trustSignals: TrustSignal[]

    /* ---- 3. itinéraire (#safari-tanzanie) ---- */
    itineraryHeading: string
    itinerarySubheading: string
    itinerary: ItineraryDay[]
    dayLabel: (n: number) => string
    overnightLabel: string
    departureDayLabel: string

    /* ---- 4. prix (#sur-mesure) ---- */
    priceHeading: string
    priceSubheading: string
    priceLabelPrefix: string
    perPersonLabel: string
    /** The firm USD price, shown under the euro figure on the price card. */
    priceUsdLine: (usdLabel: string) => string
    /**
     * The conversion disclosure: which rate, from when, and that the operator
     * invoices in dollars. Shown wherever the euro figure is prominent.
     */
    priceCurrencyNote: (usdLabel: string, asOf: string, source: string) => string
    priceValidity: string
    priceFootnote: string
    priceCtaLabel: string
    priceCtaSubfootnote: string

    /* ---- 5. ce qui est inclus ---- */
    includedHeading: string
    includedSubheading: string
    included: IncludedItem[]

    /* ---- 7. pourquoi réserver avec nous ---- */
    whyUsHeading: string
    whyUs: WhyBookItem[]

    /* ---- 6. avis ---- */
    reviewsHeading: string
    reviewsSubheading: string
    reviewsRatingSuffix: string
    reviewsCountSuffix: string
    testimonials: Testimonial[]

    /* ---- 9. faq ---- */
    faqHeading: string
    faqSubheading: string
    faqs: Faq[]

    /* ---- 8. cta final + contact (#contact) ---- */
    finalHeading: string
    finalSubheading: string
    finalSubmitLabel: string
    contactPrompt: string
    whatsappLabel: string

    /* ---- footer ---- */
    footerTagline: string
    privacyLinkLabel: string
    privacyPath: string

    form: FormCopy
}
