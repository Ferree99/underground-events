import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = { title: "Prenotazione confermata" };

const statusLabel: Record<string, string> = {
  ricevuta: "Ricevuta",
  "in-attesa": "In attesa di conferma",
  confermata: "Confermata",
  "lista-attesa": "Lista d'attesa",
  annullata: "Annullata",
};

export default function PrenotazioneConfermataPage({
  searchParams,
}: {
  searchParams: { tipo?: string; nome?: string; id?: string; stato?: string };
}) {
  const { tipo = "Richiesta", nome, id, stato = "ricevuta" } = searchParams;

  return (
    <section className="container-ue pt-40 pb-24 max-w-xl">
      <SectionTitle eyebrow="Riepilogo" title="Richiesta ricevuta" />

      <div className="mt-10 border border-ue-line bg-ue-ink p-8 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-ue-smoke uppercase tracking-widest2 text-xs">Tipo di richiesta</span>
          <span>{tipo}</span>
        </div>
        {nome && (
          <div className="flex justify-between text-sm">
            <span className="text-ue-smoke uppercase tracking-widest2 text-xs">Referente</span>
            <span>{nome}</span>
          </div>
        )}
        {id && (
          <div className="flex justify-between text-sm">
            <span className="text-ue-smoke uppercase tracking-widest2 text-xs">Identificativo</span>
            <span>{id}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-ue-smoke uppercase tracking-widest2 text-xs">Stato</span>
          <span className="text-ue-red">{statusLabel[stato] ?? stato}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-ue-smoke">
        Riceverai un&apos;email con i dettagli e i passaggi successivi. Se hai domande, puoi contattare
        l&apos;organizzazione in qualsiasi momento.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/eventi/last-call-2026" className="btn-primary">
          Torna a LAST CALL
        </Link>
        <Link href="/contatti" className="btn-secondary">
          Contatta l&apos;organizzazione
        </Link>
      </div>
    </section>
  );
}
