import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMahasiswaByKelas,
  storeRencanaStudi,
  deleteRencanaStudi,
} from "@/Utils/Apis/RencanaStudiApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

export const useMahasiswaInKelas = (kelasId) => {
  return useQuery({
    queryKey: ["rencana_studi", "kelas", kelasId],
    queryFn: () => getMahasiswaByKelas(kelasId),
    enabled: !!kelasId, 
  });
};

export const useAddMahasiswaToKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeRencanaStudi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rencana_studi"] });
      toastSuccess("Mahasiswa berhasil ditambahkan ke kelas!");
    },
    onError: (err) => {
      toastError(err.message || "Gagal menambahkan mahasiswa");
    },
  });
};

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