import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProbabilityIndicator = () => {
  const [probability, setProbability] = useState(null);

  useEffect(() => {
    axios.get('https://grainagricultureapi.integrador.xyz/statistics/movement-prediction', {
      withCredentials: true
    })
      .then(response => {
        let prob = Math.round(response.data.probability);
        //prob = 89;
        setProbability(prob);
      })
      .catch(error => {
        console.error('Error fetching probability:', error);
      });
  }, []);
  
  if (probability === null) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  const getProbabilityText = (value) => {
    if (value >= 75) return 'Probable';
    if (value >= 50) return 'Posible';
    if (value >= 25) return 'Poco Probable';
    return 'Improbable';
  };

  const getColor = (value) => {
    if (value >= 75) return '#EF4444'; // Rojo
    if (value >= 50) return '#F59E0B'; // Amarillo
    return '#3B82F6'; // Azul
  };

  // Cálculo del círculo de progreso
  const size = 192; // Tamaño total del SVG
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (probability / 100) * circumference;
  const color = getColor(probability);

  return (
    <div className="bg-blue-50 p-8 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-xl text-gray-700 font-semibold flex items-center justify-center gap-2">
          <span style={{ color }}>✧</span>
          Índice de Probabilidad
          <span style={{ color }}>✧</span>
        </h1>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="relative" style={{ width: size, height: size }}>
          {/* SVG para el círculo de progreso */}
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            {/* Círculo de fondo */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
            />
            
            {/* Círculo de progreso */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.5s ease-in-out'
              }}
            />
          </svg>

          {/* Contenedor del contenido central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-[calc(100%-16px)] h-[calc(100%-16px)] flex items-center justify-center">
              <div className="text-center">
                <span style={{ color }} className="text-6xl font-bold">{probability}</span>
                <span style={{ color }} className="text-3xl font-bold">%</span>
                <div className="text-gray-600 mt-2">{getProbabilityText(probability)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 flex items-center justify-center gap-2">
        <span style={{ color }}>↑</span>
        Tendencia
      </div>
    </div>
  );
};

export default ProbabilityIndicator;