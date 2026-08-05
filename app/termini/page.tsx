import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Termini e condizioni" };

export default function TerminiPage() {
  return (
    <LegalLayout title="Termini e condizioni">
      <h2>Oggetto</h2>
      <p>
        Le presenti condizioni regolano l&apos;utilizzo del sito UNDERGROUND EVENTS e l&apos;invio di
        richieste tramite i moduli disponibili (lista evento, prenotazioni, candidature, preventivi,
        contatti).
      </p>

      <h2>Natura delle richieste</h2>
      <p>
        L&apos;invio di un modulo costituisce una richiesta che sarà presa in carico dall&apos;organizzazione.
        Nessuna richiesta si intende automaticamente confermata: dove previsto, la conferma avviene dopo
        verifica da parte dell&apos;organizzazione.
      </p>

      <h2>Limitazioni di responsabilità</h2>
      <p>
        UNDERGROUND EVENTS si riserva il diritto di modificare programma, orari e dettagli operativi degli
        eventi, dandone comunicazione ai partecipanti registrati.
      </p>

      <h2>Proprietà del marchio</h2>
      <p>
        Il logo e l&apos;identità visiva di UNDERGROUND EVENTS sono di proprietà del progetto e non possono
        essere riprodotti senza autorizzazione.
      </p>

      <h2>Legge applicabile</h2>
      <p>Foro competente e legge applicabile: [DA DEFINIRE].</p>
    </LegalLayout>
  );
}
