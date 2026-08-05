"use client";

import { useEffect, useState } from "react";

function getTimeLeft(targetIso: string) {
  const diff = +new Date(targetIso) - +new Date();
  const clamped = Math.max(diff, 0);
  return {
    giorni: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    ore: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minuti: Math.floor((clamped / (1000 * 60)) % 60),
    secondi: Math.floor((clamped / 1000) % 60),
    finished: diff <= 0,
  };
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!time) return null;

  if (time.finished) {
    return <p className="font-display uppercase text-ue-red tracking-widest2">L&apos;evento è iniziato</p>;
  }

  const units: [string, number][] = [
    ["Giorni", time.giorni],
    ["Ore", time.ore],
    ["Minuti", time.minuti],
    ["Secondi", time.secondi],
  ];

  return (
    <div className="flex gap-4 md:gap-6" role="timer" aria-label="Conto alla rovescia per LAST CALL 2026">
      {units.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center border border-ue-line px-4 py-3 min-w-[64px]">
          <span className="font-display text-2xl md:text-4xl font-bold tabular-nums">{String(value).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-widest2 text-ue-smoke mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}
