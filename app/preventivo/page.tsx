import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import QuoteForm from "@/components/forms/QuoteForm";

export const metadata: Metadata = { title: "Richiedi un preventivo" };

export default function PreventivoPage() {
  return (
    <section className="container-ue pt-40 pb-24">
      <SectionTitle
        eyebrow="Organizza il tuo evento"
        title="Richiedi un preventivo"
        description="Raccontaci il tuo progetto: concept, produzione, intrattenimento e community. Ti risponderemo per definire insieme i prossimi passi."
      />
      <div className="mt-12 max-w-2xl">
        <QuoteForm />
      </div>
    </section>
  );
}
