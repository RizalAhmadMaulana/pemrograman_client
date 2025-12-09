import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllKelas,
  getKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/Utils/Apis/KelasApi";

export const useKelas = () => {
  return useQuery({
    queryKey: ["kelas"],
    queryFn: getAllKelas,
    select: (data) => data.data,
  });
};

export const useKelasDetail = (id) => {
  return useQuery({
    queryKey: ["kelas", id],
    queryFn: () => getKelas(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useAddKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeKelas,
    onSuccess: () => queryClient.invalidateQueries(["kelas"]),
  });
};

export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateKelas(id, data),
    onSuccess: () => queryClient.invalidateQueries(["kelas"]),
  });
};

export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => queryClient.invalidateQueries(["kelas"]),
  });
};