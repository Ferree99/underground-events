// partners.ts

export type Partner = {
  name: string;
  logo: string;
  description?: string;
};

// Partner confermati (collaborazioni dirette sugli eventi)
export const confirmedPartners: Partner[] = [
  {
    name: "Street Car Therapy",
    logo: "/images/partners/street-car-therapy.png",
    description: "Una collaborazione che unisce il mondo delle auto sportive alla musica e al divertimento.",
  },
  {
    name: "Distretto 11",
    logo: "/images/partners/distretto-11.png",
  },
  {
    name: "Honest",
    logo: "[LOGO HONEST]", // logo non ancora fornito
  },
];

// Sponsor confermati
export const confirmedSponsors: Partner[] = [
  {
    name: "Vanilla Nail Salon",
    logo: "/images/partners/vanilla-nail-salon.png",
  },
  {
    name: "Zanardini Minuterie Metalliche",
    logo: "/images/partners/zanardini.png",
  },
  {
    name: "Area Industriale",
    logo: "/images/partners/area-industriale.png",
  },
];

// Aree pronte per future collaborazioni: aggiungere qui quando confermate.
export const partnerCategories = [
  { id: "partner", label: "Partner", entries: confirmedPartners },
  { id: "sponsor", label: "Sponsor", entries: confirmedSponsors },
  { id: "media", label: "Media partner", entries: [] as Partner[] },
  { id: "fornitori", label: "Fornitori", entries: [] as Partner[] },
];
