"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ScrollIndicator";
import LogoIcon from "./LogoIcon";

const DARK = "#141414";

type Wisp = {
  baseX: number;
  baseY: number;
  fx1: number;
  fx2: number;
  fy: number;
  p1: number;
  p2: number;
  rise: number;
  angle: number;
  rotSpeed: number;
  stretchX: number;
  stretchY: number;
  radius: number;
  red: boolean;
};

function makeWisps(n: number, redEvery: number): Wisp[] {
  return Array.from({ length: n }, (_, i) => ({
    baseX: Math.random(),
    baseY: Math.random() * 1.3 - 0.15,
    fx1: 0.4 + Math.random() * 0.5,
    fx2: 0.9 + Math.random() * 0.6,
    fy: 0.15 + Math.random() * 0.12,
    p1: Math.random() * Math.PI * 2,
    p2: Math.random() * Math.PI * 2,
    rise: 0.015 + Math.random() * 0.02,
    angle: Math.random() * Math.PI,
    rotSpeed: (Math.random() - 0.5) * 0.15,
    stretchX: 1.6 + Math.random() * 1.8,
    stretchY: 0.35 + Math.random() * 0.3,
    radius: 0.16 + Math.random() * 0.2,
    red: i % redEvery === 0,
  }));
}

function drawWisps(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, wisps: Wisp[], t: number, intensity: number) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  wisps.forEach((w) => {
    const driftX = Math.sin(t * w.fx1 + w.p1) * 0.1 + Math.sin(t * w.fx2 + w.p2) * 0.05;
    let y = (w.baseY - t * w.rise) % 1.3;
    if (y < -0.15) y += 1.3;
    const x = (w.baseX + driftX) * canvas.width;
    const yy = y * canvas.height;
    const r = w.radius * canvas.width * (0.8 + intensity * 0.5);

    ctx.save();
    ctx.translate(x, yy);
    ctx.rotate(w.angle + Math.sin(t * w.rotSpeed) * 0.4);
    ctx.scale(w.stretchX, w.stretchY);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    if (w.red) {
      grad.addColorStop(0, `rgba(227,30,36,${0.1 * intensity})`);
    } else {
      grad.addColorStop(0, `rgba(205,205,205,${0.13 * intensity})`);
    }
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

/**
 * Hero con fumo continuo (filamenti veri via canvas, sempre in movimento,
 * mai legati esclusivamente allo scroll) sopra cui il simbolo — in primo
 * piano, scuro per contrasto — si dissolve "in avanti" nel fumo mentre
 * scrolli, lasciando emergere il testo. Una maschera CSS permanente sul
 * bordo inferiore del canvas fonde il fumo con lo sfondo nero della pagina,
 * così non c'è mai un taglio netto quando la sezione si stacca.
 *
 * Degradazione senza JavaScript: il markup di partenza mostra già logo e
 * testo, altezza di sezione normale. Solo se lo script gira davvero, e
 * l'utente non ha richiesto meno movimento, parte l'intera sequenza.
 */
export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const frontwispRef = useRef<HTMLDivElement>(null);
  const scrollhintRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLElement | null>>([]);
  const intensityRef = useRef(0.6);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const wisps = makeWisps(24, 5);
    let t = 0;
    let rafId: number;

    function loop() {
      t += 0.006;
      if (ctx && canvas) {
        ctx.fillStyle = "rgba(10,10,10,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawWisps(ctx, canvas, wisps, t, reducedMotion ? 0.55 : intensityRef.current);
      }
      rafId = requestAnimationFrame(loop);
    }
    loop();

    let ctxGsap: gsap.Context | undefined;

    if (!reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

      ctxGsap = gsap.context(() => {
        if (wrapperRef.current) {
          gsap.set(wrapperRef.current, { height: "220vh" });
        }
        gsap.set(logoRef.current, { scale: 1, opacity: 1 });
        gsap.set(lineRefs.current, { opacity: 0, y: 16 });
        gsap.set(frontwispRef.current, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const raw = self.progress;
              const bell = Math.sin(Math.min(Math.max(raw, 0), 1) * Math.PI);
              intensityRef.current = 0.55 + bell * 0.75;
            },
          },
        });

        const logoPhase = { v: 0 };
        tl.to(
          logoPhase,
          {
            v: 1,
            duration: 0.45,
            ease: "power3.out",
            onUpdate: () => {
              const e = logoPhase.v;
              if (!logoRef.current) return;
              logoRef.current.style.opacity = String(1 - e);
              logoRef.current.style.transform = `translate(-50%,-50%) scale(${1 - e * 0.72})`;
              logoRef.current.style.filter = `blur(${e * 4}px) drop-shadow(0 0 ${(1 - e) * 18 + 4}px rgba(245,245,243,${0.5 - e * 0.4}))`;
              if (frontwispRef.current) {
                frontwispRef.current.style.opacity = String(Math.sin(Math.min(e, 1) * Math.PI) * 0.75);
              }
            },
          },
          0
        );

        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = 0.32 + i * 0.07;
          const state = { p: 0 };
          tl.to(
            state,
            {
              p: 1,
              duration: 0.3,
              onUpdate: () => {
                const p = state.p;
                const glow = Math.sin(p * Math.PI) * 14;
                el.style.opacity = String(p);
                el.style.transform = `translateY(${(1 - p) * 16}px)`;
                el.style.filter = `drop-shadow(0 0 ${glow}px rgba(227,30,36,${0.45 * Math.sin(p * Math.PI)}))`;
              },
            },
            start
          );
        });

        if (scrollhintRef.current) {
          tl.to(scrollhintRef.current, { opacity: 0, duration: 0.08 }, 0);
        }
      }, wrapperRef);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      ctxGsap?.revert();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative bg-ue-black" style={{ minHeight: "100vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, rgba(0,0,0,.96) 12%, rgba(0,0,0,.88) 28%, rgba(0,0,0,.72) 44%, rgba(0,0,0,.5) 60%, rgba(0,0,0,.26) 76%, rgba(0,0,0,.08) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, rgba(0,0,0,.96) 12%, rgba(0,0,0,.88) 28%, rgba(0,0,0,.72) 44%, rgba(0,0,0,.5) 60%, rgba(0,0,0,.26) 76%, rgba(0,0,0,.08) 90%, transparent 100%)",
          }}
        />

        <div
          ref={frontwispRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background: "radial-gradient(circle, rgba(200,200,200,.5), rgba(200,200,200,.12) 55%, transparent 75%)",
            filter: "blur(24px)",
          }}
        />

        <div ref={logoRef} className="absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <LogoIcon className="h-[130px] w-auto sm:h-[150px]" color={DARK} />
        </div>

        <div className="relative z-[6] container-ue flex flex-col items-center text-center">
          <h1
            className="font-display font-bold uppercase leading-[0.95] text-5xl sm:text-6xl md:text-8xl"
            style={{ color: DARK }}
          >
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
            className="mt-8 inline-block max-w-xl text-base md:text-lg font-medium"
            style={{ color: "#2A2A2A" }}
          >
            Concept, produzione, intrattenimento e community. Diamo forma a eventi capaci di lasciare il segno.
          </p>

          <div
            ref={(el) => {
              lineRefs.current[4] = el;
            }}
            className="mt-10 inline-flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/eventi" className="btn-primary shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              Scopri i nostri eventi
            </Link>
            <Link href="/preventivo" className="btn-secondary shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
              Parlaci del tuo progetto
            </Link>
          </div>
        </div>

        <div ref={scrollhintRef} className="absolute z-10">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
