"use client";
import { HREF_URL } from "@/navigation-data";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import KesehatanForm from "../../KesehatanForm";
import kesehatanSchema from "../../yup-schema-kesehatan";

import ActionBarEdit from "@/components/ActionBarEdit";
import { toast } from "react-toastify";
import {
    editDataKesehatan,
    deleteDataKesehatan,
} from "../../../_actions/kesehatan";
import { useRouter } from "next/navigation";

export default function EditPage({ namaSantri, data }) {
    const router = useRouter();
    const form = useForm({
        resolver: yupResolver(kesehatanSchema),
        defaultValues: {
            id_santri: data.santri_id,
            nama_penyakit: data.nama_penyakit,
            penanganan: data.penanganan,
            kategori: data.kategori,
            tgl_masuk: new Date(data.tgl_masuk).toISOString().split("T")[0],
            tgl_keluar: data.tgl_keluar
                ? new Date(data.tgl_masuk).toISOString().split("T")[0]
                : "",
            status: data.status,
        },
    });

    let handleSubmit = (dataForm) => {
        let kesehatan = {
            nama_penyakit: dataForm.nama_penyakit,
            penanganan: dataForm.penanganan,
            kategori: dataForm.kategori,
            tgl_masuk: new Date(dataForm.tgl_masuk).toISOString(),
            tgl_keluar: dataForm.tgl_keluar
                ? new Date(dataForm.tgl_keluar).toISOString()
                : "",
            status: dataForm.status,
        };
        toast.promise(
            () => editDataKesehatan(data.id, kesehatan),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KESEHATAN_HOME);
                        return "Data berhasil disimpan";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `${data}`;
                    },
                },
            },
            {
                position: "bottom-right",
            }
        );
    };

    let onDeleteHandler = () => {
        toast.promise(
            () => deleteDataKesehatan(data.id),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KESEHATAN_HOME);
                        return "Data berhasil dihapus";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `${data}`;
                    },
                },
            },
            {
                position: "bottom-right",
            }
        );
    };

    let handleSimpan = () => {
        form.handleSubmit(handleSubmit)();
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <ActionBarEdit
                backLink={HREF_URL.KESEHATAN_HOME}
                handleSimpan={handleSimpan}
                handleDelete={onDeleteHandler}
            />
            <KesehatanForm form={form} namaSantri={namaSantri} mode="EDIT" />
        </div>
    );
}
