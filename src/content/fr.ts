/* ============================================================================
 * COPIE FRANÇAISE — servie sur `/fr`, prête pour le lancement de la campagne
 * francophone la semaine prochaine. Voir src/content/types.ts pour la forme
 * que chaque locale doit respecter, et src/content/en.ts pour la version
 * anglaise déjà en ligne.
 * ==========================================================================*/
import { OFFER } from '../config'
import type { LandingCopy } from './types'

export const content: LandingCopy = {
    lang: 'fr',
    ogLocale: 'fr_FR',

    metaTitle: (priceLabel) =>
        `Safari de Lune de Miel en Tanzanie — Serengeti et Ngorongoro | ${priceLabel} par personne | ${OFFER.company}`,
    metaDescription: (priceLabel) =>
        `Safari privé de lune de miel de ${OFFER.tripLengthDays} jours en Tanzanie, à travers le Serengeti et le cratère du Ngorongoro. Tout inclus à ${priceLabel} par personne pour un couple — taxes de parc, lodges romantiques, repas et guide privé. Demandez votre devis gratuit.`,
    schemaTripName: `Safari de lune de miel en Tanzanie de ${OFFER.tripLengthDays} jours`,

    whatsappGreeting:
        'Bonjour Polecat Safaris ! Nous préparons notre voyage de noces et aimerions organiser un safari en Tanzanie. Pouvez-vous nous aider et nous indiquer vos disponibilités ?',

    heroImageAlt: 'Un véhicule de safari Polecat Safaris parmi les gnous pendant la Grande Migration dans le Serengeti',
    heroBadge: 'Le safari de lune de miel pensé pour vous deux',
    heroHeadline: 'Votre Safari de Lune de Miel Privé en Tanzanie — Serengeti, Ngorongoro et la Grande Migration',
    heroSubtitle: (priceLabel) =>
        `Un safari sur mesure de ${OFFER.tripLengthDays} jours pour deux, à ${priceLabel} par personne — taxes de parc, lodges romantiques, repas, un 4x4 privé et un guide expérimenté inclus.`,
    heroZanzibarPrefix: 'Envie d’ajouter Zanzibar après le safari ?',
    heroZanzibarLinkText: 'dites-le-nous dans votre demande',

    whatsappCtaLabel: 'Écrivez-nous sur WhatsApp — Réponse Rapide',
    stickyCtaLabel: 'Devis Gratuit',

    formHeading: 'Recevez Votre Devis Gratuit',
    formSubheading: 'Indiquez-nous vos dates — nous vous enverrons un itinéraire et un devis personnalisés. Sans engagement.',

    trustSignals: [
        { icon: 'mapPin', text: 'Opérateur local en Tanzanie' },
        { icon: 'users', text: 'Guides locaux agréés' },
        { icon: 'shield', text: 'Taxes de parc incluses' },
        { icon: 'heart', text: 'Itinéraires sur mesure pour couples' },
        { icon: 'check', text: 'Devis sans engagement' },
    ],

    itineraryHeading: `Votre Itinéraire de ${OFFER.tripLengthDays} Jours`,
    itinerarySubheading: 'Serengeti • Ngorongoro • Tarangire — l’itinéraire exact de votre safari de lune de miel.',
    dayLabel: (n) => `Jour ${n}`,

    itinerary: [
        {
            name: 'Arrivée à Arusha',
            description:
                'Arrivez à Arusha et profitez d’un début de lune de miel tout en douceur. Vous serez accueillis et transférés vers votre hébergement de luxe, où vous pourrez vous reposer avant de commencer votre aventure safari.',
            lodge: { name: 'Melia Arusha', area: 'Arusha' },
        },
        {
            name: 'Vol vers le Parc National du Serengeti',
            description:
                'Après le petit-déjeuner, transfert pour votre vol programmé vers le Serengeti. Voler directement permet de gagner un temps précieux et de commencer votre expérience faunique plus tôt. Profitez de votre premier safari en véhicule avant de continuer vers votre hébergement pour la nuit.',
            lodge: { name: 'Lala Salama', area: 'Serengeti' },
        },
        {
            name: 'Journée Complète de Safari dans le Serengeti',
            description:
                'Passez une journée entière à explorer le Serengeti avec votre guide de safari privé. Recherchez lions, éléphants, girafes, guépards, léopards et autre faune tout en profitant des paysages spectaculaires du parc national le plus célèbre de Tanzanie.',
            lodge: { name: 'Kubu Kubu', area: 'Serengeti' },
        },
        {
            name: 'Du Serengeti aux Hauts Plateaux du Ngorongoro',
            description:
                'Profitez d’un autre safari en véhicule dans le Serengeti avant de voyager vers les hauts plateaux du Ngorongoro. Le trajet offre une nouvelle occasion d’observer la faune avant d’arriver pour une soirée romantique et une nuitée.',
            lodge: { name: "Lion's Paw", area: 'Hauts Plateaux du Ngorongoro' },
        },
        {
            name: 'Du Cratère du Ngorongoro au Lac Burunge',
            description:
                'Descendez dans le cratère du Ngorongoro pour un safari spectaculaire. Le cratère est l’une des meilleures destinations fauniques de Tanzanie, avec d’excellentes chances de voir lions, éléphants, buffles, hippopotames, flamants roses et bien plus. Continuez ensuite vers le lac Burunge pour votre nuitée.',
            lodge: { name: 'Baobab', area: 'Lac Burunge' },
        },
        {
            name: 'Parc National de Tarangire et Fin du Safari',
            description:
                'Profitez d’un safari dans le parc national de Tarangire, célèbre pour ses immenses populations d’éléphants, ses baobabs centenaires et sa faune variée. Ensuite, continuez vers votre point de dépose, marquant la fin de votre safari de lune de miel en Tanzanie.',
            lodge: null,
        },
    ],
    overnightLabel: 'Nuitée',
    departureDayLabel: 'Pas de nuitée — jour de départ',

    priceHeading: 'Prix — Tout Compris',
    priceSubheading: `Un prix unique par personne pour votre safari de lune de miel de ${OFFER.tripLengthDays} jours, en chambre double. Taxes de parc, lodges, repas, 4x4 privé et guide toujours inclus.`,
    priceBadge: 'Pour deux personnes',
    perPersonLabel: 'par personne',
    priceValidity: 'Valable du 1er janvier au 31 décembre 2026 · départs quotidiens',
    priceFootnote: 'Voyageur seul, ou envie d’inviter famille et amis à vous rejoindre ? Écrivez-nous et nous préparons un devis adapté. Vols internationaux non inclus.',
    priceCtaLabel: 'Recevez Votre Devis Gratuit',
    priceCtaSubfootnote: 'Aucun paiement requis · Nous répondons sous quelques heures',

    includedHeading: 'Ce Qui Est Inclus dans Votre Safari',
    includedSubheading: `Aucun coût caché. Aucune surprise. Un seul prix clair couvre l’intégralité de votre safari de ${OFFER.tripLengthDays} jours.`,
    included: [
        { icon: 'shield', title: 'Toutes les Taxes de Parc et de Conservation', desc: 'Serengeti, cratère du Ngorongoro et chaque taxe d’entrée en chemin — tout est inclus.', value: 'Aucun coût caché' },
        { icon: 'heart', title: 'Lodges et Camps Choisis pour leur Romantisme', desc: 'Lodges confortables et camps de toile sélectionnés pour leur emplacement, leur vue et leur intimité de couple.' },
        { icon: 'users', title: 'Guide Privé Expérimenté', desc: 'Un guide agréé, avec des années d’expérience dans la savane, rien que pour vous deux.' },
        { icon: 'mapPin', title: 'Véhicule 4x4 Privé', desc: 'Votre Land Cruiser avec toit ouvrant, pour une observation et des photos sans personne d’autre autour.' },
        { icon: 'utensils', title: 'Tous les Repas du Safari', desc: 'Pension complète — petit-déjeuner, déjeuner et dîner, avec la possibilité d’un dîner privé aux chandelles sur demande.' },
        { icon: 'phone', title: 'Transferts Aéroport', desc: 'Prise en charge et retour à l’aéroport international du Kilimandjaro, et assistance 24/7 pendant tout le voyage.' },
    ],

    reviewsHeading: 'Ce Que Disent Nos Voyageurs',
    reviewsSubheading: 'De vraies expériences, de vrais safaris',
    reviewsRatingSuffix: '/ 5',
    reviewsCountSuffix: 'avis sur TripAdvisor',
    // Mêmes avis réels que src/content/en.ts, traduits de l'anglais (voir la
    // note là-bas pour la source). Le champ location le précise, comme le
    // ferait TripAdvisor lui-même pour un avis traduit automatiquement.
    testimonials: [
        {
            name: 'Rainer',
            location: 'Avis vérifié sur TripAdvisor · traduit de l’anglais',
            initials: 'R',
            title: 'Un Prestataire de Safari Vraiment Exceptionnel',
            text: 'Nous avons obtenu un safari privé pour deux personnes et avons immédiatement reçu un devis adapté à nos besoins… Notre guide, Francis, était absolument formidable et, grâce à ses connaissances incroyables, nous a offert un aperçu merveilleux de la flore et de la faune de Tanzanie. Je recommande Polecat à 100 %, en toute confiance !',
        },
        {
            name: 'Karen Goulekas',
            location: 'Avis vérifié sur TripAdvisor · traduit de l’anglais',
            initials: 'KG',
            title: 'Un Excellent Voyage, un Excellent Guide',
            text: 'African Polecat Safaris a été un plaisir pour organiser notre voyage — excellente communication du début à la fin ! Notre guide, Stan, était formidable — il nous a trouvé énormément de faune et c’était un plaisir de passer du temps avec lui.',
        },
    ],

    whyBookHeading: `Pourquoi Réserver avec ${OFFER.company}`,
    whyBook: [
        { title: 'Présents Localement en Tanzanie', desc: 'Nous opérons directement depuis Arusha avec nos propres guides et véhicules — aucun intermédiaire, aucun voyage sous-traité. Vous parlez aux personnes qui organisent votre safari.' },
        { title: 'Entièrement Construit Autour de Vous Deux', desc: 'Chaque itinéraire est privé et sur mesure. Vous voulez plus de temps avec les grands félins, un vol en montgolfière ou une extension farniente à Zanzibar ? Nous l’organisons autour de vous.' },
        { title: 'Parlez à une Vraie Personne', desc: 'Vous organisez le voyage directement avec votre spécialiste safari via WhatsApp, email ou téléphone — pas un centre d’appels. Réponses rapides, conseils honnêtes.' },
        { title: 'Des Prix Honnêtes, Tout Compris', desc: 'Un seul prix clair couvre les taxes de parc, l’hébergement, les repas, le guide et le véhicule. Aucune mauvaise surprise à l’arrivée.' },
    ],

    bottomFormHeading: 'Commencez à Organiser Votre Safari de Lune de Miel',
    bottomFormSubheading: 'Dites-nous quand vous aimeriez partir et nous vous enverrons un itinéraire et un devis personnalisés sous quelques heures — sans engagement.',
    bottomFormSubmitLabel: 'Recevez Votre Devis Gratuit sur WhatsApp',
    contactPrompt: 'Vous préférez nous contacter directement ?',
    whatsappLabel: 'Écrivez-nous sur WhatsApp',

    faqHeading: 'Questions Fréquentes',
    faqs: [
        {
            question: 'Qu’est-ce qui est inclus dans le prix ?',
            answer: `Votre safari de lune de miel de ${OFFER.tripLengthDays} jours inclut toutes les taxes de parc et de conservation, l’hébergement, tous les repas pendant le safari, un véhicule 4x4 privé avec toit ouvrant, un guide expérimenté francophone ou anglophone, et les transferts aéroport. Les vols internationaux ne sont pas inclus.`,
        },
        {
            question: 'Le safari est-il entièrement privé pour nous deux ?',
            answer: 'Oui. Chaque voyage est privé par défaut — vous ne partagez le véhicule et le guide avec aucun autre couple. C’est vous qui décidez du rythme, du temps passé à chaque observation, et nous adaptons l’itinéraire à vos envies de lune de miel.',
        },
        {
            question: 'Pouvez-vous organiser des attentions romantiques ?',
            answer: 'Avec plaisir. Sur demande, nous organisons un dîner privé aux chandelles, une décoration de chambre, du champagne au coucher du soleil pendant le safari, ou une surprise pour célébrer votre mariage. Indiquez-nous vos envies dans le formulaire et nous vous proposerons des options.',
        },
        {
            question: 'Quelle est la meilleure période pour un safari en Tanzanie ?',
            answer: 'La Tanzanie est une destination idéale toute l’année. La saison sèche (juin–octobre) offre l’observation la plus facile de la faune, les animaux se rassemblant près des points d’eau. Les traversées de rivières de la Grande Migration atteignent leur point culminant entre juillet et septembre, tandis que la saison des naissances dans le sud du Serengeti va de janvier à mars.',
        },
        {
            question: 'Est-ce sûr de partir en safari en Tanzanie ?',
            answer: 'Très sûr. Vous voyagez avec un guide professionnel agréé qui connaît parfaitement les parcs, vous logez dans des lodges et camps sélectionnés, et vous suivez les règles du parc conçues pour la sécurité des visiteurs et de la faune. La Tanzanie jouit d’une solide réputation comme destination de safari.',
        },
        {
            question: 'Faut-il un visa ou des vaccins ?',
            answer: 'La plupart des visiteurs ont besoin d’un visa touristique (disponible en ligne ou à l’arrivée) et d’un justificatif de vaccination contre la fièvre jaune si vous venez d’un pays à risque de transmission. Nous envoyons à chaque couple une check-list simple avant le départ : visas, santé, bagages.',
        },
        {
            question: 'Peut-on prolonger notre lune de miel à Zanzibar ?',
            answer: 'Bien sûr — c’est l’une des extensions les plus demandées après un safari. Nous pouvons ajouter quelques jours de plage à Zanzibar à la suite de votre safari, avec transfert inclus dans le devis.',
        },
        {
            question: 'Avec combien de temps à l’avance faut-il réserver ?',
            answer: 'Nous recommandons de réserver 3 à 6 mois à l’avance, surtout pour la haute saison (juin–octobre) et les mois de la Grande Migration, où les meilleurs lodges et camps se remplissent vite. Cela dit, nous organisons souvent des voyages avec peu de préavis — n’hésitez pas à demander.',
        },
    ],

    footerTagline: 'Safaris de lune de miel sur mesure en Tanzanie.',
    privacyLinkLabel: 'Politique de Confidentialité',
    privacyPath: '/fr/confidentialite',

    form: {
        badgeText: 'Devis 100% gratuit, sans obligation de réserver',
        nameLabel: 'Prénom et nom',
        namePlaceholder: 'Votre prénom et nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        monthLabel: 'Mois du voyage',
        monthPlaceholder: 'Sélectionnez le mois',
        months: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Flexible',
        ],
        yearLabel: 'Année du voyage',
        yearPlaceholder: "Sélectionnez l'année",
        travellersLabel: 'Voyageurs',
        messageLabel: 'Message',
        messageOptional: '(facultatif)',
        messagePlaceholder: 'Dates préférées, envies romantiques, demandes particulières...',
        submitLabelDefault: 'Vérifier les disponibilités sur WhatsApp',
        disclaimerPrefix: 'Aucun paiement requis. Nous répondons sous quelques heures. En envoyant ce formulaire, vous acceptez notre',
        disclaimerLinkText: 'politique de confidentialité',
        successHeading: 'Demande envoyée ! Nous vous répondrons très vite.',
        successBody: "Si WhatsApp ne s'est pas ouvert,",
        successLinkText: 'ouvrez-le ici',
        waIntro: 'Bonjour Polecat Safaris ! Nous aimerions un devis pour un safari de lune de miel en Tanzanie.',
        waLabels: {
            name: 'Nom',
            email: 'Email',
            month: 'Mois du voyage',
            year: 'Année du voyage',
            travellers: 'Voyageurs',
            notes: 'Notes',
        },
    },
}
