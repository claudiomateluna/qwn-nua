import { supabase } from '@/services/supabase';
import { Accion } from '@/types';

export const getAllAcciones = async (): Promise<Accion[]> => {
  const { data, error } = await supabase
    .from('acciones')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching actions:', error);
    throw new Error(error.message);
  }

  return data as Accion[];
};

export const getAccionById = async (id: string): Promise<Accion | null> => {
  const { data, error } = await supabase
    .from('acciones')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching action:', error);
    throw new Error(error.message);
  }

  return data as Accion;
};

export const createAccion = async (accionData: Omit<Accion, 'id' | 'created_at' | 'updated_at'>): Promise<Accion> => {
  const { data, error } = await supabase
    .from('acciones')
    .insert([accionData])
    .select()
    .single();

  if (error) {
    console.error('Error creating action:', error);
    throw new Error(error.message);
  }

  return data as Accion;
};

export const updateAccion = async (id: string, accionData: Partial<Accion>): Promise<Accion> => {
  const { data, error } = await supabase
    .from('acciones')
    .update(accionData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating action:', error);
    throw new Error(error.message);
  }

  return data as Accion;
};

export const deleteAccion = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('acciones')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting action:', error);
    throw new Error(error.message);
  }
};

export const searchAcciones = async (searchTerm: string): Promise<Accion[]> => {
  if (!searchTerm) {
    return getAllAcciones();
  }

  const { data, error } = await supabase
    .from('acciones')
    .select('*')
    .or(`titulo.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching actions:', error);
    throw new Error(error.message);
  }

  return data as Accion[];
};