import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../img/logo.png';

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

    socket.on('sensorData', (data) => {
      console.log('Received sensor data:', data);
      setSensorData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = async () => {
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
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cerrar la sesión'
      });
    }
  };

  return (
    <div className="p-6 bg-orange-400 min-h-screen text-white">
      <header className="flex flex-wrap items-center justify-between p-4 bg-white w-full">
        <div className="flex-1 text-lg md:text-xl">
          <img src={logo} alt="Logo" className="w-16 h-auto md:w-24" />
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </header>

      <main className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Temperatura Interior</h2>
            <p className="text-gray-600 text-3xl">{sensorData.temperature_inside}°C</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Temperatura Exterior</h2>
            <p className="text-gray-600 text-3xl">{sensorData.temperature_outside}°C</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Humedad</h2>
            <p className="text-gray-600 text-3xl">{sensorData.humidity}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Gas</h2>
            <p className="text-gray-600 text-3xl">{sensorData.gas}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Vibración</h2>
            <p className="text-gray-600 text-3xl">{sensorData.vibration}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;