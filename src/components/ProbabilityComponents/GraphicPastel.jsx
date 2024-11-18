import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphicPastel = () => {
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
    return <div className="flex justify-center items-center h-full">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 font-semibold">Error: {error.message}</div>;
  }

  const temperatureOutside = data.stats.temperature_outside.probabilities;
  const chartData = {
    labels: ['Por debajo del mínimo', 'Por encima del máximo', 'Dentro de los límites'],
    datasets: [
      {
        label: 'Probabilidades de Temperatura Exterior',
        data: [
          temperatureOutside.below_min,
          temperatureOutside.above_max,
          temperatureOutside.within_limits
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: 12 
        },
        padding: 8, 
        boxPadding: 4, 
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-xl font-bold text-gray-700 border-b pb-2">Significado de los colores</h1>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span
              className="inline-block w-5 h-5 mr-3 rounded-md"
              style={{ backgroundColor: 'rgba(255, 99, 132, 0.6)', border: '2px solid rgba(255, 99, 132, 1)' }}
            ></span>
            <span className="text-gray-600 font-medium">Por debajo del mínimo</span>
          </li>
          <li className="flex items-center">
            <span
              className="inline-block w-5 h-5 mr-3 rounded-md"
              style={{ backgroundColor: 'rgba(54, 162, 235, 0.6)', border: '2px solid rgba(54, 162, 235, 1)' }}
            ></span>
            <span className="text-gray-600 font-medium">Por encima del máximo</span>
          </li>
          <li className="flex items-center">
            <span
              className="inline-block w-5 h-5 mr-3 rounded-md"
              style={{ backgroundColor: 'rgba(75, 192, 192, 0.6)', border: '2px solid rgba(75, 192, 192, 1)' }}
            ></span>
            <span className="text-gray-600 font-medium">Dentro de los límites</span>
          </li>
        </ul>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="w-52 h-52">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default GraphicPastel;
