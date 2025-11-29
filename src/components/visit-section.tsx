'use client';

import { useState, useEffect } from 'react';
import { Mail, Clock, MapPin } from 'lucide-react';

const VisitSection = () => {
  const [years, setYears] = useState(0);
  const [isMailHovered, setIsMailHovered] = useState(false);
  const [time, setTime] = useState(new Date());

  // Calcular años desde la fundación (23 de septiembre de 2005)
  useEffect(() => {
    const foundationDate = new Date(2005, 8, 23); // Mes 8 = septiembre (0-indexed)
    const today = new Date();

    let yearsDiff = today.getFullYear() - foundationDate.getFullYear();
    const monthDiff = today.getMonth() - foundationDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < foundationDate.getDate())) {
      yearsDiff--;
    }

    // Animación del contador de años
    const duration = 2000; // 2 segundos
    const increment = yearsDiff / (duration / 16); // Aproximadamente 60 fps
    let current = 0;

    // Función para reiniciar la animación
    const startAnimation = () => {
      current = 0;
      setYears(0); // Reiniciar a 0

      const timer = setInterval(() => {
        current += increment;
        if (current >= yearsDiff) {
          setYears(yearsDiff);
          clearInterval(timer);
        } else {
          setYears(Math.floor(current));
        }
      }, 16);

      return timer;
    };

    // Iniciar la primera animación
    let timer = startAnimation();

    // Configurar intervalo para reiniciar cada 30 segundos
    const resetInterval = setInterval(() => {
      clearInterval(timer);
      timer = startAnimation();
    }, 30000); // 30 segundos

    return () => {
      clearInterval(timer);
      clearInterval(resetInterval);
    };
  }, []);

  // Actualizar tiempo cada segundo para el reloj analógico
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4" style={{ backgroundColor: 'var(--clr1)', color: 'var(--clr4)' }}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">¡Únete Ahora!</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Columna izquierda (30%) */}
        <div className="w-full md:w-3/10 space-y-6">
          {/* Subsección A */}
          <div className="flex space-x-4">
            {/* Columna A1 */}
            <div className="w-1/2 bg-gradient-to-br from-[#3eb34b] to-[#2c3e50] p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white">+{years}</div>
              <div className="text-center text-white text-sm leading-none">Años de Experiencia</div>
            </div>

            {/* Columna A2 */}
            <div className="w-1/2 flex flex-col items-center justify-center">
              <a
                href="mailto:contacto@nuamana.cl"
                className={`p-3 rounded-full transition-all duration-300 ${isMailHovered ? 'bg-[#ffc41d] scale-110' : 'bg-[#2c3e50]'}`}
                onMouseEnter={() => setIsMailHovered(true)}
                onMouseLeave={() => setIsMailHovered(false)}
              >
                <Mail className={`w-8 h-8 ${isMailHovered ? 'text-[#2c3e50]' : 'text-white'}`} />
              </a>
              <div className="text-center mt-2">
                <a
                  href="mailto:contacto@nuamana.cl"
                  className="text-[#2c3e50] hover:text-[#3eb34b] font-medium"
                >
                  contacto@nuamana.cl
                </a>
              </div>
            </div>
          </div>

          {/* Subsección B */}
          <div className="rounded-full flex flex-col items-center overflow-hidden rounded-lg">
            <div className="rounded-full w-50 h-50 flex flex-col items-center bg-gradient-to-r from-[var(--clr8)] to-[var(--clr6)] opacity-90">
              <div className="relative p-6 text-center bg-[url(/images/inicio/AndysShow.png)] bg-contain bg-center bg-no-repeat flex items-center justify-center h-50">
                <div className="text-xl font-bold text-white leading-none">VEN A VISITARNOS</div>
              </div>
            </div>
          </div>

          {/* Subsección C */}
          <div className="flex space-x-4">
            {/* Columna C1 */}
            <div className="w-1/2 bg-gradient-to-br from-[var(--clr8)] to-[var(--clr6)] p-2 rounded-lg flex flex-col items-center">
              <div className="relative w-16 h-16">
                {/* Contenedor del círculo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full border-4 border-[#2c3e50]"></div>
                </div>

                {/* Contenedor central para rotar las manecillas */}
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Horario */}
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 origin-left bg-[#2c3e50]"
                    style={{
                      width: '0.9rem', /* 1.5rem * 0.45 */
                      height: '0.125rem', /* 2/16 */
                      transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`
                    }}
                  ></div>
                  {/* Minutero */}
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 origin-left bg-[#2c3e50]"
                    style={{
                      width: '1.125rem', /* 2.5rem * 0.45 */
                      height: '0.125rem', /* 2/16 */
                      transform: `rotate(${time.getMinutes() * 6}deg)`
                    }}
                  ></div>
                  {/* Segundero */}
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 origin-left bg-[#cb3327]"
                    style={{
                      width: '1.20rem', /* 3rem * 0.45 */
                      height: '0.125rem', /* 2/16 */
                      transform: `rotate(${time.getSeconds() * 6}deg)`
                    }}
                  ></div>
                </div>

                {/* Centro del reloj */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#2c3e50] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
              </div>
              <div className="text-center text-sm">
                <div>Sábados de 3 a 6</div>
                <div>De la Tarde</div>
              </div>
            </div>

            {/* Columna C2 */}
            <div className="w-1/2 bg-gradient-to-br from-[var(--clr6)] to-[#2c3e50] p-2 rounded-lg flex flex-col items-center">
              <div className="relative w-16 h-16">
                <MapPin className="w-full h-full text-white" />
                <div className="absolute inset-0 rounded-full border-2 border-[#2c3e50] animate-ping opacity-20"></div>
              </div>
              <div className="text-center text-sm text-white">
                <div>Bahía Catalina</div>
                <div>11781, La Florida</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha (70%) con mapa */}
        <div className="w-full md:w-7/10">
          <div className="border-8 border-[#3eb34b] rounded-lg overflow-hidden shadow-xl h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.382796811922!2d-70.6096195!3d-33.569409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d0a6e457520d%3A0xc3892aa7fa7d74b!2sGuias%20y%20Scouts%20Nua%20Mana!5e0!3m2!1ses!2scl!4v1763411447730!5m2!1ses!2scl"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitSection;