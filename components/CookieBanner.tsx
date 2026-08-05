"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ue-cookie-consent";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function saveConsent(consent: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // storage non disponibile: la preferenza vale solo per la sessione corrente
    }
    setVisible(false);
    setPreferencesOpen(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-ue-line bg-ue-black/95 backdrop-blur p-6">
      <div className="container-ue">
        {!preferencesOpen ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-sm text-ue-white/80 max-w-xl">
              Utilizziamo cookie tecnici necessari e, previo consenso, cookie di analisi e marketing. Puoi
              gestire le preferenze in qualsiasi momento dal footer.
            </p>
            <div className="flex gap-3 shrink-0">
              <button className="btn-secondary" onClick={() => setPreferencesOpen(true)}>
                Preferenze
              </button>
              <button
                className="btn-primary"
                onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
              >
                Accetta tutti
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <label className="flex items-center justify-between text-sm">
              <span>Cookie necessari (sempre attivi)</span>
              <input type="checkbox" checked disabled className="h-4 w-4 accent-ue-red" />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Cookie di analisi</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-ue-red"
              />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Cookie di marketing</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 accent-ue-red"
              />
            </label>
            <div className="flex gap-3">
              <button
                className="btn-primary"
                onClick={() => saveConsent({ necessary: true, analytics, marketing })}
              >
                Salva preferenze
              </button>
              <Link href="/cookie-policy" className="btn-secondary">
                Cookie Policy
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
