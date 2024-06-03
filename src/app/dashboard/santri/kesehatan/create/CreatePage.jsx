"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import kesehatanSchema from "../yup-schema-kesehatan";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import KesehatanForm from "../KesehatanForm";

function CreatePage() {
    const router = useRouter();

    const form = useForm({
        resolver: yupResolver(kesehatanSchema),
        defaultValues: {
            nama_penyakit: "",
            penanganan: "",
            kategori: "RINGAN",
            tgl_masuk: "",
            tgl_keluar: "",
            status: "PERAWATAN",
        },
    });

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href={HREF_URL.KESEHATAN_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    data-e2e="btn-simpan"
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                >
                    Simpan
                </Button>
                <Button
                    data-e2e="btn-cancel"
                    className="md:w-36 bg-red-500  hover:bg-red-800"
                >
                    Cancel
                </Button>
            </div>
            <KesehatanForm form={form} />
        </div>
    );
}

export default CreatePage;
