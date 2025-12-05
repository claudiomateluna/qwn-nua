// Script para crear perfiles de usuarios existentes en Supabase Auth
// Útil cuando el proceso automático de creación de perfiles falla

import { createClient } from '@supabase/supabase-js';

// Asegúrate de tener los valores correctos en tus variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Faltan variables de entorno necesarias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function crearPerfilUsuarioExistente(userId, email, firstName, lastName, rut) {
  try {
    // Dividir el apellido en paternal y maternal
    let paternalLastName = '';
    let maternalLastName = '';

    if (lastName) {
      const nameParts = lastName.trim().split(' ');
      if (nameParts.length === 1) {
        paternalLastName = nameParts[0];
      } else if (nameParts.length >= 2) {
        paternalLastName = nameParts[0];
        maternalLastName = nameParts.slice(1).join(' ');
      }
    }

    // Datos para crear el perfil
    const perfilData = {
      id: userId,
      email,
      first_name: firstName,
      paternal_last_name: paternalLastName,
      maternal_last_name: maternalLastName,
      rut,
      role: 'user', // o el rol que corresponda
    };

    // Intentar crear el perfil
    const { error } = await supabase
      .from('users')
      .upsert(perfilData, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error creando perfil para usuario', userId, ':', error);
      return { success: false, error: error.message };
    }

    console.log('Perfil creado exitosamente para usuario', userId);
    return { success: true };
  } catch (error) {
    console.error('Error en la función crearPerfilUsuarioExistente:', error);
    return { success: false, error: error.message };
  }
}

// Para usar esta función, necesitarías llamarla con los datos específicos:
// crearPerfilUsuarioExistente('user-id-aquí', 'email@ejemplo.com', 'Nombre', 'Apellido', '12345678-9');

export { crearPerfilUsuarioExistente };