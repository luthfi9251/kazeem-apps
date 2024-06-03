"use client";
import SantriForm from "../../SantriForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import santriSchema from "../../../yup-santri-schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WaliContext } from "../../WaliDataProvider";
import { useRouter } from "next/navigation";
import WaliSantriForm from "../../WaliSantrForm";
import { useContext } from "react";
import { editSantri, deleteSantri } from "./_actions/editSantri";
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

export default function EditSantriPage(props) {
    let { data } = props;
    const [dataWali, setWaliGroup] = useContext(WaliContext);
    const router = useRouter();
    const formSantri = useForm({
        resolver: yupResolver(santriSchema),
        defaultValues: {
            nama_lengkap: data ? data.nama_lengkap : "",
            alamat: data ? data.alamat : "",
            email: data ? data.email : "",
            hp: data ? data.hp : "",
            tempat_lahir: data ? data.tempat_lahir : "",
            tgl_lhr: data
                ? new Date(data.tgl_lhr).toISOString().split("T")[0]
                : new Date(Date.now()).toISOString().split("T")[0],
        },
    });

    const sendToServer = async (dataSantri, dataWaliSantri) => {
        const santriFormData = new FormData();

        Object.keys(dataSantri).forEach((item) => {
            if (item === "foto") {
                santriFormData.append("foto", dataSantri.foto[0]);
                return;
            }
            santriFormData.append(item, dataSantri[item]);
        });
        santriFormData.append("id", data.id);

        toast.promise(
            () => editSantri(santriFormData, dataWaliSantri, data.foto),
            {
                pending: "Menyimpan data",
                success: {
                    render({ _data }) {
                        router.push(`/dashboard/santri/detail/${data.id}`);
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

        await formSantri.trigger();

        if (formSantri.formState.isValid && dataWali.length != 0) {
            let dataSantri = formSantri.getValues();
            let dataWaliSantri = [...dataWali];
            sendToServer(dataSantri, dataWaliSantri);
        } else {
            alert("Data santri belum valid atau Data wali belum diisi!");
        }
    };

    let onDeletehandle = () => {
        toast.promise(
            () => deleteSantri(data.id, data.foto),
            {
                pending: "Menghapus data",
                success: {
                    render({ data }) {
                        router.push("/dashboard/santri");
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
                <Link href="/dashboard/santri/">
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
                <Link href={`/dashboard/santri/detail/${data.id}`}>
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
            <SantriForm form={formSantri} disabled={false} foto={data.foto} />
            <WaliSantriForm disabled={false} />
        </div>
    );
}
