import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";

async function getAllSantri() {
    let namaSantri = await prisma.Santri.findMany({
        select: {
            id: true,
            nama_lengkap: true,
        },
    });
    return namaSantri;
}

export default async function Page() {
    let santri = await getAllSantri();
    return <CreatePage namaSantri={santri} />;
}
