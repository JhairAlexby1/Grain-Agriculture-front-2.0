import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../img/logo.png';
import CardTemperatura from '../components/CardTemperatura';
import CardNivel from '../components/CardNivel';
import CardSkeleton from '../components/CardSkeleton';
import { FaThermometerHalf, FaCloudRain, FaWind, FaBolt } from 'react-icons/fa';
import { GiGasStove } from 'react-icons/gi';

export const Home = () => {
  const navigate = useNavigate();

  const [sensorData, setSensorData] = useState(null); 
  useEffect(() => {
    const socket = io('ws://localhost:3002/grain-sensor', {
      transports: ['websocket'],
    });

    socket.on('grainSensorData', (data) => {  
      console.log('Received sensor data:', data);
      setSensorData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas cerrar la sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          'http://localhost:3000/users/logout',
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.clear();
          navigate('/landingPage');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cerrar la sesión'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-300">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-16 h-auto md:w-24 transition-transform duration-200 hover:scale-105 cursor-pointer" 
              />
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium
                transition-all duration-200 ease-in-out
                hover:bg-red-600 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Control</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensorData ? (
              <>
                <CardTemperatura 
                  titulo="Temperatura Interior"
                  valor={`${sensorData.temperature_inside}°C`}
                  descripcion="Temperatura dentro del contenedor. Crucial para la preservación de granos."
                  ideal="25°C"
                  minimo="15°C"
                  maximo="35°C"
                  porcentaje={(sensorData.temperature_inside / 50) * 100}
                  icon={<FaThermometerHalf className="text-4xl text-orange-500" />}
                  estado={
                    sensorData.temperature_inside > 35 ? 'crítico' :
                    sensorData.temperature_inside > 30 ? 'advertencia' : 'normal'
                  }
                />

                <CardTemperatura 
                  titulo="Temperatura Exterior"
                  valor={`${sensorData.temperature_outside}°C`}
                  descripcion="Temperatura ambiente externa. Afecta la temperatura interior."
                  ideal="22°C"
                  minimo="10°C"
                  maximo="40°C"
                  porcentaje={(sensorData.temperature_outside / 50) * 100}
                  icon={<FaThermometerHalf className="text-4xl text-blue-500" />}
                  estado={
                    sensorData.temperature_outside > 40 ? 'crítico' :
                    sensorData.temperature_outside > 35 ? 'advertencia' : 'normal'
                  }
                />

                <CardNivel 
                  titulo="Humedad"
                  valor={`${sensorData.humidity}%`}
                  descripcion="Nivel de humedad relativa. Crítico para prevenir hongos."
                  umbral={75}
                  minimo="30%"
                  maximo="80%"
                  ideal="50-60%"
                  porcentaje={sensorData.humidity}
                  icon={<FaCloudRain className="text-4xl text-blue-400" />}
                  estado={
                    sensorData.humidity > 75 ? 'crítico' :
                    sensorData.humidity > 65 ? 'advertencia' : 'normal'
                  }
                />

                <CardNivel 
                  titulo="Nivel de Gas"
                  valor={sensorData.gas}
                  descripcion="Concentración de gases nocivos (CO2, etileno). Importante para la seguridad."
                  umbral={500}
                  minimo="0"
                  maximo="1000"
                  ideal="<300"
                  porcentaje={(sensorData.gas / 1000) * 100}
                  icon={<GiGasStove className="text-4xl text-gray-600" />}
                  estado={
                    sensorData.gas > 800 ? 'crítico' :
                    sensorData.gas > 500 ? 'advertencia' : 'normal'
                  }
                />

                <CardNivel 
                  titulo="Vibración"
                  valor={sensorData.vibration}
                  descripcion="Nivel de vibración del contenedor. Indica estabilidad estructural."
                  umbral={2}
                  minimo="0"
                  maximo="5"
                  ideal="<1"
                  porcentaje={(sensorData.vibration / 5) * 100}
                  icon={<FaBolt className="text-4xl text-yellow-500" />}
                  estado={
                    sensorData.vibration > 4 ? 'crítico' :
                    sensorData.vibration > 2 ? 'advertencia' : 'normal'
                  }
                />
              </>
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
