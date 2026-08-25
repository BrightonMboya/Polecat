/* ============================================================================
 * ENGLISH COPY — live at `/`. This is the campaign launching now.
 * See src/content/types.ts for the shape every locale must implement, and
 * src/content/fr.ts for the French counterpart launching next week.
 * ==========================================================================*/
import { OFFER } from '../config'
import type { LandingCopy } from './types'

export const content: LandingCopy = {
    lang: 'en',
    ogLocale: 'en_US',

    metaTitle: (priceLabel) =>
        `Tanzania Honeymoon Safari — Serengeti & Ngorongoro | ${priceLabel} per person | ${OFFER.company}`,
    metaDescription: (priceLabel) =>
        `Private ${OFFER.tripLengthDays}-day honeymoon safari in Tanzania, through the Serengeti and Ngorongoro Crater. All-inclusive at ${priceLabel} per person for a couple — park fees, romantic lodges, meals and a private guide. Request your free quote.`,
    schemaTripName: `${OFFER.tripLengthDays}-day Tanzania honeymoon safari`,

    whatsappGreeting:
        "Hi Polecat Safaris! We're planning our honeymoon and would love to organize a safari in Tanzania. Could you help us and let us know your availability?",

    heroImageAlt: 'A Polecat Safaris game-viewing vehicle among wildebeest during the Great Migration in the Serengeti',
    heroBadge: 'The honeymoon safari designed for the two of you',
    heroHeadline: 'Your Private Tanzania Honeymoon Safari — Serengeti, Ngorongoro & the Great Migration',
    heroSubtitle: (priceLabel) =>
        `A tailor-made ${OFFER.tripLengthDays}-day safari for two, from ${priceLabel} per person — park fees, romantic lodges, meals, a private 4x4 and an experienced guide included.`,
    heroZanzibarPrefix: 'Want to add Zanzibar after the safari?',
    heroZanzibarLinkText: 'tell us in your request',

    whatsappCtaLabel: 'Message Us on WhatsApp — Fast Reply',
    stickyCtaLabel: 'Free Quote',

    formHeading: 'Get Your Free Quote',
    formSubheading: 'Tell us your dates — we’ll send a personalized itinerary and quote. No obligation.',

    trustSignals: [
        { icon: 'mapPin', text: 'Local operator in Tanzania' },
        { icon: 'users', text: 'Licensed local guides' },
        { icon: 'shield', text: 'Park fees included' },
        { icon: 'heart', text: 'Tailor-made itineraries for couples' },
        { icon: 'check', text: 'No-obligation quote' },
    ],

    itineraryHeading: `Your ${OFFER.tripLengthDays}-Day Itinerary`,
    itinerarySubheading: 'Serengeti • Ngorongoro • Tarangire — this is the exact route of your honeymoon safari.',
    dayLabel: (n) => `Day ${n}`,

    itinerary: [
        {
            name: 'Arrival in Arusha',
            description:
                'Arrive in Arusha and enjoy a relaxed start to your honeymoon. You will be welcomed and transferred to your luxury accommodation, where you can rest before beginning your safari adventure.',
            lodge: { name: 'Melia Arusha', area: 'Arusha' },
        },
        {
            name: 'Fly to Serengeti National Park',
            description:
                'After breakfast, transfer for your scheduled flight to the Serengeti. Flying directly saves valuable travel time and lets you begin your wildlife experience sooner. Enjoy your first game drive before continuing on for your overnight stay.',
            lodge: { name: 'Lala Salama', area: 'Serengeti' },
        },
        {
            name: 'Full-Day Serengeti Safari',
            description:
                "Spend a full day exploring the Serengeti with your private safari guide. Look for lions, elephants, giraffes, cheetahs, leopards and other wildlife while enjoying the spectacular landscapes of Tanzania's most famous national park.",
            lodge: { name: 'Kubu Kubu', area: 'Serengeti' },
        },
        {
            name: 'Serengeti to Ngorongoro Highlands',
            description:
                'Enjoy another Serengeti game drive before travelling toward the Ngorongoro Highlands. The journey provides another opportunity for wildlife viewing before arriving for a romantic evening and overnight stay.',
            lodge: { name: "Lion's Paw", area: 'Ngorongoro Highlands' },
        },
        {
            name: 'Ngorongoro Crater to Lake Burunge',
            description:
                "Descend into the Ngorongoro Crater for a spectacular game drive. The crater is one of Tanzania's best wildlife destinations, with excellent chances to see lions, elephants, buffalo, hippos, flamingos and more. Later, continue toward Lake Burunge for your overnight stay.",
            lodge: { name: 'Baobab', area: 'Lake Burunge' },
        },
        {
            name: 'Tarangire National Park & End of Safari',
            description:
                'Enjoy a game drive in Tarangire National Park, famous for its large elephant populations, ancient baobab trees and diverse wildlife. Afterward, continue to your drop-off point, marking the end of your Tanzania honeymoon safari.',
            lodge: null,
        },
    ],
    overnightLabel: 'Overnight',
    departureDayLabel: 'No overnight stay — departure day',

    priceHeading: 'Price — All Inclusive',
    priceSubheading: `One clear price per person for your ${OFFER.tripLengthDays}-day honeymoon safari, sharing a double room. Park fees, lodges, meals, a private 4x4 and guide always included.`,
    priceBadge: 'For two people',
    perPersonLabel: 'per person',
    priceValidity: 'Valid January 1 – December 31, 2026 · daily departures',
    priceFootnote: 'Travelling solo, or want to invite family and friends along? Message us and we’ll put together a quote. International flights not included.',
    priceCtaLabel: 'Get Your Free Quote',
    priceCtaSubfootnote: 'No payment required · We reply within a few hours',

    includedHeading: 'What’s Included in Your Safari',
    includedSubheading: `No hidden costs. No surprises. One clear price covers your entire ${OFFER.tripLengthDays}-day safari.`,
    included: [
        { icon: 'shield', title: 'All Park & Conservation Fees', desc: 'Serengeti, Ngorongoro Crater and every entry fee along the way — all included.', value: 'No hidden costs' },
        { icon: 'heart', title: 'Lodges & Camps Chosen for Romance', desc: 'Comfortable lodges and tented camps selected for their location, views and privacy as a couple.' },
        { icon: 'users', title: 'Experienced Private Guide', desc: 'A licensed guide with years of experience in the bush, dedicated to just the two of you.' },
        { icon: 'mapPin', title: 'Private 4x4 Vehicle', desc: 'Your own Land Cruiser with pop-up roof, for game viewing and photos with no one else around.' },
        { icon: 'utensils', title: 'All Meals on Safari', desc: 'Full board — breakfast, lunch and dinner, with a private candlelit dinner available on request.' },
        { icon: 'phone', title: 'Airport Transfers', desc: 'Pickup and drop-off at Kilimanjaro International Airport, plus 24/7 support throughout your trip.' },
    ],

    reviewsHeading: 'What Our Travellers Say',
    reviewsSubheading: 'Real experiences, real safaris',
    reviewsRatingSuffix: '/ 5',
    reviewsCountSuffix: 'reviews on TripAdvisor',
    // Real quotes, pulled 2026-08-25 from the TripAdvisor reviews embedded on
    // africanpolecatsafaris.com's homepage (a Trustindex widget with the raw
    // review text server-rendered). Verbatim except where marked with "…" for
    // a trimmed excerpt — never paraphrased. See config.ts's note on TRIPADVISOR.
    testimonials: [
        {
            name: 'Rainer',
            location: 'Verified TripAdvisor review',
            initials: 'R',
            title: 'A Truly Fantastic Safari Provider',
            text: 'We were offered a private safari for two people and immediately received a quote tailored to our individual needs… Our guide, Francis, was absolutely fantastic and, with his incredible knowledge, gave us wonderful insights into the flora and fauna of Tanzania. I can recommend Polecat 100% with a clear conscience!',
        },
        {
            name: 'Karen Goulekas',
            location: 'Verified TripAdvisor review',
            initials: 'KG',
            title: 'Great Trip, Great Guide',
            text: 'African Polecat Safaris was a joy to work with for planning our trip — great communication from start to finish! Our guide, Stan, was awesome — found us tons of great wildlife and was a lot of fun to hang out with.',
        },
    ],

    whyBookHeading: `Why Book with ${OFFER.company}`,
    whyBook: [
        { title: 'On the Ground in Tanzania', desc: 'We operate directly from Arusha with our own guides and vehicles — no middlemen, no outsourced trips. You talk to the people actually running your safari.' },
        { title: 'Built Entirely Around You Two', desc: 'Every itinerary is private and tailor-made. Want more time with the big cats, a hot-air balloon flight, or a relaxing Zanzibar extension? We build it around you.' },
        { title: 'Talk to a Real Person', desc: 'You plan the trip directly with your safari specialist over WhatsApp, email or phone — not a call center. Fast replies, honest advice.' },
        { title: 'Honest, All-Inclusive Pricing', desc: 'One clear price covers park fees, accommodation, meals, guide and vehicle. No bad surprises on arrival.' },
    ],

    bottomFormHeading: 'Start Planning Your Honeymoon Safari',
    bottomFormSubheading: 'Tell us when you’d like to travel and we’ll send a personalized itinerary and quote within a few hours — no obligation.',
    bottomFormSubmitLabel: 'Get Your Free Quote on WhatsApp',
    contactPrompt: 'Prefer to contact us directly?',
    whatsappLabel: 'Message Us on WhatsApp',

    faqHeading: 'Frequently Asked Questions',
    faqs: [
        {
            question: 'What’s included in the price?',
            answer: `Your ${OFFER.tripLengthDays}-day honeymoon safari includes all park and conservation fees, accommodation, all meals during the safari, a private 4x4 vehicle with pop-up roof, an experienced English-speaking guide, and airport transfers. International flights are not included.`,
        },
        {
            question: 'Is the safari fully private for just the two of us?',
            answer: 'Yes. Every trip is private by default — you won’t share the vehicle or guide with any other couple. You set the pace, decide how long to spend at each sighting, and we tailor the itinerary to your honeymoon wishes.',
        },
        {
            question: 'Can you arrange romantic touches?',
            answer: 'Happily. On request, we can arrange a private candlelit dinner, room decoration, sunset champagne during the safari, or a surprise to celebrate your marriage. Let us know your wishes in the form and we’ll put together options.',
        },
        {
            question: 'What’s the best time for a Tanzania safari?',
            answer: 'Tanzania is a great destination year-round. The dry season (June–October) offers the easiest wildlife viewing, as animals gather near water sources. Great Migration river crossings peak between July and September, while the southern Serengeti calving season runs January to March.',
        },
        {
            question: 'Is it safe to go on safari in Tanzania?',
            answer: 'Very safe. You travel with a professional licensed guide who knows the parks well, stay at carefully selected lodges and camps, and follow park rules designed to protect both visitors and wildlife. Tanzania has a strong reputation as a safari destination.',
        },
        {
            question: 'Do we need a visa or vaccinations?',
            answer: 'Most visitors need a tourist visa (available online or on arrival) and proof of yellow fever vaccination if arriving from a country with transmission risk. We send every couple a simple pre-departure checklist covering visas, health and packing.',
        },
        {
            question: 'Can we extend our honeymoon to Zanzibar?',
            answer: 'Absolutely — it’s one of the most popular extensions after a safari. We can add a few beach days in Zanzibar right after your safari, with transfers included in the quote.',
        },
        {
            question: 'How far in advance should we book?',
            answer: 'We recommend booking 3 to 6 months ahead, especially for peak season (June–October) and the Great Migration months, when the best lodges and camps fill up quickly. That said, we often arrange trips on short notice — feel free to ask.',
        },
    ],

    footerTagline: 'Tailor-made honeymoon safaris in Tanzania.',
    privacyLinkLabel: 'Privacy Policy',
    privacyPath: '/privacy-policy',

    form: {
        badgeText: '100% free quote, no obligation to book',
        nameLabel: 'Full name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@email.com',
        monthLabel: 'Travel month',
        monthPlaceholder: 'Select month',
        months: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December', 'Flexible',
        ],
        yearLabel: 'Travel year',
        yearPlaceholder: 'Select year',
        travellersLabel: 'Travellers',
        messageLabel: 'Message',
        messageOptional: '(optional)',
        messagePlaceholder: 'Preferred dates, romantic requests, special needs...',
        submitLabelDefault: 'Check Availability on WhatsApp',
        disclaimerPrefix: 'No payment required. We reply within a few hours. By submitting this form, you agree to our',
        disclaimerLinkText: 'privacy policy',
        successHeading: 'Request sent! We’ll get back to you very soon.',
        successBody: 'If WhatsApp didn’t open,',
        successLinkText: 'open it here',
        waIntro: 'Hi Polecat Safaris! We’d like a quote for a honeymoon safari in Tanzania.',
        waLabels: {
            name: 'Name',
            email: 'Email',
            month: 'Travel month',
            year: 'Travel year',
            travellers: 'Travellers',
            notes: 'Notes',
        },
    },
}
