import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  BookOpen, 
  Clock,
  Play
} from 'lucide-react'; 

const AccordianItem = ({ modul, isActive, onToggle, onComplete, onAsk }) => {
  const { id, judul, deskripsi, selesai, category } = modul;

  const categoryColors = {
    'Programming': 'bg-blue-100 text-blue-700',
    'Network': 'bg-purple-100 text-purple-700',
    'Database': 'bg-orange-100 text-orange-700',
    'Deployment': 'bg-green-100 text-green-700'
  };

  return (
    <div className={`group transition-all duration-300 border-2 rounded-[2rem] overflow-hidden mb-6 ${
      isActive ? 'border-indigo-500 bg-white shadow-2xl shadow-indigo-100 scale-[1.01]' : 'border-gray-100 bg-white hover:border-indigo-200 shadow-sm'
    }`}>
      
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center gap-5">
          {/* Status Icon */}
          <div className={`transition-colors duration-300 ${selesai ? 'text-green-500' : 'text-gray-300'}`}>
            {selesai ? <CheckCircle2 size={32} fill="currentColor" className="text-white" /> : <Circle size={32} />}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}>
                {category || 'Materi'}
              </span>
              {selesai && (
                <span className="text-[10px] font-black bg-green-500 text-white px-3 py-1 rounded-full shadow-sm">
                  TUNTAS
                </span>
              )}
            </div>
            <h3 className={`text-xl font-bold tracking-tight ${isActive ? 'text-indigo-600' : 'text-gray-800'}`}>
              {judul}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm font-medium mr-4">
            <Clock size={16} /> 15 Menit
          </div>
          <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
            {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {isActive && (
        <div className="px-8 pb-8 pt-2 animate-fadeIn">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-widest mb-3">
              <BookOpen size={14} /> Deskripsi Materi
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              {deskripsi}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {!selesai ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); onComplete(id, judul); }}
                  className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <Play size={18} fill="currentColor" /> MULAI & TANDAI SELESAI
                </button>
              ) : (
                <div className="flex-1 bg-green-50 text-green-700 font-bold py-4 rounded-xl border border-green-200 flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> MATERI TELAH DIPELAJARI
                </div>
              )}
              
              <button 
                onClick={(e) => { e.stopPropagation(); onAsk(id, judul); }}
                className="px-6 py-4 bg-white text-gray-700 font-bold border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} /> TANYA DOSEN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordianItem;