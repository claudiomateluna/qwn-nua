'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import SidebarDrawer from '@/components/ui/sidebar-drawer';
import { Menu, Home, LogIn } from 'lucide-react';
import { IconoRRSSInstagram, IconoRRSSFacebook, IconoRRSSYoutube, IconoRRSSTiktok, IconoRRSSGoogle, IconoRRSSEmail, IconoRRSSWhatsApp } from '@/components/ui/custom-icons';

const NuaManaPublicNavbar = () => {
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

  const menuItems = [
    { title: "Inicio", icon: Home, action: () => router.push('/') },
  ];

  return (
    <>
      <header
        aria-label="Encabezado de Sitio"
        className={`fixed top-0 left-0 right-0 w-full z-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-r from-[#1d1d1d] to-[#cb3327]/60 backdrop-blur-md shadow-xl p-0 m-0'
            : 'bg-transparent m-0 py-2'
        }`}
        >
          <div className="max-w-[1080px] mx-auto flex justify-between">
            <div className="flex justify-start gap-2 flex items-center">
              <div className="flex items-center border-r-2 border-[var(--clr8)] pl-2">
                {/* First: Menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white bg-transparent hover:text-[#ffc41d] hover:bg-transparent"
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
                <a href="/">
                  <div className="text-xs text-[var(--clr2)] leading-[1.6em]">Guías y Scouts</div>
                  <div className="text-white uppercase text-[1.6em] leading-[0.7em] header-nuamana">Nua Mana</div>
                  <div className="text-[var(--clr8)] leading-none">Una nueva aventura</div>
                </a>
              </div>
            </div>
            {/* third: Social */}
            <div className="flex flex-col justify-center hidden lg:flex">
              <div className="flex items-center header-rrss">
                <div className="flex items-center text-white text-sm">Síguenos</div>
                <a href="https://www.instagram.com/gruponuamana/" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSInstagram className="w-4 h-4" strokeWidth={0.2} />
                </a>
                <a href="https://facebook.com/gruponuamana" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSFacebook className="w-4 h-4" strokeWidth={0.2} />
                </a>
                <a href="https://youtube.com/@gruponuamana" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSYoutube className="w-4 h-4" strokeWidth={0.2} />
                </a>
                <a href="https://tiktok.com/@gruponuamana" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSTiktok className="w-4 h-4" strokeWidth={0.2} />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a href="https://www.google.com/search?q=Guias+y+Scouts+Nua+Mana" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSGoogle className="w-4 h-4 mr-1 text-[var(--clr8)]" strokeWidth={0.2} />
                </a>
                <a href="mailto:contacto@nuamana.cl" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSEmail className="w-4 h-4 mr-1 text-[var(--clr8)]" strokeWidth={0.2} />
                </a>
                <a href="https://wa.me/+56966896001" target="_blank" rel="noopener noreferrer" className="text-[#fff] hover:text-[#ffc41d] transition-colors">
                  <IconoRRSSWhatsApp className="w-4 h-4 mr-1 text-[var(--clr8)]" strokeWidth={0.2} />
                </a>
                <div className="flex items-center text-sm text-[var(--clr8)]">Contactactanos</div>
              </div>
            </div>

            {/* Fifth: Login */}
            <div className="header-acceder flex items-center hidden lg:flex">
              <div className="flex items-center">
                <a href="/auth/signin" className="bg-transparent text-[var(--clr8)] hover:text-white text-base flex items-center">
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
                  className="text-white hover:text-[var(--clr8)] bg-transparent hover:bg-transparent"
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

export default NuaManaPublicNavbar;