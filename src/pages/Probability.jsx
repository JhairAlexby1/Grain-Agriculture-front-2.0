import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import NormDistTemExt from '../components/ProbabilityComponents/NormDistTemExt';
import NormDistTemInt from '../components/ProbabilityComponents/NormDistTemInt';
import NormDistGas from '../components/ProbabilityComponents/NormDistGas';
import axios from 'axios';

export const Probability = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/probability-data', { withCredentials: true })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
        {!data ? (
          <div className="flex justify-center items-center h-screen text-gray-500 text-xl">Cargando datos...</div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Probabilidades</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
              <NormDistTemExt data={data.normDistTemExt} />
              <NormDistTemInt data={data.normDistTemInt} />
            </div>
            <div className="max-w-6xl mt-4">
              <NormDistGas data={data.normDistGas} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};