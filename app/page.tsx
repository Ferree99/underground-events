import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import EventCard from "@/components/EventCard";
import CallToAction from "@/components/CallToAction";
import PartnerLogo from "@/components/PartnerLogo";
import Countdown from "@/components/Countdown";
import { homeServices } from "@/content/services";
import { events } from "@/content/events";
import { lastCall2026 } from "@/content/lastCall2026";
import { confirmedPartners, confirmedSponsors } from "@/content/partners";

const workMethod = [
  { step: "Ascolto", text: "Raccogliamo l'idea, il contesto e gli obiettivi del progetto." },
  { step: "Concept", text: "Costruiamo l'identità dell'evento: format, atmosfera, narrazione." },
  { step: "Produzione", text: "Coordiniamo location, fornitori, allestimenti e sicurezza." },
  { step: "Esperienza", text: "Diamo vita all'evento e ne curiamo ogni dettaglio dal vivo." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Presentazione */}
      <section className="container-ue py-24">
        <SectionTitle
          eyebrow="Chi siamo"
          title="Benvenuti nell'Underground."
          description="UNDERGROUND EVENTS nasce per trasformare idee, luoghi e persone in esperienze memorabili. Progettiamo eventi con un'identità precisa, curando concept, atmosfera, intrattenimento, comunicazione e produzione. Ogni progetto nasce dall'incontro tra creatività, organizzazione e community."
        />
      </section>

      {/* Servizi principali */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Cosa facciamo" title="Servizi" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, i) => (
            <ServiceCard key={service} title={service} index={i} />
          ))}
        </div>
      </section>

      {/* Evento in evidenza — LAST CALL 2026 */}
      <section className="border-t border-ue-line bg-ue-ink">
        <div className="container-ue py-24">
          <p className="eyebrow">Evento in evidenza</p>
          <h2 className="mt-3 font-display font-bold uppercase text-4xl md:text-6xl">{lastCall2026.name}</h2>
          <p className="mt-2 font-display uppercase text-ue-red text-lg">{lastCall2026.claim}</p>
          <p className="mt-4 text-ue-smoke">
            {lastCall2026.dateLabel} · {lastCall2026.location.name}, {lastCall2026.location.city} (
            {lastCall2026.location.province}) · apertura ore {lastCall2026.openingTime}
          </p>

          <div className="mt-8">
            <Countdown target={`${lastCall2026.date}T${lastCall2026.openingTime}:00+02:00`} />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/eventi/last-call-2026" className="btn-primary">
              Scopri LAST CALL
            </Link>
            <Link href="/eventi/last-call-2026#lista" className="btn-secondary">
              Mettiti in lista
            </Link>
          </div>
        </div>
      </section>

      {/* Eventi */}
      <section className="container-ue py-24">
        <SectionTitle eyebrow="Eventi" title="I nostri eventi" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>

      {/* Metodo di lavoro */}
      <section className="border-t border-ue-line py-24">
        <div className="container-ue">
          <SectionTitle eyebrow="Metodo" title="Come lavoriamo" />
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {workMethod.map((item, i) => (
              <li key={item.step} className="border-t border-ue-red pt-4">
                <span className="font-display text-ue-smoke text-xs">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display font-bold uppercase text-xl">{item.step}</h3>
                <p className="mt-2 text-sm text-ue-smoke">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Partner e sponsor */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Collaborazioni" title="Partner" />
        <div className="mt-12 flex flex-wrap gap-6">
          {confirmedPartners.map((partner) => (
            <PartnerLogo key={partner.name} {...partner} size="md" />
          ))}
        </div>

        <p className="mt-16 eyebrow">Sponsor</p>
        <div className="mt-6 flex flex-wrap gap-6">
          {confirmedSponsors.map((sponsor) => (
            <PartnerLogo key={sponsor.name} {...sponsor} size="md" />
          ))}
        </div>
      </section>

      <CallToAction
        title="Hai un'idea? Portiamola fuori dagli schemi."
        text="Raccontaci il tuo progetto. Costruiremo insieme un'esperienza autentica, riconoscibile e memorabile."
        buttonLabel="Organizza il tuo evento"
        buttonHref="/preventivo"
      />
    </>
  );
}
