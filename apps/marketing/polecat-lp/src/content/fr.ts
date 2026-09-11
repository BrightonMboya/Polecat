/* ============================================================================
 * COPIE FRANÇAISE — la seule et unique copie de la page (servie sur `/`).
 *
 * Cette page sert une campagne Google Search en France sur l'intention
 * générique « safari en Tanzanie ». Elle N'EST PLUS positionnée sur le voyage
 * de noces : le mot-clé principal est « safari en Tanzanie » / « safari
 * Tanzanie », décliné naturellement (H1, premier paragraphe, un H2, corps de
 * texte, title, meta description).
 *
 * ⚠️ RÈGLE DE CONTENU : rien ici ne doit être inventé. Prix, inclusions,
 * itinéraire, avis, note TripAdvisor viennent tous du client. Une affirmation
 * qui n'est pas confirmée ne figure pas sur la page — voir les commentaires
 * marqués « confirmé » ci-dessous.
 *
 * ⚠️ ANCRES : les `id` des destinations (#serengeti, #ngorongoro, #tarangire)
 * ainsi que #safari-tanzanie, #sur-mesure et #contact sont les cibles des
 * extensions de liens (sitelinks) Google Ads. Ne pas les renommer.
 * ==========================================================================*/
import { FX, OFFER, eurEquivalent, eurFr, usdFr } from '../config'
import type { LandingCopy } from './types'

