import React, { useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import TableDosen from "./TableDosen";
import ModalDosen from "./ModalDosen";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
// --- HAPUS: import { getAllDosen, storeDosen, updateDosen, deleteDosen } ---
// --- HAPUS: import { useEffect } ---

// 1. IMPORT HOOKS BARU
import {
    useDosen,
    useAddDosen,
    useUpdateDosen,
    useDeleteDosen,
} from "@/Utils/Hooks/useDosen";

const Dosen = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    // 2. GANTI STATE MANUAL DENGAN HOOKS (READ)
    const { data: dosen, isLoading, isError } = useDosen(); 

    // 3. AMBIL FUNGSI MUTATE (CUD)
    const mutationAdd = useAddDosen();
    const mutationUpdate = useUpdateDosen();
    const mutationDelete = useDeleteDosen();

    // --- STATE MODAL & FORM (TETAP SAMA) ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, nip: "", nama: "" });

    // --- HAPUS: fetchDosen function ---
    // --- HAPUS: useEffect(() => { fetchDosen(); }, []); ---

    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };
    
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ id: null, nip: "", nama: "" }); 
        setIsEdit(false);
    }
    
    const openEditModal = (dsn) => { 
        setForm({ id: dsn.id, nip: dsn.nip, nama: dsn.nama });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => { 
        if (!user.permission.includes("dosen.delete")) return toastError("Akses ditolak");
        
        confirmDelete(() => {
            // Panggil Mutate Delete
            mutationDelete.mutate(id, {
                onSuccess: () => toastSuccess("Data Dosen berhasil dihapus"),
                onError: () => toastError("Gagal menghapus data Dosen!"),
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.nip || !form.nama) {
            toastError("NIP dan Nama wajib diisi");
            return;
        }

        if (isEdit) {
             if (!user.permission.includes("dosen.update")) return toastError("Akses ditolak");

            confirmUpdate(() => {
                // Panggil Mutate Update
                mutationUpdate.mutate({ id: form.id, data: form }, {
                    onSuccess: () => {
                        toastSuccess("Data Dosen berhasil diperbarui");
                        setIsModalOpen(false);
                        setForm({ id: null, nip: "", nama: "" });
                        setIsEdit(false);
                    },
                    onError: () => toastError("Gagal mengedit data Dosen!"),
                });
            });
        } else {
            if (!user.permission.includes("dosen.create")) return toastError("Akses ditolak");
            
            // Panggil Mutate Add
            mutationAdd.mutate(form, {
                onSuccess: () => {
                    toastSuccess("Data Dosen berhasil ditambahkan");
                    setIsModalOpen(false);
                    setForm({ id: null, nip: "", nama: "" });
                },
                onError: (error) => toastError(error.message || "Gagal menambah data Dosen!"),
            });
        }
    };

    // 4. HANDLING LOADING/ERROR DARI HOOK
    if (!user.permission.includes("dosen.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;
    
    if (isLoading) return <Card><p className="text-center">Memuat data...</p></Card>;
    if (isError) return <Card><p className="text-center text-red-500">Gagal memuat data</p></Card>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Dosen</Heading>
                {user.permission.includes("dosen.create") && (
                    <Button onClick={openAddModal}>+ Tambah Dosen</Button> 
                )}
            </div>

            {user.permission.includes("dosen.read") && (
                <TableDosen
                    data={dosen} 
                    onEdit={openEditModal}
                    onDelete={handleDelete} 
                    onDetail={(id) => navigate(`/admin/dosen/${id}`)}
                />
            )}

            <ModalDosen
                isOpen={isModalOpen} 
                isEdit={isEdit} 
                form={form} 
                onChange={handleChange} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleSubmit} 
            />
        </Card>
    );
};

export default Dosen;