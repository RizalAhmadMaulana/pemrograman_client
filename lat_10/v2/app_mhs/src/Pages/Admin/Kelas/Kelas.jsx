import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import TableKelas from "./TableKelas";
import ModalKelas from "./ModalKelas";
import { getAllKelas, storeKelas, updateKelas, deleteKelas } from "@/Utils/Apis/KelasApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Kelas = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const [form, setForm] = useState({ 
    id: null, 
    kode_kelas: "", 
    nama_kelas: "", 
    matkul: "", 
    hari: "", 
    jam_mulai: "", 
    jam_selesai: "" 
  });

  const fetchData = async () => {
    // Cek Permission Read secara manual
    if (!user.permission.includes("kelas.read")) {
        return setData([]);
    }
    
    try {
      const res = await getAllKelas();
      setData(res.data);
    } catch (err) { toastError("Gagal ambil data"); }
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Cek Permission Update/Create secara manual
    if (isEdit && !user.permission.includes("kelas.update")) return toastError("Akses ditolak");
    if (!isEdit && !user.permission.includes("kelas.create")) return toastError("Akses ditolak");

    try {
      if (isEdit) await updateKelas(form.id, form);
      else await storeKelas(form);
      
      toastSuccess(`Berhasil ${isEdit ? "diupdate" : "disimpan"}`);
      setIsModalOpen(false);
      fetchData();
    } catch (err) { toastError("Gagal proses data"); }
  };

  const handleDelete = (id) => {
    // Cek Permission Delete secara manual
    if (!user.permission.includes("kelas.delete")) return toastError("Akses ditolak");
    
    confirmDelete(async () => {
      await deleteKelas(id);
      fetchData();
      toastSuccess("Berhasil dihapus");
    });
  };

  const openAdd = () => { 
    setForm({ id: null, kode_kelas: "", nama_kelas: "", matkul: "", hari: "", jam_mulai: "", jam_selesai: "" }); 
    setIsEdit(false); 
    setIsModalOpen(true); 
  };
  
  const openEdit = (item) => { 
    setForm(item); 
    setIsEdit(true); 
    setIsModalOpen(true); 
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="text-left">Daftar Kelas</Heading>
        {user.permission.includes("kelas.create") && (
            <Button onClick={openAdd}>+ Tambah Kelas</Button>
        )}
      </div>

      {user.permission.includes("kelas.read") ? (
        <TableKelas 
            data={data} 
            onEdit={openEdit} 
            onDelete={handleDelete} 
            onDetail={(id) => navigate(`/admin/kelas/${id}`)} 
        />
      ) : <p className="text-red-500 text-center">Anda tidak punya akses melihat data ini.</p>}

      <ModalKelas isOpen={isModalOpen} isEdit={isEdit} form={form} onChange={handleChange} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </Card>
  );
};

export default Kelas;