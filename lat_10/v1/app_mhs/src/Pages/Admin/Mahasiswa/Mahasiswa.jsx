import React, { useState } from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import {
    useMahasiswa,
    useStoreMahasiswa,
    useUpdateMahasiswa,
    useDeleteMahasiswa
} from "@/Utils/Hooks/useMahasiswa";

import {
    confirmDelete,
    confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";

import { 
    toastSuccess, 
    toastError 
} from "@/Utils/Helpers/ToastHelpers";

const Mahasiswa = () => {
    const navigate = useNavigate();
    const { user } = useAuthStateContext();

    const { data: mahasiswa = [] } = useMahasiswa();
    const { mutate: store } = useStoreMahasiswa();
    const { mutate: update } = useUpdateMahasiswa();
    const { mutate: remove } = useDeleteMahasiswa();

    // STATE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({ id: null, nim: "", nama: "" });
    

    // RESET FORM
    const resetForm = () => {
        setForm({ id: null, nim: "", nama: "" });
        setIsEdit(false);
        setIsModalOpen(false);
    };

    // HANDLE CHANGE
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // OPEN ADD MODAL
    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    // OPEN EDIT MODAL
    const openEditModal = (mhs) => {
        setForm({
            id: mhs.id,
            nim: mhs.nim,
            nama: mhs.nama,
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    // HANDLE SUBMIT (TAMBAH / EDIT)
    const handleSubmit = () => {
        if (isEdit) {
            confirmUpdate(() => {
                update(
                    { id: form.id, data: form },
                    {
                        onSuccess: () => {
                            toastSuccess("Data berhasil diupdate");
                            resetForm();
                        }
                    }
                );
            });
        } else {
            const exists = mahasiswa.find((m) => m.nim === form.nim);
            if (exists) {
                toastError("NIM sudah terdaftar!");
                return;
            }

            store(form, {
                onSuccess: () => {
                    toastSuccess("Data berhasil ditambahkan");
                    resetForm();
                }
            });
        }
    };

    // HANDLE DELETE
    const handleDelete = (id) => {
        confirmDelete(() => {
            remove(id, {
                onSuccess: () => {
                    toastSuccess("Data berhasil dihapus");
                }
            });
        });
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Heading as="h2" className="mb-0 text-left">
                    Daftar Mahasiswa
                </Heading>

                {user.permission.includes("mahasiswa.create") && (
                    <Button onClick={openAddModal}>
                        + Tambah Mahasiswa
                    </Button>
                )}
            </div>

            {user.permission.includes("mahasiswa.read") && (
                <TableMahasiswa
                    data={mahasiswa}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
                />
            )}

            <ModalMahasiswa
                isOpen={isModalOpen}
                isEdit={isEdit}
                form={form}
                onChange={handleChange}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Card>
    );
};

export default Mahasiswa;
