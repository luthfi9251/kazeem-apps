import prisma from "@/lib/prisma";
import EditPage from "./EditPage";

async function getData(id) {
    let data = await prisma.KategoriPelanggaran.findUnique({
        where: {
            id,
        },
    });
    return data;
}

export default async function Page(props) {
    let id = parseInt(props.params.id);
    let data = await getData(id);

    return (
        <>
            <EditPage data={data} />
        </>
    );
}
