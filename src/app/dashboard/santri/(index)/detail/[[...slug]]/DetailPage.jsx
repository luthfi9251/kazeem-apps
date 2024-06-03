"use client";
import SantriForm from "../../SantriForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import santriSchema from "../../../yup-santri-schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WaliSantriForm from "../../WaliSantrForm";

export default function DetailPage(props) {
    let { data } = props;
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
                : new Date(Date.now()),
        },
    });
    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 md:col-span-2 col-span-1">
                <Link href="/dashboard/santri/">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Link href={`/dashboard/santri/edit/${data.id}`}>
                    <Button
                        // onClick={onSubmitBothForms}
                        className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker text-white"
                    >
                        Edit
                    </Button>
                </Link>
            </div>
            <SantriForm
                form={formSantri}
                disabled={props.mode != "edit"}
                foto={data.foto}
            />
            <WaliSantriForm disabled={true} />
        </div>
    );
}
