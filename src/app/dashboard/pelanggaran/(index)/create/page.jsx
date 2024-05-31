import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";

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

export default async function Page() {
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
