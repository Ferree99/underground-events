import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Questa informativa descrive come UNDERGROUND EVENTS raccoglie, utilizza e protegge i dati personali
        forniti tramite i moduli del sito (lista evento, prenotazione spiedo, iscrizione torneo, candidatura
        auto, richiesta preventivo, modulo contatti).
      </p>

      <h2>Titolare del trattamento</h2>
      <p>Ragione sociale, sede e dati di contatto del titolare: [DA DEFINIRE].</p>

      <h2>Dati raccolti</h2>
      <p>
        Vengono raccolti esclusivamente i dati necessari a evadere la richiesta specifica di ciascun modulo
        (es. nome, cognome, email, telefono, numero di partecipanti). Nessun dato viene raccolto al di fuori
        di quanto esplicitamente richiesto nei singoli form.
      </p>

      <h2>Finalità del trattamento</h2>
      <ul>
        <li>Gestione delle richieste di lista evento e promo drink</li>
        <li>Gestione delle prenotazioni (spiedo, torneo)</li>
        <li>Gestione delle candidature auto</li>
        <li>Gestione di richieste di preventivo e contatti</li>
        <li>Comunicazioni operative relative all&apos;evento, dopo consenso esplicito</li>
        <li>Comunicazioni promozionali, solo previo consenso facoltativo separato</li>
      </ul>

      <h2>Base giuridica</h2>
      <p>Consenso dell&apos;interessato ed esecuzione di misure precontrattuali su richiesta dello stesso.</p>

      <h2>Conservazione dei dati</h2>
      <p>Periodo di conservazione: [DA DEFINIRE].</p>

      <h2>Diritti dell&apos;interessato</h2>
      <p>
        L&apos;interessato può in qualsiasi momento richiedere accesso, rettifica, cancellazione, limitazione
        del trattamento o revocare il consenso prestato, contattando [DA DEFINIRE].
      </p>

      <h2>Trasferimento dei dati</h2>
      <p>Eventuali fornitori terzi utilizzati per la gestione dei moduli: [DA DEFINIRE].</p>
    </LegalLayout>
  );
}
