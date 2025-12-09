import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { getKelas } from "@/Utils/Apis/KelasApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const KelasDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kls, setKls] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getKelas(id);
        setKls(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) setKls(null);
        else toastError("Gagal ambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Card><p className="text-center p-4 text-gray-500">Memuat data kelas...</p></Card>;
  
  if (!kls) return (
    <Card>
        <div className="text-center py-6">
            <p className="text-red-500 mb-4">Data kelas tidak ditemukan.</p>
            <Button onClick={() => navigate(-1)}>&larr; Kembali</Button>
        </div>
    </Card>
  );

  return (
    <Card>
      <div className="flex justify-between items-center mb-6 pb-4">
        <div>
            <Heading as="h2" className="text-left mb-1">Detail Kelas</Heading>
            <p className="text-sm text-gray-500">Informasi lengkap mengenai kelas ini</p>
        </div>
        <Button onClick={() => navigate(-1)} size="sm" variant="secondary">&larr; Kembali</Button>
      </div>

      <table className="table-auto text-sm w-full border-collapse">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">ID Database</td>
            <td className="py-2 px-4 border">{kls.id}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Kode Kelas</td>
            <td className="py-2 px-4 border">{kls.kode_kelas}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Nama Kelas</td>
            <td className="py-2 px-4 border">{kls.nama_kelas}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Mata Kuliah</td>
            <td className="py-2 px-4 border">{kls.matkul}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Hari</td>
            <td className="py-2 px-4 border">{kls.hari}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Jam Jadwal</td>
            <td className="py-2 px-4 border">
              {kls.jam_mulai} s/d {kls.jam_selesai} WIB
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default KelasDetail;