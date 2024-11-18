import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StatisticsSkeleton } from './StatisticsSkeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const NormDistTemInt = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/statistics', { withCredentials: true })
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

  const temperatureInside = data.stats.temperature_inside;

  const chartData = {
    labels: ['Por debajo del mínimo', 'Por encima del máximo', 'Dentro de los límites'],
    datasets: [
      {
        label: 'Probabilidades de Temperatura Interna',
        data: [
          temperatureInside.probabilities.below_min,
          temperatureInside.probabilities.above_max,
          temperatureInside.probabilities.within_limits,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', 
          'rgba(54, 162, 235, 0.6)', 
          'rgba(75, 192, 192, 0.6)', 
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center">
      <h1 className="text-lg font-bold mb-2">Temperatura Interna</h1>
      <div className="p-3 bg-gray-100 rounded-md shadow w-full">
        <h2 className="text-base font-semibold mb-2">Datos de Temperatura</h2>
        <p className="text-sm">Promedio: {temperatureInside.average.toFixed(2)}°C</p>
        <p className="text-sm">Desviación Estándar: {temperatureInside.std_dev.toFixed(2)}</p>
        <h3 className="text-sm font-medium mt-3">Probabilidades:</h3>
        <ul className="list-disc list-inside text-sm">
          <li>Por debajo del mínimo: {temperatureInside.probabilities.below_min}%</li>
          <li>Por encima del máximo: {temperatureInside.probabilities.above_max}%</li>
          <li>Dentro de los límites: {temperatureInside.probabilities.within_limits}%</li>
        </ul>
        <div className="w-48 h-48 mx-auto mt-3">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default NormDistTemInt;
