'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import SidebarDrawer from '@/components/ui/sidebar-drawer';
import { Menu, Home, Instagram, Facebook, Youtube, MessageCircle, Mail, LogIn } from 'lucide-react';

interface MarkdownNavbarProps {
  currentPage: string;
}

const MarkdownNavbar = ({
  currentPage
}: MarkdownNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        aria-label="Encabezado de Sitio"
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md p-0 m-0'
            : 'bg-white/60 py-3'
        }`}
        >
          <div className="max-w-[1080px] mx-auto flex justify-between">
            <div className="flex justify-start gap-2 flex items-center">
              <div className="flex items-center border-r-2 border-[var(--clr7)] pl-2">
                {/* First: Menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--clr7)] bg-transparent hover:text-[var(--clr7)] hover:bg-transparent"
                  onClick={() => setIsOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </Button>

                {/* Sidebar Drawer */}
                <SidebarDrawer
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                />
              </div>
              <div className="flex items-center">
                {/* Second: Logo */}
                  <a href="/" className="header-logo">
                    <img
                      src="/images/logos/logo-nuamana.webp"
                      alt="Logo Guías y Scouts Nua Mana"
                      className="h-16 object-contain"
                      style={{ maxHeight: '60px' }}
                    />
                  </a>
              </div>
              <div className="flex flex-col justify-center header-text-box">
                <div className="text-xs text-[var(--clr2)] leading-[1.2em] lg:block">Guías y Scouts</div>
                <div className="text-[var(--clr7)] uppercase text-[1.6em] leading-[0.7em] header-nuamana">Nua Mana</div>
                <div className="text-[var(--clr2)] text-[0.95em] leading-none lg:block">Una nueva aventura</div>
              </div>
            </div>
            {/* third: Page title instead of social */}
            <div className="flex flex-col justify-center hidden lg:flex">
              <div className="text-[var(--clr5)] text-xl font-bold leading-[1.2em]">
                {currentPage}
              </div>
            </div>

            {/* Fifth: Login */}
            <div className="header-acceder flex items-center hidden lg:flex">
              <div className="flex items-center">
                <a href="/auth/signin" className="bg-transparent text-[var(--clr5)] hover:text-[var(--clr4)] text-base flex items-center">
                  <LogIn className="w-4 h-4 mr-1" />
                  Acceder
                </a>
              </div>
            </div>
            {/* Fifth: Search button */}
            <div className="flex items-center hidden lg:flex">
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--clr4)] hover:text-[var(--clr5)] bg-transparent hover:bg-transparent"
                  onClick={() => router.push('/buscar')}
                >
                  <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
      </header></>
  );
};

export default MarkdownNavbar;