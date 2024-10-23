import DetailPage from "./DetailPage";
import JabatanDataProvider from "../../JabatanDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import prisma from "@/lib/prisma";

async function getData(id, mode) {
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

async function PageDetailPegawai(props) {
    let pegawaiId = props.params.slug[0];
    let mode = props.params.slug[1] || false;
    let data = await getData(pegawaiId, mode);

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
            <DetailPage data={data} />
        </JabatanDataProvider>
    );
}

export default withAuthAndGroupCheck(
    PageDetailPegawai,
    PAGE_NAME.KEPEGAWAIAN_KELOLA_PEGAWAI
);
