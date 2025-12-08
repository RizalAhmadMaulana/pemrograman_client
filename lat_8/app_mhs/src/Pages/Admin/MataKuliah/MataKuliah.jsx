import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

import TableMatkul from "./TableMatkul";
import ModalMatkul from "./ModalMatkul";

import { useNavigate } from "react-router-dom";
import {
    confirmDelete,
    confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";
import { 
    toastSuccess, 
    toastError 
} from "@/Utils/Helpers/ToastHelpers";
import {
    getAllMatkul,
    storeMatkul,
    updateMatkul,
    deleteMatkul,
} from "@/Utils/Apis/MatkulApi"; 

const MataKuliah = () => {
    const navigate = useNavigate();

    // --- DEKLARASI STATE ---
    // Sesuaikan state dengan field Mata Kuliah (kode, nama, sks)
    const [matakuliah, setMatakuliah] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, kode: "", nama: "", sks: "" });

    // --- FUNGSI FETCH DATA (GET) ---
    const fetchMatkul = async () => {
        try {
            const res = await getAllMatkul();
            setMatakuliah(res.data); 
        } catch (error) {
            console.error("Gagal mengambil data mata kuliah:", error);
            toastError("Gagal memuat data mata kuliah dari server!");
        }
    };

    // PENGGUNAAN USE EFFECT
    useEffect(() => {
        fetchMatkul(); 
    }, []);

    // --- FORM & MODAL HANDLERS (Sama seperti Mahasiswa) ---
    const handleChange = (e) => { 
        // Konversi SKS ke number jika fieldnya 'sks'
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
        confirmDelete(async () => {
            try {
                await deleteMatkul(id);
                await fetchMatkul();
                toastSuccess("Data Mata Kuliah berhasil dihapus");
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                toastError("Gagal menghapus data Mata Kuliah!");
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.kode || !form.nama || !form.sks) {
            toastError("Kode, Nama, dan SKS wajib diisi");
            return;
        }
        // ... (Logic Create/Update sama persis seperti Mahasiswa.jsx)
        if (isEdit) {
            confirmUpdate(async () => {
                try {
                    await updateMatkul(form.id, form);
                    await fetchMatkul();
                    toastSuccess("Data Mata Kuliah berhasil diperbarui");
                    setForm({ id: null, kode: "", nama: "", sks: "" });
                    setIsEdit(false);
                    setIsModalOpen(false);
                } catch (error) {
                    console.error("Gagal mengedit data:", error);
                    toastError("Gagal mengedit data Mata Kuliah!");
                }
            });
        } else {
            try {
                await storeMatkul(form);
                await fetchMatkul();
                toastSuccess("Data Mata Kuliah berhasil ditambahkan");
                setForm({ id: null, kode: "", nama: "", sks: "" });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Gagal menambah data:", error);
                toastError("Gagal menambah data Mata Kuliah!");
            }
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mata Kuliah</Heading>
                <Button onClick={openAddModal}>+ Tambah Mata Kuliah</Button> 
            </div>

            <TableMatkul
                data={matakuliah} 
                onEdit={openEditModal}
                onDelete={handleDelete} 
                onDetail={(id) => navigate(`/admin/matakuliah/${id}`)}
            />

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