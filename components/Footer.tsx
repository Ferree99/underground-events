import Link from "next/link";
import { footerLegalNav, footerQuickNav } from "@/content/navigation";
import { siteSettings } from "@/content/siteSettings";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ue-line bg-ue-black">
      <div className="container-ue py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="horizontal" className="h-8 mb-4" />
          <p className="text-ue-smoke text-sm max-w-sm leading-relaxed">
            {siteSettings.tagline}
          </p>
          <div className="mt-6 flex gap-4 text-sm text-ue-smoke">
            <span>Instagram: {siteSettings.contact.instagram}</span>
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Naviga</h3>
          <ul className="space-y-2">
            {footerQuickNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ue-white/80 hover:text-ue-red transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Legale</h3>
          <ul className="space-y-2">
            {footerLegalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ue-white/80 hover:text-ue-red transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ue-line">
        <div className="container-ue py-6 flex flex-col md:flex-row gap-2 justify-between text-xs text-ue-smoke">
          <span>© {year} Underground Events. Tutti i diritti riservati.</span>
          <span>P.IVA: {siteSettings.contact.vatNumber}</span>
        </div>
      </div>
    </footer>
  );
}
