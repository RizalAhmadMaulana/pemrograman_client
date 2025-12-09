import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";

const ModalMatkul = ({
  isOpen,
  isEdit,
  form,
  onChange,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">
            &times;
          </button>
        </div>

        <Form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="kode">Kode MK</Label>
            <Input
	            type="text"
              name="kode"
              value={form.kode}
              onChange={onChange}
              readOnly={isEdit}
              placeholder="Masukkan Kode Mata Kuliah"
              required
            />
          </div>
          <div>
            <Label htmlFor="nama">Nama MK</Label>
            <Input
	            type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder="Masukkan Nama Mata Kuliah"
              required
            />
          </div>
          <div>
            <Label htmlFor="sks">SKS</Label>
            <Input
	            type="number"
              name="sks"
              value={form.sks}
              onChange={onChange}
              placeholder="Masukkan Jumlah SKS"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} variant="secondary">
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalMatkul;