import { lastCall2026 } from "@/content/lastCall2026";
import { venueInfo } from "@/content/bookingSettings";

export default function MapSection() {
  const { location } = lastCall2026;
  const address = `${location.address}, ${location.postalCode} ${location.city} (${location.province})`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name} ${address}`
  )}`;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-video border border-ue-line flex items-center justify-center text-ue-smoke text-xs uppercase tracking-widest2">
        [MAPPA — {venueInfo.mapEmbedUrl}]
      </div>
      <div>
        <h3 className="font-display font-bold uppercase text-2xl">{location.name}</h3>
        <p className="mt-2 text-ue-smoke">{address}</p>
        <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 inline-flex">
          Apri le indicazioni
        </a>

        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Parcheggi</dt>
            <dd>{venueInfo.parking}</dd>
          </div>
          <div>
            <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Accessibilità</dt>
            <dd>{venueInfo.accessibility}</dd>
          </div>
          <div>
            <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Trasporto</dt>
            <dd>{venueInfo.transport}</dd>
          </div>
          <div>
            <dt className="text-ue-smoke uppercase text-xs tracking-widest2">In caso di maltempo</dt>
            <dd>{venueInfo.badWeatherPolicy}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
