import nodemailer from "nodemailer";

/**
 * Invio email transazionali tramite SMTP autenticato di register.it (la
 * casella email del dominio, con il suo limite di invii giornalieri già
 * incluso — nessun servizio esterno aggiuntivo).
 *
 * Se le variabili d'ambiente non sono configurate, la funzione non fa
 * nulla e non genera errori: l'iscrizione va comunque a buon fine anche
 * senza email configurata (vedi README, sezione email di conferma).
 *
 * In caso di errore nell'invio (es. giornata con invii esauriti), l'errore
 * viene solo registrato nei log: NON deve mai far fallire un'iscrizione
 * già andata a buon fine sul database.
 */
let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !password) return null;

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465, // SSL sulla 465, STARTTLS sulle altre (es. 587)
      auth: { user, pass: password },
    });
  }
  return cachedTransporter;
}

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
  const transporter = getTransporter();
  const senderEmail = process.env.SMTP_USER;
  const senderName = process.env.SMTP_SENDER_NAME || "Underground Events";

  if (!transporter || !senderEmail) {
    return; // email non configurata: nessun errore, si prosegue senza inviarla
  }

  try {
    await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: `"${toName}" <${to}>`,
      subject,
      html,
    });
  } catch (err) {
    console.error("Invio email fallito:", err);
  }
}
