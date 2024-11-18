import React from 'react';
import Menu from '../components/Menu';
import PredictionContent from '../components/PredictionComponents/PredictionContent';

export const Prediction = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <PredictionContent />
    </div>
  );
};