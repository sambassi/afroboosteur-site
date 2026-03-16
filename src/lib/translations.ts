export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      projects: "Projets",
      about: "\u00c0 propos",
      donate: "Faire un don",
      contact: "Contact",
    },
    hero: {
      title: "Afroboosteur : Culture, Sant\u00e9 & Lien Social",
      subtitle:
        "Promouvoir la culture afrobeat et le bien-\u00eatre \u00e0 Neuch\u00e2tel \u00e0 travers des activit\u00e9s sportives et artistiques innovantes.",
      cta: "D\u00e9couvrir nos actions",
    },
    projects: {
      sectionTitle: "Projets en cours",
      sectionSubtitle: "Soutenez les projets qui cr\u00e9ent l\u2019avenir",
      funded: "Financ\u00e9",
    },
    about: {
      sectionTitle: "Afroboosteur",
      missionTitle: "Notre Mission",
      missionText1:
        "Fond\u00e9e en 2024 et bas\u00e9e \u00e0 Neuch\u00e2tel (Rue Maillefer 39), Afroboosteur est une association \u00e0 but non lucratif. Nous utilisons l\u2019Afrobeat comme vecteur d\u2019\u00e9nergie positive pour rassembler les communaut\u00e9s, sans barri\u00e8re d\u2019\u00e2ge ou d\u2019origine.",
      missionText2:
        "Nos axes prioritaires sont la sant\u00e9 publique (lutte contre la s\u00e9dentarit\u00e9), la diversit\u00e9 culturelle et l\u2019innovation sportive, notamment via notre concept unique de Silent Party.",
      stats: {
        members: "Membres actifs",
        volunteers: "B\u00e9n\u00e9voles",
        founded: "Fondation",
      },
    },
    donate: {
      sectionTitle: "Faire un don",
      sectionSubtitle: "Votre contribution fait toute la diff\u00e9rence",
      chooseAmount: "Choisissez un montant",
      customAmount: "Ou un montant libre",
      submit: "Proc\u00e9der au paiement",
      disclaimer: "Paiement s\u00e9curis\u00e9 - 100% de votre don va aux projets",
    },
    contact: {
      sectionTitle: "Contactez-nous",
      sectionSubtitle: "Une question ? Un projet ? \u00c9crivez-nous !",
      name: "Nom complet",
      email: "Email",
      message: "Message",
      send: "Envoyer le message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      messagePlaceholder: "Votre message...",
      infoEmail: "Email",
      infoAddress: "Adresse",
      infoPhone: "T\u00e9l\u00e9phone",
      infoWhatsapp: "WhatsApp",
    },
    footer: {
      tagline:
        "Association Afroboosteur \u2014 Dynamiser la culture et le sport \u00e0 Neuch\u00e2tel.",
      quickLinks: "Liens rapides",
      support: "Support",
      newsletter: "Newsletter",
      newsletterText: "Restez inform\u00e9 de nos nouveaux projets",
      faq: "FAQ",
      help: "Centre d\u2019aide",
      privacy: "Confidentialit\u00e9",
      terms: "Conditions",
      copyright: "\u00a9 2025 Afroboosteur \u2014 Propuls\u00e9 par l\u2019Art",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      donate: "Donate",
      contact: "Contact",
    },
    hero: {
      title: "Afroboosteur: Culture, Health & Social Bond",
      subtitle:
        "Promoting afrobeat culture and well-being in Neuch\u00e2tel through innovative sports and artistic activities.",
      cta: "Discover our actions",
    },
    projects: {
      sectionTitle: "Current Projects",
      sectionSubtitle: "Support the projects creating the future",
      funded: "Funded",
    },
    about: {
      sectionTitle: "Afroboosteur",
      missionTitle: "Our Mission",
      missionText1:
        "Founded in 2024 and based in Neuch\u00e2tel (Rue Maillefer 39), Afroboosteur is a non-profit association. We use Afrobeat as a vehicle for positive energy to bring communities together, without age or origin barriers.",
      missionText2:
        "Our key priorities are public health (fighting sedentary lifestyles), cultural diversity and sports innovation, particularly through our unique Silent Party concept.",
      stats: {
        members: "Active Members",
        volunteers: "Volunteers",
        founded: "Founded",
      },
    },
    donate: {
      sectionTitle: "Make a Donation",
      sectionSubtitle: "Your contribution makes all the difference",
      chooseAmount: "Choose an amount",
      customAmount: "Or a custom amount",
      submit: "Proceed to payment",
      disclaimer: "Secure payment - 100% of your donation goes to projects",
    },
    contact: {
      sectionTitle: "Contact Us",
      sectionSubtitle: "A question? A project? Write to us!",
      name: "Full Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message...",
      infoEmail: "Email",
      infoAddress: "Address",
      infoPhone: "Phone",
      infoWhatsapp: "WhatsApp",
    },
    footer: {
      tagline:
        "Afroboosteur Association \u2014 Energizing culture and sport in Neuch\u00e2tel.",
      quickLinks: "Quick Links",
      support: "Support",
      newsletter: "Newsletter",
      newsletterText: "Stay updated on our new projects",
      faq: "FAQ",
      help: "Help Center",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "\u00a9 2025 Afroboosteur \u2014 Powered by Art",
    },
  },
} as const;

export const projectsData = [
  {
    id: 1,
    title: { fr: "Afroboost Silent Party 2025", en: "Afroboost Silent Party 2025" },
    description: {
      fr: "Un \u00e9v\u00e9nement immersif de cardio-danse avec casques audio. Objectif : 70 participants pour c\u00e9l\u00e9brer la diversit\u00e9, la sant\u00e9 et la coh\u00e9sion sociale le 31 d\u00e9cembre.",
      en: "An immersive cardio-dance event with audio headsets. Goal: 70 participants to celebrate diversity, health and social cohesion on December 31st.",
    },
    funded: 3500,
    goal: 5000,
    gradient: "from-purple-600 via-fuchsia-500 to-pink-600",
  },
  {
    id: 2,
    title: { fr: "Cours Hebdomadaires Afroboost", en: "Weekly Afroboost Classes" },
    description: {
      fr: "Des cours de cardio-danse afrobeat chaque mercredi et dimanche, ouverts \u00e0 tous. Casques audio pour une immersion totale sans nuisance sonore.",
      en: "Afrobeat cardio-dance classes every Wednesday and Sunday, open to all. Audio headsets for total immersion without noise pollution.",
    },
    funded: 4500,
    goal: 8000,
    gradient: "from-fuchsia-500 to-purple-700",
  },
  {
    id: 3,
    title: { fr: "Production Vid\u00e9o & Communication", en: "Video Production & Communication" },
    description: {
      fr: "Cr\u00e9ation de contenu vid\u00e9o professionnel : teasers, stories et promotions pour \u00e9largir la communaut\u00e9 Afroboosteur.",
      en: "Professional video content creation: teasers, stories and promotions to expand the Afroboosteur community.",
    },
    funded: 9100,
    goal: 12000,
    gradient: "from-pink-600 to-purple-700",
  },
];
