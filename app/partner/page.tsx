import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CallToAction from "@/components/CallToAction";
import { partnerCategories } from "@/content/partners";

export const metadata: Metadata = { title: "Partner" };

export default function PartnerPage() {
  return (
    <>
      <section className="container-ue pt-40 pb-16">
        <SectionTitle
          eyebrow="Collaborazioni"
          title="Partner"
          description="Una collaborazione che unisce il mondo delle auto sportive alla musica e al divertimento."
        />
      </section>

      <div className="border-t border-ue-line">
        {partnerCategories.map((cat) => (
          <section key={cat.id} className="container-ue py-16 border-b border-ue-line">
            <h2 className="font-display font-bold uppercase text-2xl mb-8">{cat.label}</h2>
            {cat.entries.length > 0 ? (
              <div className="flex flex-wrap gap-6">
                {cat.entries.map((entry) => (
                  <div key={entry.name} className="border border-ue-line px-8 py-6 text-center max-w-sm">
                    <p className="text-ue-smoke text-xs uppercase tracking-widest2">{entry.logo}</p>
                    <p className="mt-2 font-display uppercase font-semibold">{entry.name}</p>
                    <p className="mt-2 text-sm text-ue-smoke">{entry.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-ue-line px-8 py-6 text-center text-ue-smoke text-xs uppercase tracking-widest2 w-fit">
                In fase di definizione
              </div>
            )}
          </section>
        ))}
      </div>

      <CallToAction
        title="Vuoi diventare partner di UNDERGROUND EVENTS?"
        buttonLabel="Parlaci del tuo progetto"
        buttonHref="/contatti"
      />
    </>
  );
}
