import Image from "next/image";
import { lastCall2026 } from "@/content/lastCall2026";
import { venueInfo } from "@/content/bookingSettings";

const infoBlocks = [
  { label: "Parcheggi", text: venueInfo.parking },
  { label: "Accessibilità", text: venueInfo.accessibility },
  { label: "Trasporto", text: venueInfo.transport },
  { label: "In caso di maltempo", text: venueInfo.badWeatherPolicy },
];

export default function MapSection() {
  const { location } = lastCall2026;
  const address = `${location.address}, ${location.postalCode} ${location.city} (${location.province})`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name} ${address}`
  )}`;
  const hasMapImage = venueInfo.mapImage.startsWith("/");

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-video border border-ue-line overflow-hidden">
          {hasMapImage ? (
            <Image
              src={venueInfo.mapImage}
              alt={`Mappa: ${location.name}, ${address}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-ue-smoke text-xs uppercase tracking-widest2">
              [MAPPA]
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display font-bold uppercase text-2xl">{location.name}</h3>
          <p className="mt-2 text-ue-smoke">{address}</p>
          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 inline-flex">
            Apri le indicazioni
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {infoBlocks.map((block) => (
          <div key={block.label}>
            <p className="eyebrow mb-2">{block.label}</p>
            <p className="text-sm text-ue-white/80 leading-relaxed">{block.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
