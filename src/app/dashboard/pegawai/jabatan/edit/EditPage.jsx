"use client";
import JabatanPegawaiFormExpanded from "../JabatanPegawaiFormExpanded";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import JabatanPegawaiSchema from "../../yup-jabatan-pegawai-schema";
import { PegawaiContext } from "../PegawaiDataProvider";
import { useContext } from "react";
import { saveEditJabatanPegawai, deleteJabatanPegawai } from "../_actions/jabatanpegawai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PegawaiListForm from "../PegawaiListForm";

export default function EditPage(props) {
    let jabatan = props.data;
    let id = props.id;

    let router = useRouter();
    let DISABLED = false;
    let ENABLED = true;
    let [dataJabatanPegawai, setDataJabatanPegawai] = useContext(PegawaiContext);
    const form = useForm({
        resolver: yupResolver(JabatanPegawaiSchema),
        defaultValues: {
            nama_jabatan: jabatan ? jabatan.nama_jabatan : "",
        },
    });

    const saveToServer = (id, jabatan, dataJabatanPegawai) => {
        toast.promise(
            () => saveEditJabatanPegawai(id, jabatan, dataJabatanPegawai),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(`/dashboard/pegawai/jabatan`);
                        return "Data berhasil disimpan";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `${data.message}`;
                    },
                },
            },
            {
                position: "bottom-right",
            }
        );
    };

    const onSubmit = async () => {

        await form.trigger();
        if (form.formState.isValid) {
            let dataJabatan = form.getValues();
            saveToServer(id, dataJabatan, dataJabatanPegawai);
        } else {
            alert("Data pegawai belum valid atau Data jabatan belum diisi!");
        }
    };

    const onDeletehandle = async () => {
        toast.promise(
            () => deleteJabatanPegawai(id),
            {
                pending: "Menghapus data",
                success: {
                    render({ _data }) {
                        router.push(`/dashboard/pegawai/jabatan`);
                        return "Data berhasil dihapus";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `Kesalahan saat menghapus data, pastikan pegawai tidak terkait data jabatan!`;
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
            <div className="flex gap-2 md:col-span-2 col-span-1">
                <Link href="/dashboard/pegawai/jabatan">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    onClick={onSubmit}
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                >
                    Simpan
                </Button>
                <Link href={`/dashboard/pegawai/jabatan/detail/${id}`}>
                    <Button
                        variant="outline"
                        className="md:w-36 border-kazeem-primary"
                    >
                        Cancel
                    </Button>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
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
                            <AlertDialogAction onClick={onDeletehandle}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <JabatanPegawaiFormExpanded form={form} onSubmit={onSubmit} />
            <PegawaiListForm disabled={ENABLED} />
        </div>
    );
}
