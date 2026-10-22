import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srabzgokulsiujusbqxl.supabase.co';
const supabasePublishableKey = 'sb_publishable_TjLHUAq038yLQ2hqqaVZjg__GM4w2Q4';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
