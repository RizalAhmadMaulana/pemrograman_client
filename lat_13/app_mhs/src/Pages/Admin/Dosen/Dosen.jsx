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

import {
    useDosen,
    useStoreDosen,
    useUpdateDosen,
    useDeleteDosen,
} from "@/Utils/Hooks/useDosen";

const Dosen = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    // STATE
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    // HOOK
    const {
        data: result = { data: [], total: 0 },
        isLoading: isLoadingDosen,
    } = useDosen({
        q: search,
        _sort: sortBy,
        _order: sortOrder,
        _page: page,
        _limit: limit,
    });

    // DATA
    const { data: dosen } = result;
    const totalItems = result.total;
    const totalPages = Math.ceil(totalItems / limit);

    // Mutation
    const mutationStore = useStoreDosen();
    const mutationUpdate = useUpdateDosen();
    const mutationDelete = useDeleteDosen();

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [form, setForm] = useState({ id: null, nip: "", name: "" });

    // HANDLERS
    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    const openAddModal = () => { setIsModalOpen(true); setForm({ id: null, nip: "", name: "" }); setIsEdit(false); };
    const openEditModal = (dsn) => { setForm({ id: dsn.id, nip: dsn.nip, name: dsn.name }); setIsEdit(true); setIsModalOpen(true); };

    const handleDelete = (id) => { 
        if (!user.permission.includes("dosen.delete")) return toastError("Akses ditolak");
        confirmDelete(() => {
            mutationDelete.mutate(id, { onSuccess: () => toastSuccess("Berhasil dihapus") });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nip || !form.name) return toastError("Wajib diisi");

        if (isEdit) {
             if (!user.permission.includes("dosen.update")) return toastError("Akses ditolak");
            confirmUpdate(() => {
                mutationUpdate.mutate({ id: form.id, data: form }, {
                    onSuccess: () => { toastSuccess("Berhasil diupdate"); setIsModalOpen(false); }
                });
            });
        } else {
            if (!user.permission.includes("dosen.create")) return toastError("Akses ditolak");
            mutationStore.mutate(form, {
                onSuccess: () => { toastSuccess("Berhasil ditambah"); setIsModalOpen(false); }
            });
        }
    };

    if (!user.permission.includes("dosen.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Dosen</Heading>
                {user.permission.includes("dosen.create") && <Button onClick={openAddModal}>+ Tambah Dosen</Button>}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <input type="text" placeholder="Cari nama/NIP..." className="border px-3 py-1 rounded flex-grow" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className="border px-3 py-1 rounded">
                    <option value="name">Sort by Nama</option>
                    <option value="nip">Sort by NIP</option>
                </select>
                <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setPage(1); }} className="border px-3 py-1 rounded">
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div>

            <TableDosen
                data={dosen}
                isLoading={isLoadingDosen} 
                onEdit={openEditModal}
                onDelete={handleDelete}
                onDetail={(id) => navigate(`/admin/dosen/${id}`)}
            />

            <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-sm">Halaman {page} dari {totalPages}</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" onClick={handlePrev} disabled={page === 1}>Prev</button>
                    <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" onClick={handleNext} disabled={page === totalPages}>Next</button>
                </div>
            </div>

            <ModalDosen isOpen={isModalOpen} isEdit={isEdit} form={form} onChange={handleChange} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
        </Card>
    );
};

export default Dosen;