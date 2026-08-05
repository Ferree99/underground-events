// lastCall2026.ts
// Tutti i dati confermati dal documento ufficiale. Nulla qui è inventato:
// dove il PDF non specifica un dato, viene usato "[DA DEFINIRE]" o un
// segnaposto esplicito, mai un valore plausibile ma non confermato.

export const lastCall2026 = {
  name: "LAST CALL 2026",
  claim: "L'ultima chiamata dell'estate",
  date: "2026-09-05",
  dateLabel: "Sabato 5 settembre 2026",
  openingTime: "10:30",
  closingTime: "00:00", // mezzanotte
  location: {
    name: "Darsena 3.0",
    address: "Località Pizzone, 4",
    postalCode: "25055",
    city: "Pisogne",
    province: "BS",
  },
  organizers: "UNDERGROUND EVENTS × Street Car Therapy",
  collaborationText:
    "Una collaborazione che unisce il mondo delle auto sportive alla musica e al divertimento, per dare vita all'evento che chiude l'estate nel migliore dei modi.",

  description: {
    main:
      "Una giornata immersa in una location unica, direttamente sulle rive del lago. Un grande prato ospiterà decine di auto sportive esposte lungo tutta l'area, creando uno scenario spettacolare che accompagnerà l'intera giornata. Dal mattino fino a mezzanotte troverai esposizione di auto sportive, DJ set, Food Area, Drink Area, attività, giochi, tramonto sul lago e party finale.",
    secondary:
      "LAST CALL unisce il mondo delle auto sportive alla musica e al divertimento. Una giornata da vivere insieme, dal raduno del mattino fino al party finale di mezzanotte.",
  },

  whatToExpect: [
    "Auto sportive",
    "DJ set",
    "Food Area",
    "Drink Area",
    "Beer Pong",
    "Beach Volley",
    "Attività e giochi",
    "Sfide",
    "Premi",
    "Tramonto sul lago",
    "Party finale",
  ],

  // Programma ufficiale — non aggiungere orari non presenti nel documento.
  schedule: [
    {
      time: "10:30",
      title: "Apertura raduno",
      items: [
        "Accoglienza dei partecipanti",
        "Ingresso delle vetture sportive",
        "Esposizione delle auto",
        "Ritrovo della community",
      ],
    },
    {
      time: "12:30",
      title: "Pranzo",
      items: ["Spiedo su prenotazione", "Pranzo tutti insieme in perfetto stile Last Call"],
    },
    {
      time: "15:00",
      title: "Game Time",
      items: ["Beach Volley Alcolico su prenotazione", "Beer Pong", "Giochi", "Sfide", "Premi"],
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
      photo: "[FOTO MARCO DECIBEL]",
      social: "[DA DEFINIRE]",
      bio: "[DA DEFINIRE]",
      setTime: "[DA DEFINIRE]",
    },
    {
      name: "PALAZ",
      photo: "[FOTO PALAZ]",
      social: "[DA DEFINIRE]",
      bio: "[DA DEFINIRE]",
      setTime: "[DA DEFINIRE]",
    },
    {
      name: "MELLU",
      photo: "[FOTO MELLU]",
      social: "[DA DEFINIRE]",
      bio: "[DA DEFINIRE]",
      setTime: "[DA DEFINIRE]",
    },
  ],

  closingCopy: ["L'ultimo raduno.", "L'ultima festa.", "L'ultima occasione per chiudere l'estate insieme."],
  closingCta: "Vivi LAST CALL 2026",

  heroVideo: "[VIDEO HERO LAST CALL]",
  gallery: [
    "[FOTO DARSENA 3.0]",
    "[FOTO AUTO SPORTIVE]",
    "[FOTO TRAMONTO SUL LAGO]",
    "[FOTO FOOD AREA]",
    "[FOTO DRINK AREA]",
    "[FOTO BEACH VOLLEY]",
    "[FOTO BEER PONG]",
  ],

  status: {
    event: "lista-aperta" as const,
    spiedoBooking: "aperte" as const,
    tournamentBooking: "aperte" as const,
  },
};
