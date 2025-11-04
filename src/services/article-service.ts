import { supabase } from '@/services/supabase';
import { Article } from '@/types';

export const getAllArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    throw new Error(error.message);
  }

  return data as Article[];
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error('Error fetching article:', error);
    throw new Error(error.message);
  }

  return data as Article;
};

export const createArticle = async (articleData: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> => {
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
};

export const updateArticle = async (id: string, articleData: Partial<Article>): Promise<Article> => {
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
};

export const deleteArticle = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    throw new Error(error.message);
  }
};

export const searchArticles = async (searchTerm: string): Promise<Article[]> => {
  if (!searchTerm) {
    return getAllArticles();
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching articles:', error);
    throw new Error(error.message);
  }

  return data as Article[];
};