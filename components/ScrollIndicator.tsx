export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ue-smoke">
      <span className="text-[10px] uppercase tracking-widest2">Scorri</span>
      <span className="h-10 w-px bg-gradient-to-b from-ue-red to-transparent motion-safe:animate-pulse" aria-hidden="true" />
    </div>
  );
}
