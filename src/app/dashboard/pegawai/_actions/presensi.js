"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { HREF_URL } from "@/navigation-data";
import dayjs from "dayjs";

export async function addDataPresensi(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                id_pegawai,
                keterangan,
                tgl_presensi,
                status,
            } = data;

            // let session = await auth();
            // let connectUserId = {
            //     connect: {
            //         id: session.user.id,
            //     },
            // };

            let insert = await prisma.presensiPegawai.create({
                data: {
                    keterangan,
                    tgl_presensi: new Date(tgl_presensi).toISOString(),
                    status,
                    pegawai: {
                        connect: { 
                            id: id_pegawai 
                        }, 
                    },
                },
            });
            revalidatePath(HREF_URL.PRESENSI_HOME);
            resolve(insert);
        } catch (err) {
            console.log(err);
            reject(err.message);
        }
    });
}

export async function editDataPresensi(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                keterangan,
                tgl_presensi,
                status,
            } = data;
            let session = await auth();
            let connectUserId = {
                connect: {
                    id: session.user.id,
                },
            };
            let update = await prisma.presensiPegawai.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    keterangan,
                    tgl_presensi: new Date(tgl_presensi).toISOString(),
                    status,
                },
            });
            revalidatePath(HREF_URL.PRESENSI_HOME);
            resolve(update);
        } catch (err) {
            console.log(err);
            reject(err.message);
        }
    });
}

export async function deleteDataPresensi(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let insert = await prisma.presensiPegawai.delete({
                where: {
                    id,
                },
            });
            revalidatePath(HREF_URL.PRESENSI_HOME);
            resolve(insert);
        } catch (err) {
            console.log(err);
            reject(err.message);
        }
    });
}

// export async function getDataPresensi() {
//     let data = await prisma.PresensiPegawai.findMany({
//         orderBy: {
//             tgl_presensi: true,
//         },
//         select: {
//             id: true,
//             pegawai: {
//                 select: {
//                     nama_pegawai: true,
//                     JabatanPegawai: {
//                         select: {
//                             Jabatan: true,
//                         },
//                     },
//                 }
//             }
//         },
//         tgl_presensi: true,
//         status: true,
//         keterangan: true,
//     })

//     return data.map((item) => {
//         return {
//             ...item,
//             id_pegawai: item.pegawai.id_pegawai,
//             nama_pegawai: item.pegawai.nama_pegawai,
//             tgl_presensi: dayjs(item.tgl_presensi).format("DD-MM-YYYY"),
//             jabatan: item.pegawai.JabatanPegawai?.Jabatan?.nama_jabatan || "Tidak ada jabatan",
//             status: item.pegawai.status,
//         };
//     });
// }


