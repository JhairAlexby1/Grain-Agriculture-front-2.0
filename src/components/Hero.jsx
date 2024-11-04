import React from 'react';
import maiz from '../img/maiz.jpg';
import maizHori from '../img/maizHori.jpg'



export const Hero = () => {
  return (
    <section className="bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="bg-[rgb(248,185,11)] text-left flex flex-col justify-center p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Monitore Inteligente de Granos de Maíz
          </h1>
          <p className="text-lg md:text-xl text-black">
            Revoluciona el almacenamiento de tus granos con tecnología de punta. Controla calidad y cantidad desde tu smartphone.
          </p>
        </div>
        
        <div className="relative">
          <img
            src={maiz}  
            alt="Granos de Maíz"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#f8b90b] mb-6">
          Características Avanzadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-[#f8b90b] text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-[#f8b90b] mb-2">Monitoreo en Tiempo Real</h3>
            <p className="text-[#000000]">Seguimiento constante de humedad, temperatura y niveles de CO2 de tus granos.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-[#f8b90b] text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-[#f8b90b] mb-2">Uso Doméstico</h3>
            <p className="text-[#000000]">Diseñado para propietarios de granjas pequeñas y pequeños negocios.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-[#f8b90b] text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-[#f8b90b] mb-2">Alertas de Seguridad</h3>
            <p className="text-[#000000]">Notificaciones inmediatas ante cualquier anomalía.</p>
          </div>
        </div>
      </div>
    </section>

      
      <section className="bg-[#f8b90b] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Cómo Funciona Grain
        </h2>
        <div className="md:flex items-center">
         
          <div className="md:w-1/2 mb-6 md:mb-0 order-1">
            <ol className="list-decimal pl-6 text-lg space-y-4">
              <li>Instala nuestras Cajas Inteligentes con sensores para monitorear la calidad de los granos.</li>
              <li>Conecta el dispositivo a tu Wi-Fi para transmitir datos en tiempo real.</li>
              <li>Accede a los datos desde nuestra plataforma web.</li>
              <li>Recibe alertas y reportes sobre tus granos.</li>
            </ol>
          </div>
       
          <div className="relative md:w-1/2 order-2">
            <img
              src={maiz}
              alt="Granos de Maíz"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    </section>
  );
};
