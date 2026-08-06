"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ScrollIndicator";
import HeroSymbol from "./HeroSymbol";

const NUM_BEAMS = 5;

/**
 * Hero con apertura scroll-scrub: si parte scuri con il simbolo a schermo
 * pieno, dei fasci di luce attraversano la scena, un varco circolare si
 * apre rivelando la fotografia, il simbolo si riduce e sfuma, il testo
 * entra riga per riga. Tutto guidato da GSAP ScrollTrigger con `scrub`,
 * quindi risponde in tempo reale allo scroll (avanti e indietro), non a
 * un timer fisso.
 *
 * Degradazione senza JavaScript: nel markup di partenza foto e testo sono
 * già visibili e il contenitore ha altezza normale (min-h-screen). Solo se
 * lo script gira davvero, e solo se l'utente non ha richiesto meno
 * movimento, il contenitore si allunga e l'animazione prende il controllo.
 */
export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const beamRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const symbolRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (wrapperRef.current) {
        gsap.set(wrapperRef.current, { height: "320vh" });
      }

      gsap.set(blackRef.current, { opacity: 1 });
      gsap.set(symbolRef.current, { scale: 1, opacity: 1, xPercent: -50, yPercent: -50 });
      gsap.set(lineRefs.current, { opacity: 0, y: 18 });
      gsap.set(beamRefs.current, { opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0.2 });

      const maskState = { radius: 0 };
      const applyMask = () => {
        if (!blackRef.current) return;
        const r = maskState.radius;
        const mask = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${r}%, black ${r + 1}%, black 100%)`;
        blackRef.current.style.maskImage = mask;
        blackRef.current.style.webkitMaskImage = mask;
      };
      applyMask();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      beamRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i * 0.04;
        tl.fromTo(el, { opacity: 0, yPercent: -30 }, { opacity: 0.9, yPercent: 0, duration: 0.18 }, start);
        tl.to(el, { opacity: 0, yPercent: 30, duration: 0.18 }, start + 0.18);
      });

      tl.to(glowRef.current, { opacity: 0.9, duration: 0.3 }, 0.05);
      tl.to(glowRef.current, { opacity: 0.15, duration: 0.35 }, 0.55);

      tl.to(
        maskState,
        {
          radius: 145,
          duration: 0.55,
          ease: "power3.out",
          onUpdate: applyMask,
        },
        0.15
      );

      tl.to(symbolRef.current, { scale: 0.45, duration: 0.55, ease: "power3.out" }, 0.15);
      tl.to(
        symbolRef.current,
        { filter: "drop-shadow(0 0 14px rgba(245,245,243,0.55))", duration: 0.2 },
        0.3
      );
      tl.to(symbolRef.current, { opacity: 0, duration: 0.2 }, 0.5);

      if (photoRef.current) {
        tl.fromTo(photoRef.current, { scale: 1 }, { scale: 1.06, duration: 1, ease: "none" }, 0);
      }

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0, duration: 0.2 }, 0.55 + i * 0.05);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ue-black"
      style={{ minHeight: "100vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div ref={photoRef} className="absolute inset-0">
          <Image
            src="/images/hero/homepage-stage.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div ref={blackRef} className="absolute inset-0 z-[2] bg-ue-black opacity-0" />

        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-[3] h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{ background: "radial-gradient(circle, rgba(227,30,36,.28), transparent 65%)" }}
        />

        <div aria-hidden="true" className="absolute inset-0 z-[3] overflow-hidden">
          {Array.from({ length: NUM_BEAMS }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                beamRefs.current[i] = el;
              }}
              className="absolute -top-1/3 h-[140%] w-[3px] opacity-0"
              style={{
                left: `${10 + i * 20}%`,
                transform: `rotate(${-18 + i * 4}deg)`,
                background:
                  "linear-gradient(180deg, transparent, rgba(245,245,243,.5) 35%, rgba(227,30,36,.6) 60%, transparent)",
                filter: "blur(1.5px)",
              }}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[7]"
          style={{
            background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 55%, rgba(0,0,0,.65) 100%)",
          }}
        />

        <div ref={symbolRef} className="absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <HeroSymbol className="h-[26vh] max-h-[220px] w-auto" />
        </div>

        <div className="relative z-10 container-ue flex flex-col items-center text-center">
          <h1 className="font-display font-bold uppercase leading-[0.95] text-5xl sm:text-6xl md:text-8xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            <span
              ref={(el) => {
                lineRefs.current[0] = el;
              }}
              className="inline-block"
            >
              Non organizziamo
            </span>
            <br />
            <span
              ref={(el) => {
                lineRefs.current[1] = el;
              }}
              className="inline-block"
            >
              semplici eventi.
            </span>
          </h1>
          <p
            ref={(el) => {
              lineRefs.current[2] = el;
            }}
            className="mt-4 inline-block font-display uppercase text-2xl md:text-4xl text-ue-red"
          >
            Creiamo esperienze da vivere.
          </p>

          <p
            ref={(el) => {
              lineRefs.current[3] = el;
            }}
            className="mt-8 inline-block max-w-xl text-ue-smoke text-base md:text-lg"
          >
            Concept, produzione, intrattenimento e community. Diamo forma a eventi capaci di lasciare il segno.
          </p>

          <div
            ref={(el) => {
              lineRefs.current[4] = el;
            }}
            className="mt-10 inline-flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/eventi" className="btn-primary">
              Scopri i nostri eventi
            </Link>
            <Link href="/preventivo" className="btn-secondary">
              Parlaci del tuo progetto
            </Link>
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
