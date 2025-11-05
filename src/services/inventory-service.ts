// Servicio para manejar los registros de inventario
// Almacenamiento de archivos e imágenes se maneja por separado en Oracle Cloud

import { supabase } from '@/services/supabase';
import { InventoryItem } from '@/types';

/**
 * Obtiene todos los items del inventario
 * @returns Array de items de inventario
 */
export async function getAllInventoryItems(): Promise<InventoryItem[]> {
  const { data, error } = await supabase
    .from('inventory_items')
    .select(`
      *,
      articles (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inventory items:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem[];
}

/**
 * Crea un nuevo item de inventario
 * @param itemData Datos del item a crear
 * @returns Item de inventario creado
 */
export async function createInventoryItem(itemData: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>): Promise<InventoryItem> {
  const { data, error } = await supabase
    .from('inventory_items')
    .insert([itemData])
    .select()
    .single();

  if (error) {
    console.error('Error creating inventory item:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem;
}

/**
 * Actualiza un item de inventario existente
 * @param id ID del item
 * @param itemData Datos a actualizar
 * @returns Item de inventario actualizado
 */
export async function updateInventoryItem(id: string, itemData: Partial<InventoryItem>): Promise<InventoryItem> {
  const { data, error } = await supabase
    .from('inventory_items')
    .update(itemData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating inventory item:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem;
}

/**
 * Elimina un item de inventario
 * @param id ID del item
 */
export async function deleteInventoryItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('inventory_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting inventory item:', error);
    throw new Error(error.message);
  }
}