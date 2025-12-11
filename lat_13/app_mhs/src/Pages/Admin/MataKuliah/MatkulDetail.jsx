import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useParams, useNavigate } from "react-router-dom";
import { getMatkul } from "@/Utils/Apis/MatkulApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MatkulDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matkul, setMatkul] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatkul = async () => {
      try {
        const res = await getMatkul(id);
        setMatkul(res.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
             setMatkul(null);
        }
        toastError("Gagal mengambil data mata kuliah.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatkul();
  }, [id]);

  if (loading) return <Card><p className="text-center p-4">Memuat data...</p></Card>;

  if (!matkul) return (
    <Card>
        <p className="text-red-600 p-4">Data mata kuliah tidak ditemukan</p>
        <Button onClick={() => navigate(-1)}>&larr; Kembali</Button>
    </Card>
  );

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Detail Mata Kuliah</Heading>
        <Button onClick={() => navigate(-1)} size="sm" variant="secondary">
          &larr; Kembali
        </Button>
      </div>
      <table className="table-auto text-sm w-full border-collapse">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">ID</td>
            <td className="py-2 px-4 border">{matkul.id}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Kode MK</td>
            <td className="py-2 px-4 border">{matkul.kode}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Nama MK</td>
            <td className="py-2 px-4 border">{matkul.name}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">SKS</td>
            <td className="py-2 px-4 border">{matkul.sks}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MatkulDetail;