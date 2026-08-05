"use client";

import { FormEvent, useState } from "react";
import { TextField, TextAreaField, CheckboxField } from "./FormField";
import { FormSuccess, FormError } from "./FormStatus";

function encodeFormData(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = { "form-name": "contatti" };
    form.forEach((value, key) => {
      data[key] = String(value);
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(data),
      });
      if (!res.ok) throw new Error("Invio fallito");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return <FormSuccess message="Richiesta ricevuta. Ti risponderemo il prima possibile all'indirizzo indicato." />;
  }

  return (
    <form
      name="contatti"
      onSubmit={handleSubmit}
      className="grid gap-5"
      aria-busy={status === "loading"}
      data-netlify="true"
    >
      {status === "error" && (
        <FormError message="Non siamo riusciti a inviare il messaggio. Controlla la connessione e riprova." />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome" name="nome" required autoComplete="given-name" />
        <TextField label="Cognome" name="cognome" required autoComplete="family-name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" required autoComplete="email" />
        <TextField label="Telefono" name="telefono" type="tel" />
      </div>
      <TextAreaField label="Messaggio" name="messaggio" required />

      <div className="grid gap-3 pt-2">
        <CheckboxField name="privacy" required label="Ho letto e accetto l'informativa privacy." />
        <CheckboxField name="marketing" label="Acconsento (facoltativo) a ricevere comunicazioni promozionali." />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
        {status === "loading" ? "Invio in corso…" : "Invia messaggio"}
      </button>
    </form>
  );
}
