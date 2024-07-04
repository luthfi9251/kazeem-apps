import prisma from "@/lib/prisma";
import WaliDataProvider from "../../WaliDataProvider";
import EditSantriPage from "./EditSantri";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
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
    if (data?.foto) {
        data.foto = process.env.APP_URL + "/api" + data.foto;
    }
    return data;
}

async function PageEdit(props) {
    let { params } = props;
    let data = await getData(params.slug[0]);
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
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
            <EditSantriPage data={data} foto={data.foto} />
        </WaliDataProvider>
    );
}

export default withAuthAndGroupCheck(
    PageEdit,
    PAGE_NAME.KESANTRIAN_KELOLA_SANTRI
);
