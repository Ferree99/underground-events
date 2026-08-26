import { lastCall2026 } from "@/content/lastCall2026";

export default function Timeline() {
  return (
    <ol className="relative border-l border-ue-line ml-3">
      {lastCall2026.schedule.map((slot, i) => (
        <li key={slot.time} className="relative pl-8 pb-12 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-ue-black border-2 border-ue-red"
          />
          <p className="font-display text-ue-red text-sm tracking-widest2">{slot.time}</p>
          <h3 className="mt-1 font-display font-bold uppercase text-2xl">{slot.title}</h3>
          {slot.items.length > 0 && (
            <ul className="mt-3 space-y-1 text-ue-smoke text-sm">
              {slot.items.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
