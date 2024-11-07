"use client";
import PegawaiForm from "../PegawaiForm";
import JabatanPegawaiForm from "../JabatanPegawaiForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pegawaiSchema from "../../yup-pegawai-schema";
import { addPegawai } from "./_actions/addPegawai";
import { toast } from "react-toastify";
import { JabatanContext } from "../JabatanDataProvider";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import AlertAddAnotherData from "@/components/AlertAddAnotherData";

function PageCreatePegawai({ listJabatan }) {
    const user = null;
    const [dataJabatan, setJabatanGroup] = useContext(JabatanContext);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();

    const formPegawai = useForm({
        resolver: yupResolver(pegawaiSchema),
        defaultValues: {
            nama_pegawai: "",
            jenis_kel: "LAKI_LAKI",
            email: "",
            no_telp: "",
            tempat_lahir: "",
            tgl_lhr: new Date(Date.now()),
        },
    });

    const afterSuccessAction = {
        onYes: () => {
            // formPegawai.reset();
            window.location.reload();
            // setWaliGroup([]);
        },
        onNo: () => {
            router.push("/dashboard/pegawai");
        },
    };

    const sendToServer = async (dataPegawai, dataJabatanPegawai) => {
        const pegawaiFormData = new FormData();

        Object.keys(dataPegawai).forEach((item) => {
            pegawaiFormData.append(item, dataPegawai[item]);
        });

        toast.promise(
            () => addPegawai(pegawaiFormData, dataJabatanPegawai),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        setOpenDialog(true);
                        // router.push("/dashboard/pegawai");
                        return "Data berhasil disimpan";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);
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

    return (
        <>
            <AlertAddAnotherData
                open={openDialog}
                openChange={setOpenDialog}
                successAction={afterSuccessAction}
            />
            <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex gap-2 col-span-1 md:col-span-2">
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
                    <Button className="md:w-36 bg-red-500  hover:bg-red-800">
                        Cancel
                    </Button>
                </div>
                <PegawaiForm form={formPegawai} />
                <JabatanPegawaiForm
                    allowDetail={false}
                    listJabatan={listJabatan}
                />
            </div>
        </>
    );
}

export default PageCreatePegawai;
