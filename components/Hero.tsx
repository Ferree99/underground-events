import Image from "next/image";
import Link from "next/link";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ue-black">
      <Image
        src="/images/hero/homepage-stage.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim per leggibilità del testo sopra la fotografia */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ue-black via-ue-black/55 to-ue-black/30"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-tunnel-glow" />

      <div className="relative z-10 container-ue flex flex-col items-center text-center animate-tunnelIn">
        <h1 className="font-display font-bold uppercase leading-[0.95] text-5xl sm:text-6xl md:text-8xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          Non organizziamo
          <br />
          semplici eventi.
        </h1>
        <p className="mt-4 font-display uppercase text-2xl md:text-4xl text-ue-red">
          Creiamo esperienze da vivere.
        </p>

        <p className="mt-8 max-w-xl text-ue-smoke text-base md:text-lg">
          Concept, produzione, intrattenimento e community. Diamo forma a eventi capaci di lasciare il segno.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/eventi" className="btn-primary">
            Scopri i nostri eventi
          </Link>
          <Link href="/preventivo" className="btn-secondary">
            Parlaci del tuo progetto
          </Link>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
