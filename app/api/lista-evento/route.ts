import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cognome, email, telefono, partecipanti, data_nascita, privacy, operative, marketing } = body;

    if (!nome || !cognome || !email || !telefono || !partecipanti || !privacy || !operative) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const people = Number(partecipanti) || 1;

    const { status } = await checkCapacity(supabase, "lista-evento", "guest_list_entries", "partecipanti", people);
    const code = generateBookingCode("LISTA");

    const { error } = await supabase.from("guest_list_entries").insert({
      code,
      nome,
      cognome,
      email,
      telefono,
      partecipanti: people,
      data_nascita: data_nascita || null,
      consenso_marketing: !!marketing,
      status,
    });

    if (error) throw error;

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("lista-evento API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
