import React from 'react';
import Menu from '../components/Menu';
import NormDistTemExt from '../components/ProbabilityComponents/NormDistTemExt';
import NormDistTemInt from '../components/ProbabilityComponents/NormDistTemInt';
import NormDistGas from '../components/ProbabilityComponents/NormDistGas';

export const Probability = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Probabilidades</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
          <NormDistTemExt />
          <NormDistTemInt />
        </div>
        <div className=" max-w-6xl mt-4">
          <NormDistGas />
        </div>
      </div>
    </div>
  );
};
