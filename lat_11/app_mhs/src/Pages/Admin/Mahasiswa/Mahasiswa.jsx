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

  // --- 1. STATE ---
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // --- 2. PANGGIL HOOK ---
  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  // --- 3. PECAH HASIL ---
  const { data: mahasiswa } = result;
  const totalItems = result.total;
  const totalPages = Math.ceil(totalItems / limit);

  // Hook Mutasi
  const mutationStore = useStoreMahasiswa();
  const mutationUpdate = useUpdateMahasiswa();
  const mutationDelete = useDeleteMahasiswa();

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ id: null, nim: "", nama: "" });

  // --- 4. HANDLER PAGINATION (SESUAI NOTION) ---
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // --- Handler Lainnya ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ id: null, nim: "", nama: "" });
    setIsEdit(false);
  };

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
             toastSuccess("Berhasil diperbarui"); 
             setIsModalOpen(false); 
          },
        });
      });
    } else {
      if (!user.permission.includes("mahasiswa.create")) return toastError("Akses ditolak");
      mutationStore.mutate(form, {
        onSuccess: () => {
            toastSuccess("Berhasil ditambahkan"); 
            setIsModalOpen(false);
        },
      });
    }
  };

  if (!user.permission.includes("mahasiswa.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
        {user.permission.includes("mahasiswa.create") && (
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        )}
      </div>

      {/* --- UI FILTER --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari nama/NIM..."
          className="border px-3 py-1 rounded flex-grow"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          className="border px-3 py-1 rounded"
        >
          <option value="nama">Sort by Nama</option>
          <option value="nim">Sort by NIM</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
          className="border px-3 py-1 rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* --- TABLE & LOADING (PASSING PROP isLoading SESUAI NOTION) --- */}
      <TableMahasiswa
        data={mahasiswa}
        isLoading={isLoadingMahasiswa} // Passing prop isLoading
        onEdit={openEditModal}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
      />

      {/* --- PAGINATION UI (SESUAI NOTION) --- */}
      <div className="flex justify-between items-center mt-4 border-t pt-4">
         <p className="text-sm">
            Halaman {page} dari {totalPages}
         </p>
         <div className="flex gap-2">
            <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={handlePrev}
                disabled={page === 1}
            >
                Prev
            </button>
            <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                Next
            </button>
         </div>
      </div>

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