import axios from "@/Utils/AxiosInstance";

export const getMahasiswaByKelas = async (kelasId) => {
  const res = await axios.get(`/rencana_studi?kelas_id=${kelasId}&_expand=mahasiswa`);
  return res.data;
};

export const getKelasByMahasiswa = async (mahasiswaId) => {
  const res = await axios.get(`/rencana_studi?mahasiswa_id=${mahasiswaId}&_expand=kelas`);
  return res.data;
};

export const checkEnrollment = async (kelasId, mahasiswaId) => {
  const res = await axios.get(`/rencana_studi?kelas_id=${kelasId}&mahasiswa_id=${mahasiswaId}`);
  return res.data;
};

export const storeRencanaStudi = async (data) => {
  const res = await axios.post("/rencana_studi", data);
  return res.data;
};

export const deleteRencanaStudi = async (id) => {
  await axios.delete(`/rencana_studi/${id}`);
  return id;
};