import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMatkul,
  storeMatkul,
  updateMatkul,
  deleteMatkul,
} from "@/Utils/Apis/MatkulApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

// Hook Read
export const useMatkul = (query = {}) =>
  useQuery({
    queryKey: ["matakuliah", query],
    queryFn: () => getAllMatkul(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Hook Create (Rename useAdd -> useStore)
export const useStoreMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMatkul,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      toastSuccess("Mata Kuliah berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan mata kuliah."),
  });
};

export const useUpdateMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMatkul(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      toastSuccess("Mata Kuliah berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui mata kuliah."),
  });
};

export const useDeleteMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMatkul,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      toastSuccess("Mata Kuliah berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus mata kuliah."),
  });
};