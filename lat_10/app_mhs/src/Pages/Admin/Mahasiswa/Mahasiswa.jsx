import React, { useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";
import { useNavigate } from "react-router-dom";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import {
    useMahasiswa,
    useStoreMahasiswa,
    useUpdateMahasiswa,
    useDeleteMahasiswa,
} from "@/Utils/Hooks/useMahasiswa";

const Mahasiswa = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    const { data: mahasiswa, isLoading, isError } = useMahasiswa(); 
    
    const mutationStore = useStoreMahasiswa();
    const mutationUpdate = useUpdateMahasiswa();
    const mutationDelete = useDeleteMahasiswa();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, nim: "", nama: "" });

    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };
    
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ id: null, nim: "", nama: "" }); 
        setIsEdit(false);
    }
    
    const openEditModal = (mhs) => { 
        setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => { 
        if (!user.permission.includes("mahasiswa.delete")) return toastError("Akses ditolak");
        
        confirmDelete(() => {
            mutationDelete.mutate(id, {
                onSuccess: () => toastSuccess("Data berhasil dihapus"),
                onError: () => toastError("Gagal menghapus data"),
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.nim || !form.nama) {
            toastError("NIM dan Nama wajib diisi");
            return;
        }

        if (isEdit) {
            if (!user.permission.includes("mahasiswa.update")) return toastError("Akses ditolak");
            
            confirmUpdate(() => {
                mutationUpdate.mutate({ id: form.id, data: form }, {
                    onSuccess: () => {
                        toastSuccess("Data berhasil diperbarui");
                        setIsModalOpen(false);
                        setForm({ id: null, nim: "", nama: "" });
                        setIsEdit(false);
                    },
                    onError: () => toastError("Gagal update data"),
                });
            });
        } else {
            if (!user.permission.includes("mahasiswa.create")) return toastError("Akses ditolak");
            
            mutationStore.mutate(form, {
                onSuccess: () => {
                    toastSuccess("Data berhasil ditambahkan");
                    setIsModalOpen(false);
                    setForm({ id: null, nim: "", nama: "" });
                },
                onError: (error) => toastError(error.message || "Gagal tambah data"),
            });
        }
    };

    if (!user.permission.includes("mahasiswa.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;
    
    if (isLoading) return <Card><p className="text-center">Memuat data...</p></Card>;
    if (isError) return <Card><p className="text-center text-red-500">Gagal memuat data</p></Card>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
                {user.permission.includes("mahasiswa.create") && (
                    <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
                )}
            </div>

            {user.permission.includes("mahasiswa.read") && (
                <TableMahasiswa
                    data={mahasiswa}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
                />
            )}

            <ModalMahasiswa
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

export default Mahasiswa;