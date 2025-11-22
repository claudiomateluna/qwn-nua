'use client';

import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import SidebarDrawer from './ui/sidebar-drawer';
import Navbar from './navbar';

interface Props {
  session: Session;
  children: React.ReactNode;
}

export default function AppLayout({ session, children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <Navbar />

      <main className="max-w-[1080px] mx-auto py-8 px-4 pt-20">
        {children}
      </main>
    </div>
  );
}