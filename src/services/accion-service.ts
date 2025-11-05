// Servicio para manejar acciones en las actas
// Almacenamiento de archivos e imágenes se maneja por separado en Oracle Cloud

import { supabase } from '@/services/supabase';
import { Accion } from '@/types';

/**
 * Obtiene todas las acciones de una acta específica
 * @param actaId ID de la acta
 * @returns Array de acciones
 */
export async function getAllAcciones(actaId: string): Promise<Accion[]> {
  const { data, error } = await supabase
    .from('acciones')
    .select('*')
    .eq('acta_id', actaId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching acciones:', error);
    throw new Error(error.message);
  }

  return data as Accion[];
}

/**
 * Crea una nueva acción
 * @param accionData Datos de la acción a crear
 * @returns Acción creada
 */
export async function createAccion(accionData: Omit<Accion, 'id' | 'created_at' | 'updated_at'>): Promise<Accion> {
  const { data, error } = await supabase
    .from('acciones')
    .insert([accionData])
    .select()
    .single();

  if (error) {
    console.error('Error creating accion:', error);
    throw new Error(error.message);
  }

  return data as Accion;
}

/**
 * Actualiza una acción existente
 * @param id ID de la acción
 * @param accionData Datos a actualizar
 * @returns Acción actualizada
 */
export async function updateAccion(id: string, accionData: Partial<Accion>): Promise<Accion> {
  const { data, error } = await supabase
    .from('acciones')
    .update(accionData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating accion:', error);
    throw new Error(error.message);
  }

  return data as Accion;
}

/**
 * Elimina una acción
 * @param id ID de la acción
 */
export async function deleteAccion(id: string): Promise<void> {
  const { error } = await supabase
    .from('acciones')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting accion:', error);
    throw new Error(error.message);
  }
}