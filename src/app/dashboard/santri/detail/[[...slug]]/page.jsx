import DetailPage from "./DetailPage";
import WaliDataProvider from "../../WaliDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";
import prisma from "@/lib/prisma";

async function getData(id, mode) {
    let data = await prisma.Santri.findUnique({
        where: { id: parseInt(id) },
        include: {
            WaliSantri: {
                select: {
                    peran: true,
                    wali: true,
                },
            },
        },
    });
    return data;
}

async function PageDetailSantri(props) {
    let santriId = props.params.slug[0];
    let mode = props.params.slug[1] || false;
    let data = await getData(santriId, mode);
    let waliSantri = data.WaliSantri.map((item) => {
        return {
            id: item.wali.id,
            nama_wali: item.wali.nama_wali,
            tgl_lhr: item.wali.tgl_lhr,
            email: item.wali.email,
            hp: item.wali.hp,
            peran: item.peran,
        };
    });

    return (
        <WaliDataProvider data={waliSantri}>
            <DetailPage data={data} foto={data.foto} />
        </WaliDataProvider>
    );
}

export default withAuthAndGroupCheck(
    PageDetailSantri,
    PAGE_NAME.MANAGE_SANTRI_PAGE
);
