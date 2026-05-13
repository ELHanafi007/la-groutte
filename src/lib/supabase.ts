import { createClient } from "@supabase/supabase-js";

// Use fallback values to prevent build crashes when environment variables are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key-here";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
