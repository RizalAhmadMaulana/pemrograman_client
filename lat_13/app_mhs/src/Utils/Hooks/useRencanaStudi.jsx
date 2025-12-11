import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMahasiswaByKelas,
  storeRencanaStudi,
  deleteRencanaStudi,
} from "@/Utils/Apis/RencanaStudiApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

// Hook untuk mengambil list mahasiswa di kelas tertentu
export const useMahasiswaInKelas = (kelasId) => {
  return useQuery({
    queryKey: ["rencana_studi", "kelas", kelasId],
    queryFn: () => getMahasiswaByKelas(kelasId),
    enabled: !!kelasId, // Hanya jalan jika kelasId ada
  });
};

// Hook untuk menambahkan mahasiswa ke kelas
export const useAddMahasiswaToKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeRencanaStudi,
    onSuccess: () => {
      // Refresh data list mahasiswa di kelas
      queryClient.invalidateQueries({ queryKey: ["rencana_studi"] });
      toastSuccess("Mahasiswa berhasil ditambahkan ke kelas!");
    },
    onError: (err) => {
      toastError(err.message || "Gagal menambahkan mahasiswa");
    },
  });
};

// Hook untuk menghapus mahasiswa dari kelas
export const useRemoveMahasiswaFromKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRencanaStudi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rencana_studi"] });
      toastSuccess("Mahasiswa berhasil dihapus dari kelas!");
    },
    onError: () => {
      toastError("Gagal menghapus mahasiswa");
    },
  });
};