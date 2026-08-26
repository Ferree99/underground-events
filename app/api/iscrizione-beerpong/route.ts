import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cognome, telefono, email, privacy } = body;

    if (!nome || !cognome || !telefono || !email || !privacy) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // Una richiesta = una squadra (la squadra è composta da 2 persone, ma si
    // iscrive solo chi compila il modulo).
    const { status } = await checkCapacity(supabase, "beerpong-squadre", "beerpong_teams", null, 1);
    const code = generateBookingCode("BEERPONG");

    const { error } = await supabase.from("beerpong_teams").insert({
      code,
      nome,
      cognome,
      telefono,
      email,
      status,
    });

    if (error) throw error;

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("iscrizione-beerpong API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
