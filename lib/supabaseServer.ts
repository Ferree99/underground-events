import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase lato server. Usa la SERVICE ROLE KEY, che ha pieni
 * permessi di lettura/scrittura e non deve MAI arrivare al browser.
 *
 * Per questo:
 * - questo file va importato solo dentro app/api/.../route.ts (codice che
 *   gira esclusivamente sul server di Netlify/Next.js);
 * - le variabili d'ambiente non hanno il prefisso NEXT_PUBLIC_, quindi
 *   Next.js non le include mai nel bundle inviato al browser.
 *
 * Variabili richieste (vedi .env.example):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase non configurato: imposta SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY nelle variabili d'ambiente."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export default getSupabaseServerClient;
