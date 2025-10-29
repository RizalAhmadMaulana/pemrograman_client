import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
// Hapus import Form, Input, Label karena sudah dipindah ke ModalMahasiswa

import TableMahasiswa from "./TableMahasiswa"; // <-- Import Komponen Anak
import ModalMahasiswa from "./ModalMahasiswa"; // <-- Import Komponen Anak

import { mahasiswaList } from "@/Data/Dummy";
import { useNavigate } from "react-router-dom";

const Mahasiswa = () => {
    const navigate = useNavigate();

    // --- DEKLARASI STATE & LOGIKA CRUD (TETAP DI SINI) ---
    const [mahasiswa, setMahasiswa] = useState(mahasiswaList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ nim: "", nama: "" });

    // PENGGUNAAN USE EFFECT
    useEffect(() => {
        // ... (Logika fetch tetap ada di sini)
    }, []);

    const fetchMahasiswa = async () => {
        setMahasiswa(mahasiswaList);
    };

    // --- FUNGSI CRUD LOGIC (TETAP DI SINI) ---
    const addMahasiswa = (newData) => { setMahasiswa([...mahasiswa, newData]); };
    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
            mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
    };
    const deleteMahasiswa = (nim) => { 
        const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim); 
        setMahasiswa(filtered);
    }

    // --- FORM & MODAL HANDLERS (TETAP DI SINI) ---
    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };
    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ nim: "", nama: "" });
        setIsEdit(false);
    }
    const handleEdit = (mhs) => { 
        setForm({ nim: mhs.nim, nama: mhs.nama });
        setIsEdit(true);
        setIsModalOpen(true);
    };
    const handleDelete = (nim) => { 
        if (confirm("Yakin ingin hapus data ini?")) {
            deleteMahasiswa(nim);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nim || !form.nama) { alert("NIM dan Nama wajib diisi"); return; }

        if (isEdit) {
            updateMahasiswa(form.nim, form);
        } else {
            const exists = mahasiswa.find((m) => m.nim === form.nim);
            if (exists) { alert("NIM sudah terdaftar!"); return; }
            addMahasiswa(form);
        }

        setForm({ nim: "", nama: "" });
        setIsEdit(false);
        setIsModalOpen(false);
    }

    // --- RETURN JSX BARU ---
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
                <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button> 
            </div>

            {/* Panggil komponen TableMahasiswa */}
            <TableMahasiswa
              data={mahasiswa} // Oper data (state)
              onEdit={handleEdit} // Oper fungsi handler edit
              onDelete={handleDelete} // Oper fungsi handler delete
              onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)} // Oper fungsi navigasi
            />

            {/* Panggil komponen ModalMahasiswa */}
            <ModalMahasiswa
                isOpen={isModalOpen} // Oper state buka/tutup modal
                isEdit={isEdit} // Oper state mode edit
                form={form} // Oper state form data
                onChange={handleChange} // Oper handler perubahan input
                onClose={() => setIsModalOpen(false)} // Oper fungsi tutup modal
                onSubmit={handleSubmit} // Oper fungsi submit
            />
        </Card>
    );
};

export default Mahasiswa;