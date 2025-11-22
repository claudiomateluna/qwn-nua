'use client';

import Link from 'next/link';
import { IconoInstagram, IconoFacebook, IconoYoutube, IconoTiktok, IconoGoogle, IconoEmail, IconoWhatsApp } from '@/components/ui/custom-icons';
import UnitSlideShow from './unit-slideshow';

const NuaManaFooter = () => {
  return (
    <footer className="bg-[var(--clr5)] text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main content sections - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          {/* Brand Section - Hidden on screens smaller than 460px */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left hidden sm:block">
            <div className="flex justify-center sm:justify-start mb-4">
              <img
                src="https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/Iconos-logo.svg"
                alt="Logo Nua Mana"
                className="w-auto object-contain"
              />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold leading-1 uppercase text-center text-gray-300">Guías y Scouts Nua Mana</h4>
              <h5 className="text-md italic text-center text-gray-300">una nueva aventura</h5>
            </div>
            <p className="mt-4 text-md text-gray-400 text-justify leading-relaxed">
              Nuestra misión es contribuir a la educación de jóvenes para que participen en la construcción de un mundo mejor, donde las personas se desarrollen plenamente y jueguen un papel constructivo en la sociedad.<br></br> Mediante un sistema de valores basado en principios espirituales, sociales y personales, que se expresan en la Ley y la Promesa.
            </p>
            {/* Social Media Icons - with justify-between and all requested platforms */}
            <div className="flex justify-between mt-6 max-w-xs mx-auto">
              <a href="https://www.instagram.com/gruponuamana/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc41d] transition-colors">
                <IconoInstagram className="h-8 w-8" strokeWidth={0.2} />
              </a>
              <a href="https://facebook.com/gruponuamana" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc41d] transition-colors">
                <IconoFacebook className="h-8 w-8" strokeWidth={0.2} />
              </a>
              <a href="https://youtube.com/@gruponuamana" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc41d] transition-colors">
                <IconoYoutube className="h-8 w-8" strokeWidth={0.2} />
              </a>
              <a href="https://www.tiktok.com/@gruponuamana" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc41d] transition-colors">
                <IconoTiktok className="h-8 w-8" strokeWidth={0.2} />
              </a>
              <a href="https://www.google.com/search?q=Guías+y+Scouts+Nua+Mana" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc41d] transition-colors">
                <IconoGoogle className="h-8 w-8" strokeWidth={0.2} />
              </a>
              <a href="mailto:contacto@nuamana.cl" className="hover:text-[#ffc41d] transition-colors">
                <IconoEmail className="h-8 w-8" strokeWidth={0.2} />
              </a>
              <a href="https://wa.me/56966896001" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc41d] transition-colors">
                <IconoWhatsApp className="h-8 w-8" strokeWidth={0.2} />
              </a>
            </div>
          </div>

          {/* Contact Information - Always visible */}
          <div className="sm:col-span-1 lg:col-span-1 text-center sm:text-left">
            <h4 className="text-lg font-bold mb-4 uppercase">Encuentranos</h4>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
              <div className="flex-shrink-0">
                <a href="/acerca-de/institucion-patrocinante" target="_self" rel="noopener noreferrer">
                  <img
                    src="https://raw.githubusercontent.com/claudiomateluna/nua_mana/gh-pages/uploads/ColegioLosNavios.png"
                    alt="Colegio Los Navíos"
                    className="w-26 h-26 object-contain"
                  />
                </a>
              </div>
              <div className="text-center sm:text-left">
                <a href="/acerca-de/institucion-patrocinante" target="_self" rel="noopener noreferrer" className="block text-[#ffc41d] font-semibold mb-1 hover:underline">
                  Colegio Los Navíos
                </a>
                <p>
                  Bahía Catalina 11781<br />
                  La Florida, Santiago, Chile<br />
                  C.P.: 8311475
                </p>
              </div>
            </div>
            <div className="mt-4 w-full max-w-md mx-auto sm:mx-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.382796811922!2d-70.6096195!3d-33.569409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d0a6e457520d%3A0xc3892aa7fa7d74b!2sGuias%20y%20Scouts%20Nua%20Mana!5e0!3m2!1ses!2scl!4v1763171854990!5m2!1ses!2scl"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Units Slide Show - Hidden on screens smaller than 460px */}
          <div className="sm:col-span-1 lg:col-span-1 text-center sm:text-left hidden sm:block">
            <h4 className="text-lg font-bold mb-4">NUESTRAS UNIDADES</h4>
            <UnitSlideShow />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-[#34495e] pt-6 text-center">
          <p className="text-sm text-gray-400">
            🅮 {new Date().getFullYear()} Guías y Scouts Nua Mana.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Scouts, Educación para la Vida • Empoderamos a niñas, niños y jóvenes •
            Habilidades para Crear un Mundo Mejor
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NuaManaFooter;