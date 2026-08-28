import { siteSettings } from "@/content/siteSettings";

/**
 * Modello grafico condiviso per tutte le email di conferma. Le email
 * seguono regole diverse dal resto del sito: niente CSS esterno, niente
 * classi Tailwind — solo tabelle e stili inline, il minimo comune
 * denominatore che tutti i client di posta sanno leggere.
 *
 * Il logo viene caricato da un URL pubblico assoluto (i client di posta non
 * possono leggere file locali del progetto).
 */
export function buildEmailHtml({
  preheader,
  heading,
  bodyHtml,
  code,
}: {
  preheader: string;
  heading: string;
  bodyHtml: string;
  code: string;
}) {
  const logoUrl = `${siteSettings.siteUrl}/images/logo/underground-events-lockup.png`;

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${heading}</title>
</head>
<body style="margin:0; padding:0; background-color:#0A0A0A; font-family:Helvetica, Arial, sans-serif;">
  <span style="display:none; max-height:0; overflow:hidden;">${preheader}</span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background-color:#0A0A0A;">

          <tr>
            <td align="center" style="padding:8px 0 32px;">
              <img src="${logoUrl}" alt="Underground Events" width="140" style="display:block; width:140px; height:auto;" />
            </td>
          </tr>

          <tr>
            <td style="background-color:#F5F5F3; border-radius:2px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:40px 32px 24px;">
                    <p style="margin:0 0 8px; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#E31E24; font-weight:bold;">
                      Underground Events
                    </p>
                    <h1 style="margin:0 0 20px; font-size:24px; line-height:1.25; color:#0A0A0A; font-weight:bold; text-transform:uppercase;">
                      ${heading}
                    </h1>
                    <div style="font-size:15px; line-height:1.6; color:#2A2A2A;">
                      ${bodyHtml}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border:1px solid #2A2A2A;">
                      <tr>
                        <td style="padding:16px 20px;">
                          <p style="margin:0 0 4px; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#9A9A9A;">
                            Codice della richiesta
                          </p>
                          <p style="margin:0; font-size:20px; font-weight:bold; color:#0A0A0A; letter-spacing:1px;">
                            ${code}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 16px 8px;">
              <p style="margin:0 0 8px; font-size:12px; color:#9A9A9A;">
                <a href="${siteSettings.contact.instagramUrl}" style="color:#E31E24; text-decoration:none;">Instagram</a>
                &nbsp;·&nbsp;
                <a href="${siteSettings.siteUrl}" style="color:#9A9A9A; text-decoration:none;">${siteSettings.siteUrl.replace("https://", "")}</a>
              </p>
              <p style="margin:0; font-size:11px; color:#5A5A5A;">
                Underground Events — questa email è stata generata automaticamente in seguito a una tua richiesta sul sito.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
