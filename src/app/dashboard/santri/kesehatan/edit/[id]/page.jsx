import EditPage from "./EditPage";
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
                    id: true,
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
        santri_id: data.Santri.id,
    };
}

async function getAllSantri() {
    let namaSantri = await prisma.Santri.findMany({
        select: {
            id: true,
            nama_lengkap: true,
        },
    });
    return namaSantri;
}

export default async function Page(props) {
    let id = props.params.id;
    let data = getData(id);
    let allSantri = getAllSantri();
    let result = await Promise.all([allSantri, data]);

    return <EditPage namaSantri={result[0]} data={result[1]} />;
}
