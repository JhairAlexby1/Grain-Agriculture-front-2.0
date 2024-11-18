import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StatisticsSkeleton } from './StatisticsSkeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const NormDistTemExt = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/statistics', { withCredentials: true })
      .then(response => {
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
    return <div>Error al cargar los datos</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Temperatura Externa',
        data: data.values,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Distribución Normal de Temperatura Externa</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default NormDistTemExt;