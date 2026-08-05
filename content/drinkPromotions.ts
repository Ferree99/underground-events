// drinkPromotions.ts
// Promo drink riservata a chi è in lista. Prezzi e orari sono quelli
// confermati dal documento ufficiale.

export const drinkPromotions = {
  title: "Mettiti in lista. Vivi la promo.",
  eligibilityNote: "La promozione è riservata alle persone presenti nella lista dell'evento.",
  slots: [
    {
      timeRange: "18:00-20:00",
      items: [
        { name: "Birra", price: "3 €" },
        { name: "Spritz", price: "5 €" },
      ],
    },
    {
      timeRange: "21:00-00:00",
      items: [{ name: "Cocktail", price: "7 €" }],
    },
  ],
  afterSubmitMessage:
    "Richiesta ricevuta. Riceverai la conferma e le istruzioni per accedere alla promozione all'indirizzo indicato.",
};
