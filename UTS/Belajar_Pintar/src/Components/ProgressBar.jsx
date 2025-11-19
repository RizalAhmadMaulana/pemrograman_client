import React from 'react';

const ProgressBar = ({ completed, total, userName }) => { 
  const progressPercentage = total > 0 
    ? (completed / total) * 100 
    : 0;

  const displayName = userName || "Anda"; 

  return (
    <div className="mt-8 mb-8 p-5 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        Progress Belajar {displayName} 🚀
      </h3>
      
      <div className="mb-3 flex justify-between items-center text-sm font-semibold">
        <span className="text-indigo-600">
          {completed} dari {total} Materi Selesai
        </span>
        <span className="text-gray-700 text-lg">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="border-indigo-500" 
          style={{width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage.toFixed(0)}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;