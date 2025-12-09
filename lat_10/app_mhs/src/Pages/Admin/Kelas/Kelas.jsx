import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import TableKelas from "./TableKelas";
import ModalKelas from "./ModalKelas";
// --- HAPUS: import { getAllKelas, storeKelas, updateKelas, deleteKelas } ---
// --- HAPUS: import { useEffect } ---
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

// 1. IMPORT HOOKS BARU
import {
    useKelas,
    useAddKelas,
    useUpdateKelas,
    useDeleteKelas,
} from "@/Utils/Hooks/useKelas";

const Kelas = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  // 2. GANTI STATE MANUAL DENGAN HOOKS (READ)
  const { data: data, isLoading, isError } = useKelas(); 

  // 3. AMBIL FUNGSI MUTATE (CUD)
  const mutationAdd = useAddKelas();
  const mutationUpdate = useUpdateKelas();
  const mutationDelete = useDeleteKelas();
  
  // --- STATE MODAL & FORM (TETAP SAMA) ---
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

  // --- HAPUS: fetchData function ---
  // --- HAPUS: useEffect(() => { fetchData(); }, []); ---


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Cek Permission Update/Create secara manual
    if (isEdit && !user.permission.includes("kelas.update")) return toastError("Akses ditolak");
    if (!isEdit && !user.permission.includes("kelas.create")) return toastError("Akses ditolak");

    try {
        if (isEdit) {
            // Panggil Mutate Update
            mutationUpdate.mutate({ id: form.id, data: form }, {
                onSuccess: () => {
                    toastSuccess("Berhasil diperbarui");
                    setIsModalOpen(false);
                },
                onError: () => toastError("Gagal proses data"),
            });
        } else {
            // Panggil Mutate Add
            mutationAdd.mutate(form, {
                onSuccess: () => {
                    toastSuccess("Berhasil disimpan");
                    setIsModalOpen(false);
                },
                onError: () => toastError("Gagal proses data"),
            });
        }
    } catch (err) { toastError("Gagal proses data"); }
  };

  const handleDelete = (id) => {
    if (!user.permission.includes("kelas.delete")) return toastError("Akses ditolak");
    
    confirmDelete(() => {
        // Panggil Mutate Delete
        mutationDelete.mutate(id, {
            onSuccess: () => toastSuccess("Berhasil dihapus"),
            onError: () => toastError("Gagal menghapus data"),
        });
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

  // 4. HANDLING LOADING/ERROR DARI HOOK
  if (!user.permission.includes("kelas.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;
  
  if (isLoading) return <Card><p className="text-center">Memuat data...</p></Card>;
  if (isError) return <Card><p className="text-center text-red-500">Gagal memuat data</p></Card>;

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