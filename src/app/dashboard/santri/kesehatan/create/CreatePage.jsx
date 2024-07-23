"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import kesehatanSchema from "../yup-schema-kesehatan";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import KesehatanForm from "../KesehatanForm";
import { addDataKesehatan } from "../../_actions/kesehatan";
import ActionBarCreate from "@/components/ActionBarCreate";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import AlertAddAnotherData from "@/components/AlertAddAnotherData";

function CreatePage({ namaSantri }) {
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const form = useForm({
        resolver: yupResolver(kesehatanSchema),
        defaultValues: {
            nama_penyakit: "",
            penanganan: "",
            kategori: "RINGAN",
            tgl_masuk: new Date().toISOString().split("T")[0],
            tgl_keluar: "",
            status: "PERAWATAN",
        },
    });

    let onSimpanHandler = (data) => {
        let kesehatan = {
            kelas_santri_id: data.id_santri,
            nama_penyakit: data.nama_penyakit,
            penanganan: data.penanganan,
            kategori: data.kategori,
            tgl_masuk: formatDate(data.tgl_masuk),
            tgl_keluar: data.tgl_keluar ? formatDate(data.tgl_keluar) : null,
            status: data.status,
        };

        toast.promise(
            () => addDataKesehatan(kesehatan),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        setOpenDialog(true);
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

    const afterSuccessAction = {
        onYes: () => {
            form.reset();
        },
        onNo: () => {
            router.push(HREF_URL.KESEHATAN_HOME);
        },
    };

    return (
        <>
            <AlertAddAnotherData
                open={openDialog}
                openChange={setOpenDialog}
                successAction={afterSuccessAction}
            />
            <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
                <ActionBarCreate
                    backLink={HREF_URL.KESEHATAN_HOME}
                    handleSimpan={() => form.handleSubmit(onSimpanHandler)()}
                />
                <KesehatanForm
                    form={form}
                    namaSantri={namaSantri}
                    mode="CREATE"
                />
            </div>
        </>
    );
}

export default CreatePage;
