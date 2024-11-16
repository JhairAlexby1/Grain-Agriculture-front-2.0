import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GraphicGas = () => {
    const [data, setData] = useState({
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
            {
                label: 'Concentración de Gas (ppm)',
                data: Array(7).fill(0), 
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
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
        axios.get('http://localhost:3000/grain-sensor', { withCredentials: true })
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
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgba(255, 159, 64, 1)',
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
                text: 'Concentración de Gas de la Semana',
            },
        },
    };

    return <Bar data={data} options={options} />;
};
