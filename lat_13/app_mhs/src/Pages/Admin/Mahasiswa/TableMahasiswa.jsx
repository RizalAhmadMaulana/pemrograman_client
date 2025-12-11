import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const TableMahasiswa = ({ data = [], onEdit, onDelete, onDetail, getTotalSks }) => {
  const { user } = useAuthStateContext();
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-center">Max SKS</th>
          <th className="py-2 px-4 text-center">SKS Terpakai</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((mhs, index) => {
          const totalSks = getTotalSks ? getTotalSks(mhs.id) : 0;
          return (
            <tr key={mhs.nim} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.name}</td>
              <td className="py-2 px-4 text-center">{mhs.max_sks || "-"}</td>
              <td className="py-2 px-4 text-center font-bold">{totalSks}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button onClick={() => onDetail(mhs.id)}>Detail</Button>
                {user.permission.includes("mahasiswa.update") && (
                  <Button size="sm" variant="warning" onClick={() => onEdit(mhs)}>Edit</Button>
                )}
                {user.permission.includes("mahasiswa.delete") && (
                  <Button size="sm" variant="danger" onClick={() => onDelete(mhs.id)}>Hapus</Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableMahasiswa;