
import { createClient } from '@supabase/supabase-js';

// These should be set in your environment variables for production.
// For the purpose of this exercise, they are placeholder references.
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
