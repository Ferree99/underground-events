import Link from "next/link";

export default function CallToAction({
  title,
  text,
  buttonLabel,
  buttonHref,
}: {
  title: string;
  text?: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <section className="border-y border-ue-line bg-ue-ink">
      <div className="container-ue py-24 flex flex-col items-center text-center gap-6">
        <h2 className="font-display font-bold uppercase text-3xl md:text-5xl max-w-2xl leading-tight">{title}</h2>
        {text && <p className="max-w-xl text-ue-smoke">{text}</p>}
        <Link href={buttonHref} className="btn-primary mt-2">
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
