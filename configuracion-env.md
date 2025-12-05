# Configuración de Variables de Entorno

Para que la aplicación funcione correctamente con Supabase, necesitas configurar las siguientes variables de entorno:

## Variables Requeridas

Crea o actualiza tu archivo `.env.local` en la raíz del proyecto con:

```
NEXT_PUBLIC_SUPABASE_URL=Tu_URL_de_Supabase_aquí
NEXT_PUBLIC_SUPABASE_ANON_KEY=Tu_clave_anon_aquí  # O la nueva publishable key
SUPABASE_SERVICE_ROLE_KEY=Tu_clave_de_servicio_aquí  # O la nueva secret key
```

## Cómo obtener las claves de Supabase

### Opción 1: Usando el nuevo sistema de API Keys (recomendado)

1. **NEXT_PUBLIC_SUPABASE_URL**:
   - Ve a tu dashboard de Supabase
   - Copia la URL del proyecto desde Project Settings > General > Project URL

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** (Usa la nueva publishable key):
   - Ve a Project Settings > API
   - Crea una nueva "Publishable key" (debe comenzar con `pk-`)
   - Copia esta clave

3. **SUPABASE_SERVICE_ROLE_KEY** (Usa la nueva secret key):
   - Ve a Project Settings > API
   - Crea una nueva "Secret key" (debe comenzar con `sk-` y tener permisos de service role)
   - Copia esta clave
   - ESTA CLAVE DEBE MANTENERSE SECRETA Y NUNCA DEBE ESTAR EN EL CÓDIGO CLIENTE

### Opción 2: Usando las claves legacy (si aún están disponibles)

Si prefieres seguir usando las claves legacy:

1. **NEXT_PUBLIC_SUPABASE_ANON_KEY**:
   - Ve a Project Settings > API
   - Busca la sección "Legacy anon, service_role API keys"
   - Copia la "anon key" (pública)

2. **SUPABASE_SERVICE_ROLE_KEY**:
   - Ve a Project Settings > API
   - Busca la sección "Legacy anon, service_role API keys"
   - Copia la "service_role key"
   - ESTA CLAVE DEBE MANTENERSE SECRETA Y NUNCA DEBE ESTAR EN EL CÓDIGO CLIENTE

## Advertencia Importante

- La `SUPABASE_SERVICE_ROLE_KEY` (o la secret key equivalente) tiene permisos completos de escritura/lectura a tu base de datos y puede eludir todas las políticas de seguridad (RLS)
- Asegúrate de no exponer esta clave en el código cliente ni en commits públicos
- Esta clave es necesaria para operaciones como la creación de perfiles de usuario que necesitan bypass de RLS policies

## Proyectos con Base de Datos Pausada

Si tu proyecto de Supabase estuvo pausado:
1. Asegúrate de que el proyecto esté activo (en la sección Settings > Project status)
2. Verifica que todas las políticas RLS estén activas
3. Confirma que las migraciones de base de datos se hayan aplicado correctamente después de la reactivación