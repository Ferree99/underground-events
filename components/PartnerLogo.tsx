import Image from "next/image";

export default function PartnerLogo({
  name,
  logo,
  description,
  size = "md",
}: {
  name: string;
  logo: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}) {
  const hasRealLogo = logo.startsWith("/");
  const heights = { sm: "h-10", md: "h-14", lg: "h-20" };

  return (
    <div className="border border-ue-line px-8 py-6 text-center max-w-xs flex flex-col items-center justify-center gap-3">
      {hasRealLogo ? (
        <div className={`relative w-full ${heights[size]}`}>
          <Image src={logo} alt={name} fill className="object-contain" sizes="200px" />
        </div>
      ) : (
        <p className="text-ue-smoke text-xs uppercase tracking-widest2">{logo}</p>
      )}
      <p className="font-display uppercase font-semibold text-sm">{name}</p>
      {description && <p className="text-sm text-ue-smoke">{description}</p>}
    </div>
  );
}
