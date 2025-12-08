import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

import TableDosen from "./TableDosen";
import ModalDosen from "./ModalDosen";

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
    getAllDosen,
    storeDosen,
    updateDosen,
    deleteDosen,
} from "@/Utils/Apis/DosenApi"; 

const Dosen = () => {
    const navigate = useNavigate();

    // --- DEKLARASI STATE ---
    // Sesuaikan state dengan field Dosen (nip, nama)
    const [dosen, setDosen] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, nip: "", nama: "" });

    // --- FUNGSI FETCH DATA (GET) ---
    const fetchDosen = async () => {
        try {
            const res = await getAllDosen();
            setDosen(res.data); 
        } catch (error) {
            console.error("Gagal mengambil data dosen:", error);
            toastError("Gagal memuat data dosen dari server!");
        }
    };

    // PENGGUNAAN USE EFFECT
    useEffect(() => {
        fetchDosen(); 
    }, []);

    // --- FORM & MODAL HANDLERS (Sama seperti Mahasiswa) ---
    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };
    
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ id: null, nip: "", nama: "" }); 
        setIsEdit(false);
    }
    
    const openEditModal = (dsn) => { 
        setForm({ 
            id: dsn.id, 
            nip: dsn.nip, 
            nama: dsn.nama 
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => { 
        confirmDelete(async () => {
            try {
                await deleteDosen(id);
                await fetchDosen();
                toastSuccess("Data Dosen berhasil dihapus");
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                toastError("Gagal menghapus data Dosen!");
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.nip || !form.nama) {
            toastError("NIP dan Nama wajib diisi");
            return;
        }
        // ... (Logic Create/Update sama persis seperti Mahasiswa.jsx)
        if (isEdit) {
            confirmUpdate(async () => {
                try {
                    await updateDosen(form.id, form);
                    await fetchDosen();
                    toastSuccess("Data Dosen berhasil diperbarui");
                    setForm({ id: null, nip: "", nama: "" });
                    setIsEdit(false);
                    setIsModalOpen(false);
                } catch (error) {
                    console.error("Gagal mengedit data:", error);
                    toastError("Gagal mengedit data Dosen!");
                }
            });
        } else {
            try {
                await storeDosen(form);
                await fetchDosen();
                toastSuccess("Data Dosen berhasil ditambahkan");
                setForm({ id: null, nip: "", nama: "" });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Gagal menambah data:", error);
                toastError("Gagal menambah data Dosen!");
            }
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Dosen</Heading>
                <Button onClick={openAddModal}>+ Tambah Dosen</Button> 
            </div>

            <TableDosen
                data={dosen} 
                onEdit={openEditModal}
                onDelete={handleDelete} 
                onDetail={(id) => navigate(`/admin/dosen/${id}`)}
            />

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