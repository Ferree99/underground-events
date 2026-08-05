import Image from "next/image";

/**
 * Il logo NON è stato ridisegnato.
 *
 * I file in /public/images/logo/*.png sono ritagli diretti, pixel per
 * pixel, della tavola di brand identity allegata (fondo nero reso
 * trasparente): nessuna forma, proporzione o spaziatura è stata
 * reinterpretata. Sono quindi utilizzabili da subito in anteprima e in
 * produzione su sfondi scuri.
 *
 * Limite da conoscere: essendo ritagli raster (non vettoriali), a
 * dimensioni molto grandi possono perdere nitidezza. Prima della
 * pubblicazione definitiva è comunque consigliato sostituirli con
 * l'export vettoriale originale (SVG), se disponibile, mantenendo
 * identici i nomi file elencati sotto — nessuna modifica al codice
 * sarà necessaria.
 *
 *   /public/images/logo/icon-white.png                (solo simbolo)
 *   /public/images/logo/lockup-horizontal-white.png    (logo orizzontale)
 *   /public/images/logo/lockup-vertical-white.png      (logo verticale, con claim)
 *   /public/images/logo/favicon.ico
 *   /public/images/logo/apple-touch-icon.png           (180x180)
 *   /public/images/og/underground-events-og.jpg        (1200x630 — ancora da fornire)
 */

type LogoProps = {
  variant?: "icon" | "horizontal" | "vertical";
  className?: string;
  priority?: boolean;
};

const SRC_MAP: Record<string, { src: string; width: number; height: number }> = {
  icon: { src: "/images/logo/icon-white.png", width: 170, height: 110 },
  horizontal: { src: "/images/logo/lockup-horizontal-white.png", width: 265, height: 103 },
  vertical: { src: "/images/logo/lockup-vertical-white.png", width: 368, height: 381 },
};

export default function Logo({ variant = "icon", className = "", priority = false }: LogoProps) {
  const asset = SRC_MAP[variant];

  return (
    <Image
      src={asset.src}
      alt="UNDERGROUND EVENTS"
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={`w-auto object-contain ${className}`}
    />
  );
}
