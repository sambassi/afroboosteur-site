export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      projects: "Projets",
      about: "À propos",
      donate: "Faire un don",
      contact: "Contact",
      becomeInstructor: "Devenir Instructeur",
    },
    hero: {
      title: "Afroboosteur : Culture, Santé & Lien Social",
      subtitle:
        "Promouvoir la culture afrobeat et le bien-être à Neuchâtel à travers des activités sportives et artistiques innovantes.",
      cta: "Découvrir nos actions",
    },
    projects: {
      sectionTitle: "Projets en cours",
      sectionSubtitle: "Soutenez les projets qui créent l’avenir",
      funded: "Financé",
    },
    about: {
      sectionTitle: "Afroboosteur",
      missionTitle: "Notre Mission",
      missionText1:
        "Fondée en 2024 et basée à Neuchâtel (Rue Maillefer 39), Afroboosteur est une association à but non lucratif. Nous utilisons l’Afrobeat comme vecteur d’énergie positive pour rassembler les communautés, sans barrière d’âge ou d’origine.",
      missionText2:
        "Nos axes prioritaires sont la santé publique (lutte contre la sédentarité), la diversité culturelle et l’innovation sportive, notamment via notre concept unique de Silent Party.",
      stats: {
        members: "Membres actifs",
        volunteers: "Bénévoles",
        founded: "Fondation",
      },
    },
    donate: {
      sectionTitle: "Faire un don",
      sectionSubtitle: "Votre contribution fait toute la différence",
      chooseAmount: "Choisissez un montant",
      customAmount: "Ou un montant libre",
      submit: "Procéder au paiement",
      disclaimer: "Paiement sécurisé - 100% de votre don va aux projets",
    },
    contact: {
      sectionTitle: "Contactez-nous",
      sectionSubtitle: "Une question ? Un projet ? Écrivez-nous !",
      name: "Nom complet",
      email: "Email",
      message: "Message",
      send: "Envoyer le message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      messagePlaceholder: "Votre message...",
      infoEmail: "Email",
      infoAddress: "Adresse",
      infoPhone: "Téléphone",
      infoWhatsapp: "WhatsApp",
    },
    footer: {
      tagline:
        "Association Afroboosteur — Dynamiser la culture et le sport à Neuchâtel.",
      quickLinks: "Liens rapides",
      support: "Support",
      newsletter: "Newsletter",
      newsletterText: "Restez informé de nos nouveaux projets",
      faq: "FAQ",
      help: "Centre d’aide",
      privacy: "Confidentialité",
      terms: "Conditions",
      copyright: "© 2025 Afroboosteur — Propulsé par l’Art",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      donate: "Donate",
      contact: "Contact",
      becomeInstructor: "Become an Instructor",
    },
    hero: {
      title: "Afroboosteur: Culture, Health & Social Bond",
      subtitle:
        "Promoting afrobeat culture and well-being in Neuchâtel through innovative sports and artistic activities.",
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
        "Founded in 2024 and based in Neuchâtel (Rue Maillefer 39), Afroboosteur is a non-profit association. We use Afrobeat as a vehicle for positive energy to bring communities together, without age or origin barriers.",
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
        "Afroboosteur Association — Energizing culture and sport in Neuchâtel.",
      quickLinks: "Quick Links",
      support: "Support",
      newsletter: "Newsletter",
      newsletterText: "Stay updated on our new projects",
      faq: "FAQ",
      help: "Help Center",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "© 2025 Afroboosteur — Powered by Art",
    },
  },
} as const;

export const projectsData = [
  {
    id: 1,
    title: { fr: "Afroboost Silent Party 2025", en: "Afroboost Silent Party 2025" },
    description: {
      fr: "Un événement immersif de cardio-danse avec casques audio. Objectif : 70 participants pour célébrer la diversité, la santé et la cohésion sociale le 31 décembre.",
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
      fr: "Des cours de cardio-danse afrobeat chaque mercredi et dimanche, ouverts à tous. Casques audio pour une immersion totale sans nuisance sonore.",
      en: "Afrobeat cardio-dance classes every Wednesday and Sunday, open to all. Audio headsets for total immersion without noise pollution.",
    },
    funded: 4500,
    goal: 8000,
    gradient: "from-fuchsia-500 to-purple-700",
  },
  {
    id: 3,
    title: { fr: "Production Vidéo & Communication", en: "Video Production & Communication" },
    description: {
      fr: "Création de contenu vidéo professionnel : teasers, stories et promotions pour élargir la communauté Afroboosteur.",
      en: "Professional video content creation: teasers, stories and promotions to expand the Afroboosteur community.",
    },
    funded: 9100,
    goal: 12000,
    gradient: "from-pink-600 to-purple-700",
  },
];
