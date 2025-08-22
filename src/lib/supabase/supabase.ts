import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = "https://btkztlafowtisbypxsre.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Supabase Key is misssing!");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
