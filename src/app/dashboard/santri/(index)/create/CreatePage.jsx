"use client";
import SantriForm from "../SantriForm";
import WaliSantriForm from "../WaliSantrForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import santriSchema from "../../yup-santri-schema";
import { addSantri } from "./_actions/addSantri";
import { toast } from "react-toastify";
import { WaliContext } from "../WaliDataProvider";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import AlertAddAnotherData from "@/components/AlertAddAnotherData";

function PageCreateSantri() {
    const user = null;
    const [dataWali, setWaliGroup] = useContext(WaliContext);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();

    const formSantri = useForm({
        resolver: yupResolver(santriSchema),
        defaultValues: {
            nama_lengkap: "",
            nis: "",
            jenis_kel: "LAKI_LAKI",
            alamat: "",
            email: "",
            hp: "",
            tempat_lahir: "",
            tgl_lhr: new Date(Date.now()),
        },
    });

    const afterSuccessAction = {
        onYes: () => {
            // formSantri.reset();
            window.location.reload();
            // setWaliGroup([]);
        },
        onNo: () => {
            router.push("/dashboard/santri");
        },
    };

    const sendToServer = async (dataSantri, dataWaliSantri) => {
        const santriFormData = new FormData();

        Object.keys(dataSantri).forEach((item) => {
            if (item === "foto") {
                santriFormData.append("foto", dataSantri.foto[0]);
                return;
            }
            santriFormData.append(item, dataSantri[item]);
        });

        toast.promise(
            () => addSantri(santriFormData, dataWaliSantri),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        setOpenDialog(true);
                        // router.push("/dashboard/santri");
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

        await formSantri.trigger();

        if (formSantri.formState.isValid && dataWali.length != 0) {
            let dataSantri = formSantri.getValues();
            // console.log(dataSantri);
            let dataWaliSantri = [...dataWali];
            sendToServer(dataSantri, dataWaliSantri);
        } else {
            alert("Data santri belum valid atau Data wali belum diisi!");
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
                    <Button className="md:w-36 bg-red-500  hover:bg-red-800">
                        Cancel
                    </Button>
                </div>
                <SantriForm form={formSantri} />
                <WaliSantriForm allowDetail={false} />
            </div>
        </>
    );
}

export default PageCreateSantri;
