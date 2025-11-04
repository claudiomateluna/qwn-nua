import { supabase } from '@/services/supabase';
import { User } from '@/types';

export const getAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.message);
  }

  return data as User[];
};

export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching user:', error);
    throw new Error(error.message);
  }

  return data as User;
};

export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw new Error(error.message);
  }

  return data as User;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error(error.message);
  }

  return data as User;
};

export const deleteUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw new Error(error.message);
  }
};

export const searchUsers = async (searchTerm: string): Promise<User[]> => {
  if (!searchTerm) {
    return getAllUsers();
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`first_name.ilike.%${searchTerm}%,paternal_last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching users:', error);
    throw new Error(error.message);
  }

  return data as User[];
};