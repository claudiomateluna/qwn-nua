import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Cliente de Supabase configurado para base de datos y autenticación
// El almacenamiento de archivos se maneja por separado en Oracle Cloud Infrastructure
export const supabase = createClient(supabaseUrl, supabaseAnonKey);