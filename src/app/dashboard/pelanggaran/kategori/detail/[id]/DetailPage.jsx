"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import kategoriPelanggaranSchema from "../../yup-kategori-pelanggaran-schema";
import KategoriForm from "../../KategoriForm";

export default function DetailPage({ data }) {
    const formKategori = useForm({
        resolver: yupResolver(kategoriPelanggaranSchema),
        defaultValues: {
            nama_pelanggaran: data.nama_pelanggaran,
            kategori: data.kategori,
            jenis: data.jenis,
            poin: data.poin,
        },
    });
    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href="/dashboard/pelanggaran/kategori">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Link href={`/dashboard/pelanggaran/kategori/edit/${data.id}`}>
                    <Button
                        // onClick={onSimpanClick}
                        className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                    >
                        Edit
                    </Button>
                </Link>
            </div>
            <KategoriForm form={formKategori} disabled={true} />
        </div>
    );
}
