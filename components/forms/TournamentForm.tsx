"use client";

import { FormEvent, useState } from "react";
import { TextField, TextAreaField, CheckboxField } from "./FormField";
import { FormSuccess, FormError } from "./FormStatus";
import { tournamentBooking } from "@/content/bookingSettings";

const WAITLIST_MESSAGE =
  "Le squadre disponibili per il torneo sono al momento esaurite: la tua iscrizione è stata registrata in lista d'attesa. Ti avviseremo in caso di disponibilità.";

export default function TournamentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [code, setCode] = useState("");
  const [resultStatus, setResultStatus] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      squadra: form.get("squadra"),
      referente: form.get("referente"),
      email: form.get("email"),
      telefono: form.get("telefono"),
      numero_partecipanti: form.get("numero_partecipanti"),
      componenti: form.get("componenti"),
      riserve: form.get("riserve"),
      note: form.get("note"),
      maggiorenne: form.get("maggiorenne") === "on",
      regolamento: form.get("regolamento") === "on",
      regole_lette: form.get("regole_lette") === "on",
      privacy: form.get("privacy") === "on",
      operative: form.get("operative") === "on",
    };

    try {
      const res = await fetch("/api/iscrizione-torneo", {
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
    const message = resultStatus === "lista-attesa" ? WAITLIST_MESSAGE : tournamentBooking.afterSubmitMessage;
    return <FormSuccess message={message} code={code} />;
  }

  const details: [string, string][] = [
    ["Giocatori per squadra", tournamentBooking.playersPerTeam],
    ["Squadre disponibili", tournamentBooking.teamsAvailable],
    ["Quota", tournamentBooking.fee],
    ["La quota comprende", tournamentBooking.feeIncludes],
    ["Ritrovo", tournamentBooking.meetingPoint],
    ["Premi", tournamentBooking.prizes],
    ["Chiusura iscrizioni", tournamentBooking.registrationDeadline],
    ["Pagamento", tournamentBooking.paymentMethod],
    ["Formula del torneo", tournamentBooking.tournamentFormat],
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-sm">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="text-ue-smoke uppercase text-xs tracking-widest2">{label}</dt>
            <dd className="text-ue-white">{value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mb-8 space-y-1 text-xs text-ue-smoke">
        {tournamentBooking.safetyNotice.map((line) => (
          <li key={line}>— {line}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="grid gap-5" aria-busy={status === "loading"}>
        {status === "error" && (
          <FormError message="Non siamo riusciti a registrare l'iscrizione. Controlla la connessione e riprova." />
        )}

        <TextField label="Nome della squadra" name="squadra" required />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Nome e cognome del referente" name="referente" required />
          <TextField label="Email del referente" name="email" type="email" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Telefono" name="telefono" type="tel" required />
          <TextField label="Numero dei partecipanti" name="numero_partecipanti" type="number" min={1} required />
        </div>
        <TextAreaField label="Nomi dei componenti" name="componenti" required />
        <TextField label="Eventuali riserve" name="riserve" />
        <TextAreaField label="Note" name="note" />

        <div className="grid gap-3 pt-2">
          <CheckboxField name="maggiorenne" required label="Confermo che tutti i componenti sono maggiorenni." />
          <CheckboxField name="regolamento" required label="La squadra accetta il regolamento del torneo." />
          <CheckboxField
            name="regole_lette"
            required
            label="Confermo che tutti i componenti hanno letto le regole."
          />
          <CheckboxField name="privacy" required label="Ho letto e accetto l'informativa privacy." />
          <CheckboxField
            name="operative"
            required
            label="Acconsento a ricevere le comunicazioni operative relative al torneo."
          />
        </div>

        <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
          {status === "loading" ? "Invio in corso…" : "Iscrivi la squadra"}
        </button>
      </form>
    </div>
  );
}
