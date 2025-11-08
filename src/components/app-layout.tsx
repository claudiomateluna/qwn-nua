'use client'

import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import Image from 'next/image'
import SidebarDrawer from './ui/sidebar-drawer'
import '../app/globals.css'

// --- Tipos de Datos ---
type Profile = { 
  role: string | null; 
  first_name?: string | null; 
  last_name?: string | null; 
  must_change_password?: boolean; 
}

type View = 'scanner' | 'admin' | 'faltantes' | 'rechazos' | 'recepciones-completadas' | 'ticket-search' | 'reportar-faltante';

interface Props {
  session: Session;
  profile: Profile;
  onBack?: () => void;
  children: React.ReactNode;
  currentView: View;
  setCurrentView: (view: View) => void;
}

// --- Componente Principal del Layout ---
export default function AppLayout({ session, profile, onBack, children, currentView, setCurrentView }: Props) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [faltantesCount, setFaltantesCount] = useState(0);
  const [rechazosCount, setRechazosCount] = useState(0);
  const [mustChangePassword, setMustChangePassword] = useState(profile?.must_change_password || false);

  const supabase = createClientComponentClient();

  // Role-based access control functions
  const userRole = profile?.role || '';

  // Administración ('Store Supervisor', 'Warehouse Operator', 'Warehouse Supervisor', 'administrador')
  const canAccessAdministracion = ['Store Supervisor', 'Warehouse Operator', 'Warehouse Supervisor', 'administrador'].includes(userRole);

  // Adm. Faltantes ('Warehouse Operator', 'Warehouse Supervisor', 'administrador')
  const canAccessAdmFaltantes = ['Warehouse Operator', 'Warehouse Supervisor', 'administrador'].includes(userRole);

  // Gestión de Rechazos ('Warehouse Operator', 'Warehouse Supervisor', 'administrador')
  const canAccessGestionRechazos = ['Warehouse Operator', 'Warehouse Supervisor', 'administrador'].includes(userRole);

  // Effect for Faltantes
  useEffect(() => {
    const fetchFaltantesCount = async () => {
        if (canAccessAdmFaltantes) {
            const { count, error } = await supabase.from('faltantes').select('*', { count: 'exact', head: true }).eq('gestionado', false);
            if (error) {
                console.error('Error fetching faltantes count:', error);
            } else {
                setFaltantesCount(count || 0);
            }
        }
    };

    fetchFaltantesCount();
    const channel = supabase.channel('faltantes-count').on('postgres_changes', { event: '*', schema: 'public', table: 'faltantes' }, fetchFaltantesCount).subscribe();
    return () => { supabase.removeChannel(channel); }
  }, [canAccessAdmFaltantes, supabase]);

  // Effect for Rechazos (Mirroring Faltantes logic)
  useEffect(() => {
    const fetchRechazosCount = async () => {
        if (canAccessGestionRechazos) {
            const { count, error } = await supabase.from('rechazos').select('*', { count: 'exact', head: true }).eq('gestionado', false);
            if (error) {
                console.error('Error fetching rechazos count:', error);
            } else {
                setRechazosCount(count || 0);
            }
        }
    };

    fetchRechazosCount();
    const channel = supabase.channel('rechazos-count').on('postgres_changes', { event: '*', schema: 'public', table: 'rechazos' }, fetchRechazosCount).subscribe();
    return () => { supabase.removeChannel(channel); }
  }, [canAccessGestionRechazos, supabase]);

  const canAccessGestionRecepciones = ['administrador', 'Warehouse Supervisor', 'Store Supervisor', 'Warehouse Operator'].includes(userRole);

  const getUserFirstAndLastName = () => ({ firstName: profile?.first_name || '', lastName: profile?.last_name || '' });

  // Verificar si la vista actual es de administración de rechazos, faltantes o recepciones completadas
  const isFullWidthView = currentView === 'faltantes' || currentView === 'rechazos' || currentView === 'recepciones-completadas';

  return (
    <div>
      <SidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      <header style={{ 
        display: 'flow-root',
        alignItems: 'center',
        borderBottom: '1px solid var(--clr2)',
        padding: '5px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--clr1)',
        zIndex: 10,
        color: 'var(--clr4)'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 10px'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }} id="menu-button" onClick={() => setIsMenuOpen(true)}>
            <div style={{ margin: 0, fontSize: '1.5rem', color: 'var(--clr4)' }}>Nua Mana</div>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--clr4)' }}>Nua Mana</h2>
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--clr4)' }}>
              Bienvenido {getUserFirstAndLastName().firstName} {getUserFirstAndLastName().lastName ? ` ${getUserFirstAndLastName().lastName}` : ''}
            </p>
          </div>
        </div>
      </header>
      
      <main style={{ 
        padding: '10px',
        maxWidth: '1200px',
        margin: '0 auto'
      }} className={`${isFullWidthView ? '' : 'max-w-[1200px]'}`}>
        {children}
      </main>
    </div>
  );
}