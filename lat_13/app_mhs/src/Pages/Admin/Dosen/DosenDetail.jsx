import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useParams, useNavigate } from "react-router-dom";
import { getDosen } from "@/Utils/Apis/DosenApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const DosenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const res = await getDosen(id);
        setDosen(res.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
             setDosen(null);
        }
        toastError("Gagal mengambil data dosen.");
      } finally {
        setLoading(false);
      }
    };
    fetchDosen();
  }, [id]);

  if (loading) return <Card><p className="text-center p-4">Memuat data...</p></Card>;
  
  if (!dosen) return (
    <Card>
        <p className="text-red-600 p-4">Data dosen tidak ditemukan</p>
        <Button onClick={() => navigate(-1)}>&larr; Kembali</Button>
    </Card>
  );

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Detail Dosen</Heading>
        <Button onClick={() => navigate(-1)} size="sm" variant="secondary">
          &larr; Kembali
        </Button>
      </div>
      <table className="table-auto text-sm w-full border-collapse">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">ID</td>
            <td className="py-2 px-4 border">{dosen.id}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">NIP</td>
            <td className="py-2 px-4 border">{dosen.nip}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Nama</td>
            <td className="py-2 px-4 border">{dosen.name}</td>
          </tr>
          {dosen.prodi && (
             <tr>
                <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Prodi</td>
                <td className="py-2 px-4 border">{dosen.prodi}</td>
             </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default DosenDetail;