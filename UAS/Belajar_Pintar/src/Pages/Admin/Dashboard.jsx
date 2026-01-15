import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { 
  BookOpen, Trophy, Flame, Target, Zap, Star, ChevronRight, Bookmark, PlayCircle 
} from 'lucide-react'; 
import Card from "@/Components/Card";
import { 
  dummyUser, modulList, studyProgressData, 
  categoryData, skillData 
} from "@/Data/Dummy";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // ============================================================
  // LOGIKA REAL-TIME: Ambil data dari localStorage
  // ============================================================
  const [currentModules] = useState(() => {
    const saved = localStorage.getItem("learning_modules");
    return saved ? JSON.parse(saved) : modulList;
  });

  const totalModul = currentModules.length;
  const selesaiModul = currentModules.filter(m => m.selesai).length;
  const progressPercentage = Math.round((selesaiModul / totalModul) * 100);

  // Data Distribusi untuk Pie Chart (Dinamis)
  const statusDist = [
    { name: 'Selesai', value: selesaiModul, color: '#10b981' },
    { name: 'Proses', value: 2, color: '#3b82f6' },
    { name: 'Belum', value: Math.max(0, totalModul - selesaiModul - 2), color: '#f3f4f6' }
  ];

  // Data Akumulasi (Area Chart)
  const accumulatedHours = [
    { name: 'Minggu 1', hours: 10 },
    { name: 'Minggu 2', hours: 25 },
    { name: 'Minggu 3', hours: 45 },
    { name: 'Minggu 4', hours: 70 },
  ];

  const summaryData = [
    { 
      label: 'Total Modul', 
      val: `${selesaiModul}/${totalModul}`, 
      sub: 'Materi tuntas',
      icon: <BookOpen size={28} />, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      accent: 'bg-blue-600',
      shadow: 'shadow-blue-100'
    },
    { 
      label: 'Streak Belajar', 
      val: `${dummyUser.streak} Hari`, 
      sub: 'Tanpa putus 🔥',
      icon: <Flame size={28} />, 
      color: 'text-orange-500', 
      bg: 'bg-orange-50',
      accent: 'bg-orange-500',
      shadow: 'shadow-orange-100'
    },
    { 
      label: 'Poin XP', 
      val: dummyUser.points.toLocaleString(), 
      sub: 'Level: Pro Learner',
      icon: <Trophy size={28} />, 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-50',
      accent: 'bg-yellow-500',
      shadow: 'shadow-yellow-100'
    },
    { 
      label: 'Target Hari Ini', 
      val: '85%', 
      sub: 'Hampir selesai!',
      icon: <Target size={28} />, 
      color: 'text-green-500', 
      bg: 'bg-green-50',
      accent: 'bg-green-500',
      shadow: 'shadow-green-100'
    },
  ];

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-8 animate-fadeIn">
      
      <div className="relative overflow-hidden bg-indigo-700 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black">Selamat Datang, {dummyUser.name}! 👋</h1>
            <p className="text-indigo-100 text-lg">Kamu sudah menyelesaikan {progressPercentage}% kurikulum. Pertahankan prestasimu!</p>
            <div className="flex gap-4 pt-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/admin/modul')}
                className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all transform hover:scale-105"
              >
                <PlayCircle size={20} /> Lanjutkan Belajar
              </button>
            </div>
          </div>
          
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-600" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * progressPercentage) / 100}
                strokeLinecap="round" className="text-white" />
            </svg>
            <span className="absolute text-2xl font-black">{progressPercentage}%</span>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, i) => (
          <div 
            key={i} 
            className={`relative group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl ${item.shadow} hover:scale-[1.03] transition-all duration-500 cursor-default overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${item.accent} opacity-[0.03] rounded-bl-full`}></div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl ${item.bg} ${item.color} shadow-inner`}>
                  {item.icon}
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                   <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-none">{item.val}</h2>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-xs font-bold text-gray-500">{item.sub}</span>
                <div className={`w-8 h-1 rounded-full ${item.accent} opacity-20`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 !p-8 !rounded-[2.5rem] border-none shadow-2xl shadow-gray-200/50">
          <h3 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3">
            <Zap size={24} className="text-indigo-600" /> Akumulasi Jam Belajar
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accumulatedHours}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="!p-8 !rounded-[2.5rem] border-none shadow-2xl shadow-gray-200/50">
          <h3 className="text-xl font-black text-gray-800 mb-8">Radar Skill Assessment</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 12, fontWeight: 800, fill: '#64748b'}} />
                <Radar name="Skor" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!p-6 !rounded-3xl shadow-lg border-none">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Weekly Progress (Line)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studyProgressData}>
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="!p-6 !rounded-3xl shadow-lg border-none">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Category Hours (Bar)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="!p-6 !rounded-3xl shadow-lg border-none">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Status Modul (Pie)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusDist} dataKey="value" innerRadius={45} outerRadius={65} paddingAngle={8}>
                    {statusDist.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col md:flex-row items-center gap-8 justify-between">
           <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Lanjut Belajar?</h2>
              <p className="text-gray-500 font-medium italic">Materi berikutnya: <span className="text-indigo-600 font-bold underline">{currentModules[selesaiModul]?.judul || "Semua Tuntas!"}</span></p>
           </div>
           <button 
              onClick={() => navigate('/admin/modul')}
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center gap-3 tracking-widest text-xs"
            >
              MULAI SEKARANG <ChevronRight size={20} />
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-900 p-6 rounded-[2rem] text-white flex flex-col justify-between shadow-lg">
                <Bookmark className="text-indigo-400 mb-4" />
                <div>
                  <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Bookmarked</p>
                  <h4 className="font-bold text-sm leading-tight line-clamp-1">{currentModules[selesaiModul + 1]?.judul || "Final Project Preparation"}</h4>
                </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg flex flex-col justify-between">
                <Star className="text-yellow-500 mb-4 fill-yellow-500" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Next Achievement</p>
                  <h4 className="font-bold text-sm text-gray-800 tracking-tight">React Architect 🏆</h4>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;