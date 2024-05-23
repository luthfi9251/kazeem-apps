import prisma from "@/lib/prisma";
import DetailPage from "./DetailPage";

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
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
    return (
        <>
            <DetailPage data={data} />
        </>
    );
}
