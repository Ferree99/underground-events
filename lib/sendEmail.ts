/**
 * Invio email transazionali tramite Brevo (ex Sendinblue) — piano gratuito
 * per sempre, 300 email al giorno, nessun limite di contatti: adatto a un
 * evento con centinaia o migliaia di iscritti, senza costi.
 *
 * Chiamata diretta alla loro API REST (nessuna libreria da installare).
 *
 * Se le variabili d'ambiente non sono configurate, la funzione non fa
 * nulla e non genera errori: l'iscrizione va comunque a buon fine anche
 * senza email configurata (vedi README, sezione email di conferma).
 *
 * In caso di errore nell'invio (es. giornata con più di 300 email già
 * inviate), l'errore viene solo registrato nei log: NON deve mai far
 * fallire un'iscrizione già andata a buon fine sul database.
 */
export async function sendConfirmationEmail({
  to,
  toName,
  subject,
  html,
}: {
  to: string;
  toName: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Underground Events";

  if (!apiKey || !senderEmail) {
    return; // email non configurata: nessun errore, si prosegue senza inviarla
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to, name: toName }],
        subject,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Brevo: invio email fallito", res.status, body);
    }
  } catch (err) {
    console.error("Brevo: errore di rete durante l'invio email", err);
  }
}
