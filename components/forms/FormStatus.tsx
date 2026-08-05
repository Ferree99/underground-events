export function FormSuccess({ message, code }: { message: string; code?: string }) {
  return (
    <div role="status" className="border border-ue-red/50 bg-ue-ink p-6">
      <p className="eyebrow mb-2">Richiesta inviata</p>
      <p className="text-ue-white">{message}</p>
      {code && <p className="mt-3 text-xs text-ue-smoke">Codice identificativo: {code}</p>}
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="border border-ue-red bg-ue-red/10 p-6">
      <p className="eyebrow mb-2">Si è verificato un errore</p>
      <p className="text-ue-white">{message}</p>
    </div>
  );
}

export function DemoNotice({ text }: { text: string }) {
  return <p className="text-xs text-ue-smoke italic mt-4">{text}</p>;
}
