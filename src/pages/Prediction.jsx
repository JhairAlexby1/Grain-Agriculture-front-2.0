import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import ProbabilityIndicator from '../components/PredictionComponents/ProbabilityIndicator';

export const Prediction = () => {
  const [probability, setProbability] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/statistics/movement-prediction', { withCredentials: true })
      .then(response => {
        setProbability(response.data.probability);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col items-center justify-center w-full">
      <ProbabilityIndicator />
        {probability !== null && (
          <div className="mt-4 p-4 bg-white shadow-md rounded">
            <p className="text-xl font-semibold">Probabilidad de Movimiento en el dia: {probability}%</p>
          </div>
        )}
      </div>
    </div>
  );
};