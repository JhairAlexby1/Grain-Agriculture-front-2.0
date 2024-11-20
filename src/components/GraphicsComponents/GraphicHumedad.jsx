import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler);

export const GraphicHumedad = () => {
  const [data, setData] = useState({
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Humedad (%)',
        data: Array(7).fill(0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, 
        tension: 0.3, 
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    axios.get('https://grainagricultureapi.integrador.xyz/grain-sensor', { withCredentials: true })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          const now = new Date();
          const dayOfWeekMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

          const last7DaysData = response.data.data.filter(sensor => {
            const sensorDate = new Date(sensor.date);
            const diffInDays = (now - sensorDate) / (1000 * 60 * 60 * 24);
            return diffInDays <= 7;
          });

          const maxHumidityByDay = {
            Lunes: -Infinity,
            Martes: -Infinity,
            Miércoles: -Infinity,
            Jueves: -Infinity,
            Viernes: -Infinity,
            Sábado: -Infinity,
            Domingo: -Infinity,
          };

          last7DaysData.forEach(sensor => {
            const sensorDate = new Date(sensor.date);
            const dayName = dayOfWeekMap[sensorDate.getDay()];
            maxHumidityByDay[dayName] = Math.max(maxHumidityByDay[dayName], sensor.humidity);
          });

          const finalHumidity = Object.keys(maxHumidityByDay).map(day =>
            maxHumidityByDay[day] === -Infinity ? 0 : maxHumidityByDay[day]
          );

          setData({
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [
              {
                label: 'Humedad (%)',
                data: finalHumidity,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true, 
                tension: 0.3, 
                pointRadius: 5,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
              },
            ],
          });
        } else {
          console.error('Expected an array but got:', response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Humedad Externa Máxima de la Semana',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Humedad (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Días de la Semana',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
