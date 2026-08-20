// lastCall2026.ts
// Tutti i dati confermati dal documento ufficiale. Nulla qui è inventato:
// dove il PDF non specifica un dato, viene usato "[DA DEFINIRE]" o un
// segnaposto esplicito, mai un valore plausibile ma non confermato.

export const lastCall2026 = {
  name: "LAST CALL 2026",
  claim: "L'ultima chiamata dell'estate",
  date: "2026-09-26",
  dateLabel: "Sabato 26 settembre 2026",
  openingTime: "17:00",
  closingTime: "00:00", // mezzanotte
  location: {
    name: "Porto Turistico di Lovere",
    address: "Via del Cantiere, 6",
    postalCode: "24065",
    city: "Lovere",
    province: "BG",
  },
  organizers: "UNDERGROUND EVENTS × Street Car Therapy",
  collaborationText:
    "Una collaborazione che unisce il mondo delle auto sportive alla musica e al divertimento, per dare vita all'evento che chiude l'estate nel migliore dei modi.",

  description: {
    main:
      "Una giornata immersa in una location unica, direttamente sulle rive del lago. Un grande prato ospiterà decine di auto sportive esposte lungo tutta l'area, creando uno scenario spettacolare che accompagnerà l'intera giornata. Dal tardo pomeriggio fino a mezzanotte troverai esposizione di auto sportive, DJ set, Food Area, Drink Area, attività, giochi, tramonto sul lago e party finale.",
    secondary:
      "LAST CALL unisce il mondo delle auto sportive alla musica e al divertimento. Una giornata da vivere insieme, dal raduno del tardo pomeriggio fino al party finale di mezzanotte.",
  },

  whatToExpect: [
    "Auto sportive",
    "DJ set",
    "Food Area",
    "Drink Area",
    "Beer Pong",
    "Attività e giochi",
    "Sfide",
    "Premi",
    "Tramonto sul lago",
    "Party finale",
  ],

  // Programma ufficiale — non aggiungere orari non presenti nel documento.
  schedule: [
    {
      time: "17:00",
      title: "Apertura raduno",
      items: [
        "Accoglienza dei partecipanti",
        "Ingresso delle vetture sportive",
        "Esposizione delle auto",
        "Ritrovo della community",
      ],
    },
    {
      time: "[DA DEFINIRE]",
      title: "Game Time",
      items: ["Beer Pong", "Giochi", "Sfide", "Premi"],
    },
    {
      time: "18:00",
      title: "Last Call Party",
      items: ["DJ set", "Drink", "Musica", "Party fino a mezzanotte"],
    },
  ],

  // Lineup ufficiale. Foto, bio, social e orario individuale non forniti:
  // usare i segnaposto indicati, mai inventare.
  lineup: [
    {
      name: "MARCO DECIBEL",
      photo: "/images/artists/marco-decibel.jpg",
      social: "https://www.instagram.com/marcodecibel",
      bio: "[DA DEFINIRE]",
      setTime: "[DA DEFINIRE]",
    },
    {
      name: "PALAZ",
      photo: "/images/artists/palaz.jpg",
      social: "https://www.instagram.com/federicopalazzoo/",
      bio: "[DA DEFINIRE]",
      setTime: "[DA DEFINIRE]",
    },
    {
      name: "MELLU",
      photo: "/images/artists/mellu.jpg",
      social: "https://www.instagram.com/melluofficial",
      bio: "[DA DEFINIRE]",
      setTime: "[DA DEFINIRE]",
    },
  ],

  closingCopy: ["L'ultimo raduno.", "L'ultima festa.", "L'ultima occasione per chiudere l'estate insieme."],
  closingCta: "Vivi LAST CALL 2026",

  heroVideo: "[VIDEO HERO LAST CALL]",
  gallery: [
    { label: "Porto", src: "/images/gallery/last-call-2026/porto.jpg" },
    { label: "Auto sportive", src: "/images/gallery/last-call-2026/auto-sportive.jpg" },
    { label: "Tramonto sul lago", src: "/images/gallery/last-call-2026/tramonto-lago.jpg" },
    { label: "Food area", src: "/images/gallery/last-call-2026/food-area.jpg" },
    { label: "Drink area", src: "/images/gallery/last-call-2026/drink-area.jpg" },
    { label: "Beer pong", src: "/images/gallery/last-call-2026/beer-pong.jpg" },
  ],

  status: {
    event: "lista-aperta" as const,
  },
};
