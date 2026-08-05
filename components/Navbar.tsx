"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, navCta } from "@/content/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ue-black/90 backdrop-blur border-b border-ue-line" : "bg-transparent"
        }`}
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
