'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NuaManaPublicNavbar from '@/components/nuamana-public-navbar';
import Hero from '@/components/hero';
import Testimonials from '@/components/testimonials';

export default function HomePage() {
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NuaManaPublicNavbar />

      <Hero />

      <main className="mx-auto w-full pt-10">

      {/* Features Section */}
      <section className="max-w-[1080px] py-5 bg-white mx-auto">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-6">¿Qué hacemos?</h2>
          <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Descubre las actividades que realizamos en Nua Mana para el desarrollo integral de las niñas, niños y jóvenes</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "LOGRAMOS", 
                description: "Empoderamiento Juvenil",
                image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/pag_Logramos.jpg"
              },
              { 
                title: "CREAMOS", 
                description: "Ciudadan@s Activ@s",
                image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/pag_Creamos.jpg"
              },
              { 
                title: "CULTIVAMOS", 
                description: "Valores y Habilidades",
                image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/pag_Cultivamos.jpg"
              },
              { 
                title: "ABRAZAMOS", 
                description: "Educación para la Paz",
                image: "https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/pag_Abrazamos.jpg"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="feature-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl relative"
                style={{ 
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <Card className="bg-transparent border-0 shadow-none w-full h-full flex items-center justify-center">
                  <div className="feature-card-content">
                    <CardHeader className="p-0 text-center">
                      <CardTitle className="text-2xl text-[#e74c3c]">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4 text-center">
                      <p className="text-gray-700">{item.description}</p>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2c3e50] to-[#e74c3c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar tu aventura?</h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto text-[#ffc41d]">
            Únete a la comunidad scout más grande de la región y comienza tu camino de crecimiento personal
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => router.push('/auth/signup')} 
              size="xl"
              variant="secondary"
              className="text-[#2c3e50]"
            >
              ¡Únete Ahora!
            </Button>
            <Button 
              onClick={() => router.push('/auth/signin')} 
              size="xl"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#2c3e50]"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c3e50] text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-[#e74c3c] to-[#ffc41d] text-white w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl">
              N
            </div>
          </div>
          <p className="text-xl">Nua Mana - Guías y Scouts</p>
          <p className="mt-4 text-[#ffc41d]">Una nueva aventura</p>
          <p className="mt-8">© {new Date().getFullYear()} Nua Mana - Guías y Scouts. Todos los derechos reservados.</p>
          <p className="mt-2 text-[#ffc41d]">Educando jóvenes para construir un mundo mejor</p>
        </div>
      </footer>
    </main> {/* Close the main container */}
    </div>
  );
}