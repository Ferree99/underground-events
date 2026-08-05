export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display font-bold uppercase text-3xl md:text-5xl leading-tight">{title}</h2>
      {description && <p className="mt-4 text-ue-smoke text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
