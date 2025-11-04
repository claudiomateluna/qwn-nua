import { supabase } from '@/services/supabase';
import { InventoryItem } from '@/types';

export const getAllInventoryItems = async (): Promise<InventoryItem[]> => {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inventory items:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem[];
};

export const getInventoryItemById = async (id: string): Promise<InventoryItem | null> => {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching inventory item:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem;
};

export const createInventoryItem = async (itemData: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>): Promise<InventoryItem> => {
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
};

export const updateInventoryItem = async (id: string, itemData: Partial<InventoryItem>): Promise<InventoryItem> => {
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
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('inventory_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting inventory item:', error);
    throw new Error(error.message);
  }
};

export const searchInventoryItems = async (searchTerm: string): Promise<InventoryItem[]> => {
  if (!searchTerm) {
    return getAllInventoryItems();
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching inventory items:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem[];
};