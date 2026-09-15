const SUPABASE_URL = "https://asvsbwjqkdsbgztecosg.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FH5FuGciYblKsoIljQTOEQ_XPCvZs9u";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);