-- Esquema completo para la base de datos de Nua Mana
-- Este esquema asume que el almacenamiento de archivos se hará exclusivamente en Oracle Cloud Infrastructure
-- La base de datos seguirá estando en Supabase (PostgreSQL)

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla de usuarios (con todos los campos según database_schema.md)
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

    -- Relación con apoderado
    guardian_id UUID REFERENCES users(id), -- Relación con apoderado (si es NNJ)
    
    -- Campos del sistema
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    -- URL de imagen almacenada en Oracle Cloud Infrastructure
    image_url TEXT
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

-- Tabla de artículos (con campos condicionales según campos_condicionales.md)
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
    duration_minutes INTEGER, -- Para actividades
    min_participants INTEGER, -- Mínimo de participantes
    priority_participants TEXT CHECK (priority_participants IN ('02', '04', '06', '08', '10', '12', '16', '24', '32', 'individual')), -- Prioridad de participantes
    
    -- Metadatos para campos condicionales
    metadata JSONB, -- Para campos condicionales dinámicos según categoría
    
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

-- Tabla de áreas de desarrollo (desde categorias.md)
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

-- Tabla de actas (según actas.md)
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
    user_id UUID NOT NULL REFERENCES users(id),
    name_override TEXT, -- Nombre si usuario no está registrado
    email_override TEXT, -- Email si usuario no está registrado
    rol_en_reunion TEXT NOT NULL CHECK (rol_en_reunion IN ('Owner', 'TomadorNotas', 'Asistente', 'Invitado')) DEFAULT 'Asistente',
    asistencia TEXT CHECK (asistencia IN ('Confirmado', 'Presente', 'Ausente', 'Remoto')),
    firma_digital_url TEXT, -- URL de firma digital en Oracle Cloud
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(acta_id, user_id)
);

-- Tabla de acciones/asuntos pendientes de actas
CREATE TABLE acta_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    acta_id UUID NOT NULL REFERENCES actas(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    responsable_id UUID REFERENCES users(id), -- Persona responsable de la acción
    fecha_compromiso DATE,
    prioridad TEXT CHECK (prioridad IN ('Alta', 'Media', 'Baja')) DEFAULT 'Media',
    estado TEXT CHECK (estado IN ('Abierta', 'En Progreso', 'Bloqueada', 'Cumplida', 'Vencida')) DEFAULT 'Abierta',
    evidencia_url TEXT, -- Evidencia de cumplimiento (almacenada en Oracle Cloud)
    dependencias JSONB, -- Array de IDs de otras acciones de las que depende
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
('Rio', 'Áreas ribereñas'),
('Montaña', 'Zonas montañosas'),
('Campo Delimitado', 'Áreas definidas y seguras'),
('Cancha', 'Áreas deportivas delimitadas'),
('Piscina', 'Áreas acuáticas'),
('Interior', 'Lugares cerrados'),
('Bus', 'Transporte'),
('Gimnasio', 'Áreas para actividades físicas'),
('Sala', 'Áreas de reunión pequeñas'),
('Salon', 'Áreas de reunión grandes');

-- Activar Row Level Security (RLS) para todas las tablas
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

-- Crear función para generar códigos de actas en el formato ACT-AAAA-####
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