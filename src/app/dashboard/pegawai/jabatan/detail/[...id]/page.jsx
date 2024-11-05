import prisma from "@/lib/prisma";
import JabatanDataProvider from "../../PegawaiDataProvider";
import DetailPage from "../DetailPage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.Jabatan.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            JabatanPegawai: {
                select: {
                    id: true,
                    Pegawai: {
                        select: {
                            id: true,
                            id_pegawai: true,
                            nama_pegawai: true,
                        },
                    },
                },
            },
        },
    });
    if (!data) return null;
    // data.tgl_lhr = new Date(data.tgl_lhr).toISOString().split("T")[0];
    data.JabatanPegawai = data.JabatanPegawai.map((item) => {
        return {
            id: item.id,
            id_pegawai: item.Pegawai.id_pegawai,
            pegawai_id: item.Pegawai.id,
            nama_pegawai: item.Pegawai.nama_pegawai,
        };
    });
    return data;
}

async function PageDetail(props) {
    let data = await getData(props.params.id[0]);
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
    return (
        <JabatanDataProvider data={data.JabatanPegawai}>
            <DetailPage data={data} id={props.params.id[0]} />
        </JabatanDataProvider>
    );
}

export default withAuthAndGroupCheck(
    PageDetail,
    PAGE_NAME.KEPEGAWAIAN_JABATAN_PEGAWAI
);
