'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/modern-button';
import { Menu, Home, User, FileText, Package, Coins, FileInput, Trophy, LogOut, MessageCircle, Instagram, Facebook, Youtube, LogIn } from 'lucide-react';
import { IconoRRSSInstagram, IconoRRSSFacebook, IconoRRSSYoutube, IconoRRSSTiktok, IconoRRSSGoogle, IconoRRSSEmail, IconoRRSSWhatsApp } from '@/components/ui/custom-icons';
import SidebarDrawer from '@/components/ui/sidebar-drawer';

const NuaManaNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: "Inicio", icon: Home, action: () => router.push('/') },
    { title: "Usuarios", icon: User, action: () => router.push('/dashboard/users'), roleRequired: 'admin' },
    { title: "Artículos", icon: FileText, action: () => router.push('/dashboard/articles'), roleRequired: 'admin' },
    { title: "Inventario", icon: Package, action: () => router.push('/dashboard/inventory'), roleRequired: 'admin' },
    { title: "Tesorería", icon: Coins, action: () => router.push('/dashboard/treasury'), roleRequired: 'admin' },
    { title: "Actas", icon: FileInput, action: () => router.push('/dashboard/actas'), roleRequired: 'admin' },
    { title: "Avances", icon: Trophy, action: () => router.push('/dashboard/progress'), roleRequired: 'admin' }
  ];

  return (
    <>
      {/* Sidebar drawer menu */}
      <SidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      {/* Outer wrapper container with full width and background color */}
      <div style={{ width: '100%', backgroundColor: 'var(--clr4)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Top bar with social media and contact info - using CSS variables */}
          <div className="hidden md:flex" style={{ color: 'var(--clr1)', padding: '0.5rem 1rem', fontSize: '0.875rem', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Síguenos</span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="https://www.instagram.com/gruponuamana/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr7)', transition: 'color 0.3s' }}>
                  <Instagram width={16} height={16} />
                </a>
                <a href="https://facebook.com/gruponuamana" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr7)', transition: 'color 0.3s' }}>
                  <Facebook width={16} height={16} />
                </a>
                <a href="https://youtube.com/@gruponuamana" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr7)', transition: 'color 0.3s' }}>
                  <Youtube width={16} height={16} />
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a href="mailto:contacto@nuamana.cl" style={{ color: 'var(--clr7)', transition: 'color 0.3s' }}>
                Email
              </a>
              <a href="https://wa.me/+56966896001" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--clr7)', transition: 'color 0.3s' }}>
                <MessageCircle width={16} height={16} style={{ marginRight: '0.25rem' }} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Main navigation bar */}
          <header 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              transition: 'all 0.3s duration-300',
              backgroundColor: isScrolled 
                ? 'color-mix(in_oklab, var(--clr4), white 20%)' 
                : 'color-mix(in_oklab, var(--clr4), white 10%)',
              padding: isScrolled ? '0.75rem' : '1rem',
              marginTop: 0,
            } as React.CSSProperties}
          >
            <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '1080px' }}>
              {/* Horizontal flex container */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* First: Menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  style={{ color: 'var(--clr1)', marginRight: '1rem', display: 'none' } as React.CSSProperties}
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu width={24} height={24} />
                </Button>

                {/* Second: Logo */}
                <a href="/" style={{ marginRight: '1rem' }}>
                  <img 
                    src="/images/logos/logo-nuamana.webp" 
                    alt="Logo Guías y Scouts Nua Mana" 
                    style={{ height: '4rem', objectFit: 'contain', maxHeight: '3.5rem' }}
                  />
                </a>

                {/* Third: Text container with vertical stack */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '1.5rem' }}>
                  <div style={{ color: 'var(--clr2)', fontSize: '0.625rem', letterSpacing: '0.125rem' }}>Guías y Scouts</div>
                  <div style={{ color: 'var(--clr1)', fontWeight: 'bold', fontSize: '1.4em', lineHeight: 0.8 }}>Nua Mana</div>
                  <div style={{ color: 'var(--clr7)', fontSize: '0.8125rem' }}>Una nueva aventura</div>
                </div>

                {/* Fourth: Access buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: '1rem' }}>
                  {profile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: 'var(--clr1)' } as React.CSSProperties}
                      >
                        {profile.first_name}
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          border: '1px solid black',
                        } as React.CSSProperties}
                        onClick={() => {
                          // Redirigir a la página de signout para manejar el cierre de sesión
                          window.location.href = '/auth/signout';
                        }}
                      >
                        Salir
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push('/auth/signout')}
                      style={{ 
                        backgroundColor: 'var(--clr7)', 
                        color: 'var(--clr4)',
                        display: 'flex',
                        alignItems: 'center'
                      } as React.CSSProperties}
                    >
                      <LogIn width={16} height={16} style={{ marginRight: '0.5rem' }} />
                      Salir
                    </Button>
                  )}
                </div>

                {/* Fifth: Search button */}
                <div style={{ marginLeft: 'auto' }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ color: 'var(--clr1)' } as React.CSSProperties}
                    onClick={() => router.push('/search')}
                  >
                    <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Desktop Menu - now below the main header row */}
              <div style={{ marginTop: '1rem', display: 'none' } as React.CSSProperties}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      style={{ 
                        color: 'var(--clr1)',
                        backgroundColor: 'color-mix(in_oklab, var(--clr1), black 67%)',
                        borderRadius: '0.5rem',
                        transition: 'all 0.3s',
                        padding: '0.75rem 0.75rem'
                      } as React.CSSProperties}
                      onClick={item.action}
                    >
                      {item.title}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>
          </header>
          
          {/* Spacer to account for fixed header */}
          <div style={{ marginTop: '4rem' }} className={`${isScrolled ? 'md:mt-20' : 'md:mt-24'}`}></div>
        </div>
      </div>
    </>
  );
};

export default NuaManaNavbar;