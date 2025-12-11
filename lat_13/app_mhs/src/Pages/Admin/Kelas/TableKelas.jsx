import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const TableKelas = ({ data = [], onEdit, onDelete, onDetail }) => {
  const { user } = useAuthStateContext();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Kode</th>
            <th className="py-2 px-4 text-left">Kelas</th>
            <th className="py-2 px-4 text-left">Matkul</th>
            <th className="py-2 px-4 text-left">Jadwal</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kls) => (
            <tr key={kls.id} className="border-b bg-white hover:bg-gray-50">
              <td className="py-2 px-4">{kls.kode_kelas}</td>
              <td className="py-2 px-4">{kls.nama_kelas}</td>
              <td className="py-2 px-4">{kls.matkul}</td>
              <td className="py-2 px-4">
                {kls.hari}, {kls.jam_mulai}-{kls.jam_selesai}
              </td>
              <td className="py-2 px-4 text-center space-x-2 flex justify-center">
                <Button size="sm" onClick={() => onDetail(kls.id)}>Detail</Button>
                {user.permission.includes("kelas.update") && (
                  <Button size="sm" variant="warning" onClick={() => onEdit(kls)}>Edit</Button>
                )}
                {user.permission.includes("kelas.delete") && (
                  <Button size="sm" variant="danger" onClick={() => onDelete(kls.id)}>Hapus</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableKelas;