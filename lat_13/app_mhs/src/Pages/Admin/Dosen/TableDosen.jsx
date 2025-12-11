import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const TableDosen = ({ data = [], onEdit, onDelete, onDetail }) => {
  const { user } = useAuthStateContext();
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIP</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dsn, index) => (
          <tr key={dsn.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{dsn.nip}</td>
            <td className="py-2 px-4">{dsn.name}</td> 
            <td className="py-2 px-4 text-center space-x-2">
              <Button onClick={() => onDetail(dsn.id)}>Detail</Button>
              {user.permission.includes("dosen.update") && (
                <Button size="sm" variant="warning" onClick={() => onEdit(dsn)}>Edit</Button>
              )}
              {user.permission.includes("dosen.delete") && (
                <Button size="sm" variant="danger" onClick={() => onDelete(dsn.id)}>Hapus</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDosen;