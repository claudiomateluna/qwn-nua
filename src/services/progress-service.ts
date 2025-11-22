// Service for handling progress tracking operations
import { supabase } from '@/services/supabase';
import { ProgressGoal, UserProgress } from '@/types';

// Fetch all progress goals
export const fetchProgressGoals = async (): Promise<ProgressGoal[]> => {
  const { data, error } = await supabase
    .from('progress_goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching progress goals:', error);
    throw new Error(`Error fetching progress goals: ${error.message}`);
  }

  return data as ProgressGoal[];
};

// Fetch progress goals by unit level
export const fetchProgressGoalsByUnit = async (unit: string): Promise<ProgressGoal[]> => {
  const { data, error } = await supabase
    .from('progress_goals')
    .select('*')
    .eq('unit_level', unit)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching progress goals by unit:', error);
    throw new Error(`Error fetching progress goals: ${error.message}`);
  }

  return data as ProgressGoal[];
};

// Fetch a single progress goal by ID
export const fetchProgressGoalById = async (id: string): Promise<ProgressGoal | null> => {
  const { data, error } = await supabase
    .from('progress_goals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching progress goal:', error);
    throw new Error(`Error fetching progress goal: ${error.message}`);
  }

  return data as ProgressGoal;
};

// Create a new progress goal
export const createProgressGoal = async (goalData: Omit<ProgressGoal, 'id' | 'created_at' | 'updated_at'>): Promise<ProgressGoal> => {
  const { data, error } = await supabase
    .from('progress_goals')
    .insert([goalData])
    .select()
    .single();

  if (error) {
    console.error('Error creating progress goal:', error);
    throw new Error(`Error creating progress goal: ${error.message}`);
  }

  return data as ProgressGoal;
};

// Update an existing progress goal
export const updateProgressGoal = async (id: string, goalData: Partial<ProgressGoal>): Promise<ProgressGoal> => {
  const { data, error } = await supabase
    .from('progress_goals')
    .update(goalData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating progress goal:', error);
    throw new Error(`Error updating progress goal: ${error.message}`);
  }

  return data as ProgressGoal;
};

// Delete a progress goal
export const deleteProgressGoal = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('progress_goals')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting progress goal:', error);
    throw new Error(`Error deleting progress goal: ${error.message}`);
  }
};

// Fetch user progress for a specific user
export const fetchUserProgress = async (userId: string): Promise<UserProgress[]> => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user progress:', error);
    throw new Error(`Error fetching user progress: ${error.message}`);
  }

  return data as UserProgress[];
};

// Fetch user progress for a specific goal
export const fetchUserProgressForGoal = async (userId: string, goalId: string): Promise<UserProgress | null> => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('goal_id', goalId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
    console.error('Error fetching user progress for goal:', error);
    throw new Error(`Error fetching user progress: ${error.message}`);
  }

  return data as UserProgress;
};

// Create or update user progress
export const upsertUserProgress = async (progressData: Omit<UserProgress, 'id' | 'created_at' | 'updated_at'>): Promise<UserProgress> => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(progressData, { onConflict: 'user_id,goal_id' })
    .select()
    .single();

  if (error) {
    console.error('Error upserting user progress:', error);
    throw new Error(`Error saving user progress: ${error.message}`);
  }

  return data as UserProgress;
};

// Update user progress
export const updateUserProgress = async (id: string, progressData: Partial<UserProgress>): Promise<UserProgress> => {
  const { data, error } = await supabase
    .from('user_progress')
    .update(progressData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user progress:', error);
    throw new Error(`Error updating user progress: ${error.message}`);
  }

  return data as UserProgress;
};

// Delete user progress
export const deleteUserProgress = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('user_progress')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user progress:', error);
    throw new Error(`Error deleting user progress: ${error.message}`);
  }
};