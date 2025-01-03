import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphicTemp = () => {
    const [data, setData] = useState({
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
            {
                label: 'Temperatura Externa (°C)',
                data: Array(7).fill(0),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
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

                    const maxTempByDay = {
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
                        maxTempByDay[dayName] = Math.max(maxTempByDay[dayName], sensor.temperature_outside);
                    });

                    const finalTemperatures = Object.keys(maxTempByDay).map(day =>
                        maxTempByDay[day] === -Infinity ? 0 : maxTempByDay[day]
                    );

                    setData({
                        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                        datasets: [
                            {
                                label: 'Temperatura Externa (°C)',
                                data: finalTemperatures,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
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
                text: 'Temperatura Externa Maxima de la Semana',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default GraphicTemp;
