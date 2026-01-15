import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import TableKelas from "./TableKelas";
import ModalKelas from "./ModalKelas";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

import {
    useKelas,
    useStoreKelas,
    useUpdateKelas,
    useDeleteKelas,
} from "@/Utils/Hooks/useKelas";

const Kelas = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortBy, setSortBy] = useState("nama_kelas");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    const {
        data: result = { data: [], total: 0 },
        isLoading: isLoadingKelas,
    } = useKelas({
        q: search,
        _sort: sortBy,
        _order: sortOrder,
        _page: page,
        _limit: limit,
    });

    const { data: dataKelas } = result;
    const totalItems = result.total;
    const totalPages = Math.ceil(totalItems / limit);

    const mutationStore = useStoreKelas();
    const mutationUpdate = useUpdateKelas();
    const mutationDelete = useDeleteKelas();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({ id: null, kode_kelas: "", nama_kelas: "", matkul: "", hari: "", jam_mulai: "", jam_selesai: "" });

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const openAdd = () => { setIsModalOpen(true); setForm({ id: null, kode_kelas: "", nama_kelas: "", matkul: "", hari: "", jam_mulai: "", jam_selesai: "" }); setIsEdit(false); };
    const openEdit = (item) => { setForm(item); setIsEdit(true); setIsModalOpen(true); };

    const handleDelete = (id) => {
         if (!user.permission.includes("kelas.delete")) return toastError("Akses ditolak");
         confirmDelete(() => mutationDelete.mutate(id, { onSuccess: () => toastSuccess("Berhasil dihapus") }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const defaultData = {
            mata_kuliah_id: null, 
            dosen_id: null,       
            mahasiswa_ids: []
        };

        if (isEdit) {
            confirmUpdate(() => mutationUpdate.mutate({ id: form.id, data: form }, { onSuccess: () => setIsModalOpen(false) }));
        } else {
            const newData = { ...defaultData, ...form };
            mutationStore.mutate(newData, { onSuccess: () => setIsModalOpen(false) });
        }
    };

    if (!user.permission.includes("kelas.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Daftar Kelas</Heading>
                {user.permission.includes("kelas.create") && <Button onClick={openAdd}>+ Tambah Kelas</Button>}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <input type="text" placeholder="Cari Kelas/Matkul..." className="border px-3 py-1 rounded flex-grow" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className="border px-3 py-1 rounded">
                    <option value="nama_kela">Sort by Kelas</option>
                    <option value="kode_kelas">Sort by Kode</option>
                    <option value="matkul">Sort by Matkul</option>
                </select>
                <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setPage(1); }} className="border px-3 py-1 rounded">
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div>

            <TableKelas
                data={dataKelas}
                isLoading={isLoadingKelas}
                onEdit={openEdit}
                onDelete={handleDelete}
                onDetail={(id) => navigate(`/admin/kelas/${id}`)}
            />

            <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-sm">Halaman {page} dari {totalPages}</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" onClick={handlePrev} disabled={page === 1}>Prev</button>
                    <button className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" onClick={handleNext} disabled={page === totalPages}>Next</button>
                </div>
            </div>

            <ModalKelas isOpen={isModalOpen} isEdit={isEdit} form={form} onChange={handleChange} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
        </Card>
    );
};

export default Kelas;