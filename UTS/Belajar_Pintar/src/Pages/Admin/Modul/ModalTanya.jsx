import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; 

const ModalTanya = ({ isOpen, onClose, onSubmit, moduleTitle }) => {
  const [question, setQuestion] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === '') return;
    onSubmit(question, moduleTitle); 
    
    toast.success(`Pertanyaan tentang ${moduleTitle} berhasil dikirim!`, {
      duration: 3000,
      position: 'top-center',
      style: {
        fontSize: '18px',
        padding: '16px 24px',
        fontWeight: 'bold', 
        backgroundColor: '#4ade80',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#4ade80',
      },
    });
    
    setQuestion(''); 
    onClose();      
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform scale-100 transition-transform duration-300">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Tanya Dosen - Modul: {moduleTitle}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tulis pertanyaan Anda di sini..."
            rows="6"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
            >
              Kirim Pertanyaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTanya;