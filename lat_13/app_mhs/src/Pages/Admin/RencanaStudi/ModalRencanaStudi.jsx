import React from "react";
import Form from "@/Pages/Layouts/Components/Form";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Input from "@/Pages/Layouts/Components/Input";

const ModalRencanaStudi = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  form,
  dosen,
  mataKuliah
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Tambah Kelas Baru</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">&times;</button>
        </div>

        <Form onSubmit={onSubmit} className="p-4 space-y-4">
          
          {/* Kode & Nama Kelas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="kode_kelas">Kode Kelas</Label>
                <Input type="text" name="kode_kelas" value={form.kode_kelas || ""} onChange={onChange} placeholder="4415" required />
            </div>
            <div>
                <Label htmlFor="nama_kelas">Ruang Kelas</Label>
                <Input type="text" name="nama_kelas" value={form.nama_kelas || ""} onChange={onChange} placeholder="A11.4405" required />
            </div>
          </div>

          <div>
            <Label htmlFor="mata_kuliah_id">Mata Kuliah</Label>
            <select name="mata_kuliah_id" value={form.mata_kuliah_id} onChange={onChange} className="w-full border px-2 py-1 rounded" required>
              <option value="">-- Pilih --</option>
              {mataKuliah.map((m) => (
                <option key={m.id} value={m.id}>{m.name || m.nama}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="dosen_id">Dosen Pengampu</Label>
            <select name="dosen_id" value={form.dosen_id} onChange={onChange} className="w-full border px-2 py-1 rounded" required>
              <option value="">-- Pilih --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>{d.name || d.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Hari</Label>
            <select name="hari" value={form.hari || ""} onChange={onChange} className="w-full border px-2 py-1 rounded" required>
              <option value="">Pilih Hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Jam Mulai</Label>
              <Input type="time" name="jam_mulai" value={form.jam_mulai || ""} onChange={onChange} required />
            </div>
            <div>
              <Label>Jam Selesai</Label>
              <Input type="time" name="jam_selesai" value={form.jam_selesai || ""} onChange={onChange} required />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" onClick={onClose} variant="secondary">Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalRencanaStudi;