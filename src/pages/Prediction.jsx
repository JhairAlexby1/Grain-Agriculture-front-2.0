import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import ProbabilityIndicator from '../components/PredictionComponents/ProbabilityIndicator';
import { ENDPOINTS } from '../config/api';

export const Prediction = () => {
  const [probability, setProbability] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(ENDPOINTS.MOVEMENT_PREDICTION, { withCredentials: true })
      .then(response => {
        setProbability(response.data.probability);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError(error.message || 'Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col items-center justify-center w-full">
        <ProbabilityIndicator />
        {loading && (
          <div className="mt-4 p-4 bg-white shadow-md rounded">
            <p className="text-xl font-semibold">Cargando datos...</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 shadow-md rounded">
            <p className="text-xl font-semibold text-red-700">Error: {error}</p>
            <p className="text-gray-700">Los datos mostrados pueden ser de una carga previa</p>
          </div>
        )}
        {probability !== null && !loading && (
          <div className="mt-4 p-4 bg-white shadow-md rounded">
            <p className="text-xl font-semibold">Probabilidad de Movimiento en el dia: {probability}%</p>
          </div>
        )}
      </div>
    </div>
  );
};