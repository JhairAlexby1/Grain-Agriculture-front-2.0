import React from 'react';

const CardTemperatura = ({ titulo, valor, descripcion, ideal }) => (
  <div className="bg-yellow-50 rounded-lg shadow p-4 flex flex-col">
    <h2 className="text-sm font-semibold text-gray-700">{titulo}</h2>
    <div className="text-3xl font-bold text-black">{valor}</div>
    <div className="text-xs text-gray-500">{descripcion}</div>
    {ideal && <div className="text-xs text-gray-400 mt-2">Ideal: {ideal}</div>}
  </div>
);

export default CardTemperatura;
