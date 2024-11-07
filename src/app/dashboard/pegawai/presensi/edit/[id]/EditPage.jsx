"use client";
import { HREF_URL } from "@/navigation-data";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PresensiForm from "../../PresensiForm";
import presensiSchema from "../../yup-schema-presensi";

import ActionBarEdit from "@/components/ActionBarEdit";
import { toast } from "react-toastify";
import {
    editDataPresensi,
    deleteDataPresensi,
} from "../../../_actions/presensi";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import dayjs from "dayjs";

export default function EditPage({ namaPegawai, data }) {
    const router = useRouter();
    const form = useForm({
        resolver: yupResolver(presensiSchema),
        defaultValues: {
            id_pegawai: data.pegawai.id,
            keterangan: data.keterangan,
            tgl_presensi: dayjs(data.tgl_presensi).format('YYYY-MM-DD'),
            status: data.status,
        },
    });

    let handleSubmit = (dataForm) => {
        let presensi = {
            keterangan: dataForm.keterangan,
            tgl_presensi: formatDate(dataForm.tgl_presensi),
            status: dataForm.status,
        };

        toast.promise(
            () => editDataPresensi(data.id, presensi),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.PRESENSI_HOME);
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
            () => deleteDataPresensi(data.id),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.PRESENSI_HOME);
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
                backLink={HREF_URL.PRESENSI_HOME}
                handleSimpan={handleSimpan}
                handleDelete={onDeleteHandler}
            />
            <PresensiForm form={form} namaPegawai={namaPegawai} mode="EDIT" />
        </div>
    );
}
