"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import kategoriPelanggaranSchema from "../../yup-kategori-pelanggaran-schema";
import KategoriForm from "../../KategoriForm";
import { editKategoriPelanggaran } from "../../../_actions/kategori";

export default function EditPage({ data }) {
    let id = data.id;
    const formKategori = useForm({
        resolver: yupResolver(kategoriPelanggaranSchema),
        defaultValues: {
            nama_pelanggaran: data.nama_pelanggaran,
            kategori: data.kategori,
            jenis: data.jenis,
            poin: data.poin,
        },
    });

    let onSimpanClick = () => {
        formKategori.handleSubmit(onSubmit)();
    };

    let onSubmit = (data) => {
        toast.promise(
            () => editKategoriPelanggaran(id, data),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        // router.push("/dashboard/santri");
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

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href="/dashboard/pelanggaran/kategori">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    onClick={onSimpanClick}
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                >
                    Simpan
                </Button>
                <Button className="md:w-36 bg-red-500  hover:bg-red-800">
                    Cancel
                </Button>
            </div>
            <KategoriForm form={formKategori} />
        </div>
    );
}
