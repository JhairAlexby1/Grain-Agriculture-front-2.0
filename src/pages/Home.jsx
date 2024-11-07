import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CardTemperatura from '../components/CardTemperatura';
import CardNivel from '../components/CardNivel';
import Alerta from '../components/Alerta';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const [sensorData, setSensorData] = useState({
    temperature_inside: 0,
    temperature_outside: 0,
    humidity: 0,
    gas: 0,
    vibration: 0,
  });

    useEffect(() => {
    const socket = io('http://localhost:3002/grain-sensor', {
      transports: ['websocket'],
    });
  
    socket.on('grainSensorData', (data) => {
      console.log('Received data from WebSocket:', data);
      setSensorData(data);
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogoutClick = () => {
    navigate('/landingPage');
  };

  return (
    <div className="p-6 bg-orange-400 min-h-screen text-white">
      <header className="flex flex-wrap items-center justify-between p-4 bg-white w-full">
        <div className="flex-1 text-lg md:text-xl">
          <img src={logo} alt="Logo" className="w-16 h-auto md:w-24" />
        </div>
        <button onClick={handleLogoutClick} className="bg-white text-black px-4 py-2 rounded">Cerrar Sesión</button>
      </header>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <CardTemperatura
          titulo="Temperatura Ambiente"
          valor={`${sensorData.temperature_outside}°C`}
          descripcion="☀ 2.5°C del ideal"
          ideal="25°C"
          porcentaje={(sensorData.temperature_outside / 40) * 100} 
        />
        <CardTemperatura
          titulo="Humedad"
          valor={`${sensorData.humidity}%`}
          descripcion="Rango óptimo: 60-70%"
          porcentaje={(sensorData.humidity / 100) * 100} 
        />
        <CardTemperatura
          titulo="Temp. Granos"
          valor={`${sensorData.temperature_inside}°C`}
          descripcion="Máx. recomendado: 20°C"
          porcentaje={(sensorData.temperature_inside / 40) * 100} 
        />
        <CardNivel
          titulo="Nivel de Gases"
          valor={`${sensorData.gas} ppm`}
          descripcion={sensorData.gas > 50 ? "Nivel alto" : "Nivel óptimo"}
          umbral="50 ppm"
          porcentaje={(sensorData.gas / 1000) * 100} 
        />
                                <CardNivel
                  titulo="Nivel de Gases"
                  valor={`${sensorData.gas} ppm`}
                  descripcion={sensorData.gas > 50 ? "Nivel alto" : "Nivel óptimo"}
                  umbral="50 ppm"
                  porcentaje={(sensorData.gas / 1000) * 100} 
                />
                <CardNivel
                  titulo="Nivel de Vibración"
                  valor={sensorData.vibration ? "En movimiento" : "Sin movimiento"}
                  descripcion={sensorData.vibration ? "En movimiento" : "Sin movimiento"}
                  umbral="1"
                  porcentaje={sensorData.vibration ? 100 : 0}
                />
      </div>
      {sensorData.vibration > 7.0 && (
        <Alerta
          mensaje="¡Alerta de Vibración! Se ha detectado un movimiento inusual. Posible presencia de roedores."
          tipo="vibracion"
        />
      )}
      {sensorData.gas > 50 && (
        <Alerta
          mensaje="¡Alerta de Gases Nocivos! Se han detectado niveles elevados de gases. Posible descomposición o fermentación indeseada."
          tipo="gases"
        />
      )}
    </div>
  );
};
