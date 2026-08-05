"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { mainNav, navCta } from "@/content/navigation";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-ue-black/98 backdrop-blur md:hidden"
      onClick={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
        className="flex h-full flex-col items-center justify-center gap-8 px-6"
      >
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="font-display text-3xl uppercase tracking-wide text-ue-white hover:text-ue-red transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link href={navCta.href} onClick={onClose} className="btn-primary mt-4">
          {navCta.label}
        </Link>
      </div>
    </div>
  );
}
