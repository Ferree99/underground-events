import { NextResponse } from "next/server";
import getSupabaseServerClient from "@/lib/supabaseServer";
import { generateBookingCode, checkCapacity } from "@/lib/bookingHelpers";
import { sendConfirmationEmail } from "@/lib/sendEmail";
import { buildEmailHtml } from "@/lib/emailTemplate";
import { lastCall2026 } from "@/content/lastCall2026";
import { beerPongTournament } from "@/content/bookingSettings";

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

    const waitlisted = status === "lista-attesa";
    await sendConfirmationEmail({
      to: email,
      toName: `${nome} ${cognome}`,
      subject: waitlisted
        ? `Beer Pong ${lastCall2026.name} — sei in lista d'attesa`
        : `Beer Pong ${lastCall2026.name} — squadra iscritta!`,
      html: buildEmailHtml({
        preheader: waitlisted
          ? "Sei in lista d'attesa per il Beer Pong"
          : "La tua squadra Beer Pong è iscritta",
        heading: waitlisted ? "Sei in lista d'attesa" : "Squadra iscritta!",
        code,
        bodyHtml: `
          <p style="margin:0 0 16px;">Ciao ${nome},</p>
          <p style="margin:0 0 16px;">
            ${
              waitlisted
                ? `Le squadre disponibili per il Beer Pong sono al momento esaurite: la tua iscrizione è stata registrata in lista d'attesa.`
                : `La tua squadra per il torneo Beer Pong di <strong>${lastCall2026.name}</strong> è stata iscritta con successo.`
            }
          </p>
          <p style="margin:0 0 16px;">
            <strong>${lastCall2026.dateLabel}</strong><br/>
            ${lastCall2026.location.name} — ore ${beerPongTournament.time}
          </p>
          <p style="margin:0;">
            Quota: <strong>${beerPongTournament.fee}</strong> — ${beerPongTournament.feeIncludes}.
          </p>
        `,
      }),
    });

    return NextResponse.json({ code, status });
  } catch (err) {
    console.error("iscrizione-beerpong API error:", err);
    return NextResponse.json({ error: "Errore durante l'invio. Riprova tra poco." }, { status: 500 });
  }
}
