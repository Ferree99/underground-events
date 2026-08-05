import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefono, marca, modello, anno, targa, modifiche, foto, social, privacy, regolamento } =
      body;

    if (!nome || !email || !telefono || !marca || !modello || !privacy || !regolamento) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { status } = await checkCapacity(supabase, "auto-candidature", "vehicle_applications", null, 1);
    const code = generateBookingCode("AUTO");

    const { error } = await supabase.from("vehicle_applications").insert({
      code,
      nome,
      email,
      telefono,
      marca,
      modello,
      anno: anno ? Number(anno) : null,
      targa: targa || null,
      modifiche: modifiche || null,
      foto_url: foto || null,
      social: social || null,
      status,
    });

    if (error) throw error;

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("candidatura-auto API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
