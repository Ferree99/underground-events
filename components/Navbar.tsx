"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, navCta } from "@/content/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

// Solo in home: oltre questa distanza di scroll (px) la navbar è
// completamente nera e visibile. Sotto, sfuma linearmente con lo scroll —
// invisibile in cima (la hero ha già il proprio testo), poi compare
// gradualmente, non di colpo. Nelle altre pagine la navbar resta sempre
// leggibile fin dall'inizio.
const FADE_DISTANCE = 160;

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const bgProgress = isHome ? clamp(scrollY / FADE_DISTANCE, 0, 1) : scrollY > 40 ? 1 : 0;
  const contentOpacity = isHome ? clamp(scrollY / FADE_DISTANCE, 0, 1) : 1;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${!isHome ? "transition-colors duration-500" : ""}`}
        style={{
          opacity: contentOpacity,
          backgroundColor: `rgba(10,10,10,${0.92 * bgProgress})`,
          backdropFilter: bgProgress > 0.05 ? "blur(10px)" : "none",
          borderBottom: bgProgress > 0.4 ? "1px solid rgba(255,255,255,0.08)" : "none",
          // In home, a navbar invisibile non deve intercettare i tap sulla hero.
          pointerEvents: contentOpacity > 0.05 ? "auto" : "none",
        }}
      >
        <div className="container-ue flex items-center justify-between h-20">
          <Link href="/" aria-label="UNDERGROUND EVENTS — Home" className="flex items-center gap-3">
            <Logo variant="icon" className="h-9 w-9" />
            <span className="font-display font-semibold tracking-widest2 text-sm uppercase hidden sm:inline">
              Underground Events
            </span>
          </Link>

          <nav aria-label="Navigazione principale" className="hidden md:flex items-center gap-8">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-display uppercase tracking-wide transition-colors ${
                    active ? "text-ue-red" : "text-ue-white/80 hover:text-ue-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={navCta.href} className="btn-primary !px-5 !py-2.5 !text-xs">
              {navCta.label}
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center h-11 w-11 gap-1.5"
            aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-6 bg-ue-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ue-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ue-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
