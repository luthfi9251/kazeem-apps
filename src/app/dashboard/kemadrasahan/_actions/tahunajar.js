"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { HREF_URL } from "@/navigation-data";

export async function addTahunAjar({ tgl_selesai, tgl_mulai, kode_ta, aktif }) {
    let check = await prisma.TahunAjar.findMany({ select: { id: true } });
    let createTahunAjar = (userId) => {
        if (check.length > 0) {
            return prisma.TahunAjar.create({
                data: {
                    kode_ta: kode_ta,
                    tgl_mulai: new Date(tgl_mulai).toISOString(),
                    tgl_selesai: new Date(tgl_selesai).toISOString(),
                    aktif: aktif,
                    created_by_id: userId,
                    last_update_by_id: userId,
                },
            });
        } else {
            return prisma.TahunAjar.create({
                data: {
                    kode_ta: kode_ta,
                    tgl_mulai: new Date(tgl_mulai).toISOString(),
                    tgl_selesai: new Date(tgl_selesai).toISOString(),
                    aktif: true,
                    created_by_id: userId,
                    last_update_by_id: userId,
                },
            });
        }
    };

    return new Promise(async (resolve, reject) => {
        let session = await auth();
        try {
            if (aktif) {
                let checkTAAktif = await prisma.TahunAjar.findFirst({
                    where: {
                        aktif: true,
                    },
                    select: {
                        id: true,
                    },
                });
                if (checkTAAktif) {
                    let deactivateTahunAjar = prisma.TahunAjar.update({
                        where: {
                            id: checkTAAktif.id,
                        },
                        data: {
                            aktif: false,
                            last_update_by_id: session.user.id,
                        },
                    });
                    let createTA = createTahunAjar(session.user.id);
                    await prisma.$transaction([deactivateTahunAjar, createTA]);
                    resolve("Berhasil membuat TA");
                    return;
                }
            }
            await createTahunAjar(session.user.id);
            revalidatePath(HREF_URL.KEMADRASAHAN_TA_HOME);
            resolve("Berhasil membuat TA");
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

export async function editTahunAjar({
    idTa,
    tgl_selesai,
    tgl_mulai,
    kode_ta,
    aktif,
}) {
    let updateTahunAjar = (userId, overwrite = false) => {
        return prisma.TahunAjar.update({
            where: {
                id: idTa,
            },
            data: {
                kode_ta,
                tgl_mulai: new Date(tgl_mulai).toISOString(),
                tgl_selesai: new Date(tgl_selesai).toISOString(),
                aktif: overwrite ? true : aktif,
                last_update_by_id: userId,
            },
        });
    };
    return new Promise(async (resolve, reject) => {
        let session = await auth();
        try {
            let checkTAAktif = await prisma.TahunAjar.findFirst({
                where: {
                    aktif: true,
                },
                select: {
                    id: true,
                },
            });
            let isCurrentTa = checkTAAktif.id === idTa;
            if (checkTAAktif && !isCurrentTa) {
                let deactivateTahunAjar = prisma.TahunAjar.update({
                    where: {
                        id: checkTAAktif.id,
                    },
                    data: {
                        aktif: false,
                        last_update_by_id: session.user.id,
                    },
                });
                let updateTA = updateTahunAjar(session.user.id);
                await prisma.$transaction([deactivateTahunAjar, updateTA]);
                resolve("Berhasil membuat TA");
                return;
            }
            await updateTahunAjar(session.user.id, true);
            revalidatePath(HREF_URL.KEMADRASAHAN_TA_HOME);
            resolve("Berhasil membuat TA");
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

export async function deleteTahunAjar({ idTa }) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();
            let checkTA = await prisma.TahunAjar.findUnique({
                where: {
                    id: parseInt(idTa),
                },
            });

            if (checkTA.aktif) {
                let deactivateTahunAjar = prisma.TahunAjar.update({
                    where: {
                        id: checkTA.id,
                    },
                    data: {
                        aktif: false,
                        last_update_by_id: session.user.id,
                    },
                });
            }

            let deleteTa = await prisma.TahunAjar.delete({
                where: {
                    id: parseInt(idTa),
                    KelasSantri: {
                        none: {},
                    },
                },
            });
            if (deleteTa) {
                resolve("berhasil hapus");
            } else {
                reject({
                    message:
                        "Tahun ajar tidak dapat dihapus karena memiliki data KelasSantri!",
                });
            }
            revalidatePath(HREF_URL.KEMADRASAHAN_TA_HOME);
            return;
        } catch (err) {
            console.log(err.message);
            reject(
                new Error(
                    "Tahun ajar tidak dapat dihapus karena memiliki data KelasSantri!"
                )
            );
            return;
        }
    });
}
