"use client";
import JabataPegawaiFormExpanded from "../JabatanPegawaiFormExpanded";
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
import { saveEditWaliSantri } from "../_actions/jabatanpegawai";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import PegawaiListForm from "../PegawaiListForm";

export default function DetailPage(props) {
    let jabatan = props.data;
    let id = props.id;
    let searchParams = useSearchParams();
    let router = useRouter();
    let DISABLED = true;
    let [dataPegawai, setDataPegawai] = useContext(PegawaiContext);
    const form = useForm({
        resolver: yupResolver(JabatanPegawaiSchema),
        defaultValues: {
            nama_jabatan: jabatan ? jabatan.nama_jabatan : "",
        },
    });

    const onSubmit = async () => {
        // console.log(dataPegawai);
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 md:col-span-2 col-span-1">
                <Link
                    href={
                        searchParams.get("back") ||
                        HREF_URL.PEGAWAI_JABATAN_HOME
                    }
                >
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Link href={`/dashboard/pegawai/jabatan/edit/${id}`}>
                    <Button
                        variant="outline"
                        className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker text-white"
                    >
                        Edit
                    </Button>
                </Link>
            </div>
            <JabataPegawaiFormExpanded
                form={form}
                onSubmit={onSubmit}
                disabled={DISABLED}
            />
            <PegawaiListForm disabled={DISABLED} />
        </div>
    );
}
