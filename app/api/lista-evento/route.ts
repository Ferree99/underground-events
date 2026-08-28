import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";
import { sendConfirmationEmail } from "@/lib/sendEmail";
import { buildEmailHtml } from "@/lib/emailTemplate";
import { lastCall2026 } from "@/content/lastCall2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cognome, email, telefono, pr, data_nascita, privacy, operative, marketing } = body;

    if (!nome || !cognome || !email || !telefono || !privacy || !operative) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // Ogni richiesta è ora una singola persona (niente più "numero di
    // partecipanti": ognuno si registra singolarmente), quindi contiamo le
    // righe invece di sommare una colonna.
    const { status } = await checkCapacity(supabase, "lista-evento", "guest_list_entries", null, 1);
    const code = generateBookingCode("LISTA");

    const { error } = await supabase.from("guest_list_entries").insert({
      code,
      nome,
      cognome,
      email,
      telefono,
      pr: pr || null,
      partecipanti: 1,
      data_nascita: data_nascita || null,
      consenso_marketing: !!marketing,
      status,
    });

    if (error) throw error;

    const waitlisted = status === "lista-attesa";
    await sendConfirmationEmail({
      to: email,
      toName: `${nome} ${cognome}`,
      subject: waitlisted
        ? `${lastCall2026.name} — sei in lista d'attesa`
        : `${lastCall2026.name} — sei in lista!`,
      html: buildEmailHtml({
        preheader: waitlisted
          ? "Sei in lista d'attesa per LAST CALL 2026"
          : "La tua richiesta per LAST CALL 2026 è confermata",
        heading: waitlisted ? "Sei in lista d'attesa" : "Sei in lista!",
        code,
        bodyHtml: `
          <p style="margin:0 0 16px;">Ciao ${nome},</p>
          <p style="margin:0 0 16px;">
            ${
              waitlisted
                ? `I posti in lista per <strong>${lastCall2026.name}</strong> sono al momento esauriti: la tua richiesta è stata registrata in lista d'attesa. Ti avviseremo se si libera un posto.`
                : `La tua richiesta per <strong>${lastCall2026.name}</strong> è stata registrata con successo.`
            }
          </p>
          <p style="margin:0 0 16px;">
            <strong>${lastCall2026.dateLabel}</strong><br/>
            ${lastCall2026.location.name} — dalle ${lastCall2026.openingTime}
          </p>
          <p style="margin:0;">
            Ricordati di accreditarti all'info point il giorno dell'evento e ritirare il tuo bracciale.
          </p>
        `,
      }),
    });

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("lista-evento API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
