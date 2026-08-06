import type { SupabaseClient } from "@supabase/supabase-js";

/** Genera un codice identificativo leggibile, es. UE-LISTA-482913 */
export function generateBookingCode(prefix: string) {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `UE-${prefix}-${n}`;
}

/**
 * Confronta il numero di richieste già registrate con la capacità
 * configurata in `capacity_settings` (modificabile da Supabase senza
 * toccare codice). Se capacity è null, i posti sono illimitati.
 *
 * `countUnits` = quante "unità" occupa la richiesta corrente (es. il numero
 * di persone per la lista evento, sempre 1 per una candidatura auto).
 */
export async function checkCapacity(
  supabase: SupabaseClient,
  capacityKey: string,
  table: string,
  unitsColumn: string | null, // colonna da sommare (es. "persone"), null = conta righe
  countUnits: number
): Promise<{ status: "confermata" | "in-attesa" | "lista-attesa"; remaining: number | null }> {
  const { data: capacityRow } = await supabase
    .from("capacity_settings")
    .select("capacity")
    .eq("key", capacityKey)
    .maybeSingle();

  const rawCapacity = (capacityRow as unknown as Record<string, unknown> | null)?.capacity;
  const capacity: number | null = rawCapacity === null || rawCapacity === undefined ? null : Number(rawCapacity);

  // Nessun limite configurato: la richiesta è sempre accettata.
  if (capacity === null) {
    return { status: "in-attesa", remaining: null };
  }

  let occupied = 0;
  if (unitsColumn) {
    // Selezioniamo tutte le colonne con "*" (stringa letterale) invece del
    // solo nome dinamico: Supabase riesce a tipizzare correttamente solo
    // quando l'argomento di .select() è una stringa letterale, non una
    // variabile — così evitiamo il problema alla radice.
    const { data } = await supabase
      .from(table)
      .select("*")
      .in("status", ["ricevuta", "in-attesa", "confermata"]);
    const rows = (data ?? []) as Array<Record<string, unknown>>;
    occupied = rows.reduce((sum, row) => sum + (Number(row[unitsColumn]) || 0), 0);
  } else {
    const { count } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .in("status", ["ricevuta", "in-attesa", "confermata"]);
    occupied = count ?? 0;
  }

  const remaining = capacity - occupied;

  if (remaining >= countUnits) {
    return { status: "in-attesa", remaining: remaining - countUnits };
  }
  return { status: "lista-attesa", remaining: Math.max(remaining, 0) };
}
