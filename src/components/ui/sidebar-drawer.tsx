'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import { Menu, Home, Instagram, Facebook, Youtube, X } from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarDrawer = ({ isOpen, onClose }: SidebarDrawerProps) => {
  const router = useRouter();
  
  // Cerrar el drawer al presionar Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Agregar clase al body para prevenir scroll
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Remover clase del body al desmontar
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { title: "Inicio", icon: Home, action: () => router.push('/') },
    { title: "Acerca de", icon: Home, action: () => router.push('/acerca-de') },
    { title: "Lo que hacemos", icon: Home, action: () => router.push('/lo-que-hacemos') },
  ];

  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div 
        className="sidebar-backdrop absolute inset-0"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`sidebar-drawer fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] z-100 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del drawer con botón de cierre */}
          <div className="sidebar-header p-2 border-b border-[#34495e]">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="px-1">
                  {/* Second: Logo */}
                    <a href="/" className="menu-logo flex items-center">
                      <img 
                        src="/images/logos/LogoColor.svg" 
                        alt="Logo Guías y Scouts Nua Mana" 
                        className="h-12 object-contain" 
                        style={{ maxHeight: '150px' }}
                      />
                    </a>
                </div>
                <div>
                  <div className="text-[--clr4] text-xs">Guías y Scouts</div>
                  <div className="font-bold uppercase leading-[2em]">Nua Mana</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="sidebar-close-btn text-white hover:text-[#ffc41d] focus:outline-none transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Contenido del drawer */}
          <div className="flex-1 flex flex-col py-6 px-4 overflow-y-auto">
            <nav className="space-y-1 mb-8">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="sidebar-menu-item flex items-center w-full px-4 py-3 text-left rounded-lg transition-all duration-200"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.title}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t border-[#34495e]">
              <button
                onClick={() => {
                  router.push('/auth/signin');
                  onClose();
                }}
                className="sidebar-login-btn w-full mb-6 px-4 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Iniciar Sesión
              </button>
              
              {/* Social links in mobile menu */}
              <div className="flex justify-center space-x-7 pt-4">
                <a 
                  href="https://www.instagram.com/gruponuamana/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sidebar-social-btn text-white hover:text-[#ffc41d] transition-colors p-2 rounded-full hover:bg-[#34495e]/50"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/gruponuamana" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sidebar-social-btn text-white hover:text-[#ffc41d] transition-colors p-2 rounded-full hover:bg-[#34495e]/50"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@gruponuamana" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sidebar-social-btn text-white hover:text-[#ffc41d] transition-colors p-2 rounded-full hover:bg-[#34495e]/50"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Footer del drawer */}
          <div className="sidebar-footer p-4 text-center text-xs text-gray-400 border-t border-[#34495e]">
            © {new Date().getFullYear()} Nua Mana. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;