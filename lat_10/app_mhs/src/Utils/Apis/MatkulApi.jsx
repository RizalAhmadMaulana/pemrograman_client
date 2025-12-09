import axios from "@/Utils/AxiosInstance";

const BASE_URL = "/matakuliah";

export const getAllMatkul = () => axios.get(BASE_URL);

// --- TAMBAHKAN INI ---
export const getMatkul = (id) => axios.get(`${BASE_URL}/${id}`);
// ---------------------

export const storeMatkul = (data) => axios.post(BASE_URL, data);
export const updateMatkul = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteMatkul = (id) => axios.delete(`${BASE_URL}/${id}`);