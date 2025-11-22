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

  // Don't show PublicNavbar and Footer if we're in markdown content sections
  const isMarkdownContentPage = pathname?.startsWith('/acerca-de') || pathname?.startsWith('/lo-que-hacemos');

  return (
    <>
      {!isAuthPage && !isMarkdownContentPage && <PublicNavbar />}
      <div>
        {children}
      </div>
      {!isAuthPage && !isMarkdownContentPage && <Footer />}
    </>
  );
}