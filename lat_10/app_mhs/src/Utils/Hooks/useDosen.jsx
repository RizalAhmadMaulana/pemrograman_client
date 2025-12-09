import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  getDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "@/Utils/Apis/DosenApi";

export const useDosen = () => {
  return useQuery({
    queryKey: ["dosen"],
    queryFn: getAllDosen,
    select: (data) => data.data,
  });
};

export const useDosenDetail = (id) => {
  return useQuery({
    queryKey: ["dosen", id],
    queryFn: () => getDosen(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useAddDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => queryClient.invalidateQueries(["dosen"]),
  });
};

export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data),
    onSuccess: () => queryClient.invalidateQueries(["dosen"]),
  });
};

export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => queryClient.invalidateQueries(["dosen"]),
  });
};