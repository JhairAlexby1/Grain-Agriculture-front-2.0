import React from 'react';

const Alerta = ({ mensaje, tipo }) => (
  <div
    className={`p-4 rounded-md mt-4 ${
      tipo === 'vibracion' ? 'bg-yellow-200' : 'bg-red-200'
    } text-black font-semibold`}
  >
    {mensaje}
  </div>
);

export default Alerta;
