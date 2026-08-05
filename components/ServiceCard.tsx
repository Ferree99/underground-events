export default function ServiceCard({ title, index }: { title: string; index: number }) {
  return (
    <div className="group relative border border-ue-line bg-ue-ink p-6 transition-colors duration-300 hover:border-ue-red">
      <span className="font-display text-xs text-ue-smoke">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 font-display font-semibold uppercase text-sm tracking-wide">{title}</h3>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-ue-red transition-all duration-300 group-hover:w-full"
      />
    </div>
  );
}
