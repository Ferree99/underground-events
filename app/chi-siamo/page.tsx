import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CallToAction from "@/components/CallToAction";
import { team } from "@/content/team";

export const metadata: Metadata = { title: "Chi siamo" };

const pillars = [
  "Visione",
  "Valori",
  "Competenze",
  "Approccio creativo",
  "Organizzazione",
  "Community",
  "Collaborazioni",
  "Capacità produttiva",
];

export default function ChiSiamoPage() {
  return (
    <>
      <section className="container-ue pt-40 pb-24">
        <SectionTitle
          eyebrow="Chi siamo"
          title="UNDERGROUND EVENTS"
          description="UNDERGROUND EVENTS è un progetto creativo e organizzativo dedicato alla realizzazione di eventi capaci di unire persone, musica, motori, luoghi e intrattenimento. Crediamo nelle esperienze autentiche, nell'attenzione ai dettagli e nella forza delle collaborazioni."
        />
      </section>

      <section className="container-ue pb-24 border-t border-ue-line pt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar} className="border border-ue-line p-6">
              <p className="font-display uppercase font-semibold text-sm">{pillar}</p>
            </div>
          ))}
        </div>
      </section>

      {team.length > 0 && (
        <section className="container-ue pb-24 border-t border-ue-line pt-16">
          <SectionTitle eyebrow="Il team" title="Le persone dietro il progetto" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="border border-ue-line p-6">
                <p className="font-display font-bold uppercase">{member.name}</p>
                <p className="text-ue-smoke text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <CallToAction
        title="Costruiamo insieme la tua prossima esperienza."
        buttonLabel="Parlaci del tuo progetto"
        buttonHref="/preventivo"
      />
    </>
  );
}
