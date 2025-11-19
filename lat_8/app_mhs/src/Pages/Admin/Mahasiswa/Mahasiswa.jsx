import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { useNavigate } from "react-router-dom";

import {
    confirmDelete,
    confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";
import { 
    toastSuccess, 
    toastError 
} from "@/Utils/Helpers/ToastHelpers";

// Import semua fungsi API dari MahasiswaApi.jsx
import {
    getAllMahasiswa,
    storeMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi"; 

const Mahasiswa = () => {
    const navigate = useNavigate();

    // --- DEKLARASI STATE ---
    const [mahasiswa, setMahasiswa] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, nim: "", nama: "" });

    // --- FUNGSI FETCH DATA (GET) ---
    const fetchMahasiswa = async () => {
        try {
            // Panggil API dan ambil data
            const res = await getAllMahasiswa();
            // Data dari JSON Server ada di res.data
            setMahasiswa(res.data); 
        } catch (error) {
            console.error("Gagal mengambil data mahasiswa:", error);
            toastError("Gagal memuat data dari server!");
        }
    };

    // PENGGUNAAN USE EFFECT
    useEffect(() => {
        fetchMahasiswa(); 
    }, []);

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
        // Mengisi form dengan data mahasiswa yang akan diedit
        setForm({ 
            id: mhs.id, 
            nim: mhs.nim, 
            nama: mhs.nama 
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => { 
        confirmDelete(async () => { // Jadikan fungsi callback ASYNC
            try {
                // Panggil API delete
                await deleteMahasiswa(id);
                // Muat ulang data
                await fetchMahasiswa();
                toastSuccess("Data berhasil dihapus");
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                toastError("Gagal menghapus data!");
            }
        });
    };

    const handleSubmit = async (e) => { // JADIKAN FUNGSI INI ASYNC
        e.preventDefault();
        
        if (!form.nim || !form.nama) {
            toastError("NIM dan Nama wajib diisi");
            return;
        }

        if (isEdit) {
            // LOGIKA UPDATE
            confirmUpdate(async () => { // Jadikan fungsi callback ASYNC
                try {
                    // Panggil updateMahasiswa dengan ID dan data form
                    await updateMahasiswa(form.id, form);
                    await fetchMahasiswa(); // Muat ulang data
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
                await fetchMahasiswa(); // Muat ulang data
                toastSuccess("Data berhasil ditambahkan");
                setForm({ id: null, nim: "", nama: "" });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Gagal menambah data:", error);
                toastError("Gagal menambah data!");
            }
        }
    };

    // --- RETURN JSX ---
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
                <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button> 
            </div>

            <TableMahasiswa
                data={mahasiswa} 
                onEdit={openEditModal}
                onDelete={handleDelete} 
                onDetail={(mhs) => navigate(`/admin/mahasiswa/${mhs.id}`)} 
            />

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