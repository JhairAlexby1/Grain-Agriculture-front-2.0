import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CardNivel = ({ titulo, valor, descripcion, umbral, porcentaje, icon, estado }) => {
  const getEstadoColor = () => {
    switch (estado) {
      case 'crítico':
        return 'bg-red-500';
      case 'advertencia':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="p-4 rounded-full bg-gray-100">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{titulo}</h3>
          <p className="text-sm text-gray-500">{descripcion}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold">{valor}</p>
        <p className="text-sm text-gray-500">Umbral: {umbral}</p>
      </div>
      <div className="mt-4">
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div
            style={{ width: `${porcentaje}%` }}
            className={`h-full rounded-full ${getEstadoColor()}`}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Porcentaje: {porcentaje}%</p>
      </div>
    </div>
  );
};

export default CardNivel;
