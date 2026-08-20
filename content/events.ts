// events.ts
// Elenco eventi gestito separatamente dai componenti: aggiungere qui i
// prossimi eventi senza toccare il codice delle pagine.

export type EventCategory =
  | "automotive"
  | "music"
  | "food"
  | "outdoor"
  | "sport"
  | "nightlife"
  | "community";

export type EventStatus =
  | "prossimamente"
  | "lista-aperta"
  | "prenotazioni-aperte"
  | "sold-out"
  | "concluso";

export type EventItem = {
  slug: string;
  name: string;
  date: string; // ISO
  dateLabel: string;
  location: string;
  categories: EventCategory[];
  status: EventStatus;
  image: string;
  shortDescription: string;
  href: string;
  featured?: boolean;
};

export const events: EventItem[] = [
  {
    slug: "last-call-2026",
    name: "LAST CALL 2026",
    date: "2026-09-26",
    dateLabel: "Sabato 26 settembre 2026",
    location: "Porto Turistico di Lovere (BG)",
    categories: ["automotive", "music", "food", "outdoor", "nightlife", "community"],
    status: "lista-aperta",
    image: "/images/hero/last-call-2026.jpg",
    shortDescription: "L'ultima chiamata dell'estate: auto sportive, DJ set, food, drink e party fino a mezzanotte.",
    href: "/eventi/last-call-2026",
    featured: true,
  },
];
