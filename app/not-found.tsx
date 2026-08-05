import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-tunnel-glow">
      <p className="eyebrow">Errore 404</p>
      <h1 className="mt-4 font-display font-bold uppercase text-6xl md:text-8xl">Percorso non trovato</h1>
      <p className="mt-6 max-w-md text-ue-smoke">
        Questa pagina non esiste, o l&apos;ingresso al tunnel è altrove. Torna alla home o scopri i nostri
        eventi.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Torna alla home
        </Link>
        <Link href="/eventi" className="btn-secondary">
          Scopri gli eventi
        </Link>
      </div>
    </section>
  );
}
