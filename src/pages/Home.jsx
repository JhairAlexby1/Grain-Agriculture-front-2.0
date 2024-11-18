import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import CardTemperatura from "../components/CardTemperatura";
import CardNivel from "../components/CardNivel";
import CardSkeleton from "../components/CardSkeleton";
import { FaThermometerHalf, FaCloudRain, FaBolt, FaBars } from "react-icons/fa";
import { GiGasStove } from "react-icons/gi";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

const Home = () => {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const socket = io("ws://localhost:3002/grain-sensor", {
      transports: ["websocket"],
    });

    socket.on("grainSensorData", (data) => {
      setSensorData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const calibrateGasSensor = (rawValue) => {
    if (rawValue < 0 || rawValue > 1023) {
      console.warn("Invalid sensor value:", rawValue); // Mantengo advertencias de valores inválidos
      return 0;
    }
    const percentage = 100 - (rawValue / 1023) * 100;
    return Math.round(percentage * 10) / 10;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
              Panel de Control
            </h1>
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
                      ideal="18°C - 23°C"
                      minimo="10°C"
                      maximo="30°C"
                      porcentaje={(sensorData.temperature_inside / 50) * 100}
                      icon={
                        <FaThermometerHalf className="text-4xl text-red-500" />
                      }
                      estado={
                        sensorData.temperature_inside > 30 ||
                        sensorData.temperature_inside < 10
                          ? "crítico"
                          : sensorData.temperature_inside > 23 ||
                            sensorData.temperature_inside < 18
                          ? "advertencia"
                          : "normal"
                      }
                    />
                    <CardTemperatura
                      titulo="Temperatura Exterior"
                      valor={`${sensorData.temperature_outside}°C`}
                      descripcion="Temperatura ambiente externa"
                      ideal="18°C - 23°C"
                      minimo="10°C"
                      maximo="30°C"
                      porcentaje={(sensorData.temperature_outside / 50) * 100}
                      icon={
                        <FaThermometerHalf className="text-4xl text-blue-500" />
                      }
                      estado={
                        sensorData.temperature_outside > 30 ||
                        sensorData.temperature_outside < 10
                          ? "crítico"
                          : sensorData.temperature_outside > 23 ||
                            sensorData.temperature_outside < 18
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
                      ideal="10% - 12%"
                      minimo="8%"
                      maximo="14%"
                      porcentaje={(sensorData.humidity / 100) * 100}
                      icon={<FaCloudRain className="text-4xl text-blue-400" />}
                      estado={
                        sensorData.humidity > 14 || sensorData.humidity < 8
                          ? "crítico"
                          : sensorData.humidity > 12 || sensorData.humidity < 10
                          ? "advertencia"
                          : "normal"
                      }
                    />
                    <CardNivel
                      titulo="Nivel de Gas"
                      valor={`${calibrateGasSensor(sensorData.gas).toFixed(
                        2
                      )} ppm`}
                      descripcion="Concentración de gases nocivos"
                      ideal="300 ppm"
                      minimo="0 ppm"
                      maximo="800 ppm"
                      porcentaje={
                        (calibrateGasSensor(sensorData.gas) / 800) * 100
                      }
                      icon={<GiGasStove className="text-4xl text-gray-600" />}
                      estado={
                        calibrateGasSensor(sensorData.gas) > 800 ||
                        calibrateGasSensor(sensorData.gas) < 0
                          ? "crítico"
                          : calibrateGasSensor(sensorData.gas) > 300
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
                      valor={sensorData.movement_1 === 1 ? "Activo" : "Inactivo"}
                      descripcion="Sensor de vibración principal"
                      umbral={1}
                      minimo="0"
                      maximo="1"
                      ideal="0"
                      porcentaje={sensorData.movement_1 * 100}
                      icon={<FaBolt className="text-4xl text-yellow-500" />}
                      estado={sensorData.movement_1 === 1 ? "crítico" : "normal"}
                    />
                    <CardNivel
                      titulo="Sensor de Vibración 2"
                      valor={sensorData.movement_2 === 1 ? "Activo" : "Inactivo"}
                      descripcion="Sensor de vibración secundario"
                      umbral={1}
                      minimo="0"
                      maximo="1"
                      ideal="0"
                      porcentaje={sensorData.movement_2 * 100}
                      icon={<FaBolt className="text-4xl text-yellow-500" />}
                      estado={sensorData.movement_2 === 1 ? "crítico" : "normal"}
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
