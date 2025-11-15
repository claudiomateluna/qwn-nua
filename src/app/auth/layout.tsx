'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/modern-button';
import PublicNavbar from '@/components/public-navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ffc41d]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2c3e50] to-[#ffc41d]">
      <div className="max-w-[1080px] mx-auto w-full flex-grow">
        <main className="flex items-center justify-center p-4 h-full">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}