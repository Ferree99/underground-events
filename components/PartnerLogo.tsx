import Image from "next/image";

/**
 * Contenitore dell'immagine a dimensione fissa sia in altezza che in
 * larghezza (non solo altezza): alcuni loghi sono molto "panoramici" (es.
 * larghi e bassi) e altri quasi quadrati — con solo l'altezza fissa, i loghi
 * panoramici finiscono per apparire più piccoli perché si restringono per
 * stare dentro alla larghezza. Il contenitore è invisibile (nessun bordo),
 * quindi renderlo più largo del necessario per i loghi quadrati non si vede:
 * ogni logo resta semplicemente centrato e alto uguale agli altri.
 */
const BOX_SIZES = {
  md: "h-20 w-64",
  lg: "h-28 w-80",
  xl: "h-36 w-[26rem]",
};

export default function PartnerLogo({
  name,
  logo,
  description,
  size = "lg",
}: {
  name: string;
  logo: string;
  description?: string;
  size?: "md" | "lg" | "xl";
}) {
  const hasRealLogo = logo.startsWith("/");

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      {hasRealLogo ? (
        <div className={`relative ${BOX_SIZES[size]}`}>
          <Image src={logo} alt={name} fill className="object-contain" sizes="380px" />
        </div>
      ) : (
        <p className="text-ue-smoke text-xs uppercase tracking-widest2 max-w-[220px]">{logo}</p>
      )}
      <p className="font-display uppercase font-semibold text-sm max-w-[220px]">{name}</p>
      {description && <p className="text-sm text-ue-smoke max-w-[220px]">{description}</p>}
    </div>
  );
}
