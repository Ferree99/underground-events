# UNDERGROUND EVENTS — Sito ufficiale

Progetto Next.js 14 (App Router) + TypeScript + Tailwind CSS per il sito di **UNDERGROUND EVENTS**,
con pagina dedicata a **LAST CALL 2026**.

---

## 1. Avvio in locale

```bash
npm install
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`.

Per la build di produzione:

```bash
npm run build
npm run start
```

---

## 2. Struttura del progetto

```
app/                    → pagine (routing basato su file, App Router)
components/             → componenti riutilizzabili
components/forms/       → moduli (lista, beer pong, preventivo, contatti)
content/                → TUTTI i dati modificabili, separati dai componenti
public/images/          → asset statici (logo, favicon, immagini, OG)
public/__forms.html     → form "ombra" statico per il rilevamento di Netlify Forms
```

---

## 3. Come modificare testi e immagini

Non serve toccare i componenti: i testi si modificano nei file dentro `content/`.

| File | Cosa contiene |
|---|---|
| `content/siteSettings.ts` | Nome brand, tagline, meta di default, contatti generali |
| `content/navigation.ts` | Voci di menu, CTA navbar, link footer |
| `content/services.ts` | Servizi mostrati in home e nella pagina Servizi |
| `content/events.ts` | Archivio eventi (aggiungi qui i prossimi eventi) |
| `content/lastCall2026.ts` | Tutti i dati ufficiali di LAST CALL 2026 |
| `content/drinkPromotions.ts` | Promo drink (orari, prezzi) |
| `content/bookingSettings.ts` | Elenco PR per la lista, dati del torneo Beer Pong |
| `content/partners.ts` | Partner, sponsor, media partner, fornitori |
| `content/team.ts` | Team (vuoto: nessun nome era stato fornito) |
| `content/faq.ts` | FAQ (vuoto: nessuna FAQ era stata fornita) |

Le immagini vanno inserite in `public/images/...` e richiamate nei file di contenuto sopra
(attualmente sono segnaposto testuali tra parentesi quadre, es. `[FOTO DARSENA 3.0]`).

---

## 4. Logo — file da fornire

Il logo **non è stato ridisegnato**: la brand identity allegata era un'immagine raster (tavola di
presentazione), non un sorgente vettoriale, e ridisegnarlo avrebbe significato reinterpretarlo — cosa
esplicitamente vietata dal brief.

Il componente `components/Logo.tsx` mostra quindi un segnaposto (`UE`) finché non vengono forniti,
esportati dal file sorgente originale (Illustrator/Figma), questi asset in `public/images/logo/`:

- `icon-white.svg`, `icon-black.svg` — solo simbolo
- `lockup-horizontal-white.svg`, `lockup-horizontal-black.svg`
- `lockup-vertical-white.svg`
- `favicon.ico`
- `apple-touch-icon.png` (180×180)
- `public/images/og/underground-events-og.jpg` (1200×630, per Open Graph)

Una volta aggiunti i file, aggiorna `components/Logo.tsx` sostituendo il segnaposto con
`<Image src={src} ... />` (import già predisposto nei commenti del file).

---

## 5. Come aggiornare eventi e programma

- Nuovo evento → aggiungi una voce in `content/events.ts` e crea la pagina in `app/eventi/<slug>/page.tsx`
  (puoi copiare la struttura di `app/eventi/last-call-2026/page.tsx`).
- Programma di LAST CALL → modifica l'array `schedule` in `content/lastCall2026.ts`.
- Lineup → modifica l'array `lineup` in `content/lastCall2026.ts`.
- Stato prenotazioni/evento → campo `status` in `content/lastCall2026.ts` e `content/events.ts`.

---

## 6. Contatti e Preventivo → email diretta

I moduli **Contatti** e **Preventivo** usano Netlify Forms e non richiedono alcun database: ogni invio ti arriva semplicemente via email, senza pannelli da controllare.

Per attivarlo, dopo il primo deploy su Netlify:

1. Vai su **Site configuration → Forms → Form notifications**.
2. Clicca **Add notification → Email notification**.
3. Scegli il form (`contatti` oppure `preventivo`) e inserisci l'indirizzo email a cui vuoi ricevere le richieste. Ripeti per entrambi i form.
4. Da quel momento ogni invio dai due moduli ti arriva via email, con tutti i campi compilati.

Il file `public/__forms.html` è ciò che permette a Netlify di "vedere" questi due moduli in fase di build (i moduli reali sono renderizzati lato client, quindi non visibili al crawler di Netlify senza questa scorciatoia). Non va toccato.

---

## 7. Database (Supabase) per i moduli di prenotazione

