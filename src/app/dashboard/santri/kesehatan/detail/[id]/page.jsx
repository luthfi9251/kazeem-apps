import DetailPage from "./DetailPage";
import prisma from "@/lib/prisma";

async function getData(id) {
    let data = await prisma.Kesehatan.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
            nama_penyakit: true,
            penanganan: true,
            kategori: true,
            tgl_masuk: true,
            status: true,
        },
    });

    return {
        ...data,
        nama_lengkap: data.Santri.nama_lengkap,
    };
}

export default async function Page(props) {
    let id = props.params.id;
    let data = await getData(id);

    return (
        <DetailPage
            namaSantri={[{ id: data.id, nama_lengkap: data.nama_lengkap }]}
            data={data}
        />
    );
}
