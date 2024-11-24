import React from 'react';
import Menu from '../components/Menu';
import NormDistTemExt from '../components/ProbabilityComponents/NormDistTemExt';
import NormDistTemInt from '../components/ProbabilityComponents/NormDistTemInt';
import NormDistGas from '../components/ProbabilityComponents/NormDistGas';

export const Probability = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Menu />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-4 overflow-auto">
        <div className="col-span-1 md:col-span-1">
          <NormDistTemExt />
        </div>
        <div className="col-span-1 md:col-span-1">
          <NormDistTemInt />
        </div>
          <NormDistGas />
      </div>
    </div>
  );
};
