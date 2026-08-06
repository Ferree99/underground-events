-- ============================================================================
-- UNDERGROUND EVENTS — schema database (Supabase / Postgres)
--
-- Da eseguire una sola volta in Supabase: Dashboard → SQL Editor → incolla
-- tutto questo file → Run.
--
-- Copre SOLO i moduli con posti limitati e stato di conferma:
--   - lista evento / promo drink
--   - candidatura auto (area automotive)
--
-- Contatti e Preventivo NON passano da qui: vanno via email tramite
-- Netlify Forms (vedi README, sezione "Contatti e Preventivo via email").
--
-- Nota: spiedo e torneo Beach Volley erano previsti inizialmente ma sono
-- stati tolti dall'evento — le relative tabelle sono state rimosse anche
-- dal database live (nessun dato presente al momento della rimozione).
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
  key text primary key,           -- 'lista-evento' | 'auto-candidature'
  label text not null,
  capacity integer,               -- null = illimitato
  updated_at timestamptz not null default now()
);

insert into capacity_settings (key, label, capacity) values
  ('lista-evento', 'Lista evento (persone)', null),
  ('auto-candidature', 'Candidature area automotive (auto)', null);
-- Sostituisci "null" con il numero reale di posti quando lo conoscete,
-- ad es.: update capacity_settings set capacity = 300 where key = 'lista-evento';

-- ----------------------------------------------------------------------------
-- Lista evento + promo drink
-- ----------------------------------------------------------------------------
create table guest_list_entries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  event_slug text not null default 'last-call-2026',
  nome text not null,
  cognome text not null,
  email text not null,
  telefono text not null,
  partecipanti integer not null default 1,
  data_nascita date,
  consenso_marketing boolean not null default false,
  status booking_status not null default 'ricevuta',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Candidatura auto (area automotive)
-- ----------------------------------------------------------------------------
create table vehicle_applications (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  event_slug text not null default 'last-call-2026',
  nome text not null,
  email text not null,
  telefono text not null,
  marca text not null,
  modello text not null,
  anno integer,
  targa text,                        -- facoltativa, dato sensibile: vedi nota RLS sotto
  modifiche text,
  foto_url text,
  social text,
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
alter table vehicle_applications enable row level security;
alter table capacity_settings enable row level security;
-- Nessuna "create policy": senza policy pubbliche, solo la service role key
-- (usata dalle API route server-side) può leggere/scrivere. Il browser non
-- ha mai accesso diretto al database.
