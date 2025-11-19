import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/Components/ProgressBar';
import { mahasiswaList, modulList } from "@/Data/Dummy";

const Dashboard = () => {
  const navigate = useNavigate();
  const student = mahasiswaList[0]; 
  const totalModules = modulList.length;
  const completedModules = student.modul;
  const progressPercentage = (completedModules / totalModules) * 100;
  
  const handleContinueLearning = () => {
    navigate('/admin/modul'); 
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Selamat Datang di Dashboard, {student.nama}! 👋
      </h1>
      
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 border-t-4 border-indigo-500">
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Ringkasan Akun</h2>
        <p className="text-lg text-gray-600 mb-2">
          Nama Mahasiswa : {student.nama}
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-700 mb-3">Progress Belajar Anda 🚀</h3>
          <div className="mb-2 flex justify-between items-center text-sm font-medium">
            <span className="text-indigo-600">
              {completedModules} dari {totalModules} Materi Selesai
            </span>
            <span className="text-gray-500">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-indigo-600 h-4 rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage.toFixed(0)}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
        </div>

        <button
          onClick={handleContinueLearning}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 
          transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Lanjutkan Belajar Modul ➡️
        </button>
      </div>

    </div>
  );
};
  
export default Dashboard;