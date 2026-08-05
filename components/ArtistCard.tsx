export default function ArtistCard({
  name,
  photo,
  social,
  bio,
  setTime,
}: {
  name: string;
  photo: string;
  social: string;
  bio: string;
  setTime: string;
}) {
  return (
    <div className="border border-ue-line bg-ue-ink">
      <div className="aspect-square flex items-center justify-center border-b border-ue-line text-ue-smoke text-xs uppercase tracking-widest2 text-center px-4">
        {photo}
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold uppercase text-xl">{name}</h3>
        <p className="mt-2 text-sm text-ue-smoke">Orario set: {setTime}</p>
        <p className="mt-1 text-sm text-ue-smoke">Social: {social}</p>
        <p className="mt-3 text-sm text-ue-white/80">{bio}</p>
      </div>
    </div>
  );
}
