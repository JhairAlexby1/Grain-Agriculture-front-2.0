import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../img/logo.png";
import CardTemperatura from "../components/CardTemperatura";
import CardNivel from "../components/CardNivel";
import CardSkeleton from "../components/CardSkeleton";
import {
  FaThermometerHalf,
  FaCloudRain,
  FaWind,
  FaBolt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiGasStove } from "react-icons/gi";

export const Home = () => {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const socket = io("ws://localhost:3002/grain-sensor", {
      transports: ["websocket"],
    });

    socket.on("grainSensorData", (data) => {
      console.log("Received sensor data:", data);
      setSensorData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F59E0B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/logout",
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.clear();
          navigate("/landingPage");
        }
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cerrar la sesión",
        });
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-800 text-white w-64 flex-shrink-0`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <nav className="flex-1">
            <button className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-600 transition-colors mt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Cerrar Sesión</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
              Panel de Control
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <FaBars size={24} />
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                Temperatura
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sensorData ? (
                  <>
                    <CardTemperatura
                      titulo="Temperatura Interior"
                      valor={`${sensorData.temperature_inside}°C`}
                      descripcion="Temperatura dentro del contenedor"
                      ideal="25°C"
                      porcentaje={(sensorData.temperature_inside / 50) * 100}
                      icon={
                        <FaThermometerHalf className="text-4xl text-red-500" />
                      }
                      estado={
                        sensorData.temperature_inside > 35
                          ? "crítico"
                          : sensorData.temperature_inside > 30
                          ? "advertencia"
                          : "normal"
                      }
                    />
                    <CardTemperatura
                      titulo="Temperatura Exterior"
                      valor={`${sensorData.temperature_outside}°C`}
                      descripcion="Temperatura ambiente externa"
                      ideal="22°C"
                      minimo="10°C"
                      maximo="40°C"
                      porcentaje={(sensorData.temperature_outside / 50) * 100}
                      icon={
                        <FaThermometerHalf className="text-4xl text-blue-500" />
                      }
                      estado={
                        sensorData.temperature_outside > 40
                          ? "crítico"
                          : sensorData.temperature_outside > 35
                          ? "advertencia"
                          : "normal"
                      }
                    />
                  </>
                ) : (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                Ambiente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sensorData ? (
                  <>
                    <CardNivel
                      titulo="Humedad"
                      valor={`${sensorData.humidity}%`}
                      descripcion="Nivel de humedad relativa"
                      umbral={75}
                      porcentaje={sensorData.humidity}
                      icon={<FaCloudRain className="text-4xl text-blue-400" />}
                      estado={
                        sensorData.humidity > 75
                          ? "crítico"
                          : sensorData.humidity > 65
                          ? "advertencia"
                          : "normal"
                      }
                    />
                    <CardNivel
                      titulo="Nivel de Gas"
                      valor={sensorData.gas}
                      descripcion="Concentración de gases nocivos"
                      umbral={500}
                      minimo="0"
                      maximo="1000"
                      ideal="<300"
                      porcentaje={(sensorData.gas / 1000) * 100}
                      icon={<GiGasStove className="text-4xl text-gray-600" />}
                      estado={
                        sensorData.gas > 800
                          ? "crítico"
                          : sensorData.gas > 500
                          ? "advertencia"
                          : "normal"
                      }
                    />
                  </>
                ) : (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                Sensores de Movimiento
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sensorData ? (
                  <>
                    <CardNivel
                      titulo="Sensor de Vibración 1"
                      valor={
                        sensorData.movement_1 === 1 ? "Activo" : "Inactivo"
                      }
                      descripcion="Sensor de vibración principal"
                      umbral={1}
                      minimo="0"
                      maximo="1"
                      ideal="0"
                      porcentaje={sensorData.movement_1 * 100}
                      icon={<FaBolt className="text-4xl text-yellow-500" />}
                      estado={
                        sensorData.movement_1 === 1 ? "crítico" : "normal"
                      }
                    />
                    <CardNivel
                      titulo="Sensor de Vibración 2"
                      valor={
                        sensorData.movement_2 === 1 ? "Activo" : "Inactivo"
                      }
                      descripcion="Sensor de vibración secundario"
                      umbral={1}
                      minimo="0"
                      maximo="1"
                      ideal="0"
                      porcentaje={sensorData.movement_2 * 100}
                      icon={<FaBolt className="text-4xl text-yellow-500" />}
                      estado={
                        sensorData.movement_2 === 1 ? "crítico" : "normal"
                      }
                    />
                  </>
                ) : (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
