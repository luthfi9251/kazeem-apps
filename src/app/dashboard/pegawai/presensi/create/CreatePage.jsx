"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import presensiSchema from "../yup-schema-presensi";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import PresensiForm from "../PresensiForm";
import { addDataPresensi } from "../../_actions/presensi";
import ActionBarCreate from "@/components/ActionBarCreate";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import AlertAddAnotherData from "@/components/AlertAddAnotherData";

function CreatePage({ namaPegawai }) {
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const form = useForm({
        resolver: yupResolver(presensiSchema),
        defaultValues: {
            keterangan: "",
            tgl_presensi: new Date().toISOString().split("T")[0],
            status: "HADIR",
        },
    });

    let onSimpanHandler = (data) => {
        let presensi = {
            id_pegawai: data.id_pegawai,
            keterangan: data.keterangan,
            tgl_presensi: formatDate(data.tgl_presensi),
            status: data.status,
        };
        toast.promise(
            () => addDataPresensi(presensi),
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
            router.push(HREF_URL.PRESENSI_HOME);
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
                    backLink={HREF_URL.PRESENSI_HOME}
                    handleSimpan={() => form.handleSubmit(onSimpanHandler)()}
                />
                <PresensiForm
                    form={form}
                    namaPegawai={namaPegawai}
                    mode="CREATE"
                />
            </div>
        </>
    );
}

export default CreatePage;
