'use server';

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Create a Supabase client with service role
export async function createOrUpdateUserProfile(
  userId: string, 
  email: string, 
  firstName: string, 
  paternalLastName: string, 
  maternalLastName: string, 
  rut: string,
  role: string = 'admin'
) {
  // Get Supabase service role key from environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase configuration');
  }

  // Create a client with service role key to bypass RLS
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });

  try {
    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email,
        first_name: firstName,
        paternal_last_name: paternalLastName,
        maternal_last_name: maternalLastName,
        rut,
        role
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error creating/updating user profile:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}