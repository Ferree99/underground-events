export default function PromoDrinkCard({ timeRange, items }: { timeRange: string; items: { name: string; price: string }[] }) {
  return (
    <div className="border border-ue-line bg-ue-ink p-6">
      <p className="eyebrow">{timeRange}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-baseline justify-between">
            <span className="font-display uppercase">{item.name}</span>
            <span className="font-display text-ue-red text-xl font-bold">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
