import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://sbzdnzouoyxmawuhdvdi.supabase.co",
  "YOUR_PUBLIC_ANON_KEY_HERE"
);
