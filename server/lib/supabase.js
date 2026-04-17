import { createClient } from "@supabase/supabase-js";

// REVIEW: No validation that SUPABASE_URL and SUPABASE_ANON_KEY are defined.
// If either is missing, createClient will silently create a broken client that
// fails with confusing errors at request time. Throw early with a clear message.
var supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export default supabase;
