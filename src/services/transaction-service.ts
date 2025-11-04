import { supabase } from '@/services/supabase';
import { Transaction } from '@/types';

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    throw new Error(error.message);
  }

  return data as Transaction[];
};

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching transaction:', error);
    throw new Error(error.message);
  }

  return data as Transaction;
};

export const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> => {
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
};

export const updateTransaction = async (id: string, transactionData: Partial<Transaction>): Promise<Transaction> => {
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
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting transaction:', error);
    throw new Error(error.message);
  }
};

export const searchTransactions = async (searchTerm: string): Promise<Transaction[]> => {
  if (!searchTerm) {
    return getAllTransactions();
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .or(`description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error searching transactions:', error);
    throw new Error(error.message);
  }

  return data as Transaction[];
};