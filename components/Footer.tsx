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
            {siteSettings.contact.instagramUrl ? (
              <a
                href={siteSettings.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ue-red transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.6.07 4.81 0 3.22-.01 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.6.07-4.85.07-3.2 0-3.6-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.59-.07-4.81 0-3.21.02-3.56.07-4.81.15-3.23 1.66-4.77 4.92-4.92C8.4 2.2 8.8 2.2 12 2.2Zm0 1.98c-3.15 0-3.52.01-4.76.07-2.14.1-3.12 1.1-3.22 3.22-.06 1.24-.07 1.6-.07 4.75s.01 3.51.07 4.75c.1 2.12 1.08 3.12 3.22 3.22 1.24.06 1.6.07 4.76.07 3.15 0 3.52-.01 4.76-.07 2.14-.1 3.12-1.1 3.22-3.22.06-1.24.07-1.6.07-4.75s-.01-3.51-.07-4.75c-.1-2.12-1.08-3.12-3.22-3.22-1.24-.06-1.6-.07-4.76-.07Zm0 3.37a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.98a3.67 3.67 0 1 0 0 7.34 3.67 3.67 0 0 0 0-7.34Zm5.88-2.2a1.32 1.32 0 1 1-2.65 0 1.32 1.32 0 0 1 2.65 0Z" />
                </svg>
                {siteSettings.contact.instagram}
              </a>
            ) : (
              <span>Instagram: {siteSettings.contact.instagram}</span>
            )}
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
