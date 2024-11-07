import React from 'react';

const CardNivel = ({ titulo, valor, descripcion, umbral, porcentaje }) => {
  const descripcionVibracion = valor === 0 ? 'Sin movimiento' : 'En movimiento';

  return (
    <div className="bg-white text-black p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{titulo}</h3>
      <p className="text-3xl font-bold">{valor}</p>
      <p className={`text-sm ${valor > umbral ? 'text-red-600' : 'text-gray-500'}`}>
        {descripcion || descripcionVibracion}
      </p>
      <p className="text-sm">Límite: {umbral}</p>
      <div className="h-2 bg-gray-200 rounded mt-2">
        <div
          style={{ width: `${porcentaje}%` }}
          className="h-full bg-orange-500 rounded"
        ></div>
      </div>
    </div>
  );
};

export default CardNivel;