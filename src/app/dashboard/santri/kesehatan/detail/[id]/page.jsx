import DetailPage from "./DetailPage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.Kesehatan.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            KelasSantri: {
                select: {
                    Santri: {
                        select: {
                            nama_lengkap: true,
                        },
                    },
                },
            },
            nama_penyakit: true,
            penanganan: true,
            kategori: true,
            tgl_masuk: true,
            tgl_keluar: true,
            status: true,
        },
    });

    return {
        ...data,
        nama_lengkap: data.KelasSantri.Santri.nama_lengkap,
    };
}

async function Page(props) {
    let id = props.params.id;
    let data = await getData(id);

    return (
        <DetailPage
            namaSantri={[{ id: data.id, nama_lengkap: data.nama_lengkap }]}
            data={data}
        />
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_KESEHATAN);
