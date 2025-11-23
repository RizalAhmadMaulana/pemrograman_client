import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

import {
    confirmDelete,
    confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";
import { 
    toastSuccess, 
    toastError 
} from "@/Utils/Helpers/ToastHelpers";

import {
    getAllMahasiswa,
    storeMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi"; 

const Mahasiswa = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    const hasPermission = (permissionKey) => {
        return user && Array.isArray(user.permission) && user.permission.includes(permissionKey);
    };

    // --- DEKLARASI STATE ---
    const [mahasiswa, setMahasiswa] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, nim: "", nama: "" });

    // --- FUNGSI FETCH DATA (GET) ---
    const fetchMahasiswa = async () => {
        if (!hasPermission("mahasiswa.read")) {
            setMahasiswa([]); // Bersihkan data jika tidak ada izin
            return;
        }
        try {
            const res = await getAllMahasiswa();
            setMahasiswa(res.data); 
        } catch (error) {
            console.error("Gagal mengambil data mahasiswa:", error);
            toastError("Gagal memuat data dari server!");
        }
    };

    // PENGGUNAAN USE EFFECT
    useEffect(() => {
        fetchMahasiswa(); 
    }, [user]);

    // --- FORM & MODAL HANDLERS ---
    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };
    
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ id: null, nim: "", nama: "" }); 
        setIsEdit(false);
    }
    
    const openEditModal = (mhs) => { 
        setForm({ 
            id: mhs.id, 
            nim: mhs.nim, 
            nama: mhs.nama 
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => { 
        if (!hasPermission("mahasiswa.delete")) {
            toastError("Anda tidak memiliki izin untuk menghapus data.");
            return;
        }
        confirmDelete(async () => {
            try {
                await deleteMahasiswa(id);
                await fetchMahasiswa();
                toastSuccess("Data berhasil dihapus");
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                toastError("Gagal menghapus data!");
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit && !hasPermission("mahasiswa.update")) {
            toastError("Anda tidak memiliki izin untuk mengedit data.");
            return;
        }
        if (!isEdit && !hasPermission("mahasiswa.create")) {
             toastError("Anda tidak memiliki izin untuk menambah data.");
            return;
        }
        
        if (!form.nim || !form.nama) {
            toastError("NIM dan Nama wajib diisi");
            return;
        }

        if (isEdit) {
            confirmUpdate(async () => {
                try {
                    await updateMahasiswa(form.id, form);
                    await fetchMahasiswa();
                    toastSuccess("Data berhasil diperbarui");
                    setForm({ id: null, nim: "", nama: "" });
                    setIsEdit(false);
                    setIsModalOpen(false);
                } catch (error) {
                    console.error("Gagal mengedit data:", error);
                    toastError("Gagal mengedit data!");
                }
            });
        } else {
            try {
                await storeMahasiswa(form);
                await fetchMahasiswa();
                toastSuccess("Data berhasil ditambahkan");
                setForm({ id: null, nim: "", nama: "" });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Gagal menambah data:", error);
                toastError("Gagal menambah data!");
            }
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
                {hasPermission("mahasiswa.create") && (
                    <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button> 
                )}
            </div>

            {hasPermission("mahasiswa.read") ? (
                <TableMahasiswa
                    data={mahasiswa} 
                    onEdit={openEditModal}
                    onDelete={handleDelete} 
                    onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
                />
            ) : (
                <p className="text-center text-red-500 p-4">Anda tidak memiliki izin untuk melihat daftar mahasiswa ini.</p>
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