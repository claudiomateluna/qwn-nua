// Servicio para manejar participantes en las actas
// Almacenamiento de archivos e imágenes se maneja por separado en Oracle Cloud

import { supabase } from '@/services/supabase';
import { Participante } from '@/types';

/**
 * Obtiene todos los participantes de una acta específica
 * @param actaId ID de la acta
 * @returns Array de participantes
 */
export async function getAllParticipants(actaId: string): Promise<Participante[]> {
  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .eq('acta_id', actaId)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching participants:', error);
    throw new Error(error.message);
  }

  return data as Participante[];
}

/**
 * Crea un nuevo participante
 * @param participantData Datos del participante a crear
 * @returns Participante creado
 */
export async function createParticipant(participantData: Omit<Participante, 'id' | 'created_at' | 'updated_at'>): Promise<Participante> {
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
}

/**
 * Actualiza un participante existente
 * @param id ID del participante
 * @param participantData Datos a actualizar
 * @returns Participante actualizado
 */
export async function updateParticipant(id: string, participantData: Partial<Participante>): Promise<Participante> {
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
}

/**
 * Elimina un participante
 * @param id ID del participante
 */
export async function deleteParticipant(id: string): Promise<void> {
  const { error } = await supabase
    .from('participantes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting participant:', error);
    throw new Error(error.message);
  }
}