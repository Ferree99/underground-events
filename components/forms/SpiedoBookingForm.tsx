"use client";

import { FormEvent, useState } from "react";
import { TextField, TextAreaField, CheckboxField } from "./FormField";
import { FormSuccess, FormError } from "./FormStatus";
import { spiedoBooking } from "@/content/bookingSettings";

const WAITLIST_MESSAGE =
  "I posti per lo spiedo risultano al momento al completo: la tua richiesta è stata registrata in lista d'attesa. Ti avviseremo in caso di disponibilità.";

export default function SpiedoBookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [code, setCode] = useState("");
  const [resultStatus, setResultStatus] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      nome: form.get("nome"),
      cognome: form.get("cognome"),
      email: form.get("email"),
      telefono: form.get("telefono"),
      persone: form.get("persone"),
      allergie: form.get("allergie"),
      note: form.get("note"),
      privacy: form.get("privacy") === "on",
      operative: form.get("operative") === "on",
    };

    try {
      const res = await fetch("/api/prenotazione-spiedo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Errore sconosciuto");

      setCode(data.code);
      setResultStatus(data.status);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    const message = resultStatus === "lista-attesa" ? WAITLIST_MESSAGE : spiedoBooking.afterSubmitMessage;
    return <FormSuccess message={message} code={code} />;
  }

  return (
    <div>
      <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Prezzo</dt>
          <dd className="text-ue-white">{spiedoBooking.price}</dd>
        </div>
        <div>
          <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Menu</dt>
          <dd className="text-ue-white">{spiedoBooking.menu}</dd>
        </div>
        <div>
          <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Termine prenotazioni</dt>
          <dd className="text-ue-white">{spiedoBooking.bookingDeadline}</dd>
        </div>
        <div>
          <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Posti disponibili</dt>
          <dd className="text-ue-white">{spiedoBooking.availableSeats}</dd>
        </div>
        <div>
          <dt className="text-ue-smoke uppercase text-xs tracking-widest2">Pagamento</dt>
          <dd className="text-ue-white">{spiedoBooking.paymentMethod}</dd>
        </div>
      </dl>

      <form onSubmit={handleSubmit} className="grid gap-5" aria-busy={status === "loading"}>
        {status === "error" && (
          <FormError message="Non siamo riusciti a registrare la prenotazione. Controlla la connessione e riprova." />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Nome" name="nome" required autoComplete="given-name" />
          <TextField label="Cognome" name="cognome" required autoComplete="family-name" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Email" name="email" type="email" required autoComplete="email" />
          <TextField label="Telefono" name="telefono" type="tel" required autoComplete="tel" />
        </div>
        <TextField label="Numero di persone" name="persone" type="number" min={1} required />
        <TextField label="Allergie o intolleranze" name="allergie" />
        <TextAreaField label="Note" name="note" />

        <div className="grid gap-3 pt-2">
          <CheckboxField name="privacy" required label="Ho letto e accetto l'informativa privacy." />
          <CheckboxField
            name="operative"
            required
            label="Acconsento a ricevere le comunicazioni operative relative alla prenotazione."
          />
        </div>

        <p className="text-xs text-ue-smoke">
          La prenotazione non è definitiva fino alla conferma dell&apos;organizzazione.
        </p>

        <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
          {status === "loading" ? "Invio in corso…" : "Invia prenotazione"}
        </button>
      </form>
    </div>
  );
}
