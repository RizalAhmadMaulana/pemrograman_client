import React, { useState, useEffect } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useParams, useNavigate } from "react-router-dom";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllKelas } from "@/Utils/Apis/KelasApi";
import { getAllMatkul } from "@/Utils/Apis/MatkulApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MahasiswaDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [mahasiswa, setMahasiswa] = useState(null);
    const [krsList, setKrsList] = useState([]);
    const [matkulList, setMatkulList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const resMhs = await getMahasiswa(id);
                setMahasiswa(resMhs.data);

                const resKelas = await getAllKelas();
                
                const resMatkul = await getAllMatkul();
                setMatkulList(resMatkul.data);

                const kelasDiambil = resKelas.data.filter(k => 
                    k.mahasiswa_ids.includes(parseInt(id)) || 
                    k.mahasiswa_ids.includes(String(id))
                );
                setKrsList(kelasDiambil);

            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                     setMahasiswa(null);
                } else {
                    toastError("Gagal mengambil data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    const calculateTotalSKS = () => {
        let total = 0;
        krsList.forEach((kelasItem) => {
            const foundMatkul = matkulList.find(m => String(m.id) === String(kelasItem.mata_kuliah_id));
            if (foundMatkul) {
                total += parseInt(foundMatkul.sks);
            }
        });
        return total;
    };

    if (loading) return <Card><p className="text-center p-4">Memuat data...</p></Card>;
    
    if (!mahasiswa) return (
        <Card>
            <p className="text-red-600 p-4 text-center font-bold">Data Mahasiswa Tidak Ditemukan</p>
            <div className="flex justify-center">
                <Button onClick={() => navigate(-1)}>Kembali</Button>
            </div>
        </Card>
    );

    const totalSKS = calculateTotalSKS();

    return (
        <Card>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <Heading as="h2" className="text-left mb-1">Detail Mahasiswa</Heading>
                    <p className="text-sm text-gray-500">Info akademik dan rencana studi</p>
                </div>
                <Button onClick={() => navigate(-1)} size="sm" variant="secondary">&larr; Kembali</Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="font-bold w-32 py-1">NIM</td>
                            <td>: {mahasiswa.nim}</td>
                        </tr>
                        <tr>
                            <td className="font-bold w-32 py-1">Nama</td>
                            <td>: {mahasiswa.name || mahasiswa.nama}</td> 
                        </tr>
                        <tr>
                            <td className="font-bold w-32 py-1">Total SKS</td>
                            <td>
                                : <span className="font-bold text-blue-600 text-lg">{totalSKS}</span> / {mahasiswa.max_sks}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Heading as="h3" className="text-left text-lg mb-4">Kelas yang Diambil</Heading>
            
            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left border-b">Kode Kelas</th>
                            <th className="py-2 px-4 text-left border-b">Mata Kuliah</th>
                            <th className="py-2 px-4 text-left border-b">Hari/Jam</th>
                            <th className="py-2 px-4 text-center border-b">SKS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {krsList.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    Mahasiswa ini belum mengambil kelas apapun.
                                </td>
                            </tr>
                        ) : (
                            krsList.map((item) => {
                                const mkInfo = matkulList.find(m => String(m.id) === String(item.mata_kuliah_id));
                                const namaMk = mkInfo ? mkInfo.name : "Unknown";
                                const sks = mkInfo ? mkInfo.sks : "-";

                                return (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4">{item.kode_kelas || "-"}</td>
                                        <td className="py-2 px-4">
                                            <div className="font-medium">{namaMk}</div>
                                        </td>
                                        <td className="py-2 px-4">
                                            {item.hari || "-"}, {item.jam_mulai || ""}-{item.jam_selesai || ""}
                                        </td>
                                        <td className="py-2 px-4 text-center font-bold">
                                            {sks}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default MahasiswaDetail;