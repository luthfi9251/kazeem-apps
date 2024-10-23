"use client";
import PegawaiForm from "../../PegawaiForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pegawaiSchema from "../../../yup-pegawai-schema";
import { useSearchParams } from "next/navigation";
import { HREF_URL } from "@/navigation-data";
import ActionBarDetail from "@/components/ActionBarDetail";
import JabatanPegawaiForm from "../../JabatanPegawaiForm";

export default function DetailPage(props) {
    let { data } = props;
    let params = useSearchParams();
    const formPegawai = useForm({
        resolver: yupResolver(pegawaiSchema),
        defaultValues: {
            nama_pegawai: data ? data.nama_pegawai : "",
            alamat: data ? data.alamat : "",
            jenis_kel: data ? data.jenis_kel : "",
            email: data ? data.email : "",
            no_telp: data ? data.no_telp : "",
            tempat_lahir: data ? data.tempat_lahir : "",
            tgl_lhr: data
                ? new Date(data.tgl_lhr).toISOString().split("T")[0]
                : new Date(Date.now()),
        },
    });
    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <ActionBarDetail
                backLink={params.get("back") || HREF_URL.PEGAWAI_HOME}
                editLink={HREF_URL.PEGAWAI_EDIT(data.id)}
            />
            <PegawaiForm
                form={formPegawai}
                disabled={props.mode != "edit"}
            />
            <JabatanPegawaiForm
                disabled={true}
            />
        </div>
    );
}
