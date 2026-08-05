import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/forms/ContactForm";
import { siteSettings } from "@/content/siteSettings";

export const metadata: Metadata = { title: "Contatti" };

export default function ContattiPage() {
  return (
    <section className="container-ue pt-40 pb-24">
      <SectionTitle eyebrow="Parliamone" title="Contatti" description="Scrivici per informazioni, collaborazioni o richieste generiche." />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6 text-sm">
          <div>
            <p className="eyebrow mb-1">Email</p>
            <p>{siteSettings.contact.email}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Telefono</p>
            <p>{siteSettings.contact.phone}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Instagram</p>
            <p>{siteSettings.contact.instagram}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">TikTok</p>
            <p>{siteSettings.contact.tiktok}</p>
          </div>
          <p className="text-ue-smoke pt-4">
            Per una richiesta di preventivo strutturata, usa la{" "}
            <Link href="/preventivo" className="text-ue-red hover:underline">
              pagina preventivo
            </Link>
            .
          </p>
        </div>

        <div className="max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
