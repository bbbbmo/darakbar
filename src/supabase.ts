import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://btkztlafowtisbypxsre.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Supabase Key is misssing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
