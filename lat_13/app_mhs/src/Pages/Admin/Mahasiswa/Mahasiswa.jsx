import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";
import { useNavigate } from "react-router-dom";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

// Import API
import { getAllMahasiswa, storeMahasiswa, updateMahasiswa, deleteMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllKelas } from "@/Utils/Apis/KelasApi";
import { getAllMatkul } from "@/Utils/Apis/MatkulApi";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  // --- STATE DATA ---
  const [mahasiswa, setMahasiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  
  // --- STATE PAGINATION & FILTER ---
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("name"); 
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  // --- STATE MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ id: null, nim: "", name: "", max_sks: 0 });

  // --- FETCH DATA (Dipanggil saat page/search/sort berubah) ---
  useEffect(() => {
    fetchData();
  }, [page, search, sortBy, sortOrder]);

  const fetchData = async () => {
    try {
      const mhsParams = {
        q: search,
        _page: page,
        _limit: limit,
        _sort: sortBy,
        _order: sortOrder
      };

      // Request API Paralel
      const [resMhs, resKelas, resMatkul] = await Promise.all([
        getAllMahasiswa(mhsParams), 
        getAllKelas(),              
        getAllMatkul()              
      ]);

      setMahasiswa(resMhs.data);
      setTotalItems(parseInt(resMhs.headers["x-total-count"] || 0));
      
      setKelas(resKelas.data);
      setMataKuliah(resMatkul.data);
    } catch (error) {
      console.error(error);
      toastError("Gagal memuat data");
    }
  };

  const totalPages = Math.ceil(totalItems / limit);

  // --- LOGIC HITUNG SKS ---
  const getTotalSks = (mhsId) => {
    return kelas
      .filter((k) => k.mahasiswa_ids.includes(mhsId) || k.mahasiswa_ids.includes(String(mhsId)))
      .map((k) => mataKuliah.find((mk) => String(mk.id) === String(k.mata_kuliah_id))?.sks || 0)
      .reduce((a, b) => a + b, 0);
  };

  // --- HANDLERS UI ---
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const openAddModal = () => {
    setForm({ id: null, nim: "", name: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setForm({ id: mhs.id, nim: mhs.nim, name: mhs.name || mhs.nama, max_sks: mhs.max_sks });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nim || !form.name || !form.max_sks) {
      toastError("Semua field wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        await updateMahasiswa(form.id, form);
        toastSuccess("Berhasil update");
        setIsModalOpen(false);
        fetchData();
      });
    } else {
      await storeMahasiswa(form);
      toastSuccess("Berhasil tambah");
      setIsModalOpen(false);
      fetchData();
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      await deleteMahasiswa(id);
      toastSuccess("Berhasil hapus");
      fetchData();
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2">Daftar Mahasiswa</Heading>
        {user.permission.includes("mahasiswa.create") && (
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari nama/NIM..."
          className="border px-3 py-1 rounded flex-grow focus:outline-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded focus:outline-blue-500"
        >
          <option value="name">Sort by Nama</option>
          <option value="nim">Sort by NIM</option>
          <option value="max_sks">Sort by Max SKS</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded focus:outline-blue-500"
        >
          <option value="asc">Asc (A-Z)</option>
          <option value="desc">Desc (Z-A)</option>
        </select>
      </div>

      <TableMahasiswa
        data={mahasiswa}
        getTotalSks={getTotalSks}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
      />

      <div className="flex justify-between items-center mt-4 border-t pt-4">
         <p className="text-sm text-gray-600">
            Halaman {page} dari {totalPages} ({totalItems} Data)
         </p>
         <div className="flex gap-2">
            <Button 
                size="sm"
                variant="secondary"
                onClick={handlePrev}
                disabled={page === 1}
            >
                Prev
            </Button>
            <Button 
                size="sm"
                variant="secondary"
                onClick={handleNext}
                disabled={page === totalPages || totalPages === 0}
            >
                Next
            </Button>
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