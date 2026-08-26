import type { Metadata } from "next";
import Image from "next/image";
import LastCallHero from "@/components/LastCallHero";
import SectionTitle from "@/components/SectionTitle";
import Timeline from "@/components/Timeline";
import ArtistCard from "@/components/ArtistCard";
import MapSection from "@/components/MapSection";
import GuestListForm from "@/components/forms/GuestListForm";
import BeerPongForm from "@/components/forms/BeerPongForm";
import PartnerLogo from "@/components/PartnerLogo";
import { lastCall2026 } from "@/content/lastCall2026";
import { drinkPromotions } from "@/content/drinkPromotions";
import { beerPongTournament } from "@/content/bookingSettings";
import { siteSettings } from "@/content/siteSettings";
import { confirmedPartners, confirmedSponsors } from "@/content/partners";

export const metadata: Metadata = {
  title: "LAST CALL 2026",
  description: lastCall2026.description.main,
};

// L'evento supera la mezzanotte: se l'orario di chiusura è "prima" di
// quello di apertura, vuol dire che cade nel giorno successivo.
function addOneDay(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
const eventEndDate =
  lastCall2026.closingTime <= lastCall2026.openingTime ? addOneDay(lastCall2026.date) : lastCall2026.date;

const streetCarTherapy = confirmedPartners.find((p) => p.name === "Street Car Therapy");

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: lastCall2026.name,
  startDate: `${lastCall2026.date}T${lastCall2026.openingTime}:00+02:00`,
  endDate: `${eventEndDate}T${lastCall2026.closingTime}:00+02:00`,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: lastCall2026.location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: lastCall2026.location.address,
      postalCode: lastCall2026.location.postalCode,
      addressLocality: lastCall2026.location.city,
      addressRegion: lastCall2026.location.province,
      addressCountry: "IT",
    },
  },
  organizer: {
    "@type": "Organization",
    name: lastCall2026.organizers,
  },
  description: lastCall2026.description.main,
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.6.07 4.81 0 3.22-.01 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.6.07-4.85.07-3.2 0-3.6-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.59-.07-4.81 0-3.21.02-3.56.07-4.81.15-3.23 1.66-4.77 4.92-4.92C8.4 2.2 8.8 2.2 12 2.2Zm0 1.98c-3.15 0-3.52.01-4.76.07-2.14.1-3.12 1.1-3.22 3.22-.06 1.24-.07 1.6-.07 4.75s.01 3.51.07 4.75c.1 2.12 1.08 3.12 3.22 3.22 1.24.06 1.6.07 4.76.07 3.15 0 3.52-.01 4.76-.07 2.14-.1 3.12-1.1 3.22-3.22.06-1.24.07-1.6.07-4.75s-.01-3.51-.07-4.75c-.1-2.12-1.08-3.12-3.22-3.22-1.24-.06-1.6-.07-4.76-.07Zm0 3.37a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.98a3.67 3.67 0 1 0 0 7.34 3.67 3.67 0 0 0 0-7.34Zm5.88-2.2a1.32 1.32 0 1 1-2.65 0 1.32 1.32 0 0 1 2.65 0Z" />
    </svg>
  );
}

