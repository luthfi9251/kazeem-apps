import prisma from "@/lib/prisma";
import EditPage from "./EditPage";
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

    return (
        <>
            <EditPage data={data} />
        </>
    );
}

export default withAuthAndGroupCheck(
    Page,
    PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN
);
