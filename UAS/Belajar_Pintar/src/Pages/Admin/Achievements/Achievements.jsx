import React from 'react';
import { useAppContext } from "@/Utils/Contexts/AppContext";
import { achievementsList, learningPath, dummyUser } from "@/Data/Dummy";
import Card from "@/Components/Card";
import { Award, Star, Zap, Map, CheckCircle2, Lock, ChevronRight } from 'lucide-react';

const Achievements = () => {
  const { achievements } = useAppContext(); 
  
  const earnedCount = achievements.length;
  const totalCount = achievementsList.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Legendary': return 'bg-orange-500 shadow-orange-200';
      case 'Epic': return 'bg-purple-500 shadow-purple-200';
      case 'Rare': return 'bg-blue-500 shadow-blue-200';
      default: return 'bg-gray-400 shadow-gray-100';
    }
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white flex flex-col items-center justify-center w-32 h-32 shadow-lg shadow-indigo-100">
           <Award size={40} />
           <span className="text-xl font-black mt-1">{progressPercent}%</span>
        </div>
        <div className="flex-1 space-y-4 w-full">
           <div>
              <h1 className="text-2xl font-black text-gray-800">Koleksi Pencapaian 🏆</h1>
              <p className="text-gray-500 font-medium">Kamu sudah mengumpulkan {earnedCount} dari {totalCount} badge kelangkaan.</p>
           </div>
           <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <Star className="text-yellow-500 fill-yellow-500" /> Badge yang Diraih
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievementsList.map((badge) => {
              const isEarned = achievements.includes(badge.title) || achievements.includes(badge.id);
              return (
                <Card key={badge.id} className={`group !p-6 !rounded-3xl border-2 transition-all duration-300 ${isEarned ? 'border-indigo-100 bg-white' : 'border-dashed border-gray-200 bg-gray-50/50'}`}>
                  <div className="flex items-start gap-5">
                    <div className={`text-4xl p-4 rounded-2xl shadow-lg transition-transform duration-500 ${isEarned ? 'bg-white group-hover:rotate-12' : 'grayscale opacity-30'}`}>
                      {badge.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </span>
                        {!isEarned && <Lock size={12} className="text-gray-400" />}
                      </div>
                      <h3 className={`font-black tracking-tight ${isEarned ? 'text-gray-800' : 'text-gray-400'}`}>{badge.title}</h3>
                      <p className="text-xs text-gray-400 font-medium leading-tight">{badge.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <Map className="text-indigo-600" /> Learning Path
          </h2>
          <Card className="!p-8 !rounded-[2.5rem] border-none shadow-xl">
            <div className="space-y-8 relative">
              {/* Garis Vertikal Path */}
              <div className="absolute left-[15px] top-2 bottom-2 w-1 bg-gray-100 rounded-full"></div>
              
              {learningPath.map((path, idx) => (
                <div key={idx} className="relative flex items-center gap-6 group">
                  <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all ${
                    path.status === 'completed' ? 'bg-green-500' : 
                    path.status === 'current' ? 'bg-indigo-600 animate-pulse scale-110' : 'bg-gray-300'
                  }`}>
                    {path.status === 'completed' ? <CheckCircle2 size={14} className="text-white" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                    path.status === 'current' ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-transparent'
                  }`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                      path.status === 'completed' ? 'text-green-500' : 
                      path.status === 'current' ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                      Step {path.step}
                    </p>
                    <h4 className={`font-bold text-sm ${path.status === 'upcoming' ? 'text-gray-400' : 'text-gray-800'}`}>
                      {path.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.href = '/admin/modul'}
              className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
            >
              Lanjutkan Perjalanan <ChevronRight size={16} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Achievements;