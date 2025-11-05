// Configuración del cliente de Supabase
import { createClient } from '@supabase/supabase-js';

// Tipos para TypeScript
export type { Session, User } from '@supabase/supabase-js';

// Inicializar el cliente de Supabase
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);