export const content: LandingCopy = {
    lang: 'fr',
    ogLocale: 'fr_FR',

    /* ---------------------------------------------------------------- head */
    metaTitle: `Safari en Tanzanie sur mesure | ${OFFER.company}`,
    metaDescription:
        'Découvrez la Tanzanie avec un safari privé sur mesure. Serengeti, Ngorongoro, Tarangire et bien plus. Demandez votre itinéraire personnalisé.',
    schemaTripName: 'Safari privé sur mesure en Tanzanie',

    whatsappGreeting:
        'Bonjour African Polecat Safaris ! Je souhaite organiser un safari en Tanzanie et j’aimerais recevoir un devis personnalisé.',

    /* ------------------------------------------------------------ 1. héros */
    heroImageAlt:
        'Safari en Tanzanie : un véhicule 4x4 à toit ouvrant au milieu de la savane du Serengeti',
    heroBadge: 'Opérateur local basé à Arusha, Tanzanie',
    heroHeadline: 'Safari en Tanzanie sur mesure',
    heroSubtitle:
        'Explorez le Serengeti, le Ngorongoro et Tarangire lors d’un safari privé conçu selon vos envies. Voyagez avec un guide local et découvrez la Tanzanie autrement.',
    // Formulation volontairement rattachée à l'itinéraire de 6 jours : c'est le
    // seul prix confirmé. Surtout pas de « à partir de » (voir config.ts).
    // L'euro passe devant (campagne France) mais reste précédé de « environ »,
    // le dollar suit entre parenthèses : c'est la devise de facturation.
    heroPriceLine: (eurLabel, usdLabel) =>
        `Exemple : notre safari privé de ${OFFER.tripLengthDays} jours Serengeti · Ngorongoro · Tarangire à environ ${eurLabel} par personne (${usdLabel}), tout compris hors vols internationaux.`,
    ctaPrimaryLabel: 'Demander un devis',
    // Rendu comme lien souligné dans la ligne sous le sous-titre (structure
    // Mufasa), pas comme troisième bouton : deux boutons suffisent au-dessus
    // de la ligne de flottaison.
    ctaSecondaryLabel: 'Voir nos safaris',
    whatsappCtaLabel: 'Nous écrire sur WhatsApp',
    stickyCtaLabel: 'Demander un devis',

    formHeading: 'Demander un devis',
    formSubheading:
        'Dites-nous quand vous souhaitez partir : nous vous répondons avec un itinéraire et un devis personnalisés. Sans engagement.',

    trustSignals: [
        { icon: 'mapPin', text: 'Opérateur local en Tanzanie' },
        { icon: 'users', text: 'Guides locaux agréés' },
        { icon: 'binoculars', text: 'Safaris 100 % privés' },
        { icon: 'shield', text: 'Taxes de parc incluses' },
        { icon: 'check', text: 'Devis sans engagement' },
    ],

    /* --------------------------------------------------- 3. itinéraire */
    // Le H2 porte le mot-clé principal et le sous-titre porte le message
    // « sur mesure » : ce sont les deux rôles que tenaient les sections
    // Destinations et Safari sur mesure, supprimées pour alléger la page.
    itineraryHeading: `Votre safari en Tanzanie — itinéraire de ${OFFER.tripLengthDays} jours`,
    itinerarySubheading:
        'Arusha · Serengeti · cratère du Ngorongoro · Tarangire. Un exemple d’itinéraire, que nous opérons réellement : nous adaptons la durée, les parcs, les hébergements et le rythme à vos envies, vos dates et votre budget.',
    dayLabel: (n) => `Jour ${n}`,
    itinerary: [
        {
            name: 'Arrivée à Arusha',
            description:
                'Accueil à votre arrivée et transfert vers votre hébergement à Arusha, point de départ du circuit nord. Une soirée tranquille pour récupérer du vol avant le début du safari.',
            lodge: { name: 'Melia Arusha', area: 'Arusha' },
        },
        {
            name: 'Vol vers le parc national du Serengeti',
            description:
                'Après le petit-déjeuner, transfert vers votre vol pour le Serengeti. Rejoindre le parc par les airs évite une longue journée de route et permet de commencer l’observation plus tôt : premier safari en véhicule dès l’arrivée, avant de rejoindre votre camp.',
            lodge: { name: 'Lala Salama', area: 'Serengeti' },
            // Cible du sitelink « Safari au Serengeti ».
            anchor: 'serengeti',
        },
        {
            name: 'Journée complète de safari dans le Serengeti',
            description:
                'Une journée entière dans le Serengeti avec votre guide privé, à la recherche des lions, éléphants, girafes, guépards et léopards, au fil des plaines et des rivières du parc.',
            lodge: { name: 'Kubu Kubu', area: 'Serengeti' },
        },
        {
            name: 'Du Serengeti aux hauts plateaux du Ngorongoro',
            description:
                'Un dernier safari dans le Serengeti le matin, puis route vers les hauts plateaux du Ngorongoro. Le trajet traverse des zones riches en faune et offre de nouvelles occasions d’observation avant l’arrivée en fin de journée.',
            lodge: { name: "Lion's Paw", area: 'Hauts plateaux du Ngorongoro' },
        },
        {
            name: 'Cratère du Ngorongoro, puis lac Burunge',
            description:
                'Descente dans le cratère du Ngorongoro pour une journée de safari : c’est l’un des sites où la faune est la plus dense de Tanzanie, avec de bonnes chances d’observer lions, éléphants, buffles, hippopotames et flamants roses. Route ensuite vers le lac Burunge.',
            lodge: { name: 'Baobab', area: 'Lac Burunge' },
            // Cible du sitelink « Cratère du Ngorongoro ».
            anchor: 'ngorongoro',
        },
        {
            name: 'Parc national de Tarangire et fin du safari',
            description:
                'Safari dans le parc national de Tarangire, entre troupeaux d’éléphants et baobabs centenaires, avant le transfert vers votre point de dépose — fin du safari.',
            lodge: null,
            // Cible du sitelink « Safari à Tarangire ».
            anchor: 'tarangire',
        },
    ],
    overnightLabel: 'Nuitée',
    departureDayLabel: 'Pas de nuitée — jour de départ',

    /* --------------------------------------------------------- 4. prix */
    priceHeading: 'Prix — tout compris',
    priceSubheading: `Le prix de l’itinéraire de ${OFFER.tripLengthDays} jours ci-dessus, par personne en chambre double. Taxes de parc, hébergements, repas, 4x4 privé et guide toujours inclus.`,
    priceLabelPrefix: `Cet itinéraire de ${OFFER.tripLengthDays} jours`,
    perPersonLabel: 'par personne (montant indicatif)',
    priceUsdLine: (usdLabel) => `soit ${usdLabel} par personne`,
    priceCurrencyNote: (usdLabel, asOf, source) =>
        `Le safari est établi et facturé en dollars américains : ${usdLabel} par personne. Le montant en euros est donné à titre indicatif, converti au taux de référence ${source} du ${asOf} ; il varie avec le change et n’engage pas le prix final.`,
    priceValidity: 'Valable du 1er janvier au 31 décembre 2026 · départs quotidiens',
    priceFootnote:
        'Une autre durée, d’autres parcs, une autre saison, un voyageur seul ou un groupe plus nombreux modifient ce montant : demandez un devis et nous calculons le vôtre. Les vols internationaux, le visa et l’assurance voyage ne sont pas inclus.',
    priceCtaLabel: 'Recevoir mon devis gratuit',
    priceCtaSubfootnote: 'Aucun paiement requis · Nous répondons sous quelques heures',

    /* ------------------------------------------------- 6. ce qui est inclus */
    includedHeading: 'Ce que comprend le prix de votre safari',
    includedSubheading:
        'Un seul prix couvre l’intégralité du safari, du transfert d’arrivée au transfert de départ. Aucun frais de parc à régler sur place.',
    included: [
        {
            icon: 'shield',
            title: 'Toutes les taxes de parc et de conservation',
            desc: 'Serengeti, aire de conservation du Ngorongoro, Tarangire et chaque droit d’entrée sur le trajet sont déjà compris.',
            value: 'Rien à payer sur place',
        },
        {
            icon: 'bed',
            title: 'Hébergement',
            desc: 'Lodges et camps de toile sélectionnés pour leur emplacement dans ou près des parcs, réservés pour toute la durée du safari.',
        },
        {
            icon: 'users',
            title: 'Guide-chauffeur privé',
            desc: 'Un guide tanzanien agréé et expérimenté, anglophone, dédié à votre groupe pendant tout le safari.',
        },
        {
            icon: 'mapPin',
            title: 'Véhicule 4x4 privé',
            desc: 'Un Land Cruiser à toit ouvrant réservé à votre groupe — chacun a sa place à la fenêtre pour observer et photographier.',
        },
        {
            icon: 'utensils',
            title: 'Tous les repas du safari',
            desc: 'Pension complète pendant le safari : petit-déjeuner, déjeuner et dîner.',
        },
        {
            icon: 'phone',
            title: 'Transferts et assistance',
            desc: 'Accueil et retour à l’aéroport international du Kilimandjaro, vols intérieurs prévus à l’itinéraire, et une assistance joignable pendant tout le voyage.',
        },
    ],
    /* --------------------------------- 7. pourquoi réserver avec nous */
    whyUsHeading: `Pourquoi réserver avec ${OFFER.company}`,
    whyUs: [
        {
            title: 'Présents localement en Tanzanie',
            desc: 'Nous opérons directement depuis Arusha, avec nos propres guides et nos propres véhicules — aucun intermédiaire, aucun voyage sous-traité. Vous parlez aux personnes qui organisent votre safari.',
        },
        {
            title: 'Un safari privé, construit pour vous',
            desc: 'Aucun départ en groupe imposé. Le véhicule et le guide sont réservés à votre groupe, et l’itinéraire se construit autour de vos dates, de votre budget et des parcs que vous voulez voir.',
        },
        {
            title: 'Un interlocuteur, pas un centre d’appels',
            desc: 'Vous préparez votre voyage directement avec votre interlocuteur, par WhatsApp ou par email. Réponses rapides, conseils honnêtes, et une assistance joignable pendant tout le safari.',
        },
        {
            title: 'Un prix clair, tout compris',
            desc: 'Un seul prix couvre les taxes de parc, l’hébergement, les repas, le guide et le véhicule. Rien à régler à l’entrée des parcs, aucune mauvaise surprise à l’arrivée.',
        },
    ],

    /* -------------------------------------------------------------- 6. avis */
    reviewsHeading: 'Ce que disent nos voyageurs',
    reviewsSubheading: 'De vrais avis, laissés après de vrais safaris',
    reviewsRatingSuffix: '/ 5',
    reviewsCountSuffix: 'avis sur TripAdvisor',
    // Avis réels publiés sur TripAdvisor et repris sur africanpolecatsafaris.com.
    // Rédigés en anglais à l'origine : le champ `location` le précise, comme le
    // ferait TripAdvisor pour un avis traduit. Ne jamais en ajouter d'inventés.
    testimonials: [
        {
            name: 'Rainer',
            location: 'Avis vérifié sur TripAdvisor · traduit de l’anglais',
            initials: 'R',
            title: 'Un prestataire de safari vraiment exceptionnel',
            text: 'Nous avons obtenu un safari privé pour deux personnes et avons immédiatement reçu un devis adapté à nos besoins… Notre guide, Francis, était absolument formidable et, grâce à ses connaissances incroyables, nous a offert un aperçu merveilleux de la flore et de la faune de Tanzanie. Je recommande Polecat à 100 %, en toute confiance !',
        },
        {
            name: 'Karen Goulekas',
            location: 'Avis vérifié sur TripAdvisor · traduit de l’anglais',
            initials: 'KG',
            title: 'Un excellent voyage, un excellent guide',
            text: 'African Polecat Safaris a été un plaisir pour organiser notre voyage — excellente communication du début à la fin ! Notre guide, Stan, était formidable — il nous a trouvé énormément de faune et c’était un plaisir de passer du temps avec lui.',
        },
    ],

    /* --------------------------------------------------------------- 9. faq */
    faqHeading: 'Questions fréquentes',
    faqSubheading: 'Les questions que l’on nous pose le plus avant de partir.',
    faqs: [
        {
            question: 'Combien coûte un safari en Tanzanie ?',
            answer: `Cela dépend de la durée, des parcs visités, du niveau d’hébergement, de la saison et du nombre de voyageurs. Pour vous donner un repère concret : notre itinéraire de ${OFFER.tripLengthDays} jours Serengeti · Ngorongoro · Tarangire est à environ ${eurFr(eurEquivalent(OFFER.pricePerPerson))} par personne en chambre double (tarif ferme : ${usdFr(OFFER.pricePerPerson)}, converti au taux ${FX.source} du ${FX.asOf}), taxes de parc, hébergements, repas, véhicule 4x4 privé et guide compris — hors vols internationaux. Envoyez-nous vos dates et le nombre de voyageurs et nous établissons un devis précis, gratuitement.`,
        },
        {
            question: 'Quelle est la meilleure période pour un safari en Tanzanie ?',
            answer:
                'La Tanzanie se visite toute l’année. La saison sèche, de juin à octobre, facilite l’observation : la végétation est basse et les animaux se rassemblent près des points d’eau. Les traversées de rivières de la Grande Migration culminent entre juillet et septembre, dans le nord du Serengeti, et la saison des naissances a lieu de janvier à mars, dans le sud. Dites-nous vos dates et nous construisons l’itinéraire autour de ce qui se passe à ce moment-là.',
        },
        {
            question: 'Combien de jours prévoir pour un safari en Tanzanie ?',
            answer: `Notre itinéraire exemple dure ${OFFER.tripLengthDays} jours et permet d’enchaîner le Serengeti, le cratère du Ngorongoro et Tarangire sans se presser. Nous organisons aussi des safaris plus courts, quand le temps est compté, comme des circuits plus longs pour ceux qui veulent rester davantage sur place. Indiquez-nous le nombre de jours dont vous disposez : nous vous dirons franchement ce qui tient dans ce temps-là.`,
        },
        {
            question: 'Peut-on organiser un safari privé en Tanzanie ?',
            answer:
                'Oui — c’est notre fonctionnement par défaut. Tous nos safaris sont privés : le véhicule 4x4 et le guide sont réservés à votre groupe, vous ne les partagez avec personne d’autre. C’est vous qui fixez l’heure de départ le matin, le rythme de la journée et le temps passé à chaque observation.',
        },
        {
            question: 'Quels parcs visiter en Tanzanie ?',
            answer:
                'Le circuit nord réunit les parcs que nous proposons le plus souvent : le Serengeti pour les grandes plaines, les grands félins et la Grande Migration ; le cratère du Ngorongoro pour sa densité de faune et son paysage de caldeira ; Tarangire pour ses éléphants et ses baobabs. Une étape au lac Burunge peut s’y ajouter, et beaucoup de voyageurs prolongent par quelques jours à Zanzibar après le safari.',
        },
        {
            question: 'Peut-on personnaliser son safari ?',
            answer:
                'Entièrement. Vous choisissez la durée, les parcs et leur ordre, le niveau d’hébergement, le rythme des journées et le nombre de voyageurs. Nous ne vendons pas de départs en groupe imposés : chaque devis est construit à partir de vos réponses, et nous l’ajustons autant de fois que nécessaire avant que vous ne réserviez.',
        },
        {
            question: 'Que comprend le prix d’un safari ?',
            answer:
                'Toutes les taxes de parc et de conservation, l’hébergement, tous les repas pendant le safari, un véhicule 4x4 privé à toit ouvrant, un guide-chauffeur privé expérimenté, les transferts depuis et vers l’aéroport international du Kilimandjaro et les vols intérieurs prévus à l’itinéraire. Ne sont pas inclus : les vols internationaux, le visa touristique, l’assurance voyage, les dépenses personnelles et les pourboires.',
        },
        {
            question: 'Un safari en Tanzanie est-il sûr ?',
            answer:
                'Vous voyagez avec un guide professionnel agréé qui connaît les parcs, vous logez dans des lodges et des camps sélectionnés, et les règles des parcs encadrent les observations, pour la sécurité des visiteurs comme pour celle de la faune. La Tanzanie est une destination de safari établie de longue date.',
        },
        {
            question: 'Faut-il un visa ou des vaccins ?',
            answer:
                'La plupart des visiteurs ont besoin d’un visa touristique, à obtenir en ligne avant le départ ou à l’arrivée, ainsi que d’un justificatif de vaccination contre la fièvre jaune s’ils arrivent d’un pays où la maladie circule. Nous envoyons une check-list avant le départ — visa, santé, bagages — et nous vous recommandons de vérifier les recommandations officielles françaises pour la Tanzanie avant de partir.',
        },
        {
            question: 'Combien de temps à l’avance faut-il réserver ?',
            answer:
                'Nous conseillons de s’y prendre 3 à 6 mois à l’avance, en particulier pour la haute saison (juin–octobre) et les mois de la Grande Migration, où les meilleurs lodges et camps se remplissent tôt. Cela dit, nous organisons régulièrement des départs à plus courte échéance : demandez, nous vous dirons ce qui reste disponible sur vos dates.',
        },
    ],

    /* ------------------------------------------------------- 10. cta final */
    finalHeading: 'Prêt à découvrir la Tanzanie ?',
    finalSubheading:
        'Envoyez-nous vos dates et le nombre de voyageurs : nous vous répondons avec un itinéraire et un devis personnalisés, sans engagement.',
    finalSubmitLabel: 'Demander un devis gratuit',
    contactPrompt: 'Vous préférez nous contacter directement ?',
    whatsappLabel: 'Nous écrire sur WhatsApp',

    /* ------------------------------------------------------------- footer */
    footerTagline: 'Safaris privés et sur mesure en Tanzanie.',
    privacyLinkLabel: 'Politique de confidentialité',
    privacyPath: '/confidentialite',

    /* ------------------------------------------------------------- formulaire */
    form: {
        badgeText: 'Devis gratuit et sans engagement',
        nameLabel: 'Prénom et nom',
        namePlaceholder: 'Votre prénom et nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        whatsappNumberLabel: 'Numéro WhatsApp',
        whatsappNumberPlaceholder: '+33 6 12 34 56 78',
        travelLabel: 'Période du voyage',
        travelPlaceholder: 'Sélectionnez…',
        travelFlexibleLabel: 'Dates flexibles',
        // Douze mois dans l'ordre — servent à composer les libellés du menu
        // « Mars 2027 » dans InquiryForm. Pas d'entrée « Flexible » ici :
        // c'est `travelFlexibleLabel` qui la fournit, en fin de liste.
        months: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
        ],
        travellersLabel: 'Voyageurs',
        messageLabel: 'Message',
        messagePlaceholder: 'Durée souhaitée, parcs qui vous intéressent, budget, demandes particulières…',
        optionalSuffix: '(facultatif)',
        submitLabelDefault: 'Demander un devis gratuit',
        disclaimerPrefix:
            'Aucun paiement requis. Nous répondons sous quelques heures. En envoyant ce formulaire, vous acceptez notre',
        disclaimerLinkText: 'politique de confidentialité',
        successHeading: 'Demande envoyée ! Nous revenons vers vous rapidement.',
        successBody: 'Si WhatsApp ne s’est pas ouvert,',
        successLinkText: 'ouvrez-le ici',
        waIntro:
            'Bonjour African Polecat Safaris ! J’aimerais recevoir un devis pour un safari en Tanzanie.',
        waLabels: {
            name: 'Nom',
            email: 'Email',
            whatsapp: 'WhatsApp',
            travel: 'Période du voyage',
            travellers: 'Voyageurs',
            notes: 'Notes',
            page: 'Page',
        },
    },
}
