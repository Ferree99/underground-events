import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      squadra,
      referente,
      email,
      telefono,
      numero_partecipanti,
      componenti,
      riserve,
      note,
      maggiorenne,
      regolamento,
      regole_lette,
      privacy,
      operative,
    } = body;

    if (
      !squadra ||
      !referente ||
      !email ||
      !telefono ||
      !numero_partecipanti ||
      !componenti ||
      !maggiorenne ||
      !regolamento ||
      !regole_lette ||
      !privacy ||
      !operative
    ) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // Ogni richiesta occupa 1 "squadra" (le squadre disponibili si
    // configurano in capacity_settings, chiave torneo-squadre).
    const { status } = await checkCapacity(supabase, "torneo-squadre", "tournament_teams", null, 1);
    const code = generateBookingCode("SQUADRA");

    const { error } = await supabase.from("tournament_teams").insert({
      code,
      nome_squadra: squadra,
      referente_nome: referente,
      referente_email: email,
      referente_telefono: telefono,
      numero_partecipanti: Number(numero_partecipanti) || 1,
      componenti,
      riserve: riserve || null,
      note: note || null,
      status,
    });

    if (error) throw error;

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("iscrizione-torneo API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
