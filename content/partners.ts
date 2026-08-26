// partners.ts

export type Partner = {
  name: string;
  logo: string;
  description?: string;
  instagramUrl?: string;
};

// Partner confermati (collaborazioni dirette sugli eventi)
export const confirmedPartners: Partner[] = [
  {
    name: "Street Car Therapy",
    logo: "/images/partners/street-car-therapy.png",
    description: "Una collaborazione che unisce il mondo delle auto sportive alla musica e al divertimento.",
    instagramUrl: "https://www.instagram.com/street_car_therapy/",
  },
  {
    name: "Distretto 11",
    logo: "/images/partners/distretto-11.png",
  },
  {
    name: "Honest",
    logo: "/images/partners/honest.png",
  },
];

// Sponsor confermati.
export const confirmedSponsors: Partner[] = [
  {
    name: "Autolavaggio",
    logo: "/images/partners/autolavaggio.png",
  },
  {
    name: "Vanilla Nail Salon",
    logo: "/images/partners/vanilla-nail-salon.png",
  },
  {
    name: "Lion Meccanica",
    logo: "/images/partners/lion-meccanica.png",
  },
  {
    name: "Lake 15",
    logo: "/images/partners/lake-15.png",
  },
  {
    name: "Trattoria Aurora",
    logo: "/images/partners/trattoria-aurora.png",
  },
  {
    name: "22Room",
    logo: "/images/partners/22room.png",
  },
  {
    name: "Zanardini Minuterie Metalliche",
    logo: "/images/partners/zanardini.png",
  },
  {
    name: "Barber Costa Volpino",
    logo: "/images/partners/barber-costa-volpino.png",
  },
];

// Aree pronte per future collaborazioni: aggiungere qui quando confermate.
export const partnerCategories = [
  { id: "partner", label: "Partner", entries: confirmedPartners },
  { id: "sponsor", label: "Sponsor", entries: confirmedSponsors },
  { id: "media", label: "Media partner", entries: [] as Partner[] },
  { id: "fornitori", label: "Fornitori", entries: [] as Partner[] },
];
