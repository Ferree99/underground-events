"use client";

import { useMemo, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import EventCard from "@/components/EventCard";
import { events, type EventCategory } from "@/content/events";

const categories: { id: EventCategory; label: string }[] = [
  { id: "automotive", label: "Automotive" },
  { id: "music", label: "Music" },
  { id: "food", label: "Food" },
  { id: "outdoor", label: "Outdoor" },
  { id: "sport", label: "Sport" },
  { id: "nightlife", label: "Nightlife" },
  { id: "community", label: "Community" },
];

export default function EventiPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);

  const featured = events.find((e) => e.featured);
  const upcoming = events.filter((e) => e.status !== "concluso");
  const past = events.filter((e) => e.status === "concluso");

  const filteredUpcoming = useMemo(() => {
    return upcoming.filter((e) => {
      const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory ? e.categories.includes(activeCategory) : true;
      return matchesQuery && matchesCategory;
    });
  }, [upcoming, query, activeCategory]);

  return (
    <>
      <section className="container-ue pt-40 pb-16">
        <SectionTitle eyebrow="Eventi" title="Tutti gli eventi" />

        <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center">
          <label htmlFor="event-search" className="sr-only">
            Cerca un evento per nome
          </label>
          <input
            id="event-search"
            type="search"
            placeholder="Cerca un evento…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:max-w-xs bg-ue-ink border border-ue-line px-4 py-3 text-sm focus:border-ue-red outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-xs uppercase tracking-wide border ${
                activeCategory === null ? "border-ue-red text-ue-red" : "border-ue-line text-ue-smoke"
              }`}
            >
              Tutti
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wide border ${
                  activeCategory === cat.id ? "border-ue-red text-ue-red" : "border-ue-line text-ue-smoke"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="container-ue pb-16">
          <p className="eyebrow mb-4">In evidenza</p>
          <div className="max-w-md">
            <EventCard event={featured} />
          </div>
        </section>
      )}

      <section className="container-ue py-16 border-t border-ue-line">
        <SectionTitle eyebrow="Prossimi eventi" title="Prossimamente" align="left" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUpcoming.length > 0 ? (
            filteredUpcoming.map((event) => <EventCard key={event.slug} event={event} />)
          ) : (
            <p className="text-ue-smoke">Nessun evento corrisponde alla ricerca.</p>
          )}
        </div>
      </section>

      <section className="container-ue py-16 border-t border-ue-line">
        <SectionTitle eyebrow="Archivio" title="Eventi passati" align="left" />
        <div className="mt-10">
          {past.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-ue-smoke text-sm">Nessun evento passato ancora pubblicato.</p>
          )}
        </div>
      </section>
    </>
  );
}
