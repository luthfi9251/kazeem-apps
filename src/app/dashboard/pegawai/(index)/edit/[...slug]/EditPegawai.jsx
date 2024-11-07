"use client";
import PegawaiForm from "../../PegawaiForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pegawaiSchema from "../../../yup-pegawai-schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JabatanContext } from "../../JabatanDataProvider";
import { useRouter } from "next/navigation";
import JabatanPegawaiForm from "../../JabatanPegawaiForm";
import { useContext } from "react";
import { editPegawai, deletePegawai } from "./_actions/editPegawai";
import { toast } from "react-toastify";
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

export default function EditPegawaiPage(props) {
    let { data, listJabatan } = props;
    const [dataJabatan, setJabatanGroup] = useContext(JabatanContext);
    const router = useRouter();
    const formPegawai = useForm({
        resolver: yupResolver(pegawaiSchema),
        defaultValues: {
            nama_pegawai: data ? data.nama_pegawai : "",
            email: data ? data.email : "",
            jenis_kel: data ? data.jenis_kel : "",
            no_telp: data ? data.no_telp : "",
            tempat_lahir: data ? data.tempat_lahir : "",
            tgl_lhr: data
                ? new Date(data.tgl_lhr).toISOString().split("T")[0]
                : new Date(Date.now()).toISOString().split("T")[0],
        },
    });

    const sendToServer = async (dataPegawai, dataJabatanPegawai) => {
        const pegawaiFormData = new FormData();
        
        Object.keys(dataPegawai).forEach((item) => {
            pegawaiFormData.append(item, dataPegawai[item]); // Tambahkan data pegawai
        });

        pegawaiFormData.append("id", data.id);

        toast.promise(
            () => editPegawai(pegawaiFormData, dataJabatanPegawai),
            {
                pending: "Menyimpan data",
                success: {
                    render(res) {
                        if (res.data.isError) {
                            throw res.data.error;
                        }
                        router.push(`/dashboard/pegawai/detail/${data.id}`);
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

    const onSubmitBothForms = async () => {
        /* manual trigger form
            1. tringger validation
            2. ketika lolos atau tidak ada error, ambil value
            3. submit ke server
        */

        await formPegawai.trigger();

        if (formPegawai.formState.isValid && dataJabatan.length != 0) {
            let dataPegawai = formPegawai.getValues();
            let dataJabatanPegawai = [...dataJabatan];
            sendToServer(dataPegawai, dataJabatanPegawai);
        } else {
            alert("Data pegawai belum valid atau Data jabatan belum diisi!");
        }
    };

    let onDeletehandle = () => {
        toast.promise(
            () => deletePegawai(data.id),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        router.push("/dashboard/pegawai");
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

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 md:col-span-2 col-span-1">
                <Link href="/dashboard/pegawai/">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    onClick={onSubmitBothForms}
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                >
                    Simpan
                </Button>
                <Link href={`/dashboard/pegawai/detail/${data.id}`}>
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
                            className="md:w-36 bg-red-500 justify-items-end hover:bg-red-800"
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
            <PegawaiForm form={formPegawai} disabled={false}/>
            <JabatanPegawaiForm disabled={false} listJabatan={listJabatan}/>
        </div>
    );
}
