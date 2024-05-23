import prisma from "@/lib/prisma";
import PerwalianDataProvider from "../../PerwalianDataProvider";
import DetailPage from "../DetailPage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

async function getData(id) {
    let data = await prisma.Wali.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            WaliSantri: {
                select: {
                    id: true,
                    peran: true,
                    santri: {
                        select: {
                            nama_lengkap: true,
                        },
                    },
                },
            },
        },
    });
    if (!data) return null;
    data.tgl_lhr = new Date(data.tgl_lhr).toISOString().split("T")[0];
    data.WaliSantri = data.WaliSantri.map((item) => {
        return {
            id: item.id,
            peran: item.peran,
            nama_lengkap: item.santri.nama_lengkap,
        };
    });
    return data;
}

async function PageDetail(props) {
    let data = await getData(props.params.id[0]);
    if (!data) {
        throw new Error("Data tidak ditemukan!");
    }
    return (
        <PerwalianDataProvider data={data.WaliSantri}>
            <DetailPage data={data} id={props.params.id[0]} />
        </PerwalianDataProvider>
    );
}

export default withAuthAndGroupCheck(PageDetail, PAGE_NAME.MANAGE_SANTRI_PAGE);
