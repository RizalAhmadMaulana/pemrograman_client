import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";

const ModalKelas = ({ isOpen, isEdit, form, onChange, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{isEdit ? "Edit Kelas" : "Tambah Kelas"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
        </div>
        <Form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Kode Kelas</Label>
              <Input name="kode_kelas" value={form.kode_kelas} onChange={onChange} required placeholder="Contoh: 4412" />
            </div>
            <div>
              <Label>Nama Kelas</Label>
              <Input name="nama_kelas" value={form.nama_kelas} onChange={onChange} required placeholder="Contoh: A11.4403" />
            </div>
          </div>

          <div>
            <Label>Mata Kuliah</Label>
            <Input name="matkul" value={form.matkul} onChange={onChange} required placeholder="Nama Mata Kuliah" />
          </div>

          <div>
            <Label>Hari</Label>
            <select 
              name="hari" 
              value={form.hari} 
              onChange={onChange} 
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
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
              <Input type="time" name="jam_mulai" value={form.jam_mulai} onChange={onChange} required />
            </div>
            <div>
              <Label>Jam Selesai</Label>
              <Input type="time" name="jam_selesai" value={form.jam_selesai} onChange={onChange} required />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalKelas;