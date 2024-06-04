"use client";
import { Button } from "@/components/ui/button";
import { HREF_URL } from "@/navigation-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import KesehatanForm from "../../KesehatanForm";
import kesehatanSchema from "../../yup-schema-kesehatan";
import ActionBarDetail from "@/components/ActionBarDetail";

export default function DetailPage({ namaSantri, data }) {
    const form = useForm({
        resolver: yupResolver(kesehatanSchema),
        defaultValues: {
            id_santri: data.id,
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

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <ActionBarDetail
                backLink={HREF_URL.KESEHATAN_HOME}
                editLink={HREF_URL.KESEHATAN_EDIT(data.id)}
            />
            <KesehatanForm form={form} namaSantri={namaSantri} mode="DETAIL" />
        </div>
    );
}
