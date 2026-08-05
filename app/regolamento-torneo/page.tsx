import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { tournamentBooking } from "@/content/bookingSettings";

export const metadata: Metadata = { title: "Regolamento del torneo" };

export default function RegolamentoTorneoPage() {
  return (
    <LegalLayout title="Regolamento del torneo — Beach Volley Alcolico">
      <p>
        Il Beach Volley Alcolico fa parte del GAME TIME di LAST CALL 2026 (ore 15:00), insieme a Beer Pong,
        giochi, sfide e premi.
      </p>

      <h2>Dati non ancora definiti</h2>
      <ul>
        <li>Giocatori per squadra: {tournamentBooking.playersPerTeam}</li>
        <li>Squadre disponibili: {tournamentBooking.teamsAvailable}</li>
        <li>Quota d&apos;iscrizione: {tournamentBooking.fee}</li>
        <li>La quota comprende: {tournamentBooking.feeIncludes}</li>
        <li>Ritrovo: {tournamentBooking.meetingPoint}</li>
        <li>Premi: {tournamentBooking.prizes}</li>
        <li>Chiusura iscrizioni: {tournamentBooking.registrationDeadline}</li>
        <li>Modalità di pagamento: {tournamentBooking.paymentMethod}</li>
        <li>Formula del torneo: {tournamentBooking.tournamentFormat}</li>
      </ul>

      <h2>Sicurezza e consumo responsabile</h2>
      <ul>
        {tournamentBooking.safetyNotice.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <p className="text-ue-red text-sm">
        Il presente regolamento è una bozza operativa: il testo definitivo dovrà essere completato e
        verificato dagli organizzatori prima della pubblicazione.
      </p>
    </LegalLayout>
  );
}
