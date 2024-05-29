"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import taSchema from "./yup-tahunajar-schema";
import TahunAjarForm from "./TahunAjarForm";

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
        return;
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
                <Link href="/dashboard/kemadrasahan/kelas">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
            </div>
            <TahunAjarForm form={form} onSubmit={onSubmitHandler} />
        </div>
    );
}
