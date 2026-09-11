/**
 * Values that are true of the business rather than of any one page. Kept
 * separate from src/content/home.ts so a second page can reuse them without
 * pulling in the homepage's copy.
 */
export const SITE = {
    name: 'Polecat Safaris',
    legalName: 'African Polecat Safaris',
    /** Wordmark is set in two lines in the design — see Wordmark.astro. */
    wordmark: { top: 'Polecat', bottom: 'Safaris' },
    tagline: 'Private, tailor-made safaris across northern Tanzania and Zanzibar.',
    /**
     * The one place the business operates from, and the only geography it
     * sells. Tanzania and Zanzibar — nothing else. Anything on this site that
     * names another country is left over from the Paper design and is a bug.
     */
    city: 'Arusha, Tanzania',
} as const

export const CONTACT = {
    phone: '+255 654 592 688',
    /** `tel:` needs the number with nothing but digits and the leading plus. */
    phoneHref: 'tel:+255654592688',
    email: 'info@africanpolecatsafaris.com',
    /** Digits only, no plus or spaces — this is what wa.me expects. */
    whatsappNumber: '255654592688',
} as const

/** A wa.me link with the greeting pre-filled, same pattern as the landing page. */
export const whatsappLink = (message: string) =>
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

/**
 * Tripadvisor figures shown beside the reviews. These are the operator's real
 * numbers, so they are safe to put in structured data — update both fields
 * together, and never let them drift from what the reviews section renders.
 */
export const TRIPADVISOR = {
    reviewCount: 175,
    ratingLabel: 'Excellent',
    ratingValue: 5,
    /**
     * The operator's own listing. Confirmed by the client on 2026-08-25 — the
     * landing page carries the same URL (apps/marketing/polecat-lp/src/config.ts);
     * Tripadvisor answers 403 to any automated fetch, so it cannot be verified
     * from here. Keep the two files in step.
     */
    url: 'https://www.tripadvisor.com/Attraction_Review-g297913-d17175044-Reviews-Polecat_Safaris-Arusha_Arusha_Region.html',
} as const

/**
 * The operator's real profiles, not placeholders — @polecatsafaris on both
 * Instagram and Facebook. There is no YouTube channel, so the footer does not
 * pretend there is one; Tripadvisor takes that third slot because it is where
 * the reviews the site quotes actually live.
 */
export const SOCIAL = {
    instagram: 'https://www.instagram.com/polecatsafaris/',
    facebook: 'https://www.facebook.com/polecatsafaris/',
    tripadvisor: TRIPADVISOR.url,
} as const

/**
 * The newsletter sign-up has no backend: the browser POSTs to Web3Forms and
 * they email the inbox the key is registered with. Same account the landing
 * page uses (apps/marketing/polecat-lp/src/config.ts) — `subject` is what
 * tells the two apart in the inbox.
 *
 * Free tier is 250 submissions a month across the whole account, shared with
 * the landing page's enquiry form. Move to a real list provider before either
 * volume matters.
 */
export const WEB3FORMS = {
    accessKey: '6da1efcc-d6a1-4a56-819d-445a39587ce5',
    endpoint: 'https://api.web3forms.com/submit',
    newsletterSubject: '[Main site] Newsletter sign-up',
    enquirySubject: '[Main site] Safari enquiry',
} as const
