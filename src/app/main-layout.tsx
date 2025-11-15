'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PublicNavbar from '@/components/public-navbar';
import Footer from '@/components/footer';
import { useAuth } from '@/hooks/use-auth';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { loading } = useAuth();

  // Don't show header/footer if we're on auth routes
  const isAuthPage = pathname?.startsWith('/auth');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <>
      {!isAuthPage && <PublicNavbar />}
      <div className="pt-23 bg-gradient-to-r from-[#1d1d1d] to-[#cb3327]/60 backdrop-blur-md">
        {children}
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}