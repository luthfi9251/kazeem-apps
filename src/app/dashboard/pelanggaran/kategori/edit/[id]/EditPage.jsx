"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import kategoriPelanggaranSchema from "../../yup-kategori-pelanggaran-schema";
import KategoriForm from "../../KategoriForm";
import {
    editKategoriPelanggaran,
    deleteKategoriPelanggaran,
} from "../../../_actions/kategori";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EditPage({ data, listPegawai }) {
    let id = data.id;
    let router = useRouter();
    const formKategori = useForm({
        resolver: yupResolver(kategoriPelanggaranSchema),
        defaultValues: {
            nama_pelanggaran: data.nama_pelanggaran,
            kategori: data.kategori,
            jenis: data.jenis,
            poin: data.poin,
            kelKecakapan: data.kelKecakapan,
            penangan: data.Penanganan.id,
            konsekuensi: data.konsekuensi,
        },
    });

    let onDeletehandle = () => {
        toast.promise(
            () => deleteKategoriPelanggaran(id),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push("/dashboard/pelanggaran/kategori");
                        return "Data berhasil dihapus";
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
                        router.push("/dashboard/pelanggaran/kategori");
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
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="text-white md:w-36 bg-red-500 justify-items-end hover:bg-red-800"
                            data-e2e="btn-delete"
                        >
                            Hapus
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onDeletehandle}
                                data-e2e="btn-confirm"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <KategoriForm form={formKategori} listPegawai={listPegawai} />
        </div>
    );
}
