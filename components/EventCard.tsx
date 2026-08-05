import Image from "next/image";
import Link from "next/link";
import type { EventItem, EventStatus } from "@/content/events";

const statusLabel: Record<EventStatus, string> = {
  prossimamente: "Prossimamente",
  "lista-aperta": "Lista aperta",
  "prenotazioni-aperte": "Prenotazioni aperte",
  "sold-out": "Sold out",
  concluso: "Concluso",
};

export default function EventCard({ event }: { event: EventItem }) {
  const hasRealImage = event.image.startsWith("/");

  return (
    <Link
      href={event.href}
      className="group block border border-ue-line bg-ue-ink overflow-hidden transition-colors duration-300 hover:border-ue-red"
    >
      <div className="relative aspect-[4/3] border-b border-ue-line overflow-hidden">
        {hasRealImage ? (
          <Image
            src={event.image}
            alt={event.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ue-smoke text-xs uppercase tracking-widest2 px-4 text-center">
            {event.image}
          </div>
        )}
        <span className="absolute top-3 left-3 bg-ue-black/80 px-3 py-1 text-[10px] uppercase tracking-widest2 text-ue-red border border-ue-red/40">
          {statusLabel[event.status]}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs text-ue-smoke uppercase tracking-widest2">{event.dateLabel}</p>
        <h3 className="mt-2 font-display font-bold uppercase text-xl group-hover:text-ue-red transition-colors">
          {event.name}
        </h3>
        <p className="mt-1 text-sm text-ue-smoke">{event.location}</p>
        <p className="mt-3 text-sm text-ue-white/80">{event.shortDescription}</p>
      </div>
    </Link>
  );
}
