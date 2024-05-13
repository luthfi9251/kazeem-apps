import prisma from "@/lib/prisma";
import PerwalianDataProvider from "../../PerwalianDataProvider";
import DetailPage from "../DetailPage";

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

export default async function PageDetail(props) {
    let data = await getData(props.params.id[0]);
    return (
        <PerwalianDataProvider data={data.WaliSantri}>
            <DetailPage data={data} id={props.params.id[0]} />
        </PerwalianDataProvider>
    );
}
