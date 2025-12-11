import React, { useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import TableMatkul from "./TableMatkul";
import ModalMatkul from "./ModalMatkul";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import {
    useMatkul,
    useAddMatkul,
    useUpdateMatkul,
    useDeleteMatkul,
} from "@/Utils/Hooks/useMatkul";

const MataKuliah = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    const { data: matakuliah, isLoading, isError } = useMatkul(); 

    const mutationAdd = useAddMatkul();
    const mutationUpdate = useUpdateMatkul();
    const mutationDelete = useDeleteMatkul();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, kode: "", nama: "", sks: "" });

    const handleChange = (e) => { 
        const value = e.target.name === 'sks' ? parseInt(e.target.value) : e.target.value;
        setForm({ ...form, [e.target.name]: value }); 
    };
    
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ id: null, kode: "", nama: "", sks: "" }); 
        setIsEdit(false);
    }
    
    const openEditModal = (mk) => { 
        setForm({ 
            id: mk.id, 
            kode: mk.kode, 
            nama: mk.nama,
            sks: mk.sks 
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => { 
        if (!user.permission.includes("matakuliah.delete")) return toastError("Akses ditolak");
        
        confirmDelete(() => {
            mutationDelete.mutate(id, {
                onSuccess: () => toastSuccess("Data Mata Kuliah berhasil dihapus"),
                onError: () => toastError("Gagal menghapus data Mata Kuliah!"),
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.kode || !form.nama || !form.sks) {
            toastError("Kode, Nama, dan SKS wajib diisi");
            return;
        }

        if (isEdit) {
            if (!user.permission.includes("matakuliah.update")) return toastError("Akses ditolak");

            confirmUpdate(() => {
                mutationUpdate.mutate({ id: form.id, data: form }, {
                    onSuccess: () => {
                        toastSuccess("Data Mata Kuliah berhasil diperbarui");
                        setIsModalOpen(false);
                        setForm({ id: null, kode: "", nama: "", sks: "" });
                        setIsEdit(false);
                    },
                    onError: () => toastError("Gagal mengedit data Mata Kuliah!"),
                });
            });
        } else {
            if (!user.permission.includes("matakuliah.create")) return toastError("Akses ditolak");
            
            mutationAdd.mutate(form, {
                onSuccess: () => {
                    toastSuccess("Data Mata Kuliah berhasil ditambahkan");
                    setIsModalOpen(false);
                    setForm({ id: null, kode: "", nama: "", sks: "" });
                },
                onError: (error) => toastError(error.message || "Gagal menambah data Mata Kuliah!"),
            });
        }
    };

    if (!user.permission.includes("matakuliah.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;
    if (isLoading) return <Card><p className="text-center">Memuat data...</p></Card>;
    if (isError) return <Card><p className="text-center text-red-500">Gagal memuat data</p></Card>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mata Kuliah</Heading>
                {user.permission.includes("matakuliah.create") && (
                    <Button onClick={openAddModal}>+ Tambah Mata Kuliah</Button> 
                )}
            </div>

            {user.permission.includes("matakuliah.read") && (
                <TableMatkul
                    data={matakuliah} 
                    onEdit={openEditModal}
                    onDelete={handleDelete} 
                    onDetail={(id) => navigate(`/admin/matakuliah/${id}`)}
                />
            )}

            <ModalMatkul
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

export default MataKuliah;