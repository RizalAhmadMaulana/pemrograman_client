// src/Pages/Admin/Modul/AccordianItem.jsx (REVISI STYLING BERWARNA)
import React from 'react';

const AccordianItem = ({ modul, isActive, onToggle, onComplete, onAsk }) => {
  const { id, judul, deskripsi, selesai } = modul;

  const headerClasses = `
    flex justify-between items-center p-4 cursor-pointer transition-all duration-300 
    border-b-2 border-transparent 
    ${selesai 
        ? 'bg-green-100 hover:bg-green-200 text-green-900 font-bold' // Selesai: Hijau Cerah
        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold'} // Belum Selesai: Biru Muda
  `;
  
  const bodyClasses = `
    p-5 border-t border-gray-100 bg-white shadow-lg transition-max-height duration-500 ease-in-out
  `;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={headerClasses} onClick={() => onToggle(id)}>
        <span className="flex items-center text-lg">
          {/* Judul: Lebih tebal dan berwarna */}
          <span className="mr-3">{selesai ? '🎉' : '📚'}</span> 
          {judul} 
          {selesai && <span className="ml-4 px-3 py-1 text-xs font-bold bg-green-500 text-white rounded-full shadow-md">TUNTAS</span>}
        </span>
        <span className="text-xl text-gray-700 transform transition-transform duration-300">
          {isActive ? '▲' : '▼'}
        </span>
      </div>

      {isActive && (
        <div className={bodyClasses}>
          <p className="text-gray-700 mb-5 text-sm leading-relaxed border-l-4 border-indigo-400 pl-4 bg-gray-50 p-3 rounded-md">{deskripsi}</p>
          <div className="flex space-x-4 mt-2">
            {!selesai && (
              <button 
                onClick={() => onComplete(id, judul)} 
                className="px-6 py-2 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition duration-200 transform hover:scale-105"
              >
                Tandai Selesai
              </button>
            )}
            <button 
              onClick={() => onAsk(id, judul)} 
              className="px-6 py-2 border border-blue-500 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition duration-200"
            >
              Tanya Dosen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordianItem;