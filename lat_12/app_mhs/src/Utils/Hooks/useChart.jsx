import { useQuery } from "@tanstack/react-query";
import { getAllChartData } from "@/Utils/Apis/ChartApi";

export const useChartData = () =>
  useQuery({
    queryKey: ["chart", "all"],
    queryFn: getAllChartData,
    select: (res) => res.data, // Langsung ambil data di dalamnya
    refetchOnWindowFocus: false, // Opsional: Biar gak refresh terus pas pindah tab
  });