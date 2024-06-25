import EditPage from "./EditPage";
import prisma from "@/lib/prisma";

async function getData(id) {
    let data = await prisma.Kesehatan.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            KelasSantri: {
                select: {
                    id: true,
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
        santri_id: data.KelasSantri.id,
    };
}

async function getAllSantri() {
    let dataSantri = await prisma.KelasSantri.findMany({
        where: {
            TahunAjar: {
                aktif: true,
            },
        },
        select: {
            id: true,
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
        },
    });

    return dataSantri.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.Santri.nama_lengkap,
        };
    });
}

export default async function Page(props) {
    let id = props.params.id;
    let data = getData(id);
    let allSantri = getAllSantri();
    let result = await Promise.all([allSantri, data]);

    return <EditPage namaSantri={result[0]} data={result[1]} />;
}
