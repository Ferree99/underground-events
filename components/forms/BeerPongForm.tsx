"use client";

import { FormEvent, useState } from "react";
import { TextField, CheckboxField } from "./FormField";
import { FormSuccess, FormError } from "./FormStatus";
import { beerPongTournament } from "@/content/bookingSettings";

const WAITLIST_MESSAGE =
  "Le squadre disponibili per il Beer Pong sono al momento esaurite: la tua iscrizione è stata registrata in lista d'attesa.";

export default function BeerPongForm() {
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
      telefono: form.get("telefono"),
      email: form.get("email"),
      privacy: form.get("privacy") === "on",
    };

    try {
      const res = await fetch("/api/iscrizione-beerpong", {
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
    const message = resultStatus === "lista-attesa" ? WAITLIST_MESSAGE : beerPongTournament.afterSubmitMessage;
    return <FormSuccess message={message} code={code} />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-busy={status === "loading"}>
      {status === "error" && (
        <FormError message="Non siamo riusciti a registrare l'iscrizione. Controlla la connessione e riprova." />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome" name="nome" required autoComplete="given-name" />
        <TextField label="Cognome" name="cognome" required autoComplete="family-name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Numero di telefono" name="telefono" type="tel" required autoComplete="tel" />
        <TextField label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      <CheckboxField name="privacy" required label="Ho letto e accetto l'informativa privacy." />

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
        {status === "loading" ? "Invio in corso…" : "Iscrivi la squadra"}
      </button>
    </form>
  );
}
