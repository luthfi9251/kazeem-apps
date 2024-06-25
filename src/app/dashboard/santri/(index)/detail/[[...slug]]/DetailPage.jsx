"use client";
import SantriForm from "../../SantriForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import santriSchema from "../../../yup-santri-schema";
import { useSearchParams } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import WaliSantriForm from "../../WaliSantrForm";
import ActionBarDetail from "@/components/ActionBarDetail";

export default function DetailPage(props) {
    let { data } = props;
    let params = useSearchParams();
    const formSantri = useForm({
        resolver: yupResolver(santriSchema),
        defaultValues: {
            nama_lengkap: data ? data.nama_lengkap : "",
            alamat: data ? data.alamat : "",
            nis: data ? data.nis : "",
            jenis_kel: data ? data.jenis_kel : "",
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
            <ActionBarDetail
                backLink={params.get("back") || HREF_URL.SANTRI_HOME}
                editLink={HREF_URL.SANTRI_EDIT(data.id)}
            />
            <SantriForm
                form={formSantri}
                disabled={props.mode != "edit"}
                foto={data.foto}
            />
            <WaliSantriForm
                disabled={true}
                showKelas
                dataKelas={props.dataKelas}
            />
        </div>
    );
}
