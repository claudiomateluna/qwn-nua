-- Esquema completo para la base de datos de Nua Mana
-- Incluye todas las tablas y relaciones necesarias

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla de usuarios (con todos los campos según los documentos)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    paternal_last_name TEXT,
    maternal_last_name TEXT,
    rut TEXT UNIQUE, -- Identificador único chileno
    birth_date DATE,
    gender TEXT CHECK (gender IN ('masculino', 'femenino', 'otro')),
    
    -- Información de contacto
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    address TEXT,
    commune TEXT,
    
    -- Información scout específica
    role TEXT CHECK (role IN ('lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'presidente', 'tesorera', 'secretario', 'representante', 'dirigente', 'guiadora', 'admin')),
    unit TEXT CHECK (unit IN ('Manada', 'Tropa', 'Compañía', 'Avanzada', 'Clan')),
    religious_preference TEXT CHECK (religious_preference IN ('No Aplica', 'No conocido', 'No especifica', 'No tiene', 'Agnóstico (a)', 'Católico (a)', 'Evangélico (a)', 'Protestante', 'Judío (a)', 'Bautista', 'Santos de los Úsimo Errázuriz', 'Budista', 'Cristiana', 'Luterana', 'Creyente', 'Anglicana', 'Adventista', 'Metodista', 'Ortodoxo', 'Islam', 'Are Krishna', 'Musulman', 'Bahai', 'Rastafari', 'Deísta', 'Hinduista', 'Sijes', 'Taoista', 'Sintoísta', 'Jainista', 'Confusiano (a)', 'Zoroastriano (a)', 'Sunita', 'Chiita', 'Vedista', 'Brahmanista', 'Wicca', 'Druida', 'Ásatrú', 'Otra')),
    school TEXT CHECK (school IN ('No Aplica', 'Colegio Los Navíos', 'Colegio Alma Mater', 'Colegio Arzobispo Crescente Errázuriz', 'Colegio Bahía Darwin', 'Colegio Christian Garden', 'Colegio Cardenal José María Caro', 'Colegio Los Pensamientos', 'Colegio Maria Elena', 'Colegio Poeta Neruda', 'Colegio Polivalente Jorge Huneeus Zegers', 'Colegio San Alberto Magno', 'Colegio San Marcelo', 'Colegio Santo Tomás', 'Colegio Técnico Profesional Aprender', 'Escuela Básica Profesora Aurelia Rojas Burgos', 'Escuela Benjamín Subercaseaux', 'Liceo Bicentenario Nuestra Señora de Guadalupe', 'Liceo Técnico Profesional Patricio Aylwin Azocar', 'Saint Christian College', 'Otro')),
    field_of_study TEXT CHECK (field_of_study IN ('No Aplica', 'básica', 'media', 'superior')),
    
    -- Información médica
    health_system TEXT CHECK (health_system IN ('FONASA', 'Isapre', 'Fuerzas Armadas', 'Particular')),
    blood_type TEXT CHECK (blood_type IN ('No Aplica', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-', 'No Sabe')),
    dietary_needs TEXT CHECK (dietary_needs IN ('No Aplica', 'Menú general', 'Menú vegetariano', 'Menú vegano', 'Menú celíaco', 'Intolerante a la lactosa')),
    allergies TEXT,
    medical_history TEXT,
    current_treatments TEXT,
    medication_use TEXT,

    -- Otros campos según los documentos
    guardian_id UUID REFERENCES users(id), -- Id del apoderado si es NNJ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    image_url TEXT -- URL de imagen almacenada en Oracle Cloud
);

-- Tabla de relación entre usuarios y apoderados (tabla intermedia)
CREATE TABLE user_guardians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guardian_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship TEXT CHECK (relationship IN ('No Aplica', 'Madre', 'Padre', 'Hija (o)', 'Hermana (o)', 'Tía (o)', 'Abuela (o)', 'Sobrina (o)', 'Otra')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, guardian_id)
);

-- Tabla de artículos
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    author_id UUID NOT NULL REFERENCES users(id),
    
    -- Categoría principal según categorias.md
    category TEXT NOT NULL CHECK (category IN ('actividades', 'administrativo', 'historia', 'biografia', 'tecnica', 'reflexion')),
    
    -- Imagen de portada (almacenada en Oracle Cloud)
    cover_image_url TEXT,
    
    -- Estado de publicación
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    
    -- Atributos condicionales basados en categoría
    duration_minutes INTEGER, -- Duración de la actividad
    min_participants INTEGER, -- Mínimo de participantes
    priority_participants TEXT CHECK (priority_participants IN ('02', '04', '06', '08', '10', '12', '16', '24', '32', 'individual')), -- Prioridad de participantes
    
    -- Metadatos para campos condicionales según la categoría
    metadata JSONB, -- Para campos condicionales específicos por categoría
    
    -- SEO
    slug TEXT UNIQUE,
    seo_title TEXT,
    seo_description TEXT,
    
    -- Fechas
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Usuarios que crearon/modificaron
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Tabla de relación entre artículos y unidades
CREATE TABLE article_units (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    unit TEXT CHECK (unit IN ('Manada', 'Tropa', 'Compañía', 'Avanzada', 'Clan')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (article_id, unit)
);

-- Tabla de áreas de desarrollo (basadas en categorias.md)
CREATE TABLE development_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Relación entre artículos y áreas de desarrollo
CREATE TABLE article_development_areas (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    area_id UUID REFERENCES development_areas(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (article_id, area_id)
);

-- Tabla de objetivos de actividad
CREATE TABLE activity_objectives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT
);

-- Relación entre artículos y objetivos
CREATE TABLE article_objectives (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    objective_id UUID REFERENCES activity_objectives(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (article_id, objective_id)
);

-- Tabla de ubicaciones
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT
);

-- Relación entre artículos y ubicaciones
CREATE TABLE article_locations (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (article_id, location_id)
);

-- Tabla de inventario
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    status TEXT CHECK (status IN ('disponible', 'en_uso', 'en_reparacion', 'fuera_de_servicio')) DEFAULT 'disponible',
    person_in_charge_id UUID REFERENCES users(id), -- Persona responsable
    location_id UUID REFERENCES locations(id), -- Ubicación física
    purchase_date DATE,
    purchase_cost NUMERIC(10,2),
    condition_rating INTEGER CHECK (condition_rating BETWEEN 1 AND 5), -- 1 = Pobre, 5 = Excelente
    image_url TEXT, -- URL de imagen en Oracle Cloud
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Tabla de transacciones financieras
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    type TEXT CHECK (type IN ('ingreso', 'gasto')) NOT NULL,
    category TEXT, -- Por ejemplo: 'material scout', 'actividad', 'mantención', etc.
    image_url TEXT, -- Comprobante o recibo (almacenado en Oracle Cloud)
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES users(id), -- Persona que registró la transacción
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Tabla de actas
CREATE TABLE actas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo TEXT UNIQUE NOT NULL, -- Se generará automáticamente en formato ACT-AAAA-#### 
    tipo TEXT NOT NULL CHECK (tipo IN ('Comité', 'Reunión Operativa', 'Directorio', 'Proyecto', 'Cliente')),
    fecha DATE NOT NULL,
    estado TEXT CHECK (estado IN ('Borrador', 'En Revisión', 'Aprobada', 'Cerrada', 'Archivada')) DEFAULT 'Borrador',
    resumen TEXT,
    confidencialidad TEXT CHECK (confidencialidad IN ('Pública', 'Pública Interna', 'Restringida', 'Confidencial')) DEFAULT 'Pública',
    ingresado_id UUID NOT NULL REFERENCES users(id), -- Usuario que ingresó la acta
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Tabla de participantes de actas
CREATE TABLE acta_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    acta_id UUID NOT NULL REFERENCES actas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id), -- Usuario registrado (puede ser NULL si se ingresa por nombre)
    name_override TEXT, -- Nombre si usuario no está registrado
    email_override TEXT, -- Email si usuario no está registrado
    role_in_meeting TEXT NOT NULL CHECK (role_in_meeting IN ('Owner', 'TomadorNotas', 'Asistente', 'Invitado')) DEFAULT 'Asistente',
    attendance_status TEXT CHECK (attendance_status IN ('Confirmado', 'Presente', 'Ausente', 'Remoto')),
    digital_signature_url TEXT, -- URL de firma digital en Oracle Cloud
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de acciones/asuntos de actas
CREATE TABLE acta_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    acta_id UUID NOT NULL REFERENCES actas(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    responsible_id UUID REFERENCES users(id), -- Persona responsable de la acción
    deadline_date DATE,
    priority TEXT CHECK (priority IN ('Alta', 'Media', 'Baja')) DEFAULT 'Media',
    status TEXT CHECK (status IN ('Abierta', 'En Progreso', 'Bloqueada', 'Cumplida', 'Vencida')) DEFAULT 'Abierta',
    evidence_url TEXT, -- Evidencia de cumplimiento (almacenada en Oracle Cloud)
    dependencies JSONB, -- Array de IDs de otras acciones de las que depende
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Tabla de temas tratados en actas
CREATE TABLE acta_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    acta_id UUID NOT NULL REFERENCES actas(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL, -- Orden del tema en la agenda
    title TEXT NOT NULL,
    description TEXT,
    estimated_duration INTEGER, -- en minutos
    actual_duration INTEGER, -- en minutos
    conclusions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de adjuntos de actas
CREATE TABLE acta_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    acta_id UUID NOT NULL REFERENCES actas(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('PDF', 'Imagen', 'PPT', 'Grabación')), -- Tipo de archivo
    name TEXT NOT NULL, -- Nombre para mostrar
    url TEXT NOT NULL, -- Ruta en Oracle Cloud
    hash TEXT, -- Para verificación de integridad
    is_protected BOOLEAN DEFAULT FALSE, -- Si el acceso está restringido
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Tabla para objetivos de progreso scout
CREATE TABLE progress_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    area TEXT, -- Por ejemplo, 'afectividad', 'carácter', etc.
    unit_level TEXT, -- 'manada', 'tropa', etc.
    is_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para el seguimiento del progreso de los usuarios
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID NOT NULL REFERENCES progress_goals(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('en_progreso', 'completado', 'aprobado')),
    date_completed DATE,
    approved_by UUID REFERENCES users(id), -- Dirigente que aprobó
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, goal_id)
);

-- Insertar datos iniciales
INSERT INTO development_areas (name, description) VALUES
('afectividad', 'Desarrollo de la afectividad'),
('carácter', 'Desarrollo del carácter'),
('corporalidad', 'Desarrollo de la corporalidad'),
('creatividad', 'Desarrollo de la creatividad'),
('espiritualidad', 'Desarrollo de la espiritualidad'),
('sociabilidad', 'Desarrollo de la sociabilidad');

INSERT INTO activity_objectives (name, description) VALUES
('confianza', 'Desarrollo de la confianza entre pares'),
('comunicación', 'Mejora de habilidades de comunicación'),
('trabajo en equipo', 'Fortalecimiento del trabajo colaborativo'),
('creatividad', 'Estímulo a la generación de ideas'),
('memoria', 'Desarrollo de la capacidad de recordar'),
('observación', 'Agudizar la capacidad de percibir'),
('orientación', 'Desarrollo de la noción espacial'),
('agilidad', 'Mejora de la coordinación y destreza'),
('equilibrio', 'Desarrollo de la coordinación corporal');

INSERT INTO locations (name, description) VALUES
('Exterior', 'Lugares al aire libre'),
('Campo Abierto', 'Áreas abiertas para grandes actividades'),
('Bosque', 'Zonas boscosas'),
('Cerro', 'Terrenos elevados'),
('Río', 'Áreas ribereñas'),
('Montaña', 'Zonas montañosas'),
('Campo Delimitado', 'Áreas definidas y seguras'),
('Cancha', 'Áreas deportivas delimitadas'),
('Piscina', 'Áreas acuáticas'),
('Interior', 'Lugares cerrados'),
('Bus', 'Transporte'),
('Gimnasio', 'Áreas para actividades físicas'),
('Sala', 'Áreas de reunión pequeñas'),
('Salón', 'Áreas de reunión grandes');

-- Crear función para generar códigos de actas
CREATE OR REPLACE FUNCTION generate_acta_codigo()
RETURNS TEXT AS $$
DECLARE
    ano TEXT;
    next_num TEXT;
    codigo TEXT;
BEGIN
    -- Obtener el año actual
    ano := EXTRACT(YEAR FROM CURRENT_DATE);
    
    -- Obtener el siguiente número para este año
    SELECT LPAD(COALESCE(MAX(SUBSTRING(codigo FROM 9 FOR 4))::INTEGER, 0) + 1, 4, '0') 
    INTO next_num 
    FROM actas 
    WHERE SUBSTRING(codigo FROM 5 FOR 4) = ano;
    
    -- Combinar para formar el código
    codigo := 'ACT-' || ano || '-' || next_num;
    
    RETURN codigo;
END;
$$ LANGUAGE plpgsql;

-- Activar Row Level Security en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_development_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE actas ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para cada tabla

-- Políticas para usuarios
-- Usuarios pueden ver su propio perfil
CREATE POLICY user_own_profile_policy ON users
    FOR SELECT TO authenticated
    USING (id = auth.uid());

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY user_update_own_profile_policy ON users
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Los apoderados pueden ver a sus niños
CREATE POLICY guardian_can_see_children ON users
    FOR SELECT TO authenticated
    USING (
        id IN (SELECT user_id FROM user_guardians WHERE guardian_id = auth.uid())
    );

-- Los dirigentes pueden ver a los usuarios en su unidad
CREATE POLICY leader_can_see_unit_users ON users
    FOR SELECT TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante') 
        AND unit = (SELECT unit FROM users WHERE id = auth.uid())
    );

-- Solo admins y dirigentes pueden actualizar usuarios existentes
CREATE POLICY admin_manage_users ON users
    FOR UPDATE TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Solo admins y dirigentes pueden eliminar usuarios
CREATE POLICY admin_delete_users ON users
    FOR DELETE TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Política para permitir inserción de perfiles de usuarios nuevos
-- Esta política permite que cuentas autenticadas inserten su propio perfil
CREATE POLICY user_insert_own_profile_policy ON users
    FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());

