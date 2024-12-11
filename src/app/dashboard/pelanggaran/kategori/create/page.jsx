import CreatePage from "./CreatePage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import prisma from "@/lib/prisma";
import { PAGE_NAME } from "@/variables/page-name";

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

async function Page() {
    let dataPegawai = await getAllPegawai();
    return (
        <>
            <CreatePage listPegawai={dataPegawai} />
        </>
    );
}

export default withAuthAndGroupCheck(
    Page,
    PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN
);
