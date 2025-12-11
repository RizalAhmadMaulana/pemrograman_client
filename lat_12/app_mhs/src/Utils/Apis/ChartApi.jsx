import axios from "@/Utils/AxiosInstance";

// Fetch data tunggal dari endpoint /chart
export const getAllChartData = () => axios.get("/chart");