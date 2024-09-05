"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PelanggaranForm from "../PelanggaranForm";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pelanggaranSchema from "../yup-pelanggaran-schema";
import { addPelanggaran } from "../../_actions/pelanggaran";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import AlertAddAnotherData from "@/components/AlertAddAnotherData";
import { useState } from "react";
import { checkFormatAllowedByFileName } from "@/lib/utils";

export default function CreatePage({ data }) {
    let router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const formPelanggaran = useForm({
        resolver: yupResolver(pelanggaranSchema),
        defaultValues: {
            id_santri: "",
            nama_pelanggaran: "",
            kategori: "",
            jenis: "",
            keterangan: "",
            konsekuensi: "",
            poin: 0,
            allow_add: false,
            send_notification: false,
        },
    });

    let handleSubmit = (data) => {
        const ALLOWED_FILE = [
            "jpeg",
            "jpg",
            "png",
            "pdf",
            "doc",
            "docx",
            "zip",
        ];
        let useFile = false;
        let fileFormData = new FormData();
        let dataPelanggaran = {
            nama_pelanggaran: data.nama_pelanggaran,
            kategori: data.kategori,
            jenis: data.jenis,
            poin: data.poin,
            keterangan: data.keterangan,
            konsekuensi: data.konsekuensi,
        };

        if (data.file_penunjang) {
            if (
                checkFormatAllowedByFileName(
                    data.file_penunjang.name,
                    ALLOWED_FILE
                )
            ) {
                useFile = true;
                fileFormData.set("file", data.file_penunjang);
            } else {
                toast.error(
                    "Format file berkas penunjang tidak diperbolehkan!",
                    {
                        position: "bottom-right",
                    }
                );
                return;
            }
        }

        toast.promise(
            () =>
                addPelanggaran(
                    {
                        dataPelanggaran,
                        isCreateNewKategori: data.allow_add,
                        kelasSantriId: data.id_santri,
                        pelanggaranId: data.nama_pelanggaran_option,
                    },
                    useFile ? fileFormData : null
                ),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        setOpenDialog(true);
                        // router.push(HREF_URL.PELANGGARAN_HOME);
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

    let handleSimpan = () => {
        formPelanggaran.handleSubmit(handleSubmit)();
    };

    const afterSuccessAction = {
        onYes: () => {
            formPelanggaran.reset();
        },
        onNo: () => {
            router.push(HREF_URL.PELANGGARAN_HOME);
        },
    };

    return (
        <>
            <AlertAddAnotherData
                open={openDialog}
                openChange={setOpenDialog}
                successAction={afterSuccessAction}
            />
            <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex gap-2 col-span-1 md:col-span-2">
                    <Link href={HREF_URL.PELANGGARAN_HOME}>
                        <Button variant="outline" className="mr-3">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <Button
                        className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                        data-e2e="btn-simpan"
                        onClick={handleSimpan}
                    >
                        Simpan
                    </Button>
                </div>
                <PelanggaranForm form={formPelanggaran} data={data} />
            </div>
        </>
    );
}
