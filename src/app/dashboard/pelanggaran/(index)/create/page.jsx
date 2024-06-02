import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

async function getNamaSantri() {
    let dataSantri = await prisma.KelasSantri.findMany({
        where: {
            TahunAjar: {
                aktif: true,
            },
        },
        select: {
            id: true,
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
        },
    });

    return dataSantri.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.Santri.nama_lengkap,
        };
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

async function Page() {
    let [namaSantri, kategoriPelanggaran] = await Promise.all([
        getNamaSantri(),
        getKategoriPelanggaran(),
    ]);

    return (
        <>
            <CreatePage data={{ namaSantri, kategoriPelanggaran }} />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_PELANGGARAN_PAGE);
