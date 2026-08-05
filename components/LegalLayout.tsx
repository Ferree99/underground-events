import { siteSettings } from "@/content/siteSettings";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-ue pt-40 pb-24 max-w-3xl">
      <h1 className="font-display font-bold uppercase text-4xl md:text-5xl">{title}</h1>
      {updated && <p className="mt-2 text-xs text-ue-smoke uppercase tracking-widest2">Ultimo aggiornamento: {updated}</p>}

      <div className="mt-6 border border-ue-red/50 bg-ue-ink p-4 text-sm text-ue-white">
        {siteSettings.legal.draftNotice}
      </div>

      <div className="mt-10 space-y-6 text-sm md:text-base text-ue-white/85 leading-relaxed [&_h2]:font-display [&_h2]:uppercase [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
