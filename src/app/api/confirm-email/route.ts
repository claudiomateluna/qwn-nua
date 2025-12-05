import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Missing Supabase configuration' }, { status: 500 });
  }

  if (!supabaseServiceRoleKey) {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY in environment variables');
    return NextResponse.json({
      error: 'Missing service role key which is required for profile creation'
    }, { status: 500 });
  }

  try {
    const body = await req.json();
    const {
      userId,
      email,
      firstName,
      paternalLastName,
      maternalLastName,
      rut,
      role = 'lobato (a)',
      birth_date,
      gender,
      phone_number,
      address,
      commune,
      unit,
      religious_preference,
      school,
      field_of_study,
      health_system,
      blood_type,
      dietary_needs,
      allergies,
      medical_history,
      current_treatments,
      medication_use,
      guardian_id,
      emergency_contacts,
      scout_group,
      photo_authorization,
      public_faith_data
    } = body;

    // Use the service role key to bypass RLS policies
    const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Prepare the user profile data with all fields
    const userProfileData: any = {
      id: userId,
      email,
      first_name: firstName,
      paternal_last_name: paternalLastName,
      maternal_last_name: maternalLastName,
      rut,
      role
    };

    // Add optional fields if they exist
    if (birth_date) userProfileData.birth_date = birth_date;
    if (gender) userProfileData.gender = gender;
    if (phone_number) userProfileData.phone_number = phone_number;
    if (address) userProfileData.address = address;
    if (commune) userProfileData.commune = commune;
    if (unit) userProfileData.unit = unit;
    if (religious_preference) userProfileData.religious_preference = religious_preference;
    if (school) userProfileData.school = school;
    if (field_of_study) userProfileData.field_of_study = field_of_study;
    if (health_system) userProfileData.health_system = health_system;
    if (blood_type) userProfileData.blood_type = blood_type;
    if (dietary_needs) userProfileData.dietary_needs = dietary_needs;
    if (allergies) userProfileData.allergies = allergies;
    if (medical_history) userProfileData.medical_history = medical_history;
    if (current_treatments) userProfileData.current_treatments = current_treatments;
    if (medication_use) userProfileData.medication_use = medication_use;
    if (guardian_id) userProfileData.guardian_id = guardian_id;
    if (emergency_contacts) userProfileData.emergency_contacts = emergency_contacts;
    if (scout_group) userProfileData.scout_group = scout_group;
    if (photo_authorization) userProfileData.photo_authorization = photo_authorization;
    if (public_faith_data) userProfileData.public_faith_data = public_faith_data;

    console.log('Attempting to upsert user profile with confirmation data:', { 
      userId: userProfileData.id, 
      email: userProfileData.email 
    });

    // Insert or update the user profile
    const { error, data } = await adminSupabase
      .from('users')
      .upsert(userProfileData, {
        onConflict: 'id'
      })
      .select();

    if (error) {
      console.error('Error creating/updating user profile after email confirmation:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('User profile created/updated successfully after email confirmation:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API route error for email confirmation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}