import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { day: 'Senin', hours: 2 },
  { day: 'Selasa', hours: 5 },
];

const Analytics = () => (
  <div className="p-6 bg-white rounded-xl shadow">
    <h2 className="text-2xl font-bold mb-4">Analitik Waktu Belajar 📈</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);