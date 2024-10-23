import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getAllPegawai() {
    let dataPegawai = await prisma.Pegawai.findMany({
        select: {
            id: true,
            nama_pegawai: true,
        },
    });

    return dataPegawai.map((item) => {
        return {
            id_pegawai: item.id,
            nama_pegawai: item.nama_pegawai,
        };
    });
}

async function Page() {
    let pegawai = await getAllPegawai();
    return <CreatePage namaPegawai={pegawai} />;
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_PRESENSI);
