"use client";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { KelasContext } from "./KelasDataProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import KelasForm from "./KelasForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import kelasSchema from "./yup-kelas-schema";
import KelasTable from "./KelasTable";
import AlertNoneKelasInserted from "./AlertNoneKelasInserted";
import AlertUnsavedKelas from "./AlertUnsavedKelas";
import { addKelas } from "../_actions/kelas";

export default function CreatePage() {
    let [kelas, setKelas] = useContext(KelasContext);
    let [alertZeroKelas, setAlertZeroKelas] = useState(false);
    let [alertUnsavedKelas, setAlertUnsavedKelas] = useState(false);
    let [isTaAktif, setIsTaAktif] = useState(true);
    let router = useRouter();

    const formKelas = useForm({
        resolver: yupResolver(kelasSchema),
        defaultValues: {
            tingkatan_kelas: "",
            paralel_kelas: "",
        },
    });

    let generateKelas = (tingkatan, paralel, ta) => {
        let tingkatanSplitted = tingkatan.split(",");
        let paralelSplitted = paralel.split(",");

        let result = [];
        tingkatanSplitted.forEach((item) => {
            paralelSplitted.forEach((item2) => {
                let kelas = {
                    tingkatan: item,
                    paralel: item2,
                    ta,
                };

                result.push(kelas);
            });
        });
        return result;
    };

    const onSubmitHandler = (data) => {
        let kelas = generateKelas(data.tingkatan_kelas, data.paralel_kelas, {
            mulai: data.tahun_ajaran_mulai,
            selesai: data.tahun_ajaran_selesai,
        });
        // console.log({ kelas, data });
        setKelas(kelas);
        setIsTaAktif(data.aktif);
    };

    const saveHandler = (data) => {
        toast.promise(
            () => addKelas(data, isTaAktif),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        // router.push("/dashboard/kemadrasahan/kelas");
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
        // router.push("/dashboard/kemadrasahan/kelas");
        return;
    };

    const redirectToTable = () => {
        router.push("/dashboard/kemadrasahan/kelas");
        return;
    };

    const onSimpanCLick = () => {
        if (kelas.length < 1) {
            setAlertZeroKelas(true);
            return;
        }
        saveHandler(kelas);
    };
    const onCancelClick = () => {
        if (kelas.length > 0) {
            setAlertUnsavedKelas(true);
            return;
        }
        redirectToTable();
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href="/dashboard/kemadrasahan/kelas">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    onClick={onSimpanCLick}
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                    data-e2e="btn-simpan"
                >
                    Simpan
                </Button>
                <Button
                    className="md:w-36 border-kazeem-primary hover:bg-slate-200"
                    variant="outline"
                    onClick={onCancelClick}
                >
                    Cancel
                </Button>
            </div>
            <KelasForm form={formKelas} onSubmit={onSubmitHandler} />
            <KelasTable />
            <AlertNoneKelasInserted
                open={alertZeroKelas}
                onOpenChange={setAlertZeroKelas}
            />
            <AlertUnsavedKelas
                open={alertUnsavedKelas}
                onOpenChange={setAlertUnsavedKelas}
                onSimpanClick={saveHandler}
                onCancelAction={redirectToTable}
            />
        </div>
    );
}
