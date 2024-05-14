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
import { saveEditWaliSantri } from "../_actions/walisantri";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DetailPage(props) {
    let wali = props.data;
    let id = props.id;

    let router = useRouter();
    let DISABLED = true;
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

    const onSubmit = async () => {
        // console.log(dataPerwalian);
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 md:col-span-2 col-span-1">
                <Link href="/dashboard/santri/wali">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Link href={`/dashboard/santri/wali/edit/${id}`}>
                    <Button
                        variant="outline"
                        className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker text-white"
                    >
                        Edit
                    </Button>
                </Link>
            </div>
            <WaliSantriFormExpanded
                form={form}
                onSubmit={onSubmit}
                disabled={DISABLED}
            />
            <PeranView disabled={DISABLED} />
        </div>
    );
}
