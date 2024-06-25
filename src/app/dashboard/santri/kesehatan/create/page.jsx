import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";

async function getAllSantri() {
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

export default async function Page() {
    let santri = await getAllSantri();
    return <CreatePage namaSantri={santri} />;
}
