"use client";

import { FormEvent, useState } from "react";
import { TextField, SelectField, CheckboxField } from "./FormField";
import { FormSuccess, FormError } from "./FormStatus";
import { drinkPromotions } from "@/content/drinkPromotions";
import { guestListPrOptions, guestListNoPrOption } from "@/content/bookingSettings";

const WAITLIST_MESSAGE =
  "I posti in lista sono attualmente esauriti: la tua richiesta è stata registrata in lista d'attesa. Ti avviseremo se si libera posto.";

export default function GuestListForm() {
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
      pr: form.get("pr") === guestListNoPrOption ? null : form.get("pr"),
      data_nascita: form.get("data_nascita"),
      privacy: form.get("privacy") === "on",
      operative: form.get("operative") === "on",
      marketing: form.get("marketing") === "on",
    };

    try {
      const res = await fetch("/api/lista-evento", {
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
    const message = resultStatus === "lista-attesa" ? WAITLIST_MESSAGE : drinkPromotions.afterSubmitMessage;
    return <FormSuccess message={message} code={code} />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-busy={status === "loading"}>
      {status === "error" && (
        <FormError message="Non siamo riusciti a registrare la richiesta. Controlla la connessione e riprova." />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome" name="nome" required autoComplete="given-name" />
        <TextField label="Cognome" name="cognome" required autoComplete="family-name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" required autoComplete="email" />
        <TextField label="Telefono" name="telefono" type="tel" required autoComplete="tel" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Lista / PR"
          name="pr"
          required
          options={[guestListNoPrOption, ...guestListPrOptions]}
          placeholder="Seleziona il PR"
        />
        <TextField label="Data di nascita" name="data_nascita" type="date" required />
      </div>

      <div className="grid gap-3 pt-2">
        <CheckboxField name="privacy" required label="Ho letto e accetto l'informativa privacy." />
        <CheckboxField
          name="operative"
          required
          label="Acconsento a ricevere le comunicazioni operative relative all'evento."
        />
        <CheckboxField name="marketing" label="Acconsento (facoltativo) a ricevere comunicazioni promozionali." />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
        {status === "loading" ? "Invio in corso…" : "Mettiti in lista"}
      </button>
    </form>
  );
}
