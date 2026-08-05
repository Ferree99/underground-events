// partners.ts

export const confirmedPartners = [
  {
    name: "Street Car Therapy",
    logo: "[LOGO STREET CAR THERAPY]",
    description: "Una collaborazione che unisce il mondo delle auto sportive alla musica e al divertimento.",
  },
];

// Aree pronte per future collaborazioni: aggiungere qui quando confermate.
export const partnerCategories = [
  { id: "partner", label: "Partner", entries: confirmedPartners },
  { id: "sponsor", label: "Sponsor", entries: [] as typeof confirmedPartners },
  { id: "media", label: "Media partner", entries: [] as typeof confirmedPartners },
  { id: "fornitori", label: "Fornitori", entries: [] as typeof confirmedPartners },
];
