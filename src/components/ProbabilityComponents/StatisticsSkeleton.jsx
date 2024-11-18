import React from 'react'

export const StatisticsSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold mb-4 bg-gray-300 rounded animate-pulse h-8 w-1/2"></h1>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold bg-gray-300 rounded animate-pulse h-6 w-1/3 mb-2"></h2>
          <p className="bg-gray-300 rounded animate-pulse h-4 w-1/4 mb-2"></p>
          <p className="bg-gray-300 rounded animate-pulse h-4 w-1/4 mb-2"></p>
          <p className="bg-gray-300 rounded animate-pulse h-4 w-1/4 mb-2"></p>
          <ul className="list-disc list-inside">
            <li className="bg-gray-300 rounded animate-pulse h-4 w-1/2 mb-2"></li>
            <li className="bg-gray-300 rounded animate-pulse h-4 w-1/2 mb-2"></li>
            <li className="bg-gray-300 rounded animate-pulse h-4 w-1/2 mb-2"></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
