"use client";

import { FormEvent, useState } from "react";
import { TextField, TextAreaField, CheckboxField } from "./FormField";
import { FormSuccess, FormError } from "./FormStatus";

const WAITLIST_MESSAGE =
  "La capienza dell'area automotive è al momento esaurita: la tua candidatura è stata registrata in lista d'attesa.";

export default function VehicleApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [code, setCode] = useState("");
  const [resultStatus, setResultStatus] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      nome: form.get("nome"),
      email: form.get("email"),
      telefono: form.get("telefono"),
      marca: form.get("marca"),
      modello: form.get("modello"),
      anno: form.get("anno"),
      targa: form.get("targa"),
      modifiche: form.get("modifiche"),
      foto: form.get("foto"),
      social: form.get("social"),
      privacy: form.get("privacy") === "on",
      regolamento: form.get("regolamento") === "on",
    };

    try {
      const res = await fetch("/api/candidatura-auto", {
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
    const message =
      resultStatus === "lista-attesa"
        ? WAITLIST_MESSAGE
        : "Candidatura ricevuta. Le modalità definitive di partecipazione saranno confermate dall'organizzazione.";
    return <FormSuccess message={message} code={code} />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-busy={status === "loading"}>
      {status === "error" && (
        <FormError message="Non siamo riusciti a registrare la candidatura. Controlla la connessione e riprova." />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome e cognome" name="nome" required />
        <TextField label="Email" name="email" type="email" required />
      </div>
      <TextField label="Telefono" name="telefono" type="tel" required />
      <div className="grid gap-5 sm:grid-cols-3">
        <TextField label="Marca" name="marca" required />
        <TextField label="Modello" name="modello" required />
        <TextField label="Anno" name="anno" type="number" />
      </div>
      <TextField label="Targa (facoltativa — verrà protetta)" name="targa" />
      <TextAreaField label="Modifiche principali" name="modifiche" />
      <TextField label="Fotografie del veicolo (link)" name="foto" />
      <TextField label="Profilo social (facoltativo)" name="social" />

      <div className="grid gap-3 pt-2">
        <CheckboxField name="privacy" required label="Ho letto e accetto l'informativa privacy." />
        <CheckboxField name="regolamento" required label="Accetto il regolamento dell'area automotive." />
      </div>

      <p className="text-xs text-ue-smoke">
        Le modalità definitive di partecipazione devono ancora essere approvate dagli organizzatori.
      </p>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
        {status === "loading" ? "Invio in corso…" : "Candida la tua auto"}
      </button>
    </form>
  );
}
