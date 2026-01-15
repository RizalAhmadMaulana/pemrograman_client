import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, CheckCircle, AlertTriangle, Clock, 
  Upload, BarChart3, MessageSquare, Plus, FileText 
} from 'lucide-react';
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import { classPerformance, contentEngagement, studentFeedback } from "@/Data/Dummy";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Panel Instruktur 👨‍🏫</h1>
          <p className="text-gray-500 font-medium">Monitoring performa kelas dan manajemen kurikulum.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            ANALITIK KELAS
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'content' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            MANAJEMEN KONTEN
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Rata-rata Nilai', val: '78.5', icon: <BarChart3 />, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Penyelesaian', val: '64%', icon: <CheckCircle />, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Waktu Belajar', val: '4.2h/day', icon: <Clock />, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Siswa Beresiko', val: '2 Siswa', icon: <AlertTriangle />, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((item, i) => (
              <Card key={i} className="!p-6 border-none shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>{item.icon}</div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">{item.label}</p>
                    <p className="text-2xl font-black text-gray-800">{item.val}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="!p-8 !rounded-[2.5rem] border-none shadow-xl">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <Users className="text-indigo-600" /> Daftar Performa Mahasiswa
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-black text-gray-400 border-b border-gray-50 uppercase tracking-widest">
                      <th className="pb-4">Nama</th>
                      <th className="pb-4">Skor</th>
                      <th className="pb-4">Progress</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {classPerformance.map((student, i) => (
                      <tr key={i} className="group">
                        <td className="py-4 font-bold text-gray-700">{student.name}</td>
                        <td className="py-4 font-black">{student.score}</td>
                        <td className="py-4">
                          <div className="w-24 bg-gray-100 h-2 rounded-full">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${student.progress}%` }}></div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${student.status === 'Aman' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600 animate-pulse'}`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="!p-8 !rounded-[2.5rem] border-none shadow-xl">
              <h3 className="text-xl font-black text-gray-800 mb-8">Statistik Nilai Kelas</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 !p-8 !rounded-[2.5rem] border-2 border-dashed border-indigo-200 bg-indigo-50/30">
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full py-10">
              <div className="p-6 bg-white rounded-full shadow-lg text-indigo-600"><Upload size={40} /></div>
              <div>
                <h3 className="text-lg font-black text-gray-800">Upload Media Baru</h3>
                <p className="text-xs text-gray-500">Drag & drop Video, PDF, atau Gambar di sini</p>
              </div>
              <Button className="!rounded-xl px-8">Pilih File</Button>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
              <BarChart3 className="text-indigo-600" /> Konten Paling Engaging
            </h3>
            <div className="grid gap-4">
              {contentEngagement.map((content, i) => (
                <Card key={i} className="!p-5 border-none shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><FileText /></div>
                    <div>
                      <h4 className="font-bold text-gray-800">{content.title}</h4>
                      <p className="text-xs text-gray-400">{content.views}x Dilihat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-indigo-600">{content.engagement}%</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Engagement</p>
                  </div>
                </Card>
              ))}
            </div>

            <h3 className="text-xl font-black text-gray-800 flex items-center gap-3 pt-4">
              <MessageSquare className="text-indigo-600" /> Feedback Mahasiswa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentFeedback.map((f, i) => (
                <Card key={i} className="!p-5 border-none shadow-md bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="font-black text-indigo-600 text-sm">{f.user}</span>
                    <span className="text-yellow-500 font-bold">★ {f.rating}/5</span>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{f.comment}"</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;