import React from "react";
import Button from "@/Pages/Layouts/Components/Button";
import Select from "@/Pages/Layouts/Components/Select";

export default function TableRencanaStudi({
  kelas,
  mahasiswa,
  dosen,
  mataKuliah,
  selectedMhs,
  setSelectedMhs,
  selectedDsn,
  setSelectedDsn,
  handleAddMahasiswa,
  handleDeleteMahasiswa,
  handleChangeDosen,
  handleDeleteKelas
}) {

  return (
    <div className="space-y-6">
      {kelas.map((kls) => {
        // Cari nama matkul (ingat ID bisa string/number, jadi convert ke String biar aman)
        const matkul = mataKuliah.find(m => String(m.id) === String(kls.mata_kuliah_id));
        const dosenPengampu = dosen.find(d => String(d.id) === String(kls.dosen_id));
        const mhsInClass = kls.mahasiswa_ids.map(id => mahasiswa.find(m => String(m.id) === String(id))).filter(Boolean);

        return (
          <div key={kls.id} className="border rounded shadow bg-white">
            {/* Header Kelas */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
              <div>
                {/* Tampilkan Nama Matkul (sesuaikan field di db kamu: name atau nama) */}
                <h3 className="text-lg font-semibold">{matkul?.name || matkul?.nama || "Matkul Tidak Ditemukan"}</h3>
                <p className="text-sm text-gray-600">Dosen: <strong>{dosenPengampu?.name || dosenPengampu?.nama || "-"}</strong></p>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedDsn[kls.id] || ""}
                  onChange={(e) => setSelectedDsn({ ...selectedDsn, [kls.id]: e.target.value })}
                  size="sm"
                  className="w-48"
                >
                  <option value="">-- Ganti Dosen --</option>
                  {dosen.map(d => (
                    <option key={d.id} value={d.id}>{d.name || d.nama}</option>
                  ))}
                </Select>
                <Button size="sm" onClick={() => handleChangeDosen(kls)}>Simpan</Button>
                {mhsInClass.length === 0 && (
                  <Button size="sm" variant="danger" onClick={() => handleDeleteKelas(kls.id)}>
                    Hapus Kelas
                  </Button>
                )}
              </div>
            </div>

            {/* Tabel Mahasiswa */}
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">No</th>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-left">NIM</th>
                  <th className="py-2 px-4 text-center">Total SKS</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mhsInClass.length > 0 ? (
                  mhsInClass.map((m, i) => {
                    // Logic Hitung Total SKS Mahasiswa
                    const totalSks = kelas
                      .filter(k => k.mahasiswa_ids.includes(m.id) || k.mahasiswa_ids.includes(String(m.id)) || k.mahasiswa_ids.includes(parseInt(m.id)))
                      .map(k => mataKuliah.find(mk => String(mk.id) === String(k.mata_kuliah_id))?.sks || 0)
                      .reduce((a, b) => a + b, 0);

                    return (
                      <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4">{m.name || m.nama}</td>
                        <td className="py-2 px-4">{m.nim}</td>
                        <td className="py-2 px-4 text-center">{totalSks}</td>
                        <td className="py-2 px-4 text-center">
                          <Button size="sm" variant="danger" onClick={() => handleDeleteMahasiswa(kls, m.id)}>
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-3 px-4 text-center italic text-gray-500">
                      Belum ada mahasiswa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer Tambah */}
            <div className="flex items-center gap-2 px-4 py-3 border-t bg-gray-50">
              <Select
                value={selectedMhs[kls.id] || ""}
                onChange={(e) => setSelectedMhs({ ...selectedMhs, [kls.id]: e.target.value })}
                size="sm"
                className="w-56"
              >
                <option value="">-- Pilih Mahasiswa --</option>
                {mahasiswa.map((m) => (
                  <option key={m.id} value={m.id}>{m.name || m.nama} ({m.nim})</option>
                ))}
              </Select>
              <Button size="sm" onClick={() => handleAddMahasiswa(kls, selectedMhs[kls.id])}>
                Tambah Mahasiswa
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}