-- Alternativamente, podemos crear un trigger para manejar la creación automática de perfiles
-- Función para crear perfil de usuario automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, first_name, paternal_last_name, maternal_last_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'paternal_last_name',
    NEW.raw_user_meta_data->>'maternal_last_name',
    NEW.email,
    'lobato (a)' -- rol por defecto
  );
  RETURN NEW;
END;
$$;

-- Asociar el trigger a la tabla de autenticación
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Políticas para la relación user_guardians
CREATE POLICY user_guardians_select_policy ON user_guardians
    FOR SELECT TO authenticated
    USING (
        guardian_id = auth.uid() OR 
        user_id = auth.uid()
    );

CREATE POLICY user_guardians_modify_policy ON user_guardians
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente')
    );

-- Políticas para artículos
-- Todos pueden ver artículos publicados
CREATE POLICY articles_view_policy ON articles
    FOR SELECT TO authenticated
    USING (status = 'published');

-- Autores pueden ver sus artículos sin importar el estado
CREATE POLICY articles_author_view_policy ON articles
    FOR SELECT TO authenticated
    USING (author_id = auth.uid());

-- Autores pueden crear artículos
CREATE POLICY articles_create_policy ON articles
    FOR INSERT TO authenticated
    WITH CHECK (author_id = auth.uid());

