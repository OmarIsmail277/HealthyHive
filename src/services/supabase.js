import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gujeyfftijygtvwlykku.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1amV5ZmZ0aWp5Z3R2d2x5a2t1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM0MjY3MywiZXhwIjoyMDcwOTE4NjczfQ.xOOXMsPRdSgpPrL-8B_S1acWGgVyN24gjcfwrgqF5Nw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
