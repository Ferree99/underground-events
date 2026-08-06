import Image from "next/image";

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
  const heights = { md: "h-20", lg: "h-28", xl: "h-36" };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center max-w-[220px]">
      {hasRealLogo ? (
        <div className={`relative w-full ${heights[size]}`}>
          <Image src={logo} alt={name} fill className="object-contain" sizes="260px" />
        </div>
      ) : (
        <p className="text-ue-smoke text-xs uppercase tracking-widest2">{logo}</p>
      )}
      <p className="font-display uppercase font-semibold text-sm">{name}</p>
      {description && <p className="text-sm text-ue-smoke">{description}</p>}
    </div>
  );
}
