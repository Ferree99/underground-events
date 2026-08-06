import type { Metadata } from "next";
import Image from "next/image";
import LastCallHero from "@/components/LastCallHero";
import SectionTitle from "@/components/SectionTitle";
import Timeline from "@/components/Timeline";
import ArtistCard from "@/components/ArtistCard";
import PromoDrinkCard from "@/components/PromoDrinkCard";
import MapSection from "@/components/MapSection";
import GuestListForm from "@/components/forms/GuestListForm";
import VehicleApplicationForm from "@/components/forms/VehicleApplicationForm";
import PartnerLogo from "@/components/PartnerLogo";
import { lastCall2026 } from "@/content/lastCall2026";
import { drinkPromotions } from "@/content/drinkPromotions";
import { beerPongAndGames, vehicleApplication } from "@/content/bookingSettings";
import { siteSettings } from "@/content/siteSettings";
import { confirmedPartners, confirmedSponsors } from "@/content/partners";

export const metadata: Metadata = {
  title: "LAST CALL 2026",
  description: lastCall2026.description.main,
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: lastCall2026.name,
  startDate: `${lastCall2026.date}T${lastCall2026.openingTime}:00+02:00`,
  endDate: `${lastCall2026.date}T${lastCall2026.closingTime === "00:00" ? "23:59" : lastCall2026.closingTime}:00+02:00`,
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

      {/* Promo drink + lista */}
      <section id="lista" className="border-t border-ue-line bg-ue-ink scroll-mt-24">
        <div className="container-ue py-24">
          <SectionTitle eyebrow="Promo" title={drinkPromotions.title} />
          <p className="mt-4 text-ue-red text-sm uppercase tracking-wide">{drinkPromotions.eligibilityNote}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-2xl">
            {drinkPromotions.slots.map((slot) => (
              <PromoDrinkCard key={slot.timeRange} {...slot} />
            ))}
          </div>

          <div className="mt-12 max-w-xl">
            <h3 className="font-display font-bold uppercase text-xl mb-6">Mettiti in lista</h3>
            <GuestListForm />
          </div>
        </div>
      </section>

      {/* Beer Pong, giochi, sfide e premi */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Game Time" title={beerPongAndGames.title} />
        <p className="mt-4 max-w-2xl text-ue-smoke">{beerPongAndGames.note}</p>
        <button type="button" disabled className="btn-disabled mt-6">
          {beerPongAndGames.rulesButtonLabel}
        </button>
      </section>

      {/* Area automotive */}
      <section className="border-t border-ue-line bg-ue-ink">
        <div className="container-ue py-24">
          <SectionTitle
            eyebrow="Raduno"
            title="Area automotive"
            description={`Apertura raduno alle ${lastCall2026.openingTime}: accoglienza dei partecipanti, ingresso delle vetture sportive, esposizione delle auto e ritrovo della community. Decine di auto sportive esposte lungo il grande prato, in una location direttamente sulle rive del lago.`}
          />
          <p className="mt-6 max-w-2xl text-ue-smoke text-sm">{vehicleApplication.note}</p>
          <div className="mt-10 max-w-xl">
            <h3 className="font-display font-bold uppercase text-xl mb-6">Candida la tua auto</h3>
            <VehicleApplicationForm />
          </div>
        </div>
      </section>

      {/* Galleria */}
      <section className="container-ue py-24 border-t border-ue-line">
        <SectionTitle eyebrow="Media" title="Galleria" />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {lastCall2026.gallery.map((item) => (
            <div
              key={item}
              className="aspect-square border border-ue-line flex items-center justify-center text-center text-ue-smoke text-[10px] uppercase tracking-widest2 p-2"
            >
              {item}
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
