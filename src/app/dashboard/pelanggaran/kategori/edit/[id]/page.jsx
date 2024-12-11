import prisma from "@/lib/prisma";
import EditPage from "./EditPage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.KategoriPelanggaran.findUnique({
        where: {
            id,
        },
        include: {
            Penanganan: {
                select: {
                    id: true,
                },
            },
        },
    });
    return data;
}
async function getAllPegawai() {
    let pegawai = await prisma.Pegawai.findMany({
        select: {
            id: true,
            id_pegawai: true,
            nama_pegawai: true,
        },
    });

    return pegawai;
}

async function Page(props) {
    let id = parseInt(props.params.id);
    let data = await getData(id);
    let dataPegawai = await getAllPegawai();

    return (
        <>
            <EditPage data={data} listPegawai={dataPegawai} />
        </>
    );
}

export default withAuthAndGroupCheck(
    Page,
    PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN
);