I moduli con **posti limitati e stato di conferma** — lista evento/promo drink, iscrizione Beer Pong — scrivono in un vero database (Postgres via Supabase), non in Netlify Forms. Questo permette di:

- contare automaticamente i posti/persone/squadre già occupati;
- passare in automatico le nuove richieste a **"lista d'attesa"** quando i posti configurati sono esauriti;
- consultare, filtrare e aggiornare lo stato di ogni richiesta (es. da "in attesa" a "confermata") direttamente dal pannello Supabase, senza bisogno di scrivere codice.

### 7.1 Creazione del progetto Supabase

1. Crea un account gratuito su [supabase.com](https://supabase.com) e crea un nuovo progetto.
2. Vai su **SQL Editor**, apri il file `db/schema.sql` di questo progetto, incolla tutto il contenuto e premi **Run**. Questo crea le quattro tabelle di prenotazione più la tabella `capacity_settings`.
3. Vai su **Project Settings → API**: copia **Project URL** e la chiave **service_role** (non la `anon` — la service role ha permessi di scrittura ed è quella richiesta dalle API route del sito).

### 7.2 Collegamento al sito

1. Copia `.env.example` in `.env.local` e incolla i due valori copiati da Supabase.
2. In locale, `npm run dev` userà automaticamente `.env.local`.
3. Su Netlify: **Site configuration → Environment variables** → aggiungi `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` con gli stessi valori, poi rifai il deploy.

**Importante:** la service role key ha pieni permessi sul database. Non va mai scritta in `content/`, in un componente, o in qualunque file che finisca nel bundle inviato al browser — viene usata solo dentro `app/api/*/route.ts`, che gira esclusivamente sul server. Non committare mai `.env.local` (è già escluso da `.gitignore`).

### 7.3 Gestire i posti disponibili

Nella tabella `capacity_settings` (Supabase → Table Editor) trovi una riga per ciascun modulo:

| key | a cosa corrisponde |
|---|---|
| `lista-evento` | numero di persone in lista (ognuna si registra singolarmente) |
| `beerpong-squadre` | numero di squadre iscritte al Beer Pong |

Il campo `capacity` è vuoto (`null`) di default, cioè **nessun limite**. Per impostare un tetto, modifica direttamente il valore da Supabase — ad esempio per limitare la lista a 300 persone:

```sql
update capacity_settings set capacity = 300 where key = 'lista-evento';
```

Da quel momento, quando la somma delle persone già registrate raggiunge 150, le richieste successive vengono salvate automaticamente con stato `lista-attesa` invece di `in-attesa`, e il modulo mostra all'utente il messaggio corrispondente.

### 7.4 Consultare le richieste ricevute

Supabase → **Table Editor** mostra ogni tabella come un foglio di calcolo: puoi vedere tutte le richieste, filtrare per stato, cercare per nome/email, e cambiare manualmente lo stato di una riga (es. da `in-attesa` a `confermata`) semplicemente cliccando sulla cella.

### 7.5 Cosa NON è ancora incluso

- Non viene inviata automaticamente un'email di conferma alla persona che prenota (il sito mostra solo il messaggio a schermo con il codice identificativo). Se vuoi anche l'email automatica, si può aggiungere in un secondo momento con un servizio come Resend o con le funzioni email di Supabase.
- I testi mostrati sulle pagine (in `content/bookingSettings.ts`) restano statici da aggiornare a mano: non sono ancora collegati al database. Il database gestisce solo il conteggio dei posti, non i testi descrittivi.

---

## 8. Statistiche del sito (Google Analytics)

Il sito è già predisposto per Google Analytics (GA4), collegato al banner cookie esistente: parte
**solo** se l'utente accetta i cookie di analisi, e **solo** se hai configurato un ID di misurazione.
Senza questi due requisiti, non viene caricato nulla — niente script, niente cookie.

1. Crea una proprietà su [analytics.google.com](https://analytics.google.com) (gratuito).
2. Vai su **Amministrazione → Flussi di dati** → crea/apri il flusso web del tuo dominio → copia
   l'**ID misurazione** (formato `G-XXXXXXXXXX`).
3. Su Netlify: **Site configuration → Environment variables** → aggiungi `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   con quel valore, poi rifai il deploy.
4. Da quel momento, ogni visitatore che accetta i cookie di analisi viene conteggiato. Consulta i dati
   direttamente su analytics.google.com (sezione "Report" → "In tempo reale" o "Coinvolgimento").

**Importante**: nessuno strumento di analytics può mostrare dati di visite avvenute *prima* di essere
attivato — si parte a contare da zero da quando lo colleghi, non retroattivamente.

Se in alternativa preferisci **Netlify Analytics** (9€/mese, senza bisogno di codice né di consenso
cookie perché non traccia con cookie): si attiva direttamente dal pannello Netlify → sezione
"Analytics" del tuo sito, nessuna modifica al codice necessaria.

---

## 9. Dati ancora mancanti (da completare prima della pubblicazione)

- Regole di accesso, criteri di selezione, costo, registrazione, orario consigliato, categorie ammesse
  e capienza per l'area automotive (in `content/bookingSettings.ts`, marcati `[DA DEFINIRE]`)
- Orario del blocco "Game Time" nel programma di LAST CALL (Beer Pong, giochi, sfide, premi) — segnato
  `[DA DEFINIRE]` dopo lo spostamento dell'apertura evento alle 17:00
- Parcheggi, accessibilità, trasporto, ingresso, regole location, gestione maltempo (`venueInfo`)
- Dati di contatto e fiscali ancora mancanti (`siteSettings.contact`): telefono, indirizzo, P.IVA
- Testi legali definitivi (Privacy, Cookie, Termini) — le pagine contengono bozze operative con la
  dicitura obbligatoria "Bozza da verificare con un professionista prima della pubblicazione."
- Biografia e orario individuale dei tre artisti in lineup (MARCO DECIBEL, PALAZ, MELLU) — foto e
  social sono già presenti
- Logo di Honest (Street Car Therapy, Distretto 11 e gli sponsor sono già presenti)

---

## 10. Pubblicazione su Netlify

1. Crea un repository Git con questo progetto e caricalo su GitHub/GitLab.
2. Su [netlify.com](https://www.netlify.com) → "Add new site" → "Import an existing project".
3. Collega il repository. Netlify userà automaticamente le impostazioni in `netlify.toml`
   (`npm run build`, plugin `@netlify/plugin-nextjs`).
4. **Prima** del primo deploy (o subito dopo, rifacendo il deploy): vai su **Site configuration →
   Environment variables** e aggiungi `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (vedi sezione 7) —
   senza queste variabili i moduli di prenotazione non funzionano.
5. Dopo il primo deploy, vai su "Forms" nel pannello Netlify per verificare che i moduli `contatti` e
   `preventivo` siano stati rilevati, e imposta le notifiche email (vedi sezione 6).
6. Aggiorna `siteSettings.siteUrl` in `content/siteSettings.ts` con il dominio definitivo (necessario per
   SEO, sitemap e Open Graph) e rifai il deploy.
7. Configura un dominio personalizzato dal pannello "Domain settings", se previsto.

---

## 11. Checklist prima della pubblicazione

- [ ] Sostituiti tutti i valori `[DA DEFINIRE]` in `content/bookingSettings.ts` e `content/siteSettings.ts`
- [ ] Caricati gli asset reali del logo in `public/images/logo/` e aggiornato `components/Logo.tsx`
- [ ] Caricate le immagini/video reali al posto dei segnaposto `[FOTO ...]` / `[VIDEO ...]` rimasti
- [ ] Testi legali (Privacy, Cookie, Termini) verificati da un
      professionista e rimossa la dicitura "Bozza da verificare"
- [ ] Progetto Supabase creato, `db/schema.sql` eseguito, variabili d'ambiente impostate su Netlify
- [ ] Posti configurati in `capacity_settings` (o lasciati illimitati volontariamente)
- [ ] Notifiche email attivate per i form "contatti" e "preventivo" nel pannello Netlify
- [ ] `siteSettings.siteUrl` aggiornato con il dominio definitivo
- [ ] (facoltativo) Google Analytics collegato: `NEXT_PUBLIC_GA_MEASUREMENT_ID` impostato su Netlify
- [ ] Verifica responsive su mobile, tablet, desktop
- [ ] Verifica navigazione da tastiera e focus visibili
- [ ] Verifica tutti i link interni (menu, footer, CTA)
- [ ] Lighthouse/PageSpeed su Home e su LAST CALL 2026
- [ ] Verifica dati strutturati (Organization, Event) con il Rich Results Test di Google

---

## 12. Cosa manca ancora in questa prima versione del progetto

Per restare fedele al brief senza inventare contenuti, in questa prima consegna sono stati completati:
Home, LAST CALL 2026, Chi siamo, Servizi, Eventi (archivio con ricerca/filtri), Partner, Contatti,
Preventivo, Privacy Policy, Cookie Policy, Termini, pagina di conferma prenotazione, 404 personalizzata,
sitemap.xml, robots.txt, tutti i componenti e i moduli richiesti.

Aree che restano intenzionalmente semplici e possono essere ampliate in un secondo passaggio:
galleria con lightbox interattivo (attualmente griglia statica di segnaposto), micro-animazioni
scroll-reveal più elaborate (attualmente animazione d'ingresso su hero + transizioni hover), e la
sezione FAQ (vuota, nessuna FAQ era presente nel documento originale).
