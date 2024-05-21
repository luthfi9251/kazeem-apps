import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";

async function getNamaSantri() {
    let data = await prisma.Santri.findMany({
        select: {
            id: true,
            nama_lengkap: true,
        },
    });
    return data;
}

export default async function Page() {
    let namaSantri = await getNamaSantri();

    return (
        <>
            <CreatePage data={{ namaSantri }} />
        </>
    );
}
