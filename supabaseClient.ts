
import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE CONFIGURATION
 * 1. Go to your Supabase Project Settings > API
 * 2. Copy the 'Project URL' and 'anon public' key
 * 3. Replace the strings below or use environment variables
 */
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-reference.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-public-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
