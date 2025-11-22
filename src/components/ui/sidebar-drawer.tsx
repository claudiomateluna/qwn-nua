'use client';

import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/modern-button';
import { Menu, Home, Instagram, Facebook, Youtube, X, User } from 'lucide-react';
import { IconoInicio, IconoAcercaDe, IconoAcercaDeQuienesSomos, IconoAcercaDeNuestraHistoria, IconoAcercaDeMisionVision, IconoAcercaDeNuestroEquipo, IconoLoQueHacemos, ArrowLeftIcon, IconoInstagram, IconoFacebook, IconoYoutube, IconoTiktok, IconoGoogle, IconoEmail, IconoWhatsApp } from '@/components/ui/custom-icons';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarDrawer = ({ isOpen, onClose }: SidebarDrawerProps) => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'main' | 'acerca-de' | 'lo-que-hacemos'>('main');

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

  // Sub-menu items for "Acerca de"
  const acercaDeItems = [
    { title: "Quiénes Somos", action: () => router.push('/acerca-de/quienes-somos'), icon: IconoAcercaDeQuienesSomos },
    { title: "Nuestra Historia", action: () => router.push('/acerca-de/nuestra-historia'), icon: IconoAcercaDeNuestraHistoria },
    { title: "Misión y Visión", action: () => router.push('/acerca-de/mision-y-vision'), icon: IconoAcercaDeMisionVision },
    { title: "Nuestro Equipo", action: () => router.push('/acerca-de/nuestro-equipo'), icon: IconoAcercaDeNuestroEquipo },
    { title: "Nuestros Apoderados", action: () => router.push('/acerca-de/nuestros-apoderados'), icon: User },
    { title: "Institución Patrocinante", action: () => router.push('/acerca-de/institucion-patrocinante'), icon: Home },
  ];

  // Sub-menu items for "Lo que hacemos"
  const loQueHacemosItems = [
    { title: "Ley y Promesa", action: () => router.push('/lo-que-hacemos/ley-y-promesa'), icon: Menu },
    { title: "El Método Scout", action: () => router.push('/lo-que-hacemos/el-metodo-scout'), icon: Menu },
    { title: "Aprender Haciendo", action: () => router.push('/lo-que-hacemos/aprender-haciendo'), icon: Menu },
    { title: "Sistema de Equipos", action: () => router.push('/lo-que-hacemos/sistema-de-equipos'), icon: Menu },
    { title: "Vida al Aire Libre", action: () => router.push('/lo-que-hacemos/vida-al-aire-libre'), icon: Home },
    { title: "Habilidades y Técnicas", action: () => router.push('/lo-que-hacemos/habilidades-y-tecnicas'), icon: Menu },
    { title: "Vida Reflexiva", action: () => router.push('/lo-que-hacemos/vida-reflexiva'), icon: Menu },
    { title: "Programa y Actividades", action: () => router.push('/lo-que-hacemos/programa-y-actividades'), icon: Menu },
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
                {currentView !== 'main' && (
                  <button
                    onClick={() => setCurrentView('main')}
                    className="mr-2 p-1 rounded hover:bg-[#34495e]/50"
                    aria-label="Volver al menú principal"
                  >
                    <ArrowLeftIcon className="w-5 h-5 text-white" />
                  </button>
                )}
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
              </div>
              <button
                onClick={onClose}
                className="sidebar-close-btn text-white hover:text-(--clr7) focus:outline-none transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Section header when in sub-menu */}
            {currentView === 'acerca-de' && (
              <div className="ml-2 mt-2 mb-4">
                <h2
                  className="text-white font-bold text-lg cursor-pointer hover:text-(--clr8) transition-colors"
                  onClick={() => {
                    router.push('/acerca-de');
                    onClose();
                  }}
                >
                  Acerca de
                </h2>
              </div>
            )}
            {currentView === 'lo-que-hacemos' && (
              <div className="ml-2 mt-2 mb-4">
                <h2
                  className="text-white font-bold text-lg cursor-pointer hover:text-(--clr8) transition-colors"
                  onClick={() => {
                    router.push('/lo-que-hacemos');
                    onClose();
                  }}
                >
                  Lo que hacemos
                </h2>
              </div>
            )}
          </div>

          {/* Contenido del drawer */}
          <div className="flex-1 flex flex-col p-2 overflow-y-auto">
            {currentView === 'main' && (
              <>
                <nav className="space-y-1 mb-4">
                  <button
                    onClick={() => {
                      router.push('/');
                      onClose();
                    }}
                    className="sidebar-menu-item flex items-center w-full p-2 text-left rounded-lg transition-all duration-200"
                  >
                    <IconoInicio className="w-10 h-10 mr-3" />
                    <span className="font-medium">Inicio</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('acerca-de')}
                    className="sidebar-menu-item flex items-center w-full p-2 text-left rounded-lg transition-all duration-200"
                  >
                    <IconoAcercaDe className="w-10 h-10 mr-3" />
                    <span className="font-medium">Acerca de</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('lo-que-hacemos')}
                    className="sidebar-menu-item flex items-center w-full p-2 text-left rounded-lg transition-all duration-200"
                  >
                    <IconoLoQueHacemos className="w-10 h-10 mr-3" />
                    <span className="font-medium">Lo que hacemos</span>
                  </button>
                </nav>

                <div className="mt-auto pt-3 border-t border-[#34495e]">
                  <button
                    onClick={() => {
                      router.push('/auth/signin');
                      onClose();
                    }}
                    className="sidebar-login-btn w-full mb-2 px-4 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Iniciar Sesión
                  </button>

                  {/* Social links in mobile menu */}
                  <div className="flex justify-center space-x-1 pt-2">
                    <a
                      href="https://www.instagram.com/gruponuamana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoInstagram className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                    <a
                      href="https://facebook.com/gruponuamana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoFacebook className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                    <a
                      href="https://youtube.com/@gruponuamana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoYoutube className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                    <a
                      href="https://tiktok.com/@gruponuamana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoTiktok className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                    <a
                      href="https://www.google.com/search?q=Guias+y+Scouts+Nua+Mana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoGoogle className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                    <a
                      href="https://wa.me/+56966896001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoWhatsApp className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                    <a
                      href="mailto:contacto@nuamana.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn text-white hover:text-(--clr8) transition-colors p-2 rounded-full hover:bg-(--clr5)/50"
                    >
                      <IconoEmail className="w-5 h-5" strokeWidth={0.2} />
                    </a>
                  </div>
                </div>
              </>
            )}

            {currentView === 'acerca-de' && (
              <nav className="space-y-1 mb-8">
                {acercaDeItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className="sidebar-menu-item flex items-center w-full p-2 text-left rounded-lg transition-all duration-200"
                  >
                    {React.createElement(item.icon, { className: "w-10 h-10 mr-3" })}
                    <span className="font-medium">{item.title}</span>
                  </button>
                ))}
              </nav>
            )}

            {currentView === 'lo-que-hacemos' && (
              <nav className="space-y-1 mb-8">
                {loQueHacemosItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className="sidebar-menu-item flex items-center w-full p-2 text-left rounded-lg transition-all duration-200"
                  >
                    {React.createElement(item.icon, { className: "w-10 h-10 mr-3" })}
                    <span className="font-medium">{item.title}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Footer del drawer */}
          <div className="sidebar-footer p-2 text-center text-xs text-gray-400 border-t border-[#34495e]">
            🅮 {new Date().getFullYear()} Guías y Scouts Nua Mana.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;