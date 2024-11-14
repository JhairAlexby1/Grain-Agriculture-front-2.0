import React from 'react';
import Swal from 'sweetalert2';
import maiz from '../img/maiz.jpg';
import elote from '../img/elote.jpg';

export const Hero = () => {

  const mostrarInfoCaracteristica = (titulo, mensaje) => {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      background: '#FFF9E6',
      confirmButtonColor: '#DAA520',
      customClass: {
        title: 'text-3xl text-[#DAA520]',
        popup: 'rounded-lg shadow-xl',
      },
    });
  };

  const mostrarAlerta = () => {
    Swal.fire({
      title: '¡Bienvenido a Grain!',
      text: 'Descubre la mejor tecnología para el cuidado de tus granos.',
      icon: 'info',
      confirmButtonText: 'Entendido',
      background: '#FFF9E6',
      confirmButtonColor: '#DAA520',
      customClass: {
        title: 'text-3xl text-[#DAA520]', 
        popup: 'rounded-lg shadow-xl',
      },
    });
  };

  return (
      <section className="bg-gradient-to-br from-[#FFFDE7] to-[#FFE082] min-h-screen pt-24"> {/* Agregado pt-24 */}      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        
        <div className="flex flex-col justify-center p-8 space-y-6 text-left animate__animated animate__fadeInLeft">
          <h1
            className="text-5xl md:text-7xl font-extrabold leading-tight text-[#8B4513] cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
            onClick={mostrarAlerta} 
          >
            Monitoreo Inteligente para tus Granos
          </h1>
          <p className="text-xl md:text-2xl text-[#5D4037]">
            Mantén la calidad y frescura de tus granos de forma simple y segura desde cualquier lugar.
          </p>
          
        </div>

        <div className="relative h-64 md:h-auto animate__animated animate__fadeInRight">
          <img
            src={maiz}
            alt="Granos de Maíz"
            className="w-full h-full object-cover rounded-l-lg md:rounded-none shadow-xl"
          />
        </div>
      </div>

      <section id="caracteristicas" className="py-16 bg-[#FFFDE7] text-center text-[#5D4037]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#DAA520] mb-10">Características Avanzadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="p-8 bg-[#FFF9E6] shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:bg-[#FFE082] cursor-pointer"
              onClick={() => mostrarInfoCaracteristica("Monitoreo en Tiempo Real", "Seguimiento constante de humedad, temperatura y niveles de CO2 de tus granos.")}
            >
              <div className="text-[#DAA520] text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-semibold mb-4">Monitoreo en Tiempo Real</h3>
              <p className="text-lg leading-relaxed">Seguimiento constante de humedad, temperatura y niveles de CO2 para asegurar la frescura de tus granos.</p>
            </div>
            <div 
              className="p-8 bg-[#FFF9E6] shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:bg-[#FFE082] cursor-pointer"
              onClick={() => mostrarInfoCaracteristica("Uso Doméstico", "Diseñado para propietarios de granjas pequeñas y pequeños negocios.")}
            >
              <div className="text-[#DAA520] text-6xl mb-6">🏠</div>
              <h3 className="text-2xl font-semibold mb-4">Uso Doméstico</h3>
              <p className="text-lg leading-relaxed">Diseñado para propietarios de granjas pequeñas, proporcionando una solución accesible y práctica.</p>
            </div>
            <div 
              className="p-8 bg-[#FFF9E6] shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:bg-[#FFE082] cursor-pointer"
              onClick={() => mostrarInfoCaracteristica("Alertas de Seguridad", "Notificaciones inmediatas ante cualquier anomalía.")}
            >
              <div className="text-[#DAA520] text-6xl mb-6">⚠️</div>
              <h3 className="text-2xl font-semibold mb-4">Alertas de Seguridad</h3>
              <p className="text-lg leading-relaxed">Recibe notificaciones instantáneas ante cualquier condición fuera de lo normal para proteger tu cosecha.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#f8b90b] ">
        <div className="max-w-7xl mx-auto ">
          <div className=" md:flex items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Cómo Funciona Grain
          </h2>
              <ol className="list-decimal pl-6 text-lg space-y-4">
                <li>Instala nuestras Cajas Inteligentes con sensores para monitorear la calidad de los granos.</li>
                <li>Conecta el dispositivo a tu Wi-Fi para transmitir datos en tiempo real.</li>
                <li>Accede a los datos desde nuestra plataforma web.</li>
                <li>Recibe alertas y reportes sobre tus granos.</li>
              </ol>
            </div>
            
            <div className=" w-1/2 flex  justify-end ">
              <img
                src={elote} 
                alt="Monitoreo de Granos de Maíz"
                className="h-full object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
