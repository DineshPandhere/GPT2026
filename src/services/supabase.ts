import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mvgirvpijzchyovnmggh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_f0HwmhkRdqf-TQwfX-zJbQ_AENkKEiI';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  );
};

export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey && isSupabaseConfigured())
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
