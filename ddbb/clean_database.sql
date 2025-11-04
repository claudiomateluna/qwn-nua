-- Script para limpiar completamente la base de datos antes de aplicar el nuevo esquema

-- Deshabilitar temporalmente RLS (Row Level Security) en todas las tablas existentes
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
    LOOP 
        EXECUTE 'ALTER TABLE ' || quote_ident(r.tablename) || ' DISABLE ROW LEVEL SECURITY;';
    END LOOP; 
END $$;

-- Eliminar todas las políticas de seguridad (policies)
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') 
    LOOP 
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.tablename) || ';';
    END LOOP; 
END $$;

-- Eliminar triggers
DO $$
DECLARE
    trigger_record RECORD;
BEGIN
    FOR trigger_record IN
        SELECT event_object_table, trigger_name
        FROM information_schema.triggers
        WHERE trigger_schema = 'public'
    LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(trigger_record.trigger_name) || 
                ' ON ' || quote_ident(trigger_record.event_object_table) || ';';
    END LOOP;
END $$;

-- Eliminar todas las tablas
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS progress_goals CASCADE;
DROP TABLE IF EXISTS acta_attachments CASCADE;
DROP TABLE IF EXISTS acta_topics CASCADE;
DROP TABLE IF EXISTS acta_actions CASCADE;
DROP TABLE IF EXISTS acta_participants CASCADE;
DROP TABLE IF EXISTS actas CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;
DROP TABLE IF EXISTS article_locations CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS article_objectives CASCADE;
DROP TABLE IF EXISTS activity_objectives CASCADE;
DROP TABLE IF EXISTS article_development_areas CASCADE;
DROP TABLE IF EXISTS development_areas CASCADE;
DROP TABLE IF EXISTS article_units CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS user_guardians CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Eliminar todas las funciones personalizadas
DROP FUNCTION IF EXISTS generate_acta_codigo() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Eliminar todas las extensiones creadas (no eliminar uuid-ossp ni pgcrypto ya que son estándar)
-- No eliminamos extensiones estándar que vienen con PostgreSQL

-- Limpiar cualquier tipo de datos personalizado
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT t.typname FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public') 
    LOOP 
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE;';
    END LOOP; 
END $$;

-- Vaciar cualquier contenido restante en la tabla de almacenamiento de Supabase (si existe)
-- Esto elimina objetos en buckets de Supabase Storage
-- Solo si la extensión storage está habilitada
-- IMPORTANTE: Esto no afecta objetos en Oracle Cloud, solo los que estaban en Supabase Storage
/*
DO $$
DECLARE
    obj RECORD;
BEGIN
    FOR obj IN SELECT id FROM storage.objects
    LOOP
        PERFORM storage.delete(obj.id::text);
    END LOOP;
END $$;
*/

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '¡La limpieza de la base de datos ha sido completada!';
    RAISE NOTICE 'Ahora puede aplicar el nuevo esquema usando el archivo complete_schema.sql';
END $$;