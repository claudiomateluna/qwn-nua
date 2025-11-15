'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/modern-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicNavbar from '@/components/public-navbar';
import Hero from '@/components/hero';
import Testimonials from '@/components/testimonials';
import FAQ from '@/components/faq';

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

      <Hero />

      <main className="mx-auto w-full pt-10">

      {/* Features Section */}
      <section className="max-w-[1080px] py-5 bg-white mx-auto">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-6">¿Qué hacemos?</h2>
          <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Descubre las actividades que realizamos en Nua Mana para el desarrollo integral de las niñas, niños y jóvenes</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  <div className="feature-card-content bg-transparent">
                    <CardHeader className="p-0 text-center">
                      <CardTitle className="text-2xl text-[#e74c3c] bg-[#ffffffaa]">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4 text-center">
                      <p className="text-(--clr3) bg-[#ffffffaa]">{item.description}</p>
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

      {/* FAQ Section */}
      <FAQ />

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
    </main> {/* Close the main container */}
    </div>
  );
}