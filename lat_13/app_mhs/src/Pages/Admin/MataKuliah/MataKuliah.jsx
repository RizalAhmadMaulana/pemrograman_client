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
    useStoreMatkul,
    useUpdateMatkul,
    useDeleteMatkul,
} from "@/Utils/Hooks/useMatkul";

const MataKuliah = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    const {
        data: result = { data: [], total: 0 },
        isLoading: isLoadingMatkul,
    } = useMatkul({
        q: search,
        _sort: sortBy,
        _order: sortOrder,
        _page: page,
        _limit: limit,
    });

    const { data: matakuliah } = result;
    const totalItems = result.total;
    const totalPages = Math.ceil(totalItems / limit);

    const mutationStore = useStoreMatkul();
    const mutationUpdate = useUpdateMatkul();
    const mutationDelete = useDeleteMatkul();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, kode: "", name: "", sks: "" });

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    const handleChange = (e) => { 
        const value = e.target.name === 'sks' ? parseInt(e.target.value) : e.target.value;
        setForm({ ...form, [e.target.name]: value }); 
    };
    
    const openAddModal = () => { setIsModalOpen(true); setForm({ id: null, kode: "", name: "", sks: "" }); setIsEdit(false); };
    const openEditModal = (mk) => { setForm({ id: mk.id, kode: mk.kode, name: mk.name, sks: mk.sks }); setIsEdit(true); setIsModalOpen(true); };

    const handleDelete = (id) => { 
        if (!user.permission.includes("matakuliah.delete")) return toastError("Akses ditolak");
        confirmDelete(() => mutationDelete.mutate(id, { onSuccess: () => toastSuccess("Berhasil dihapus") }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.kode || !form.name) return toastError("Wajib diisi");

        if (isEdit) {
            if (!user.permission.includes("matakuliah.update")) return toastError("Akses ditolak");
            confirmUpdate(() => mutationUpdate.mutate({ id: form.id, data: form }, { onSuccess: () => setIsModalOpen(false) }));
        } else {
            if (!user.permission.includes("matakuliah.create")) return toastError("Akses ditolak");
            mutationStore.mutate(form, { onSuccess: () => setIsModalOpen(false) });
        }
    };

    if (!user.permission.includes("matakuliah.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Mata Kuliah</Heading>
                {user.permission.includes("matakuliah.create") && <Button onClick={openAddModal}>+ Tambah Matkul</Button>}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <input type="text" placeholder="Cari Matkul..." className="border px-3 py-1 rounded flex-grow" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className="border px-3 py-1 rounded">
                    <option value="name">Sort by Nama</option>
                    <option value="kode">Sort by Kode</option>
                    <option value="sks">Sort by SKS</option>
                </select>
                <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setPage(1); }} className="border px-3 py-1 rounded">
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div>

            <TableMatkul
                data={matakuliah}
                isLoading={isLoadingMatkul}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onDetail={(id) => navigate(`/admin/matakuliah/${id}`)}
            />

            <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-sm">Halaman {page} dari {totalPages}</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" onClick={handlePrev} disabled={page === 1}>Prev</button>
                    <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" onClick={handleNext} disabled={page === totalPages}>Next</button>
                </div>
            </div>

            <ModalMatkul isOpen={isModalOpen} isEdit={isEdit} form={form} onChange={handleChange} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
        </Card>
    );
};

export default MataKuliah;