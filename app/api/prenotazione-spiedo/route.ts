import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cognome, email, telefono, persone, allergie, note, privacy, operative } = body;

    if (!nome || !cognome || !email || !telefono || !persone || !privacy || !operative) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const people = Number(persone) || 1;

    const { status } = await checkCapacity(supabase, "spiedo", "spiedo_bookings", "persone", people);
    const code = generateBookingCode("SPIEDO");

    const { error } = await supabase.from("spiedo_bookings").insert({
      code,
      nome,
      cognome,
      email,
      telefono,
      persone: people,
      allergie: allergie || null,
      note: note || null,
      status,
    });

    if (error) throw error;

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("prenotazione-spiedo API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
