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
    /**
     * The operator's own slogan, supplied with the travel guide. Punctuated
     * the way they write it — two full stops, not a comma — so it is quoted
     * and not tidied up.
     *
     * `tagline` below does a different job and both stay: the slogan is the
     * brand line, said in the operator's voice; the tagline is the sentence
     * that states what the business actually sells. A slogan cannot do that
     * work — "Travel Deep. Feel More." tells a search result nothing about
     * Tanzania.
     *
     * The tagline no longer appears anywhere on the page: it was removed from
     * the footer by request, and its remaining job is the default meta
     * description and the `description` in the TravelAgency schema, both in
     * Layout.astro. It is still load-bearing, just invisible.
     */
    slogan: 'Travel Deep. Feel More.',
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
    /**
     * The office line, which is a different number from the mobile above and
     * is not on WhatsApp. Supplied by the operator with the travel guide; so
     * far only /travel-information/ publishes it, because that is the only
     * page where a guest already travelling needs a second way through.
     */
    officePhone: '+255 763 946 450',
    officePhoneHref: 'tel:+255763946450',
} as const

/** A wa.me link with the greeting pre-filled, same pattern as the landing page. */
export const whatsappLink = (message: string) =>
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

/**
 * Tripadvisor figures shown beside the reviews.
 *
 * There is deliberately no review count here. It only ever goes up, so any
 * number committed to the repo is wrong within weeks, and Tripadvisor answers
 * 403 to an automated fetch (see `url` below) — so it cannot be kept honest
 * from the build either. The rating and the label do not move, so they stay.
 *
 * Removing the count also took `aggregateRating` out of the structured data in
 * Layout.astro: schema.org needs a reviewCount or ratingCount for that node to
 * be valid, and a figure Google can read but no visitor can see is the same
 * stale claim wearing a hat.
 */
export const TRIPADVISOR = {
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
