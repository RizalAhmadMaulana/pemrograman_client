import axios from "@/Utils/AxiosInstance";

const BASE_URL = "/kelas"; // Endpoint di JSON Server

export const getAllKelas = () => axios.get(BASE_URL);
export const getKelas = (id) => axios.get(`${BASE_URL}/${id}`);
export const storeKelas = (data) => axios.post(BASE_URL, data);
export const updateKelas = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteKelas = (id) => axios.delete(`${BASE_URL}/${id}`);