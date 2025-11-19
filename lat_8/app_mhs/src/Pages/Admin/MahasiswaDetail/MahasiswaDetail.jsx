import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
// import { mahasiswaList } from "@/Data/Dummy"; 

import { useParams, useNavigate } from "react-router-dom"; 
import Button from "@/Pages/Layouts/Components/Button";

import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MahasiswaDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // --- STATE ---
    const [mahasiswa, setMahasiswa] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- FUNGSI FETCH DATA ---
    const fetchMahasiswa = async () => {
        try {
            const res = await getMahasiswa(id);
            setMahasiswa(res.data);
        } catch (err) {
            console.error("Gagal mengambil data mahasiswa: ", err);
            // Penanganan 404 sederhana (jika tidak ditemukan)
            if (err.response && err.response.status === 404) {
                 setMahasiswa(null); // Memastikan state mahasiswa null
            }
            toastError("Gagal mengambil data mahasiswa: ", err);
        } finally {
            setLoading(false);
        }
    };

    // --- USE EFFECT ---
    useEffect(() => {
        fetchMahasiswa();
    }, [id]);

    // --- KONDISI RENDERING ---
    if (loading) return (
        <Card>
            <p className="text-center p-4">Memuat data...</p>
        </Card>
    );

    // Kasus 404 (Data tidak ditemukan)
    if (!mahasiswa) return (
        <Card>
            <p className="text-red-600 p-4">Data mahasiswa tidak ditemukan</p>
            <Button onClick={() => navigate(-1)}>
                &larr; Kembali
            </Button>
        </Card>
    );
    

    // --- TAMPILAN UTAMA ---
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">Detail Mahasiswa</Heading>
                <Button onClick={() => navigate(-1)} size="sm" variant="secondary">
                    &larr; Kembali
                </Button>
            </div>
            
            <table className="table-auto text-sm w-full border-collapse">
                <tbody>
                    <tr>
                        <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">ID Internal</td>
                        <td className="py-2 px-4 border">{mahasiswa.id}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">NIM</td>
                        <td className="py-2 px-4 border">{mahasiswa.nim}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 font-medium w-1/4 bg-gray-50 border">Nama</td>
                        <td className="py-2 px-4 border">{mahasiswa.nama}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
};

export default MahasiswaDetail;