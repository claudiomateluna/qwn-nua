// Configuración del cliente de Supabase
import { createClient } from '@supabase/supabase-js';

// Tipos para TypeScript
export type { Session, User } from '@supabase/supabase-js';

// Inicializar el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno requeridas para Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);