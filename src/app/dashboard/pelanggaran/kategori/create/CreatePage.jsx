"use client";
import { useForm } from "react-hook-form";
import kategoriPelanggaranSchema from "../yup-kategori-pelanggaran-schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import KategoriForm from "../KategoriForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { addKategoriPelanggaran } from "../../_actions/kategori";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertAddAnotherData from "@/components/AlertAddAnotherData";

export default function CreatePage({ listPegawai }) {
    let router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const formKategori = useForm({
        resolver: yupResolver(kategoriPelanggaranSchema),
        defaultValues: {
            nama_pelanggaran: "",
            kategori: "RINGAN",
            jenis: "",
            poin: 0,
            kelKecakapan: "",
            penangan: "",
            konsekuensi: "",
        },
    });

    let onSimpanClick = () => {
        formKategori.handleSubmit(onSubmit)();
    };

    let onSubmit = (data) => {
        toast.promise(
            () => addKategoriPelanggaran(data),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
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
            formKategori.reset();
            // window.location.reload();
            // setWaliGroup([]);
        },
        onNo: () => {
            router.push("/dashboard/pelanggaran/kategori");
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
                <div className="flex gap-2 col-span-1 md:col-span-2">
                    <Link href="/dashboard/pelanggaran/kategori">
                        <Button variant="outline" className="mr-3">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <Button
                        onClick={onSimpanClick}
                        className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                        data-e2e="btn-simpan"
                    >
                        Simpan
                    </Button>
                    <Link href={`/dashboard/pelanggaran/kategori`}>
                        <Button
                            className="md:w-36 border-kazeem-primary hover:bg-slate-200"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </Link>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <KategoriForm
                        form={formKategori}
                        listPegawai={listPegawai}
                    />
                </div>
            </div>
        </>
    );
}