-- Autores pueden actualizar sus artículos
CREATE POLICY articles_update_policy ON articles
    FOR UPDATE TO authenticated
    USING (author_id = auth.uid());

-- Autores pueden eliminar sus artículos
CREATE POLICY articles_delete_policy ON articles
    FOR DELETE TO authenticated
    USING (author_id = auth.uid());

-- Políticas para relaciones de artículos
CREATE POLICY article_units_policy ON article_units
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_units.article_id 
            AND articles.author_id = auth.uid()
        )
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_units.article_id 
            AND articles.author_id = auth.uid()
        )
    );

CREATE POLICY article_development_areas_policy ON article_development_areas
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_development_areas.article_id 
            AND articles.author_id = auth.uid()
        )
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_development_areas.article_id 
            AND articles.author_id = auth.uid()
        )
    );

CREATE POLICY article_objectives_policy ON article_objectives
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_objectives.article_id 
            AND articles.author_id = auth.uid()
        )
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_objectives.article_id 
            AND articles.author_id = auth.uid()
        )
    );

CREATE POLICY article_locations_policy ON article_locations
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_locations.article_id 
            AND articles.author_id = auth.uid()
        )
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'author') OR
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_locations.article_id 
            AND articles.author_id = auth.uid()
        )
    );

-- Políticas para tablas de soporte
CREATE POLICY development_areas_policy ON development_areas
    FOR ALL TO authenticated
    USING ((SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente'));

CREATE POLICY activity_objectives_policy ON activity_objectives
    FOR ALL TO authenticated
    USING ((SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente'));

CREATE POLICY locations_policy ON locations
    FOR ALL TO authenticated
    USING ((SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente'));

-- Políticas para inventario
-- Todos los autenticados pueden ver inventario
CREATE POLICY inventory_view_policy ON inventory_items
    FOR SELECT TO authenticated
    USING (TRUE);

-- Solo admin y roles específicos pueden modificar inventario
CREATE POLICY inventory_modify_policy ON inventory_items
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante', 'tesorera')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante', 'tesorera')
    );

-- Políticas para transacciones financieras
-- Todos los autenticados pueden ver transacciones
CREATE POLICY transactions_view_policy ON transactions
    FOR SELECT TO authenticated
    USING (TRUE);

-- Solo admin, tesorera y roles específicos pueden crear/modificar transacciones
CREATE POLICY transactions_modify_policy ON transactions
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'tesorera', 'representante')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'tesorera', 'representante')
    );

-- Políticas para actas
-- Actas públicas son visibles para todos
CREATE POLICY actas_public_view_policy ON actas
    FOR SELECT TO authenticated
    USING (confidencialidad = 'Pública');

-- Actas públicas internas son visibles para apoderados, dirigentes, etc.
CREATE POLICY actas_internal_view_policy ON actas
    FOR SELECT TO authenticated
    USING (
        confidencialidad = 'Pública Interna' AND 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'dirigente', 'admin', 'representante')
    );

