import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatisticsSkeleton } from './StatisticsSkeleton';

const NormDistGas = () => {
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

  const gasData = data.stats.gas;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold mb-4">Gas</h1>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Datos de Gas</h2>
          <p>Promedio: {gasData.average.toFixed(2)} ppm</p>
          <p>Desviación Estándar: {gasData.std_dev.toFixed(2)}</p>
          <p>Probabilidades:</p>
          <ul className="list-disc list-inside">
            <li>Por debajo del mínimo: {gasData.probabilities.below_min}%</li>
            <li>Por encima del máximo: {gasData.probabilities.above_max}%</li>
            <li>Dentro de los límites: {gasData.probabilities.within_limits}%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NormDistGas;