import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";

/**
 * Endpoint di sola lettura per la pagina /admin. Protetto da una password
 * condivisa (variabile d'ambiente ADMIN_PASSWORD, mai esposta al browser),
 * non da un vero sistema di account: adatto a un piccolo team che deve
 * consultare velocemente le liste, non un pannello multi-utente.
 */
export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD non configurata nelle variabili d'ambiente." },
        { status: 500 }
      );
    }
    if (password !== expected) {
      return NextResponse.json({ error: "Password errata." }, { status: 401 });
    }

    const supabase = getSupabaseServerClient();

    const [guestList, beerPong] = await Promise.all([
      supabase
        .from("guest_list_entries")
        .select("code, nome, cognome, email, telefono, pr, data_nascita, status, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("beerpong_teams")
        .select("code, nome, cognome, email, telefono, status, created_at")
        .order("created_at", { ascending: false }),
    ]);

    if (guestList.error) throw guestList.error;
    if (beerPong.error) throw beerPong.error;

    return NextResponse.json({
      guestList: guestList.data,
      beerPong: beerPong.data,
    });
  } catch (err) {
    console.error("admin/liste API error:", err);
    return NextResponse.json({ error: "Errore nel caricamento delle liste." }, { status: 500 });
  }
}