-- Actas restringidas solo para dirigentes y directiva
CREATE POLICY actas_restricted_view_policy ON actas
    FOR SELECT TO authenticated
    USING (
        confidencialidad = 'Restringida' AND 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante', 'presidente', 'secretario', 'tesorera')
    );

-- Actas confidenciales solo para admins
CREATE POLICY actas_confidential_view_policy ON actas
    FOR SELECT TO authenticated
    USING (
        confidencialidad = 'Confidencial' AND 
        (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    );

-- Crear actas solo para roles autorizados
CREATE POLICY actas_create_policy ON actas
    FOR INSERT TO authenticated
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante', 'presidente', 'secretario')
    );

-- Actualizar actas solo para creadores o roles autorizados
CREATE POLICY actas_update_policy ON actas
    FOR UPDATE TO authenticated
    USING (
        ingresado_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Políticas para participantes de actas
-- Ver participantes de actas que pueden ver
CREATE POLICY acta_participants_view_policy ON acta_participants
    FOR SELECT TO authenticated
    USING (
        acta_id IN (
            SELECT id FROM actas 
            WHERE 
                confidencialidad = 'Pública' 
                OR (confidencialidad = 'Pública Interna' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'dirigente', 'admin', 'representante'))
                OR (confidencialidad = 'Restringida' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante', 'presidente', 'secretario', 'tesorera'))
                OR (confidencialidad = 'Confidencial' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin')
        )
    );

-- Solo admins y dirigentes pueden gestionar participantes
CREATE POLICY acta_participants_manage_policy ON acta_participants
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Políticas para acciones de actas
-- Ver acciones de actas que pueden ver
CREATE POLICY acta_actions_view_policy ON acta_actions
    FOR SELECT TO authenticated
    USING (
        acta_id IN (
            SELECT id FROM actas 
            WHERE 
                confidencialidad = 'Pública' 
                OR (confidencialidad = 'Pública Interna' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'dirigente', 'admin', 'representante'))
                OR (confidencialidad = 'Restringida' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante', 'presidente', 'secretario', 'tesorera'))
                OR (confidencialidad = 'Confidencial' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin')
        )
    );

-- Responsables y admins pueden actualizar sus acciones
CREATE POLICY acta_actions_update_policy ON acta_actions
    FOR UPDATE TO authenticated
    USING (
        responsible_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Políticas para temas de actas
CREATE POLICY acta_topics_view_policy ON acta_topics
    FOR SELECT TO authenticated
    USING (
        acta_id IN (
            SELECT id FROM actas 
            WHERE 
                confidencialidad = 'Pública' 
                OR (confidencialidad = 'Pública Interna' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'dirigente', 'admin', 'representante'))
                OR (confidencialidad = 'Restringida' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante', 'presidente', 'secretario', 'tesorera'))
                OR (confidencialidad = 'Confidencial' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin')
        )
    );

-- Actualizar temas de actas
CREATE POLICY acta_topics_modify_policy ON acta_topics
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante') OR
        EXISTS (
            SELECT 1 FROM actas
            WHERE actas.id = acta_topics.acta_id
            AND actas.ingresado_id = auth.uid()
        )
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante') OR
        EXISTS (
            SELECT 1 FROM actas
            WHERE actas.id = acta_topics.acta_id
            AND actas.ingresado_id = auth.uid()
        )
    );

-- Políticas para adjuntos de actas
-- Ver adjuntos de actas que pueden ver
CREATE POLICY acta_attachments_view_policy ON acta_attachments
    FOR SELECT TO authenticated
    USING (
        acta_id IN (
            SELECT id FROM actas 
            WHERE 
                confidencialidad = 'Pública' 
                OR (confidencialidad = 'Pública Interna' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'dirigente', 'admin', 'representante'))
                OR (confidencialidad = 'Restringida' AND (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin', 'representante', 'presidente', 'secretario', 'tesorera'))
                OR (confidencialidad = 'Confidencial' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin')
        )
    );

-- Solo admins y dirigentes pueden gestionar adjuntos
CREATE POLICY acta_attachments_manage_policy ON acta_attachments
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Políticas para objetivos de progreso
-- Todos pueden ver objetivos de progreso
CREATE POLICY progress_goals_view_policy ON progress_goals
    FOR SELECT TO authenticated
    USING (TRUE);

-- Solo admins y dirigentes pueden gestionar objetivos
CREATE POLICY progress_goals_manage_policy ON progress_goals
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente')
    );

-- Políticas para progreso de usuarios
-- Usuarios pueden ver su propio progreso
CREATE POLICY user_progress_own_view_policy ON user_progress
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Apoderados pueden ver progreso de sus niños
CREATE POLICY guardian_progress_view_policy ON user_progress
    FOR SELECT TO authenticated
    USING (
        user_id IN (SELECT user_id FROM user_guardians WHERE guardian_id = auth.uid())
    );

-- Dirigentes pueden ver progreso de usuarios en su unidad
CREATE POLICY leader_progress_view_policy ON user_progress
    FOR SELECT TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin') AND
        user_id IN (SELECT id FROM users WHERE unit = (SELECT unit FROM users WHERE id = auth.uid()))
    );

-- Dirigentes pueden registrar progreso de usuarios en su unidad
CREATE POLICY leader_progress_record_policy ON user_progress
    FOR INSERT TO authenticated
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin')
    );

-- Actualizar solo admins y dirigentes
CREATE POLICY leader_progress_update_policy ON user_progress
    FOR UPDATE TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin')
    );