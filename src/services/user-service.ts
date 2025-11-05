// Servicio para manejar usuarios en la base de datos de Supabase
// Almacenamiento de archivos e imágenes se maneja por separado en Oracle Cloud

import { supabase } from '@/services/supabase';
import { User } from '@/types';
import { uploadFileToStorage } from '@/services/storage-service';

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns Array de usuarios
 */
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.message);
  }

  return data as User[];
}

/**
 * Obtiene un usuario por ID
 * @param id ID del usuario
 * @returns Usuario o null si no se encuentra
 */
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No se encontró el registro
      return null;
    }
    console.error('Error fetching user:', error);
    throw new Error(error.message);
  }

  return data as User;
}

/**
 * Crea un nuevo usuario
 * @param userData Datos del usuario a crear
 * @returns Usuario creado
 */
export async function createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
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
}

/**
 * Actualiza un usuario existente
 * @param id ID del usuario
 * @param userData Datos a actualizar
 * @returns Usuario actualizado
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
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
}

/**
 * Elimina un usuario
 * @param id ID del usuario
 */
export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw new Error(error.message);
  }
}

/**
 * Busca usuarios por término de búsqueda
 * @param searchTerm Término de búsqueda
 * @returns Array de usuarios coincidentes
 */
export async function searchUsers(searchTerm: string): Promise<User[]> {
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
}

/**
 * Sube la imagen de perfil del usuario a Oracle Cloud y actualiza el registro
 * @param userId ID del usuario
 * @param imageFile Archivo de imagen
 * @returns URL de la imagen subida
 */
export async function uploadUserImage(userId: string, imageFile: File): Promise<string> {
  // Validar que el archivo sea una imagen
  if (!imageFile.type.startsWith('image/')) {
    throw new Error('El archivo no es una imagen válida');
  }

  // Subir la imagen a Oracle Cloud Storage
  const uploadResult = await uploadFileToStorage(imageFile, 'user-images');
  
  // Actualizar el campo image_url en el registro del usuario
  await updateUser(userId, { image_url: uploadResult.url });

  return uploadResult.url;
}

/**
 * Sube la imagen de portada de un artículo a Oracle Cloud
 * @param articleId ID del artículo
 * @param imageFile Archivo de imagen
 * @returns URL de la imagen subida
 */
export async function uploadArticleCoverImage(articleId: string, imageFile: File): Promise<string> {
  if (!imageFile.type.startsWith('image/')) {
    throw new Error('El archivo no es una imagen válida');
  }

  const uploadResult = await uploadFileToStorage(imageFile, 'article-covers');
  
  // Actualizar el artículo con la nueva URL de imagen de portada
  const { error } = await supabase
    .from('articles')
    .update({ cover_image_url: uploadResult.url })
    .eq('id', articleId);

  if (error) {
    console.error('Error updating article cover image:', error);
    throw new Error(error.message);
  }

  return uploadResult.url;
}