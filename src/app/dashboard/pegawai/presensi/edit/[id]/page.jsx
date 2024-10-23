import EditPage from "./EditPage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let data = await prisma.presensiPegawai.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            pegawai: {
                select: {
                    id: true,
                    nama_pegawai: true, 
                    JabatanPegawai: {
                        select: {
                            Jabatan: true,
                        }
                    }
                }
            },
            id: true,
            tgl_presensi: true,
            status: true,
            keterangan: true,
        },
    });

    return {
        ...data,
    };
}

// async function getPegawaiById(id) {
//     let dataPegawai = await prisma.Pegawai.findMany({
//         where: {
//             id: parseInt(id),
//         },
//         select: {
//             id: true,
//             nama_pegawai: true,
//         },
//     });

//     return {
//         id_pegawai: dataPegawai.id,
//         nama_pegawai: dataPegawai.nama_pegawai,
//     };
// }

async function Page(props) {
    let id = props.params.id;
    let data = await getData(id);
    // let namaPegawai = data.pegawai ? [{ id_pegawai: data.pegawai.id, nama_pegawai: data.pegawai.nama_pegawai }] : [];
    // let pegawaiData = await getPegawaiById(data.pegawai.id);
    // console.log("data result:", data);
    // console.log("namaPegawai result:", namaPegawai);

    return <EditPage 
            namaPegawai={[{ id_pegawai: data.pegawai.id, nama_pegawai: data.pegawai.nama_pegawai }]}
            data={data}
            />;
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_PRESENSI);
