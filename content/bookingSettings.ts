// bookingSettings.ts
//
// QUESTO FILE RACCOGLIE TUTTI I DATI NON PRESENTI NEL DOCUMENTO UFFICIALE.
// Ogni valore "[DA DEFINIRE]" deve essere sostituito dall'organizzazione
// prima della pubblicazione. Nessuno di questi dati è stato inventato.

export const spiedoBooking = {
  title: "Prenota lo spiedo",
  intro:
    "Lo spiedo sarà servito alle ore 12:30 ed è disponibile su prenotazione. Un pranzo tutti insieme in perfetto stile Last Call.",
  price: "[DA DEFINIRE]",
  menu: "[DA DEFINIRE]",
  bookingDeadline: "[DA DEFINIRE]",
  availableSeats: "[DA DEFINIRE]",
  paymentMethod: "[DA DEFINIRE]",
  afterSubmitMessage:
    "Richiesta di prenotazione ricevuta. Riceverai la conferma con tutte le informazioni necessarie all'indirizzo indicato.",
  demoNotice: "Modulo dimostrativo: collegare il sistema di gestione prima della pubblicazione.",
};

export const tournamentBooking = {
  title: "Iscrivi la tua squadra",
  intro:
    "Forma la tua squadra e preparati al GAME TIME di LAST CALL 2026: Beach Volley Alcolico, Beer Pong, giochi, sfide e premi in una location direttamente sul lago.",
  time: "15:00",
  playersPerTeam: "[DA DEFINIRE]",
  teamsAvailable: "[DA DEFINIRE]",
  fee: "[DA DEFINIRE]",
  feeIncludes: "[DA DEFINIRE]",
  meetingPoint: "[DA DEFINIRE]",
  prizes: "[DA DEFINIRE]",
  registrationDeadline: "[DA DEFINIRE]",
  paymentMethod: "[DA DEFINIRE]",
  tournamentFormat: "[DA DEFINIRE]",
  afterSubmitMessage:
    "Richiesta di iscrizione ricevuta. La partecipazione sarà confermata dall'organizzazione dopo la verifica dei posti disponibili.",
  safetyNotice: [
    "Attività riservata ai maggiorenni.",
    "Consumo responsabile: sono disponibili alternative analcoliche.",
    "Ricordati di idratarti durante la giornata.",
    "Non è consentita la partecipazione in condizioni non sicure.",
    "L'organizzazione può sospendere la partecipazione per ragioni di sicurezza.",
    "La partecipazione richiede l'accettazione del regolamento.",
  ],
  demoNotice: "Modulo dimostrativo: collegare il sistema di gestione prima della pubblicazione.",
};

export const beerPongAndGames = {
  title: "Beer Pong, giochi, sfide e premi",
  note:
    "Modalità di iscrizione, regolamento, premi, numero di partecipanti, formula ed eventuali costi non sono ancora stati definiti dall'organizzazione.",
  rulesButtonLabel: "Scopri le regole",
  rulesAvailable: false, // il pulsante resta disattivato finché il regolamento non è pubblicato
};

export const vehicleApplication = {
  title: "Candida la tua auto",
  note:
    "Le modalità definitive di partecipazione (criteri di selezione, costo, registrazione, orario di arrivo, regole di accesso, categorie ammesse, capienza) devono ancora essere approvate dall'organizzazione.",
  criteriaSelection: "[DA DEFINIRE]",
  participationCost: "[DA DEFINIRE]",
  registrationMethod: "[DA DEFINIRE]",
  recommendedArrivalTime: "[DA DEFINIRE]",
  accessRules: "[DA DEFINIRE]",
  admittedCategories: "[DA DEFINIRE]",
  capacity: "[DA DEFINIRE]",
  automotiveReferent: "[DA DEFINIRE]",
};

export const venueInfo = {
  parking: "[DA DEFINIRE]",
  accessibility: "[DA DEFINIRE]",
  transport: "[DA DEFINIRE]",
  entrance: "[DA DEFINIRE]",
  venueRules: "[DA DEFINIRE]",
  badWeatherPolicy: "[DA DEFINIRE]",
  mapEmbedUrl: "[DA DEFINIRE — inserire URL Google Maps]",
};
