"use client";
import { Button } from "@/components/ui/button";
import { HREF_URL } from "@/navigation-data";
import Link from "next/link";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PresensiForm from "../../PresensiForm";
import presensiSchema from "../../yup-schema-presensi";
import ActionBarDetail from "@/components/ActionBarDetail";

export default function DetailPage({ namaPegawai, data }) {
    const form = useForm({
        resolver: yupResolver(presensiSchema),
        defaultValues: {
            id_pegawai: data.pegawai.id,
            keterangan: data.keterangan,
            tgl_presensi: dayjs(data.tgl_presensi).format('YYYY-MM-DD'),
            status: data.status,
        },
    });

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <ActionBarDetail
                backLink={HREF_URL.PRESENSI_HOME}
                editLink={HREF_URL.PRESENSI_EDIT(data.id)}
            />
            <PresensiForm form={form} namaPegawai={namaPegawai} mode="DETAIL" />
        </div>
    );
}
