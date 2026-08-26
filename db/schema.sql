-- ============================================================================
-- UNDERGROUND EVENTS — schema database (Supabase / Postgres)
--
-- Da eseguire una sola volta in Supabase: Dashboard → SQL Editor → incolla
-- tutto questo file → Run.
--
-- Copre i moduli con posti limitati e stato di conferma:
--   - lista evento / promo drink (con PR di riferimento)
--   - iscrizione Beer Pong (squadre da 2, si iscrive 1 persona)
--
-- Contatti e Preventivo NON passano da qui: vanno via email tramite
-- Netlify Forms (vedi README, sezione "Contatti e Preventivo via email").
--
-- La candidatura auto non passa più da un modulo sul sito: chi vuole
-- portare la propria auto scrive in direct a Street Car Therapy su
-- Instagram — la tabella "vehicle_applications" è stata rimossa.
-- Spiedo e torneo Beach Volley erano previsti inizialmente ma sono stati
-- tolti dall'evento.
-- ============================================================================

-- Stato condiviso da tutte le richieste, coerente con quello già usato nella
-- pagina /prenotazione-confermata del sito.
create type booking_status as enum (
  'ricevuta',
  'in-attesa',
  'confermata',
  'lista-attesa',
  'annullata'
);

-- ----------------------------------------------------------------------------
-- Capacità: una riga per ogni modulo con posti limitati. L'organizzazione
-- aggiorna semplicemente "capacity" da qui (Supabase Table Editor, senza
-- toccare codice) per cambiare i posti disponibili in qualunque momento.
-- capacity = null significa "nessun limite".
-- ----------------------------------------------------------------------------
create table capacity_settings (
  key text primary key,           -- 'lista-evento' | 'beerpong-squadre'
  label text not null,
  capacity integer,               -- null = illimitato
  updated_at timestamptz not null default now()
);

insert into capacity_settings (key, label, capacity) values
  ('lista-evento', 'Lista evento (persone)', null),
  ('beerpong-squadre', 'Squadre Beer Pong', null);
-- Sostituisci "null" con il numero reale di posti quando lo conoscete,
-- ad es.: update capacity_settings set capacity = 300 where key = 'lista-evento';

-- ----------------------------------------------------------------------------
-- Lista evento + promo drink. Ogni riga è una singola persona (non più un
-- numero di partecipanti): ognuno si registra individualmente, indicando
-- il PR/lista di riferimento.
-- ----------------------------------------------------------------------------
create table guest_list_entries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  event_slug text not null default 'last-call-2026',
  nome text not null,
  cognome text not null,
  email text not null,
  telefono text not null,
  pr text,                           -- PR/lista scelto nel modulo
  partecipanti integer not null default 1,
  data_nascita date,
  consenso_marketing boolean not null default false,
  status booking_status not null default 'ricevuta',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Iscrizione Beer Pong. Squadre da 2 giocatori: si iscrive una sola persona
-- per squadra, quindi ogni riga rappresenta già un'intera squadra.
-- ----------------------------------------------------------------------------
create table beerpong_teams (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  event_slug text not null default 'last-call-2026',
  nome text not null,
  cognome text not null,
  telefono text not null,
  email text not null,
  status booking_status not null default 'in-attesa',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Sicurezza (Row Level Security)
--
-- Le tabelle vengono scritte SOLO dal server (le API route del sito usano la
-- service role key, mai esposta al browser) quindi la scrittura diretta dal
-- client resta bloccata di default: RLS abilitata, nessuna policy pubblica.
-- ----------------------------------------------------------------------------
alter table guest_list_entries enable row level security;
alter table beerpong_teams enable row level security;
alter table capacity_settings enable row level security;
-- Nessuna "create policy": senza policy pubbliche, solo la service role key
-- (usata dalle API route server-side) può leggere/scrivere. Il browser non
-- ha mai accesso diretto al database.
