import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://auhdkikmcuuivaoqjish.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aGRraWttY3V1aXZhb3FqaXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NjYyNDMsImV4cCI6MjA1NzE0MjI0M30.RUl7inx1wlPoFR1CzOyEWn3TUyb80j9l9tj8swxSKV0';

export const supabase = createClient(supabaseUrl, supabaseKey);
