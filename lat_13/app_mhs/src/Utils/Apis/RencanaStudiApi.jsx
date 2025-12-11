import axios from "@/Utils/AxiosInstance";

// Ambil daftar mahasiswa yang ada di kelas tertentu
// Kita gunakan fitur _expand dari json-server untuk langsung ambil data mahasiswanya
export const getMahasiswaByKelas = async (kelasId) => {
  const res = await axios.get(`/rencana_studi?kelas_id=${kelasId}&_expand=mahasiswa`);
  return res.data;
};

// Ambil daftar kelas yang diambil oleh mahasiswa tertentu
// Expand kelas untuk tau detail kelasnya
export const getKelasByMahasiswa = async (mahasiswaId) => {
  const res = await axios.get(`/rencana_studi?mahasiswa_id=${mahasiswaId}&_expand=kelas`);
  return res.data;
};

// Cek apakah mahasiswa sudah mengambil kelas ini (untuk validasi duplikat)
export const checkEnrollment = async (kelasId, mahasiswaId) => {
  const res = await axios.get(`/rencana_studi?kelas_id=${kelasId}&mahasiswa_id=${mahasiswaId}`);
  return res.data; // Mengembalikan array, jika length > 0 berarti sudah ambil
};

// Tambah Rencana Studi (Mahasiswa Masuk Kelas)
export const storeRencanaStudi = async (data) => {
  const res = await axios.post("/rencana_studi", data);
  return res.data;
};

// Hapus Rencana Studi (Mahasiswa Keluar Kelas)
export const deleteRencanaStudi = async (id) => {
  await axios.delete(`/rencana_studi/${id}`);
  return id;
};