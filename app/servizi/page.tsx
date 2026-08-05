import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CallToAction from "@/components/CallToAction";
import { serviceAreas } from "@/content/services";

export const metadata: Metadata = { title: "Servizi" };

export default function ServiziPage() {
  return (
    <>
      <section className="container-ue pt-40 pb-16">
        <SectionTitle eyebrow="Cosa facciamo" title="Servizi" description="Dal concept alla produzione, seguiamo ogni fase dell'evento." />
      </section>

      <div className="border-t border-ue-line">
        {serviceAreas.map((area, i) => (
          <section key={area.id} id={area.id} className="container-ue py-16 border-b border-ue-line scroll-mt-24">
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              <div>
                <span className="font-display text-ue-smoke text-xs">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 font-display font-bold uppercase text-3xl">{area.title}</h2>
                <p className="mt-3 text-ue-smoke text-sm">{area.summary}</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {area.items.map((item) => (
                  <li key={item} className="border border-ue-line px-4 py-3 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <CallToAction
        title="Richiedi un preventivo personalizzato."
        text="Raccontaci il tuo progetto: ti aiutiamo a definirlo, dal concept alla produzione."
        buttonLabel="Richiedi un preventivo"
        buttonHref="/preventivo"
      />
    </>
  );
}
