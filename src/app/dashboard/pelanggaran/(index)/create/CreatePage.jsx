"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PelanggaranForm from "../PelanggaranForm";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pelanggaranSchema from "../yup-pelanggaran-schema";

export default function CreatePage({ data }) {
    const formPelanggaran = useForm({
        resolver: yupResolver(pelanggaranSchema),
        defaultValues: {
            id_santri: "",
        },
    });
    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href="/dashboard/santri/">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker">
                    Simpan
                </Button>
                <Button className="md:w-36 bg-red-500  hover:bg-red-800">
                    Cancel
                </Button>
            </div>
            <PelanggaranForm form={formPelanggaran} data={data} />
        </div>
    );
}
