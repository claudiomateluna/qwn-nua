import { supabase } from '@/services/supabase';
import { Participante } from '@/types';

export const getAllParticipants = async (): Promise<Participante[]> => {
  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching participants:', error);
    throw new Error(error.message);
  }

  return data as Participante[];
};

export const getParticipantById = async (id: string): Promise<Participante | null> => {
  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching participant:', error);
    throw new Error(error.message);
  }

  return data as Participante;
};

export const createParticipant = async (participantData: Omit<Participante, 'id' | 'created_at' | 'updated_at'>): Promise<Participante> => {
  const { data, error } = await supabase
    .from('participantes')
    .insert([participantData])
    .select()
    .single();

  if (error) {
    console.error('Error creating participant:', error);
    throw new Error(error.message);
  }

  return data as Participante;
};

export const updateParticipant = async (id: string, participantData: Partial<Participante>): Promise<Participante> => {
  const { data, error } = await supabase
    .from('participantes')
    .update(participantData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating participant:', error);
    throw new Error(error.message);
  }

  return data as Participante;
};

export const deleteParticipant = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('participantes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting participant:', error);
    throw new Error(error.message);
  }
};

export const searchParticipants = async (searchTerm: string): Promise<Participante[]> => {
  if (!searchTerm) {
    return getAllParticipants();
  }

  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .or(`nombre.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching participants:', error);
    throw new Error(error.message);
  }

  return data as Participante[];
};