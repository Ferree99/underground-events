"use client";

import { useEffect, useState } from "react";

type GuestRow = {
  code: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  pr: string | null;
  data_nascita: string | null;
  status: string;
  created_at: string;
};

type BeerPongRow = {
  code: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  status: string;
  created_at: string;
};

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  }
  return lines.join("\n");
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  const csv = toCsv(rows);
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guestList, setGuestList] = useState<GuestRow[]>([]);
  const [beerPong, setBeerPong] = useState<BeerPongRow[]>([]);

  async function loadData(pwd: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/liste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Errore sconosciuto");

      setGuestList(data.guestList);
      setBeerPong(data.beerPong);
      setAuthed(true);
      sessionStorage.setItem("ue-admin-password", pwd);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }

  // Se la password è già in sessionStorage (stessa scheda del browser), evita
  // di richiederla di nuovo ad ogni refresh.
  useEffect(() => {
    const saved = sessionStorage.getItem("ue-admin-password");
    if (saved) loadData(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authed) {
    return (
      <div className="container-ue pt-40 pb-24 max-w-sm">
        <h1 className="font-display font-bold uppercase text-2xl mb-6">Area riservata</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadData(password);
          }}
          className="grid gap-4"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-ue-ink border border-ue-line px-4 py-3 text-sm text-ue-white focus:border-ue-red outline-none"
            autoFocus
          />
          {error && <p className="text-ue-red text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Verifica…" : "Entra"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-ue pt-32 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="font-display font-bold uppercase text-2xl">Lista evento</h1>
        <div className="flex items-center gap-4">
          <span className="text-ue-smoke text-sm">{guestList.length} iscritti</span>
          <button onClick={() => downloadCsv("lista-evento.csv", guestList)} className="btn-secondary !py-2 !px-4 !text-xs">
            Scarica CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border border-ue-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ue-line text-left text-ue-smoke uppercase text-xs tracking-wide">
              <th className="p-3">Codice</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Cognome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefono</th>
              <th className="p-3">PR</th>
              <th className="p-3">Stato</th>
              <th className="p-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {guestList.map((row) => (
              <tr key={row.code} className="border-b border-ue-line/50">
                <td className="p-3 whitespace-nowrap">{row.code}</td>
                <td className="p-3">{row.nome}</td>
                <td className="p-3">{row.cognome}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3 whitespace-nowrap">{row.telefono}</td>
                <td className="p-3">{row.pr || "—"}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3 whitespace-nowrap">{new Date(row.created_at).toLocaleString("it-IT")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-16 mb-4">
        <h2 className="font-display font-bold uppercase text-2xl">Beer Pong</h2>
        <div className="flex items-center gap-4">
          <span className="text-ue-smoke text-sm">{beerPong.length} squadre</span>
          <button onClick={() => downloadCsv("beer-pong.csv", beerPong)} className="btn-secondary !py-2 !px-4 !text-xs">
            Scarica CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border border-ue-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ue-line text-left text-ue-smoke uppercase text-xs tracking-wide">
              <th className="p-3">Codice</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Cognome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefono</th>
              <th className="p-3">Stato</th>
              <th className="p-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {beerPong.map((row) => (
              <tr key={row.code} className="border-b border-ue-line/50">
                <td className="p-3 whitespace-nowrap">{row.code}</td>
                <td className="p-3">{row.nome}</td>
                <td className="p-3">{row.cognome}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3 whitespace-nowrap">{row.telefono}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3 whitespace-nowrap">{new Date(row.created_at).toLocaleString("it-IT")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
