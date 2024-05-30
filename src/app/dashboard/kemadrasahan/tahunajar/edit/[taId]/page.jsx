import EditPage from "./EditPage";
import prisma from "@/lib/prisma";

async function getData(taId) {
    return await prisma.TahunAjar.findUnique({
        where: {
            id: parseInt(taId),
        },
    });
}

export default async function Page({ params }) {
    let data = await getData(params.taId);
    return <EditPage data={data} />;
}
