"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import kesehatanSchema from "../yup-schema-kesehatan";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import KesehatanForm from "../KesehatanForm";
import { addDataKesehatan } from "../../_actions/kesehatan";
import ActionBarCreate from "@/components/ActionBarCreate";

function CreatePage({ namaSantri }) {
    const router = useRouter();

    const form = useForm({
        resolver: yupResolver(kesehatanSchema),
        defaultValues: {
            nama_penyakit: "",
            penanganan: "",
            kategori: "RINGAN",
            tgl_masuk: new Date().toISOString().split("T")[0],
            tgl_keluar: "",
            status: "PERAWATAN",
        },
    });

    let onSimpanHandler = (data) => {
        let kesehatan = {
            kelas_santri_id: data.id_santri,
            nama_penyakit: data.nama_penyakit,
            penanganan: data.penanganan,
            kategori: data.kategori,
            tgl_masuk: new Date(data.tgl_masuk).toISOString(),
            tgl_keluar: data.tgl_keluar
                ? new Date(data.tgl_keluar).toISOString()
                : null,
            status: data.status,
        };

        toast.promise(
            () => addDataKesehatan(kesehatan),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.KESEHATAN_HOME);
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

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <ActionBarCreate
                backLink={HREF_URL.KESEHATAN_HOME}
                handleSimpan={() => form.handleSubmit(onSimpanHandler)()}
            />
            <KesehatanForm form={form} namaSantri={namaSantri} mode="CREATE" />
        </div>
    );
}

export default CreatePage;
