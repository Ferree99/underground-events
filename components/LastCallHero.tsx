import Image from "next/image";
import Link from "next/link";
import { lastCall2026 } from "@/content/lastCall2026";
import Countdown from "./Countdown";

export default function LastCallHero() {
  const l = lastCall2026;
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ue-black">
      <Image
        src="/images/hero/last-call-2026.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ue-black via-ue-black/60 to-ue-black/35"
      />

      <div className="relative z-10 container-ue flex flex-col items-center text-center animate-tunnelIn">
        <p className="eyebrow">{l.organizers}</p>
        <h1 className="mt-4 font-display font-bold uppercase leading-[0.9] text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          {l.name}
        </h1>
        <p className="mt-3 font-display uppercase text-xl md:text-2xl text-ue-red">{l.claim}</p>

        <p className="mt-6 text-ue-smoke">
          {l.dateLabel} · {l.location.name}, {l.location.city} ({l.location.province}) · dalle {l.openingTime}
        </p>

        <div className="mt-10">
          <Countdown target={`${l.date}T${l.openingTime}:00+02:00`} />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="#lista" className="btn-primary">
            Mettiti in lista
          </Link>
          <Link href="#spiedo" className="btn-secondary">
            Prenota lo spiedo
          </Link>
          <Link href="#torneo" className="btn-secondary">
            Iscrivi la tua squadra
          </Link>
          <Link href="#programma" className="btn-secondary">
            Scopri il programma
          </Link>
        </div>
      </div>
    </section>
  );
}
