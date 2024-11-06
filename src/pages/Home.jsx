import React from 'react';
import CardTemperatura from '../components/CardTemperatura';
import CardNivel from '../components/CardNivel';
import Alerta from '../components/Alerta';
import logo from '../img/logo.png'; 

export const Home = () => {
  return (
    <div className="p-6 bg-orange-400 min-h-screen text-white">
      <header className="flex flex-wrap items-center justify-between p-4 bg-white w-full">
        <div className="flex-1 text-lg md:text-xl">
          <img src={logo} alt="Logo" className="w-16 h-auto md:w-24" />
        </div>
        <button className="bg-white text-black px-4 py-2 rounded">Cerrar Sesión</button>
      </header>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <CardTemperatura
          titulo="Temperatura Ambiente"
          valor="27.5°C"
          descripcion="☀ 2.5°C del ideal"
          ideal="25°C"
        />
        <CardTemperatura
          titulo="Humedad"
          valor="68.1%"
          descripcion="Rango óptimo: 60-70%"
        />
        <CardTemperatura
          titulo="Temp. Granos"
          valor="21.7°C"
          descripcion="Máx. recomendado: 20°C"
        />
        <CardNivel
          titulo="Nivel de Gases"
          valor="76 ppm"
          descripcion="Nivel alto"
          umbral="50 ppm"
        />
        <CardNivel
          titulo="Nivel de Vibración"
          valor="9.9"
          descripcion="Actividad inusual"
          umbral="7.0"
        />
      </div>
      <Alerta
        mensaje="¡Alerta de Vibración! Se ha detectado un movimiento inusual. Posible presencia de roedores."
        tipo="vibracion"
      />
      <Alerta
        mensaje="¡Alerta de Gases Nocivos! Se han detectado niveles elevados de gases. Posible descomposición o fermentación indeseada."
        tipo="gases"
      />
    </div>
  );
};
