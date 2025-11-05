// Servicio para manejar artículos en el sistema de inventario
// Almacenamiento de imágenes se maneja por separado en Oracle Cloud

import { supabase } from '@/services/supabase';
import { Article } from '@/types';
import { uploadFileToStorage } from '@/services/storage-service';

/**
 * Obtiene todos los artículos del inventario
 * @returns Array de artículos
 */
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching articles:', error);
    throw new Error(error.message);
  }

  return data as Article[];
}

/**
 * Crea un nuevo artículo
 * @param articleData Datos del artículo a crear
 * @returns Artículo creado
 */
export async function createArticle(articleData: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert([articleData])
    .select()
    .single();

  if (error) {
    console.error('Error creating article:', error);
    throw new Error(error.message);
  }

  return data as Article;
}

/**
 * Actualiza un artículo existente
 * @param id ID del artículo
 * @param articleData Datos a actualizar
 * @returns Artículo actualizado
 */
export async function updateArticle(id: string, articleData: Partial<Article>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .update(articleData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating article:', error);
    throw new Error(error.message);
  }

  return data as Article;
}

/**
 * Elimina un artículo
 * @param id ID del artículo
 */
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    throw new Error(error.message);
  }
}

/**
 * Busca artículos por término de búsqueda
 * @param searchTerm Término de búsqueda
 * @returns Array de artículos coincidentes
 */
export async function searchArticles(searchTerm: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error searching articles:', error);
    throw new Error(error.message);
  }

  return data as Article[];
}

/**
 * Sube la imagen de portada del artículo a Oracle Cloud
 * @param articleId ID del artículo
 * @param imageFile Archivo de imagen
 * @returns URL de la imagen subida
 */
export async function uploadArticleImage(articleId: string, imageFile: File): Promise<string> {
  // Validar que el archivo sea una imagen
  if (!imageFile.type.startsWith('image/')) {
    throw new Error('El archivo no es una imagen válida');
  }

  // Subir la imagen a Oracle Cloud Storage
  const uploadResult = await uploadFileToStorage(imageFile, 'article-images');
  
  // Actualizar el campo cover_image_url en el registro del artículo
  await updateArticle(articleId, { cover_image_url: uploadResult.url });

  return uploadResult.url;
}