import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="bg-white text-black p-4 rounded shadow animate-pulse">
      <div className="h-6 w-2/3 bg-gray-200 rounded mb-4"></div>
      <div className="h-10 w-1/3 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
      <div className="h-2 bg-gray-200 rounded mt-2"></div>
    </div>
  );
};

export default CardSkeleton;