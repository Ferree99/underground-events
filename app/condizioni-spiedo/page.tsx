import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { spiedoBooking } from "@/content/bookingSettings";

export const metadata: Metadata = { title: "Condizioni di prenotazione dello spiedo" };

export default function CondizioniSpiedoPage() {
  return (
    <LegalLayout title="Condizioni di prenotazione dello spiedo">
      <p>{spiedoBooking.intro}</p>

      <h2>Dati non ancora definiti</h2>
      <ul>
        <li>Prezzo: {spiedoBooking.price}</li>
        <li>Menu: {spiedoBooking.menu}</li>
        <li>Termine prenotazioni: {spiedoBooking.bookingDeadline}</li>
        <li>Posti disponibili: {spiedoBooking.availableSeats}</li>
        <li>Modalità di pagamento: {spiedoBooking.paymentMethod}</li>
      </ul>

      <h2>Stato della prenotazione</h2>
      <p>
        La prenotazione non è da considerarsi definitiva fino alla conferma esplicita da parte
        dell&apos;organizzazione, che verrà comunicata all&apos;indirizzo indicato nel modulo.
      </p>

      <p className="text-ue-red text-sm">
        Il presente testo è una bozza operativa: le condizioni definitive dovranno essere completate e
        verificate dagli organizzatori prima della pubblicazione.
      </p>
    </LegalLayout>
  );
}
