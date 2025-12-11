import React, { useEffect, useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { getAllMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllDosen } from "@/Utils/Apis/DosenApi";
import { getAllKelas } from "@/Utils/Apis/KelasApi";
import { getAllMatkul } from "@/Utils/Apis/MatkulApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalDosen: 0,
    totalKelas: 0,
    totalMatkul: 0,
  });

  // State untuk Data Chart
  const [dataKelasMhs, setDataKelasMhs] = useState([]);
  const [dataSksDist, setDataSksDist] = useState([]);
  const [dataDosenSks, setDataDosenSks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Ambil Semua Data Sekaligus
      const [resMhs, resDosen, resKelas, resMatkul] = await Promise.all([
        getAllMahasiswa(),
        getAllDosen(),
        getAllKelas(),
        getAllMatkul(),
      ]);

      const mhs = resMhs.data;
      const dosen = resDosen.data;
      const kelas = resKelas.data;
      const matkul = resMatkul.data;

      // 2. Set Statistik Sederhana (Card Atas)
      setStats({
        totalMahasiswa: mhs.length,
        totalDosen: dosen.length,
        totalKelas: kelas.length,
        totalMatkul: matkul.length,
      });

      // --- OLAH DATA UNTUK CHART ---

      // CHART 1: Jumlah Mahasiswa per Kelas
      // Format: { name: 'A11.4403', jumlah: 5 }
      const chart1Data = kelas.map((k) => ({
        name: k.nama_kelas || k.kode_kelas, // Tampilkan Nama Kelas
        jumlah: k.mahasiswa_ids ? k.mahasiswa_ids.length : 0, // Hitung isi array
      }));
      setDataKelasMhs(chart1Data);

      // CHART 2: Distribusi SKS Matkul (Pie Chart)
      // Format: { name: '3 SKS', value: 10 }
      const sksGroups = {};
      matkul.forEach((m) => {
        const key = `${m.sks} SKS`;
        sksGroups[key] = (sksGroups[key] || 0) + 1;
      });
      // Convert object ke array
      const chart2Data = Object.keys(sksGroups).map((key) => ({
        name: key,
        value: sksGroups[key],
      }));
      setDataSksDist(chart2Data);

      // CHART 3: Total SKS Mengajar per Dosen
      // Format: { name: 'Dr. Risa', total_sks: 6 }
      const chart3Data = dosen.map((d) => {
        // Cari kelas yang diajar dosen ini
        const kelasAjar = kelas.filter((k) => String(k.dosen_id) === String(d.id));
        
        // Hitung total SKS dari kelas tersebut
        const totalSks = kelasAjar.reduce((acc, curr) => {
          // Cari matkul di kelas ini untuk tau SKS-nya
          const mk = matkul.find((m) => String(m.id) === String(curr.mata_kuliah_id));
          return acc + (mk ? parseInt(mk.sks) : 0);
        }, 0);

        return {
          name: d.name || d.nama, // Handle nama dosen
          total_sks: totalSks,
        };
      });
      setDataDosenSks(chart3Data);

    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    }
  };

  // Warna untuk Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Akademik</h1>

      {/* --- BAGIAN 1: STATISTIC CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Mahasiswa" count={stats.totalMahasiswa} color="bg-blue-500" icon="🎓" />
        <StatCard title="Total Dosen" count={stats.totalDosen} color="bg-green-500" icon="👨‍🏫" />
        <StatCard title="Total Kelas" count={stats.totalKelas} color="bg-yellow-500" icon="🏫" />
        <StatCard title="Mata Kuliah" count={stats.totalMatkul} color="bg-purple-500" icon="📚" />
      </div>

      {/* --- BAGIAN 2: CHARTS ROW 1 --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: Bar Chart (Mahasiswa per Kelas) */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Jumlah Mahasiswa per Kelas</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataKelasMhs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#3B82F6" name="Jumlah Mahasiswa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CHART 2: Pie Chart (Distribusi SKS) */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Distribusi SKS Mata Kuliah</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataSksDist}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataSksDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* --- BAGIAN 3: CHARTS ROW 2 --- */}
      
      {/* CHART 3: Area Chart (Beban SKS Dosen) */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Total Beban SKS Mengajar Dosen</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataDosenSks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total_sks" stroke="#82ca9d" fill="#82ca9d" name="Total SKS" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

// Komponen Kecil untuk Card Statistik
const StatCard = ({ title, count, color, icon }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-md flex items-center justify-between`}>
    <div>
      <h3 className="text-lg font-medium opacity-90">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
    <div className="text-4xl opacity-50">{icon}</div>
  </div>
);

export default Dashboard;