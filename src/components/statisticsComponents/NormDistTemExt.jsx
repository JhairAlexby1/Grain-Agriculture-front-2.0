import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatisticsSkeleton } from './StatisticsSkeleton';

const NormDistTemExt = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/statistics', { withCredentials: true })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <StatisticsSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const temperatureOutside = data.stats.temperature_outside;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold mb-4">Temperatura Exterior</h1>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Datos de Temperatura Exterior</h2>
          <p>Promedio: {temperatureOutside.average.toFixed(2)}°C</p>
          <p>Desviación Estándar: {temperatureOutside.std_dev.toFixed(2)}</p>
          <p>Probabilidades:</p>
          <ul className="list-disc list-inside">
            <li>Por debajo del mínimo: {temperatureOutside.probabilities.below_min}%</li>
            <li>Por encima del máximo: {temperatureOutside.probabilities.above_max}%</li>
            <li>Dentro de los límites: {temperatureOutside.probabilities.within_limits}%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NormDistTemExt;