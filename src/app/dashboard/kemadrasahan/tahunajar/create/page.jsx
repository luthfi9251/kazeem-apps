"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import taSchema from "../yup-tahunajar-schema";
import TahunAjarForm from "./TahunAjarForm";
import { addTahunAjar } from "../../_actions/tahunajar";
import { toast } from "react-toastify";
import { HREF_URL } from "@/navigation-data";

export default function CreatePage() {
    let router = useRouter();

    const form = useForm({
        resolver: yupResolver(taSchema),
        defaultValues: {
            kode_ta: "",
            tgl_mulai: "",
            tgl_selesai: "",
            aktif: false,
        },
    });

    const onSubmitHandler = (data) => {
        toast.promise(
            () => addTahunAjar(data),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KEMADRASAHAN_TA_HOME);
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

    const onSimpanClick = () => {
        return;
    };
    const onCancelClick = () => {
        return;
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href={HREF_URL.KEMADRASAHAN_TA_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
            </div>
            <TahunAjarForm form={form} onSubmit={onSubmitHandler} />
        </div>
    );
}
