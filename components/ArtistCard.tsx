import Image from "next/image";

export default function ArtistCard({
  name,
  photo,
  social,
}: {
  name: string;
  photo: string;
  social: string;
}) {
  const hasRealPhoto = photo.startsWith("/");
  const hasRealSocial = social.startsWith("http");

  return (
    <div className="border border-ue-line bg-ue-ink overflow-hidden">
      <div className="relative aspect-square border-b border-ue-line">
        {hasRealPhoto ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ue-smoke text-xs uppercase tracking-widest2 text-center px-4">
            {photo}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold uppercase text-xl">{name}</h3>
        {hasRealSocial ? (
          
            href={social}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-ue-red hover:underline"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.6.07 4.81 0 3.22-.01 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.6.07-4.85.07-3.2 0-3.6-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.59-.07-4.81 0-3.21.02-3.56.07-4.81.15-3.23 1.66-4.77 4.92-4.92C8.4 2.2 8.8 2.2 12 2.2Zm0 1.98c-3.15 0-3.52.01-4.76.07-2.14.1-3.12 1.1-3.22 3.22-.06 1.24-.07 1.6-.07 4.75s.01 3.51.07 4.75c.1 2.12 1.08 3.12 3.22 3.22 1.24.06 1.6.07 4.76.07 3.15 0 3.52-.01 4.76-.07 2.14-.1 3.12-1.1 3.22-3.22.06-1.24.07-1.6.07-4.75s-.01-3.51-.07-4.75c-.1-2.12-1.08-3.12-3.22-3.22-1.24-.06-1.6-.07-4.76-.07Zm0 3.37a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.98a3.67 3.67 0 1 0 0 7.34 3.67 3.67 0 0 0 0-7.34Zm5.88-2.2a1.32 1.32 0 1 1-2.65 0 1.32 1.32 0 0 1 2.65 0Z" />
            </svg>
            Instagram
          </a>
        ) : (
          <p className="mt-1 text-sm text-ue-smoke">Social: {social}</p>
        )}
      </div>
    </div>
  );
}
