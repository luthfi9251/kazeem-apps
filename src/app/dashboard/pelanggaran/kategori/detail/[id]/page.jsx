import prisma from "@/lib/prisma";
import DetailPage from "./DetailPage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.KategoriPelanggaran.findUnique({
        where: {
            id,
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
    const listPegawai = await getAllPegawai();
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
    return (
        <>
            <DetailPage data={data} listPegawai={listPegawai} />
        </>
    );
}

export default withAuthAndGroupCheck(
    Page,
    PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN
);
