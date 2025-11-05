// Servicio para manejar transacciones financieras
// Almacenamiento de archivos e imágenes se maneja por separado en Oracle Cloud

import { supabase } from '@/services/supabase';
import { Transaction } from '@/types';

/**
 * Obtiene todas las transacciones
 * @returns Array de transacciones
 */
export async function getAllTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      users (first_name, paternal_last_name)
    `)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    throw new Error(error.message);
  }

  return data as Transaction[];
}

/**
 * Crea una nueva transacción
 * @param transactionData Datos de la transacción a crear
 * @returns Transacción creada
 */
export async function createTransaction(transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transactionData])
    .select()
    .single();

  if (error) {
    console.error('Error creating transaction:', error);
    throw new Error(error.message);
  }

  return data as Transaction;
}

/**
 * Actualiza una transacción existente
 * @param id ID de la transacción
 * @param transactionData Datos a actualizar
 * @returns Transacción actualizada
 */
export async function updateTransaction(id: string, transactionData: Partial<Transaction>): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .update(transactionData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating transaction:', error);
    throw new Error(error.message);
  }

  return data as Transaction;
}

/**
 * Elimina una transacción
 * @param id ID de la transacción
 */
export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting transaction:', error);
    throw new Error(error.message);
  }
}