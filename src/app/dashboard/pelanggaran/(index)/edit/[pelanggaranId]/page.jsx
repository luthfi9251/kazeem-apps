import EditPage from "./EditPage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getPelanggaranDetail(id) {
    return await prisma.Pelanggaran.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            KelasSantri: {
                include: {
                    Santri: true,
                },
            },
            Kategori: true,
        },
    });
}

async function getKategoriPelanggaran() {
    let kategori = await prisma.KategoriPelanggaran.findMany({
        select: {
            id: true,
            nama_pelanggaran: true,
            jenis: true,
            kategori: true,
            poin: true,
            kelKecakapan: true,
            Penanganan: {
                select: {
                    id: true,
                },
            },
        },
    });
    return kategori;
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
    let idPelanggaran = props.params.pelanggaranId;
    let [pelanggaranDetail, kategoriPelanggaran] = await Promise.all([
        getPelanggaranDetail(idPelanggaran),
        getKategoriPelanggaran(),
    ]);
    let dataPegawai = await getAllPegawai();

    // console.log({ kategoriPelanggaran, pelanggaranDetail });

    return (
        <>
            <EditPage
                data={{
                    namaSantri: [
                        {
                            nama_lengkap:
                                pelanggaranDetail.KelasSantri.Santri
                                    .nama_lengkap,
                            id: pelanggaranDetail.KelasSantri.id,
                        },
                    ],
                    kategoriPelanggaran,
                    pelanggaranDetail,
                    idPelanggaran,
                }}
                listPegawai={dataPegawai}
            />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_PELANGGARAN);
