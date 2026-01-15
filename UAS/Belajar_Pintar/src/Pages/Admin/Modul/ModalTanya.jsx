import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; 
import { X, Send } from 'lucide-react'; 

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
    });
    
    setQuestion(''); 
    onClose();      
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-fadeIn">
      
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn border border-white/20">
        
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Tanya Dosen 👨‍🏫</h3>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-1">Modul: {moduleTitle}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pesan Pertanyaan</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tuliskan kendala atau pertanyaanmu di sini secara detail..."
              rows="5"
              required
              className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none font-medium transition-all resize-none text-gray-700"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-4 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-100 rounded-2xl transition-all"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Send size={16} /> Kirim Sekarang
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ModalTanya;