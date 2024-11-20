import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StatisticsSkeleton } from './StatisticsSkeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const NormDistGas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://grainagricultureapi.integrador.xyz/statistics', { withCredentials: true })
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

  const gasData = data?.stats?.gas || {};

  const chartData = {
    labels: ['Por debajo del mínimo', 'Por encima del máximo', 'Dentro de los límites'],
    datasets: [
      {
        label: 'Probabilidades de Gas',
        data: [
          gasData?.probabilities?.below_min || 0,
          gasData?.probabilities?.above_max || 0,
          gasData?.probabilities?.within_limits || 0,
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
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col lg:flex-row items-center gap-4">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-xl font-bold mb-2">Gas</h1>
        <h2 className="text-base font-semibold mb-2">Datos de Gas</h2>
        <p className="text-sm mb-1">
          Promedio: <span className="font-medium">{gasData?.average ? gasData.average.toFixed(2) : 'N/A'} ppm</span>
        </p>
        <p className="text-sm mb-1">
          Desviación Estándar: <span className="font-medium">{gasData?.std_dev ? gasData.std_dev.toFixed(2) : 'N/A'}</span>
        </p>
        <h3 className="text-sm font-medium mt-2 mb-2">Probabilidades:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            Por debajo del mínimo: <span className="font-medium">{gasData?.probabilities?.below_min || 0}%</span>
          </li>
          <li>
            Por encima del máximo: <span className="font-medium">{gasData?.probabilities?.above_max || 0}%</span>
          </li>
          <li>
            Dentro de los límites: <span className="font-medium">{gasData?.probabilities?.within_limits || 0}%</span>
          </li>
        </ul>
      </div>
      <div className="lg:w-72 lg:h-72 w-60 h-60 flex-shrink-0">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default NormDistGas;
