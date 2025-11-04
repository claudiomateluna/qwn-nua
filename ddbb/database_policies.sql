-- Configuración de políticas de seguridad para la base de datos de Nua Mana

-- Habilitar Row Level Security en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE actas ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_development_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla de usuarios
-- Los usuarios pueden ver su propio perfil
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

-- Solo admins y dirigentes pueden crear/actualizar usuarios
CREATE POLICY admin_manage_users ON users
    FOR ALL TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'dirigente', 'representante')
    );

-- Políticas para artículos
-- Todos pueden ver artículos publicados
CREATE POLICY articles_public_view_policy ON articles
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

-- Políticas para inventario
-- Todos los autenticados pueden ver el inventario
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
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin') AND
        (SELECT unit FROM users WHERE id = (SELECT unit FROM users WHERE id = auth.uid()))
    )
    WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin')
    );

-- Actualizar solo admins y dirigentes
CREATE POLICY leader_progress_update_policy ON user_progress
    FOR UPDATE TO authenticated
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('dirigente', 'admin')
    );