export default function LastCallPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      <LastCallHero />

      {/* Descrizione ufficiale */}
      <section className="container-ue py-24">
        <p className="text-lg md:text-2xl leading-relaxed max-w-3xl">{lastCall2026.description.main}</p>
        <p className="mt-6 text-ue-smoke max-w-3xl leading-relaxed">{lastCall2026.description.secondary}</p>

        <p className="mt-6 text-ue-smoke italic">{lastCall2026.collaborationText}</p>
      </section>

      {/* Cosa ti aspetta */}
      <section className="container-ue py-16 border-t border-ue-line">
        <SectionTitle eyebrow="In programma" title="Cosa ti aspetta" />
        <div className="mt-10 flex flex-wrap gap-3">
          {lastCall2026.whatToExpect.map((item) => (
            <span
              key={item}
              className="border border-ue-line px-4 py-2 text-sm uppercase tracking-wide text-ue-white/80"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Programma */}
      <section id="programma" className="container-ue py-24 border-t border-ue-line scroll-mt-24">
        <SectionTitle eyebrow="Timeline" title="Programma ufficiale" />
        <div className="mt-12 max-w-2xl">
          <Timeline />
        </div>
      </section>

      {/* Lineup */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Musica" title="Lineup" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lastCall2026.lineup.map((artist) => (
            <ArtistCard key={artist.name} {...artist} />
          ))}
        </div>
      </section>

      {/* Area automotive — nessun modulo: chi vuole portare l'auto scrive
          direttamente in direct a Street Car Therapy su Instagram. */}
      <section className="border-t border-ue-line bg-ue-ink">
        <div className="container-ue py-24">
          <SectionTitle
            eyebrow="Raduno"
            title="Area automotive"
            description={`Apertura alle ${lastCall2026.openingTime}: ingresso delle vetture sportive, esposizione delle auto e ritrovo della community. Decine di auto sportive esposte lungo il grande prato, in una location direttamente sulle rive del lago.`}
          />
          <div className="mt-10 flex flex-wrap items-center gap-8 max-w-2xl">
            {streetCarTherapy && (
              <div className="relative h-16 w-40 shrink-0">
                <Image
                  src={streetCarTherapy.logo}
                  alt="Street Car Therapy"
                  fill
                  className="object-contain object-left"
                />
              </div>
            )}
            <div>
              <p className="text-ue-white/80 max-w-md">
                Vuoi portare la tua auto a LAST CALL 2026? Scrivi direttamente in direct a Street Car
                Therapy su Instagram: sarà l&apos;organizzazione a occuparsi della selezione e delle
                modalità di accesso.
              </p>
              {streetCarTherapy?.instagramUrl && (
                <a
                  href={streetCarTherapy.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-5 inline-flex items-center gap-2"
                >
                  <InstagramIcon />
                  Scrivi a Street Car Therapy
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lista */}
      <section id="lista" className="border-t border-ue-line scroll-mt-24">
        <div className="container-ue py-24">
          <SectionTitle eyebrow="Lista" title={drinkPromotions.title} />
          <p className="mt-4 text-ue-red text-sm uppercase tracking-wide">{drinkPromotions.eligibilityNote}</p>
          <p className="mt-2 text-ue-smoke text-sm max-w-xl">{drinkPromotions.checkInNote}</p>

          <div className="mt-12 max-w-xl">
            <GuestListForm />
          </div>
        </div>
      </section>

      {/* Beer Pong */}
      <section id="beerpong" className="border-t border-ue-line bg-ue-ink scroll-mt-24">
        <div className="container-ue py-24">
          <SectionTitle eyebrow={`Ore ${beerPongTournament.time}`} title={beerPongTournament.title} description={beerPongTournament.intro} />

          <dl className="mt-10 grid gap-6 sm:grid-cols-3 max-w-2xl">
            <div>
              <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Quota</dt>
              <dd className="mt-1 font-display text-xl text-ue-red">{beerPongTournament.fee}</dd>
            </div>
            <div>
              <dt className="text-ue-smoke uppercase text-xs tracking-widest2">La quota comprende</dt>
              <dd className="mt-1 text-ue-white/80">{beerPongTournament.feeIncludes}</dd>
            </div>
            <div>
              <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Premi</dt>
              <dd className="mt-1 text-ue-white/80">{beerPongTournament.prizes}</dd>
            </div>
          </dl>

          <div className="mt-10 max-w-xl">
            <BeerPongForm />
          </div>
        </div>
      </section>

      {/* Galleria */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Media" title="Galleria" />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {lastCall2026.gallery.map((item) => (
            <div key={item.label} className="relative aspect-square border border-ue-line overflow-hidden group">
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ue-black/80 to-transparent px-3 py-2 text-[10px] uppercase tracking-widest2 text-ue-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Mappa */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Dove" title={lastCall2026.location.name} />
        <div className="mt-10">
          <MapSection />
        </div>
      </section>

      {/* Partner e sponsor dell'evento */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Un ringraziamento a" title="Partner e sponsor" align="center" />
        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-10">
          {confirmedPartners.map((partner) => (
            <PartnerLogo key={partner.name} {...partner} size="md" />
          ))}
          {confirmedSponsors.map((sponsor) => (
            <PartnerLogo key={sponsor.name} {...sponsor} size="md" />
          ))}
        </div>
      </section>

      {/* Chiusura */}
      <section className="border-t border-ue-line py-32 text-center">
        <div className="container-ue">
          {lastCall2026.closingCopy.map((line) => (
            <p key={line} className="font-display uppercase text-3xl md:text-5xl font-bold leading-tight">
              {line}
            </p>
          ))}
          <a href="#lista" className="btn-primary mt-10 inline-flex">
            {lastCall2026.closingCta}
          </a>
        </div>
      </section>

      <p className="sr-only">{siteSettings.brandName}</p>
    </>
  );
}
