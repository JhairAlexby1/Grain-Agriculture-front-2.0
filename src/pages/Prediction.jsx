import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

export const Prediction = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/statistics/movement-prediction', { withCredentials: true })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  if (!data) {
    return <div className="flex justify-center items-center h-screen text-gray-500 text-xl">Cargando datos...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Predicción de Movimientos</h1>
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Análisis Semanal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Total de Lecturas:</strong> {data.weeklyAnalysis.totalReadings}</p>
            <p><strong>Cuenta de Movimiento 1:</strong> {data.weeklyAnalysis.movement1.count}</p>
            <p><strong>Frecuencia de Movimiento 1:</strong> {data.weeklyAnalysis.movement1.frequency}</p>
            <p><strong>Cuenta de Movimiento 2:</strong> {data.weeklyAnalysis.movement2.count}</p>
            <p><strong>Frecuencia de Movimiento 2:</strong> {data.weeklyAnalysis.movement2.frequency}</p>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mt-6">Patrones Secuenciales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Movimiento 1 después de Movimiento 1:</strong> {data.weeklyAnalysis.sequentialPatterns.movement1AfterMovement1}</p>
            <p><strong>Movimiento 2 después de Movimiento 2:</strong> {data.weeklyAnalysis.sequentialPatterns.movement2AfterMovement2}</p>
            <p><strong>Movimiento 1 después de Movimiento 2:</strong> {data.weeklyAnalysis.sequentialPatterns.movement1AfterMovement2}</p>
            <p><strong>Movimiento 2 después de Movimiento 1:</strong> {data.weeklyAnalysis.sequentialPatterns.movement2AfterMovement1}</p>
          </div>
        </div>
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Predicción</h2>
          <p className="mb-2"><strong>Probabilidades del Próximo Movimiento:</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Movimiento 1:</strong> {data.prediction.nextMovementProbabilities.movement1}</p>
            <p><strong>Movimiento 2:</strong> {data.prediction.nextMovementProbabilities.movement2}</p>
          </div>
          <p className="mt-4"><strong>Confianza:</strong> {data.prediction.confidence}</p>
        </div>
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Factores Ambientales</h2>
          <h3 className="text-lg font-medium text-gray-600 mt-4">Temperatura</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Correlación con Alta Temperatura:</strong> {data.environmentalFactors.temperature.highTempCorrelation}</p>
            <p><strong>Correlación con Baja Temperatura:</strong> {data.environmentalFactors.temperature.lowTempCorrelation}</p>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mt-6">Humedad</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Correlación con Alta Humedad:</strong> {data.environmentalFactors.humidity.highHumidityCorrelation}</p>
            <p><strong>Correlación con Baja Humedad:</strong> {data.environmentalFactors.humidity.lowHumidityCorrelation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
