import axios from "@/Utils/AxiosInstance";

export const getAllMatkul = (params = {}) => axios.get("/matakuliah", { params });

export const getMatkul = (id) => axios.get(`/matakuliah/${id}`);
export const storeMatkul = (data) => axios.post("/matakuliah", data);
export const updateMatkul = (id, data) => axios.put(`/matakuliah/${id}`, data);
export const deleteMatkul = (id) => axios.delete(`/matakuliah/${id}`);