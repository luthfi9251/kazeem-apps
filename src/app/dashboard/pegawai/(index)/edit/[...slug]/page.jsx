import prisma from "@/lib/prisma";
import JabatanDataProvider from "../../JabatanDataProvider";
import getAllJabatan from "../../../_actions/getAllJabatan";
import EditPegawaiPage from "./EditPegawai";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.Pegawai.findUnique({
        where: { id: parseInt(id) },
        include: {
            JabatanPegawai: {
                select: {
                    Jabatan: true,
                },
            },
        },
    });

    return data;
}

async function getAllData() {
    let jabatanData = await getAllJabatan();
    return jabatanData;
}

async function PageEdit(props) {
    let listJabatan = await getAllData();
    let { params } = props;
    let data = await getData(params.slug[0]);
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
    let JabatanPegawai = data.JabatanPegawai.map((item) => {
        return {
            id: item.Jabatan.id,
            nama_jabatan: item.Jabatan.nama_jabatan,
        };
    });

    return (
        <JabatanDataProvider data={JabatanPegawai}>
            <EditPegawaiPage data={data} listJabatan={listJabatan}/>
        </JabatanDataProvider>
    );
}

export default withAuthAndGroupCheck(
    PageEdit,
    PAGE_NAME.KEPEGAWAIAN_KELOLA_PEGAWAI
);

