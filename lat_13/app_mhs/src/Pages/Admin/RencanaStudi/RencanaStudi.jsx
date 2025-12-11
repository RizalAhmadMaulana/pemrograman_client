import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete } from "@/Utils/Helpers/SwalHelpers";

import { getAllKelas, storeKelas, updateKelas, deleteKelas } from "@/Utils/Apis/KelasApi";
import { getAllDosen } from "@/Utils/Apis/DosenApi";
import { getAllMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllMatkul } from "@/Utils/Apis/MatkulApi";

import TableRencanaStudi from "./TableRencanaStudi";
import ModalRencanaStudi from "./ModalRencanaStudi";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});

  const [form, setForm] = useState({ 
      kode_kelas: "",
      nama_kelas: "", 
      mata_kuliah_id: "", 
      dosen_id: "" ,
      hari: "",         
      jam_mulai: "",    
      jam_selesai: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resKelas, resDosen, resMahasiswa, resMataKuliah] = await Promise.all([
        getAllKelas(),
        getAllDosen(),
        getAllMahasiswa(),
        getAllMatkul(),
      ]);
      setKelas(resKelas.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch (error) {
      toastError("Gagal memuat data");
    }
  };

  const getMaxSks = (id) => mahasiswa.find((m) => String(m.id) === String(id))?.max_sks || 0;
  const getDosenMaxSks = (id) => dosen.find((d) => String(d.id) === String(id))?.max_sks || 0;

  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (!mhsId) return toastError("Pilih mahasiswa dulu");

    const matkul = mataKuliah.find((m) => String(m.id) === String(kelasItem.mata_kuliah_id));
    const sks = matkul?.sks || 0;

    const totalSksMahasiswa = kelas
      .filter((k) => {
          const ids = k.mahasiswa_ids || [];
          return ids.includes(mhsId) || ids.includes(parseInt(mhsId)) || ids.includes(String(mhsId));
      })
      .map((k) => mataKuliah.find((m) => String(m.id) === String(k.mata_kuliah_id))?.sks || 0)
      .reduce((acc, curr) => acc + curr, 0);

    const maxSks = getMaxSks(mhsId);

    if (totalSksMahasiswa + sks > maxSks) {
      toastError(`SKS melebihi batas maksimal (${maxSks})`);
      return;
    }

    const currentIds = kelasItem.mahasiswa_ids || [];
    if (currentIds.includes(parseInt(mhsId)) || currentIds.includes(String(mhsId))) {
      toastError("Mahasiswa sudah terdaftar");
      return;
    }

    const updated = {
      ...kelasItem,
      mahasiswa_ids: [...currentIds, mhsId],
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa ditambahkan");
    setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));
    fetchData();
  };

  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const currentIds = kelasItem.mahasiswa_ids || [];
    const updated = {
      ...kelasItem,
      mahasiswa_ids: currentIds.filter((id) => String(id) !== String(mhsId)),
    };
    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa dihapus");
    fetchData();
  };

  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) return;

    const totalSksDosen = kelas
      .filter((k) => String(k.dosen_id) === String(dsnId))
      .map((k) => mataKuliah.find((m) => String(m.id) === String(k.mata_kuliah_id))?.sks || 0)
      .reduce((acc, curr) => acc + curr, 0);

    const kelasSks = mataKuliah.find((m) => String(m.id) === String(kelasItem.mata_kuliah_id))?.sks || 0;
    const maxSks = getDosenMaxSks(dsnId);

    if (totalSksDosen + kelasSks > maxSks) {
      toastError(`Dosen melebihi batas maksimal SKS (${maxSks})`);
      return;
    }

    await updateKelas(kelasItem.id, { ...kelasItem, dosen_id: dsnId });
    toastSuccess("Dosen diperbarui");
    fetchData();
  };

  const handleDeleteKelas = async (kelasId) => {
    confirmDelete(async () => {
      await deleteKelas(kelasId);
      toastSuccess("Kelas dihapus");
      fetchData();
    });
  };

  const openAddModal = () => {
    setForm({ 
        kode_kelas: "", 
        nama_kelas: "", 
        mata_kuliah_id: "", 
        dosen_id: "",
        hari: "", 
        jam_mulai: "", 
        jam_selesai: "" 
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.mata_kuliah_id || !form.dosen_id || !form.kode_kelas || !form.hari || !form.jam_mulai) {
      toastError("Form tidak lengkap");
      return;
    }

    const selectedMatkul = mataKuliah.find(m => String(m.id) === String(form.mata_kuliah_id));
    const namaMatkulString = selectedMatkul ? (selectedMatkul.name || selectedMatkul.nama) : "";

    await storeKelas({ 
        ...form, 
        matkul: namaMatkulString, 
        mahasiswa_ids: [],        
    });
    
    setIsModalOpen(false);
    toastSuccess("Kelas ditambahkan");
    fetchData();
  };

  if (!user.permission.includes("rencana-studi.read")) return <Card><p className="text-red-500 text-center">Akses Ditolak</p></Card>;

  const mataKuliahSudahDipakai = kelas.map((k) => String(k.mata_kuliah_id));
  const mataKuliahBelumAdaKelas = mataKuliah.filter(
    (m) => !mataKuliahSudahDipakai.includes(String(m.id))
  );

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Rencana Studi</Heading>
          {user.permission.includes("rencana-studi.create") && (
            <Button onClick={openAddModal}>+ Tambah Kelas</Button>
          )}
        </div>

        <TableRencanaStudi
          kelas={kelas}
          mahasiswa={mahasiswa}
          dosen={dosen}
          mataKuliah={mataKuliah}
          selectedMhs={selectedMhs}
          setSelectedMhs={setSelectedMhs}
          selectedDsn={selectedDsn}
          setSelectedDsn={setSelectedDsn}
          handleAddMahasiswa={handleAddMahasiswa}
          handleDeleteMahasiswa={handleDeleteMahasiswa}
          handleChangeDosen={handleChangeDosen}
          handleDeleteKelas={handleDeleteKelas}
        />
      </Card>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        form={form}
        dosen={dosen}
        mataKuliah={mataKuliahBelumAdaKelas}
      />
    </>
  );
};

export default RencanaStudi;