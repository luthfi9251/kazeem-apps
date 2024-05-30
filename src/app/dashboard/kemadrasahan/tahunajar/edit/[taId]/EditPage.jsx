"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import taSchema from "../../yup-tahunajar-schema";
import TahunAjarForm from "../../create/TahunAjarForm";
import { editTahunAjar, deleteTahunAjar } from "../../../_actions/tahunajar";
import { toast } from "react-toastify";
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

    const form = useForm({
        resolver: yupResolver(taSchema),
        defaultValues: {
            kode_ta: data?.kode_ta,
            tgl_mulai: new Date(data?.tgl_mulai).toISOString().split("T")[0],
            tgl_selesai: new Date(data?.tgl_selesai)
                .toISOString()
                .split("T")[0],
            aktif: data?.aktif,
        },
    });

    const onSubmitHandler = (dataForm) => {
        toast.promise(
            () => editTahunAjar({ ...dataForm, idTa: data.id }),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KEMADRASAHAN_TA_HOME);
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

    const onDeleteHandler = () => {
        toast.promise(
            () => deleteTahunAjar({ idTa: data.id }),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KEMADRASAHAN_TA_HOME);
                        return "Data berhasil dihapus";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        console.log(data);
                        return `${data.message}`;
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
                <Link href={HREF_URL.KEMADRASAHAN_TA_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            data-e2e="btn-delete"
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
                            <AlertDialogAction
                                onClick={onDeleteHandler}
                                data-e2e="btn-confirm"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <TahunAjarForm
                form={form}
                onSubmit={onSubmitHandler}
                title={"Edit Tahun Ajar"}
            />
        </div>
    );
}
