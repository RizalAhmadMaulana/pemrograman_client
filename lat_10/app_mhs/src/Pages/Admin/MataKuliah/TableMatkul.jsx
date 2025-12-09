import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const TableMatkul = ({ data = [], onEdit, onDelete, onDetail }) => {
  const { user } = useAuthStateContext();
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Kode</th>
          <th className="py-2 px-4 text-left">Nama Mata Kuliah</th>
          <th className="py-2 px-4 text-left">SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((matkul, index) => (
          <tr key={matkul.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{matkul.kode}</td>
            <td className="py-2 px-4">{matkul.nama}</td>
            <td className="py-2 px-4">{matkul.sks}</td>
            <td className="py-2 px-4 text-center space-x-2">
              <Button size="sm" onClick={() => onDetail(matkul.id)}>Detail</Button>
              {user.permission.includes("matakuliah.update") && (
              <Button size="sm" variant="warning" onClick={() => onEdit(matkul)}>
                Edit
              </Button>
              )}
              {user.permission.includes("matakuliah.delete") && (
                <Button size="sm" variant="danger" onClick={() => onDelete(matkul.id)}>
                  Hapus
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMatkul;