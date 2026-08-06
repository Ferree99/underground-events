import LogoIcon from "./LogoIcon";

/**
 * Logo ufficiale UNDERGROUND EVENTS, interamente vettoriale (nessun file
 * raster): il simbolo è lo stesso identico componente ovunque compaia,
 * eventualmente accostato al logotipo testuale per la versione "horizontal".
 *
 * Non modificare geometria, proporzioni o rapporto simbolo/logotipo.
 */

type LogoProps = {
  variant?: "icon" | "horizontal";
  className?: string;
  color?: string;
};

export default function Logo({ variant = "icon", className = "", color = "#F5F5F3" }: LogoProps) {
  if (variant === "horizontal") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <LogoIcon className="h-full w-auto shrink-0" color={color} />
        <span
          className="font-display font-semibold uppercase tracking-widest2 text-sm leading-none whitespace-nowrap"
          style={{ color }}
        >
          Underground Events
        </span>
      </span>
    );
  }

  return <LogoIcon className={className} color={color} />;
}
