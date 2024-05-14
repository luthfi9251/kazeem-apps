"use client";
import WaliSantriFormExpanded from "../WaliSantriFormExpanded";
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
import PeranView from "../PeranView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import waliSantriSchema from "../../yup-wali-santri-schema";
import { PerwalianContext } from "../PerwalianDataProvider";
import { useContext } from "react";
import { saveEditWaliSantri, deleteWaliSantri } from "../_actions/walisantri";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditPage(props) {
    let wali = props.data;
    let id = props.id;

    let router = useRouter();
    let DISABLED = false;
    let [dataPerwalian, setDataPerwalian] = useContext(PerwalianContext);
    const form = useForm({
        resolver: yupResolver(waliSantriSchema),
        defaultValues: {
            nama_wali: wali ? wali.nama_wali : "",
            tgl_lhr: wali ? wali.tgl_lhr : "",
            email: wali.email || "",
            hp: wali ? wali.hp : "",
        },
    });

    const saveToServer = (id, wali, perwalian) => {
        toast.promise(
            () => saveEditWaliSantri(id, wali, perwalian),
            {
                pending: "Menyimpan data",
                success: {
                    render({ _data }) {
                        router.push(`/dashboard/santri/wali`);
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
        // console.log(dataPerwalian);
        await form.trigger();
        if (form.formState.isValid) {
            let dataWali = form.getValues();
            saveToServer(id, dataWali, dataPerwalian);
        } else {
            alert("Data santri belum valid atau Data wali belum diisi!");
        }
    };

    const onDeletehandle = async () => {
        toast.promise(
            () => deleteWaliSantri(id),
            {
                pending: "Menghapus data",
                success: {
                    render({ _data }) {
                        router.push(`/dashboard/santri/wali`);
                        return "Data berhasil dihapus";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `Kesalahan saat menghapus data, pastikan wali tidak memiliki perwalian!`;
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
                <Link href="/dashboard/santri/wali">
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
                <Link href={`/dashboard/santri/wali/detail/${id}`}>
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
            <WaliSantriFormExpanded form={form} onSubmit={onSubmit} />
            <PeranView disabled={DISABLED} data={wali.WaliSantri} />
        </div>
    );
}
