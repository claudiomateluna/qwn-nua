// User types based on the database schema
export interface User {
  id: string;
  first_name: string;
  paternal_last_name?: string;
  maternal_last_name?: string;
  rut?: string;
  birth_date?: string; // ISO date string
  gender?: 'masculino' | 'femenino' | 'otro';
  email: string;
  phone_number?: string;
  address?: string;
  commune?: string;
  role: 'lobato (a)' | 'guia' | 'scout' | 'pionera (o)' | 'caminante' | 'apoderado' | 'presidente' | 'tesorera' | 'secretario' | 'representante' | 'dirigente' | 'guiadora' | 'admin';
  unit?: 'Manada' | 'Tropa' | 'Compañía' | 'Avanzada' | 'Clan';
  religious_preference?: string;
  school?: string;
  field_of_study?: string;
  health_system?: 'FONASA' | 'Isapre' | 'Fuerzas Armadas' | 'Particular';
  blood_type?: string;
  dietary_needs?: string;
  allergies?: string;
  medical_history?: string;
  current_treatments?: string;
  medication_use?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  image_url?: string;
}

// Article types
export interface Article {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: 'actividades' | 'administrativo' | 'historia' | 'biografia' | 'tecnica' | 'reflexion';
  cover_image_url?: string;
  status: 'draft' | 'published' | 'archived';
  duration_minutes?: number;
  min_participants?: number;
  priority_participants?: string;
  metadata?: Record<string, any>;
  slug: string;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

// Inventory item types
export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  status: 'disponible' | 'en_uso' | 'en_reparacion' | 'fuera_de_servicio';
  person_in_charge_id?: string;
  location_id?: string;
  purchase_date?: string;
  purchase_cost?: number;
  condition_rating?: number; // 1-5
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Transaction types
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category?: string;
  image_url?: string;
  date: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// Meeting minutes (Acta) types
export interface Acta {
  id: string;
  codigo: string;
  tipo: 'Comité' | 'Reunión Operativa' | 'Directorio' | 'Proyecto' | 'Cliente';
  fecha: string;
  estado: 'Borrador' | 'En Revisión' | 'Aprobada' | 'Cerrada' | 'Archivada';
  resumen?: string;
  confidencialidad: 'Pública' | 'Pública Interna' | 'Restringida' | 'Confidencial';
  ingresado_id: string;
  created_at: string;
  updated_at: string;
}

// Participant types
export interface Participante {
  id: string;
  acta_id: string;
  usuario_id: string;
  nombre?: string;
  email?: string;
  rol_en_reunion: 'Owner' | 'TomadorNotas' | 'Asistente' | 'Invitado';
  asistencia?: 'Confirmado' | 'Presente' | 'Ausente' | 'Remoto';
  firma_digital_url?: string;
  created_at: string;
  updated_at: string;
}

// Action item types
export interface Accion {
  id: string;
  acta_id: string;
  titulo: string;
  descripcion?: string;
  responsable_id?: string;
  fecha_compromiso?: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  estado: 'Abierta' | 'En Progreso' | 'Bloqueada' | 'Cumplida' | 'Vencida';
  evidencia_url?: string;
  dependencias?: string[]; // array of action IDs this depends on
  created_at: string;
  updated_at: string;
}

// Progress goal types
export interface ProgressGoal {
  id: string;
  name: string;
  description?: string;
  area?: string; // 'afectividad', 'carácter', etc.
  unit_level?: string; // 'manada', 'tropa', etc.
  is_required?: boolean;
  created_at: string;
  updated_at: string;
}

// User progress tracking
export interface UserProgress {
  id: string;
  user_id: string;
  goal_id: string;
  status: 'en_progreso' | 'completado' | 'aprobado';
  date_completed?: string;
  approved_by?: string; // dirigente who approved
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Storage location types
export interface StorageLocation {
  id: string;
  name: string;
  description?: string;
  address?: string;
  contact_person_id?: string;
  created_at: string;
  updated_at: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';