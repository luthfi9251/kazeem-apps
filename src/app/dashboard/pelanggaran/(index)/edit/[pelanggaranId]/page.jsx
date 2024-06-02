import EditPage from "./EditPage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

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
        },
    });
    return kategori;
}

async function Page(props) {
    let idPelanggaran = props.params.pelanggaranId;
    let [pelanggaranDetail, kategoriPelanggaran] = await Promise.all([
        getPelanggaranDetail(idPelanggaran),
        getKategoriPelanggaran(),
    ]);

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
            />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_PELANGGARAN_PAGE);
