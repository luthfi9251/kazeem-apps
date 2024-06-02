"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PelanggaranForm from "../../PelanggaranForm";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pelanggaranSchema from "../../yup-pelanggaran-schema";
import {
    updatePelanggaran,
    deletePelanggaran,
} from "../../../_actions/pelanggaran";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
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

export default function EditPage({ data }) {
    let router = useRouter();
    let activePelanggaran = data.pelanggaranDetail;
    const formPelanggaran = useForm({
        resolver: yupResolver(pelanggaranSchema),
        defaultValues: {
            id_santri: activePelanggaran.kelassantri_id,
            nama_pelanggaran_option: activePelanggaran.kategori_id,
            nama_pelanggaran: activePelanggaran.Kategori.nama_pelanggaran,
            kategori: activePelanggaran.Kategori.kategori,
            jenis: activePelanggaran.Kategori.jenis,
            keterangan: activePelanggaran.keterangan,
            konsekuensi: activePelanggaran.konsekuensi,
            poin: activePelanggaran.Kategori.poin,
            allow_edit: false,
        },
    });

    let handleSubmit = (data) => {
        let dataPelanggaran = {
            nama_pelanggaran: data.nama_pelanggaran,
            kategori: data.kategori,
            jenis: data.jenis,
            poin: data.poin,
            keterangan: data.keterangan,
            konsekuensi: data.konsekuensi,
        };
        toast.promise(
            () =>
                updatePelanggaran(activePelanggaran.id, {
                    dataPelanggaran,
                    isCreateNewKategori: data.allow_edit,
                    kategoriPelanggaranId: data.nama_pelanggaran_option,
                }),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.PELANGGARAN_HOME);
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

    let onDeleteHandler = () => {
        toast.promise(
            () => deletePelanggaran(activePelanggaran.id),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.PELANGGARAN_HOME);
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
    let handleSimpan = () => {
        formPelanggaran.handleSubmit(handleSubmit)();
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href={HREF_URL.PELANGGARAN_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                    onClick={handleSimpan}
                    data-e2e="btn-simpan"
                >
                    Simpan
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            data-e2e="btn-delete"
                            className="text-white md:w-36 bg-red-500 justify-items-end hover:bg-red-800"
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
                                data-e2e="btn-confirm"
                                onClick={onDeleteHandler}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <PelanggaranForm form={formPelanggaran} data={data} edit />
        </div>
    );
}
