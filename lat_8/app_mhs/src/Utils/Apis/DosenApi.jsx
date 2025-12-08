import axios from "@/Utils/AxiosInstance";

const BASE_URL = "/dosen";

export const getAllDosen = () => axios.get(BASE_URL);

// --- TAMBAHKAN INI ---
export const getDosen = (id) => axios.get(`${BASE_URL}/${id}`);
// ---------------------

export const storeDosen = (data) => axios.post(BASE_URL, data);
export const updateDosen = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteDosen = (id) => axios.delete(`${BASE_URL}/${id}`);