import DetailPage from "../DetailPage";
import prisma from "@/lib/prisma";

async function getData(idKelas) {
    let dataTahunAjaran = prisma.TahunAjar.findMany({
        where: {},
        orderBy: {
            tgl_mulai: "desc",
        },
    });

    let dataKelas = prisma.Kelas.findUnique({
        where: {
            id: parseInt(idKelas),
        },
        select: {
            id: true,
            nama_kelas: true,
            Tingkat: {
                select: {
                    nama_tingkatan: true,
                },
            },
            keterangan: true,
        },
    });

    return await Promise.all([dataTahunAjaran, dataKelas]);
}

export default async function Page(props) {
    let idKelas = props.params.kelasId;
    let data = await getData(idKelas);
    return (
        <>
            <DetailPage dataKelas={data[1]} dataTA={data[0]} />
        </>
    );
}
