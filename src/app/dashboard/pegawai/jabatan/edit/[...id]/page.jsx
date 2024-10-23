import EditPage from "../EditPage";
import prisma from "@/lib/prisma";
import JabatanDataProvider from "../../PegawaiDataProvider";
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
            pegawai_id: item.Pegawai.id,
            nama_pegawai: item.Pegawai.nama_pegawai,
        };
    });
    return data;
}

async function PageEdit(props) {
    let data = await getData(props.params.id[0]);
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
    return (
        <JabatanDataProvider data={data.JabatanPegawai}>
            <EditPage data={data} id={props.params.id[0]} />
        </JabatanDataProvider>
    );
}

export default withAuthAndGroupCheck(
    PageEdit,
    PAGE_NAME.KEPEGAWAIAN_JABATAN_PEGAWAI
);
