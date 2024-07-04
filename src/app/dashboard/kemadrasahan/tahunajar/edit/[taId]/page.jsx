import EditPage from "./EditPage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(taId) {
    return await prisma.TahunAjar.findUnique({
        where: {
            id: parseInt(taId),
        },
    });
}

async function Page({ params }) {
    let data = await getData(params.taId);
    return <EditPage data={data} />;
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEMADRASAHAN_TAHUN_AJAR);
