import React, { useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";

import { mahasiswaList } from "@/Data/Dummy";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Mahasiswa = () => {
    const navigate = useNavigate();

    // --- DEKLARASI STATE ---
    const [mahasiswa, setMahasiswa] = useState(mahasiswaList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); // State untuk mode Edit
    const [form, setForm] = useState({ nim: "", nama: "" });

    // PENGGUNAAN USE EFFECT
    useEffect(() => {
      setTimeout(() => fetchMahasiswa(), 500);
    }, []);

    const fetchMahasiswa = async () => {
      // bisa disimulasikan delay atau nanti diganti fetch API
      setMahasiswa(mahasiswaList);
    };

    // --- FUNGSI CRUD LOGIC ---
    const addMahasiswa = (newData) => {
        setMahasiswa([...mahasiswa, newData]);
    };

    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
            mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
    };

    const deleteMahasiswa = (nim) => {
        // PERBAIKAN: Menggunakan .filter()
        const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim); 
        setMahasiswa(filtered);
    }

    // --- FORM & MODAL HANDLERS ---
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ nim: "", nama: "" });
        setIsEdit(false);
    }

    const handleEdit = (mhs) => { // Diberi objek mahasiswa
        setForm({ nim: mhs.nim, nama: mhs.nama });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (nim) => { // Diberi nim
        if (confirm("Yakin ingin hapus data ini?")) {
            deleteMahasiswa(nim);
        }
    };
    
    // handle untuk submit data
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nim || !form.nama) {
            alert("NIM dan Nama wajib diisi");
            return;
        }

        if (isEdit) {
            updateMahasiswa(form.nim, form);
        } else {
            const exists = mahasiswa.find((m) => m.nim === form.nim);
            if (exists) {
                alert("NIM sudah terdaftar!");
                return;
            }
            addMahasiswa(form);
        }

        // Reset state
        setForm({ nim: "", nama: "" });
        setIsEdit(false);
        setIsModalOpen(false);
    }

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
                {/* Panggil openAddModal */}
                <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button> 
            </div>

            <table className="w-full text-sm text-gray-700">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">NIM</th>
                        <th className="py-2 px-4 text-left">Nama</th>
                        <th className="py-2 px-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Menggunakan state mahasiswa */}
                    {mahasiswa.map((mhs, index) => ( 
                        <tr
                            key={mhs.nim}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                        >
                            <td className="py-2 px-4">{mhs.nim}</td>
                            <td className="py-2 px-4">{mhs.nama}</td>
                            <td className="py-2 px-4 text-center space-x-2">
                                <a
                                    onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`)}
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded cursor-pointer"
                                >
                                    Detail
                                </a>
                                <Button
                                    size="sm"
                                    variant="warning"
                                    onClick={() => handleEdit(mhs)} 
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => handleDelete(mhs.nim)}
                                >
                                    Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-600 hover:text-red-500 text-xl"
                            >
                                &times;
                            </button>
                        </div>

                        <Form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <Label htmlFor="nim">NIM</Label>
                                <Input 
                                    type="text"
                                    name="nim"
                                    value={form.nim}
                                    onChange={handleChange}
                                    readOnly={isEdit}
                                    placeholder="Masukkan NIM"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="nama">Nama</Label>
                                <Input 
                                    type="text"
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    placeholder="Masukkan Nama"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Mahasiswa;