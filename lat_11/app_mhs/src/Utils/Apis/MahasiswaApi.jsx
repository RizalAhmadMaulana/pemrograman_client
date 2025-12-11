import axios from "@/Utils/AxiosInstance";

// Ambil semua mahasiswa
export const getAllMahasiswa = (params = {}) =>
    axios.get("/mahasiswa", { params });

// Ambil 1 mahasiswa
export const getMahasiswa = (id) => axios.get(`/mahasiswa/${id}`);
export const storeMahasiswa = (data) => axios.post("/mahasiswa", data);
export const updateMahasiswa = (id, data) => axios.put(`/mahasiswa/${id}`, data);
export const deleteMahasiswa = (id) => axios.delete(`/mahasiswa/${id}`);