// services.ts

export type ServiceArea = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

export const homeServices = [
  "Ideazione del concept",
  "Organizzazione e produzione",
  "Gestione della location",
  "Coordinamento dei fornitori",
  "Allestimenti",
  "Direzione artistica",
  "DJ set e intrattenimento",
  "Eventi automotive",
  "Food and beverage",
  "Attività e tornei",
  "Comunicazione e promozione",
  "Gestione di partner e sponsor",
  "Coordinamento operativo",
];

export const serviceAreas: ServiceArea[] = [
  {
    id: "strategia-concept",
    title: "Strategia e concept",
    summary: "Diamo forma all'idea prima ancora che all'evento.",
    items: [
      "Definizione dell'idea",
      "Identità dell'evento",
      "Progettazione del format",
      "Target",
      "Programma",
      "Posizionamento",
    ],
  },
  {
    id: "produzione",
    title: "Produzione",
    summary: "Tutto ciò che serve perché l'evento funzioni, dal primo al ultimo minuto.",
    items: [
      "Ricerca e gestione della location",
      "Coordinamento fornitori",
      "Logistica",
      "Allestimenti",
      "Permessi",
      "Sicurezza",
      "Gestione operativa",
      "Coordinamento della giornata",
    ],
  },
  {
    id: "entertainment",
    title: "Entertainment",
    summary: "Musica, attività e intrattenimento su misura.",
    items: ["DJ set", "Musica", "Animazione", "Attività", "Tornei", "Spettacoli", "Intrattenimento personalizzato"],
  },
  {
    id: "automotive",
    title: "Automotive",
    summary: "Il mondo delle auto sportive al centro dell'evento.",
    items: [
      "Raduni",
      "Esposizioni",
      "Gestione accesso vetture",
      "Aree espositive",
      "Collaborazioni con community automotive",
      "Coordinamento dei flussi",
    ],
  },
  {
    id: "food-beverage",
    title: "Food and beverage",
    summary: "Un'esperienza gastronomica curata in ogni dettaglio.",
    items: [
      "Coordinamento ristorazione",
      "Food area",
      "Drink area",
      "Prenotazione pasti",
      "Gestione dei flussi",
      "Collaborazione con fornitori",
    ],
  },
  {
    id: "comunicazione",
    title: "Comunicazione",
    summary: "Raccontiamo l'evento prima, durante e dopo.",
    items: [
      "Identità visiva dell'evento",
      "Campagne promozionali",
      "Contenuti",
      "Social media",
      "Materiali digitali",
      "Comunicazione con partecipanti, sponsor e partner",
    ],
  },
];
