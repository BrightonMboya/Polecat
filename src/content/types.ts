/* ============================================================================
 * Shape shared by every locale's copy file (src/content/en.ts, fr.ts).
 * Adding a language means implementing this interface — TypeScript will flag
 * anything missing. Numbers, IDs, and other language-agnostic facts stay in
 * src/config.ts and are threaded into the copy functions below instead of
 * being duplicated per locale.
 * ==========================================================================*/
import type { Testimonial } from '../config'

export type IncludedItem = { icon: string; title: string; desc: string; value?: string }
export type WhyBookItem = { title: string; desc: string }
export type Faq = { question: string; answer: string }
export type TrustSignal = { icon: string; text: string }
export type ItineraryLodge = { name: string; area: string } | null
export type ItineraryDay = { name: string; description: string; lodge: ItineraryLodge }

export type FormCopy = {
    badgeText: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    monthLabel: string
    monthPlaceholder: string
    /** 12 month names + a trailing "Flexible" option, in display order. */
    months: string[]
    yearLabel: string
    yearPlaceholder: string
    travellersLabel: string
    messageLabel: string
    messageOptional: string
    messagePlaceholder: string
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
        month: string
        year: string
        travellers: string
        notes: string
    }
}

export type LandingCopy = {
    lang: 'en' | 'fr'
    ogLocale: string
    metaTitle: (priceLabel: string) => string
    metaDescription: (priceLabel: string) => string
    schemaTripName: string
    whatsappGreeting: string
    heroImageAlt: string
    heroBadge: string
    heroHeadline: string
    heroSubtitle: (priceLabel: string) => string
    heroZanzibarPrefix: string
    heroZanzibarLinkText: string
    whatsappCtaLabel: string
    stickyCtaLabel: string
    formHeading: string
    formSubheading: string
    trustSignals: TrustSignal[]
    itineraryHeading: string
    itinerarySubheading: string
    itinerary: ItineraryDay[]
    /** e.g. (n) => `Day ${n}` / (n) => `Jour ${n}` — used as "{dayLabel(1)}: {day.name}". */
    dayLabel: (n: number) => string
    overnightLabel: string
    departureDayLabel: string
    priceHeading: string
    priceSubheading: string
    priceBadge: string
    perPersonLabel: string
    priceValidity: string
    priceFootnote: string
    priceCtaLabel: string
    priceCtaSubfootnote: string
    includedHeading: string
    includedSubheading: string
    included: IncludedItem[]
    reviewsHeading: string
    reviewsSubheading: string
    reviewsRatingSuffix: string
    reviewsCountSuffix: string
    testimonials: Testimonial[]
    whyBookHeading: string
    whyBook: WhyBookItem[]
    bottomFormHeading: string
    bottomFormSubheading: string
    bottomFormSubmitLabel: string
    contactPrompt: string
    whatsappLabel: string
    faqHeading: string
    faqs: Faq[]
    footerTagline: string
    privacyLinkLabel: string
    privacyPath: string
    form: FormCopy
}
