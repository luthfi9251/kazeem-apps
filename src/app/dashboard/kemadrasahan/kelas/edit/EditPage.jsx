"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CardDataKelas from "./CardDataKelas";
import CardDetailSiswa from "./CardDaftarSiswa";
import CardTahunAjar from "./CardTahunAjar";
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
import { deleteKelas } from "../../_actions/kelas";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditPage({ dataKelas, dataTA }) {
    let router = useRouter();
    let onDeleteHandler = () => {
        toast.promise(
            () => deleteKelas({ idKelas: dataKelas.id }),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KEMADRASAHAN_KELAS_HOME);
                        return "Data berhasil dihapus";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `Gagal menghapus data, pastikan Kelas tidak memiliki siswa!`;
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
                <Link href={HREF_URL.KEMADRASAHAN_KELAS_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            data-e2e="btn-delete"
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
                                data-e2e="btn-confirm"
                                onClick={onDeleteHandler}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <Card className=" col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>{dataKelas.nama_kelas}</CardTitle>
                    <CardDescription>
                        Hanya dapat mengedit kelas pada TA Aktif saja
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <CardDataKelas dataKelas={dataKelas} dataTA={dataTA} />
                    <CardTahunAjar dataKelas={dataKelas} />
                    <CardDetailSiswa dataKelas={dataKelas} dataTA={dataTA} />
                </CardContent>
            </Card>
        </div>
    );
}
