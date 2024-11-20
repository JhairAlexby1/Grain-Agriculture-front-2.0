import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

export const GraphicGas = () => {
    const [data, setData] = useState({
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
            {
                label: 'Concentración de Gas (ppm)',
                data: Array(7).fill(0),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.3, 
                pointRadius: 5,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
        ],
    });

    const calibrateGasSensor = (rawValue) => {
        if (rawValue < 0 || rawValue > 1023) {
            console.warn("Invalid sensor value:", rawValue);
            return 0;
        }
        const percentage = 100 - (rawValue / 1023) * 100;
        return Math.round(percentage * 10) / 10;
    };

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

                    const maxGasByDay = {
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
                        const calibratedValue = calibrateGasSensor(sensor.gas);
                        maxGasByDay[dayName] = Math.max(maxGasByDay[dayName], calibratedValue);
                    });

                    const finalGasValues = Object.keys(maxGasByDay).map(day =>
                        maxGasByDay[day] === -Infinity ? 0 : maxGasByDay[day]
                    );

                    setData({
                        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                        datasets: [
                            {
                                label: 'Concentración de Gas (ppm)',
                                data: finalGasValues,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: true,
                                tension: 0.3,
                                pointRadius: 5,
                                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
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
                text: 'Concentración de Gas de la Semana',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Concentración de Gas (ppm)',
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
