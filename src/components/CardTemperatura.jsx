import React from 'react';

const CardTemperatura = ({ titulo, valor, descripcion, ideal, porcentaje }) => {
  return (
    <div className="bg-white text-black p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{titulo}</h3>
      <p className="text-3xl font-bold">{valor}</p>
      <p className="text-sm text-gray-500">{descripcion}</p>
      {ideal && <p className="text-sm">Ideal: {ideal}</p>}
      <div className="h-2 bg-gray-200 rounded mt-2">
        <div
          style={{ width: `${porcentaje}%` }}
          className="h-full bg-orange-500 rounded"
        ></div>
      </div>
    </div>
  );
};

export default CardTemperatura;
