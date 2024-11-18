import React from 'react';
import Menu from '../components/Menu';
import NormDistTemExt from '../components/statisticsComponents/NormDistTemExt';
import NormDistTemInt from '../components/statisticsComponents/NormDistTemInt';
import NormDistGas from '../components/statisticsComponents/NormDistGas';
import GraphicPastel from '../components/statisticsComponents/GraphicPastel';


export const Probability = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Probabilidades</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
          <NormDistTemExt />
          <NormDistTemInt />
          <NormDistGas />
          <GraphicPastel />
        </div>
      </div>
    </div>
  );
};