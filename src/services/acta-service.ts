import { supabase } from '@/services/supabase';
import { Acta } from '@/types';

export const getAllActas = async (): Promise<Acta[]> => {
  const { data, error } = await supabase
    .from('actas')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error fetching actas:', error);
    throw new Error(error.message);
  }

  return data as Acta[];
};

export const getActaById = async (id: string): Promise<Acta | null> => {
  const { data, error } = await supabase
    .from('actas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching acta:', error);
    throw new Error(error.message);
  }

  return data as Acta;
};

export const createActa = async (actaData: Omit<Acta, 'id' | 'created_at' | 'updated_at'>): Promise<Acta> => {
  const { data, error } = await supabase
    .from('actas')
    .insert([actaData])
    .select()
    .single();

  if (error) {
    console.error('Error creating acta:', error);
    throw new Error(error.message);
  }

  return data as Acta;
};

export const updateActa = async (id: string, actaData: Partial<Acta>): Promise<Acta> => {
  const { data, error } = await supabase
    .from('actas')
    .update(actaData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating acta:', error);
    throw new Error(error.message);
  }

  return data as Acta;
};

export const deleteActa = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('actas')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting acta:', error);
    throw new Error(error.message);
  }
};

export const searchActas = async (searchTerm: string): Promise<Acta[]> => {
  if (!searchTerm) {
    return getAllActas();
  }

  const { data, error } = await supabase
    .from('actas')
    .select('*')
    .or(`codigo.ilike.%${searchTerm}%,resumen.ilike.%${searchTerm}%`)
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error searching actas:', error);
    throw new Error(error.message);
  }

  return data as Acta[];
};