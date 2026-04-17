import { createClient } from "@supabase/supabase-js";

// REVIEW: Duplicate of server/lib/supabase.js — same missing env-var validation.
// Also, this is a third copy of the supabase client initialization. Consider a shared
// utility if the project structure allows it.
var supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export default supabase;
