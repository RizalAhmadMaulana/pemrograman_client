import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMatkul,
  getMatkul,
  storeMatkul,
  updateMatkul,
  deleteMatkul,
} from "@/Utils/Apis/MatkulApi";

export const useMatkul = () => {
  return useQuery({
    queryKey: ["matakuliah"],
    queryFn: getAllMatkul,
    select: (data) => data.data,
  });
};

export const useMatkulDetail = (id) => {
  return useQuery({
    queryKey: ["matakuliah", id],
    queryFn: () => getMatkul(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useAddMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMatkul,
    onSuccess: () => queryClient.invalidateQueries(["matakuliah"]),
  });
};

export const useUpdateMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMatkul(id, data),
    onSuccess: () => queryClient.invalidateQueries(["matakuliah"]),
  });
};

export const useDeleteMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMatkul,
    onSuccess: () => queryClient.invalidateQueries(["matakuliah"]),
  });
};