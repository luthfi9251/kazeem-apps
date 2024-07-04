import prisma from "@/lib/prisma";
import DetailPage from "./DetailPage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.KategoriPelanggaran.findUnique({
        where: {
            id,
        },
    });
    return data;
}

async function Page(props) {
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

export default withAuthAndGroupCheck(
    Page,
    PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN
);
