import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <p>
        Questo sito utilizza cookie tecnici, necessari al suo funzionamento, e — solo previo consenso —
        cookie di analisi e marketing. Le preferenze possono essere modificate in qualsiasi momento tramite
        il banner cookie o riaprendo le impostazioni dal footer.
      </p>

      <h2>Cookie necessari</h2>
      <p>Sempre attivi: consentono le funzionalità di base del sito (navigazione, sicurezza dei moduli).</p>

      <h2>Cookie di analisi</h2>
      <p>Attivi solo previo consenso. Strumento utilizzato: [DA DEFINIRE].</p>

      <h2>Cookie di marketing</h2>
      <p>Attivi solo previo consenso. Strumento utilizzato: [DA DEFINIRE].</p>

      <h2>Gestione delle preferenze</h2>
      <p>
        È possibile modificare o revocare il consenso in qualsiasi momento tramite il pannello preferenze
        cookie disponibile sul sito.
      </p>
    </LegalLayout>
  );
}
