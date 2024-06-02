"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";
export async function addPelanggaran({
    isCreateNewKategori,
    kelasSantriId,
    pelanggaranId,
    dataPelanggaran,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();
            let connectUserID = {
                connect: {
                    id: session.user.id,
                },
            };
            if (isCreateNewKategori) {
                let {
                    nama_pelanggaran,
                    kategori,
                    jenis,
                    poin,
                    keterangan,
                    konsekuensi,
                } = dataPelanggaran;
                let createAll = await prisma.Pelanggaran.create({
                    data: {
                        KelasSantri: {
                            connect: {
                                id: parseInt(kelasSantriId),
                            },
                        },
                        Kategori: {
                            create: {
                                nama_pelanggaran,
                                kategori,
                                jenis,
                                poin,
                                created_by: connectUserID,
                                last_update_by: connectUserID,
                            },
                        },
                        keterangan,
                        konsekuensi,
                        created_by: connectUserID,
                        last_update_by: connectUserID,
                    },
                });
                revalidatePath(HREF_URL.PELANGGARAN_HOME);
                resolve(createAll);
            } else {
                let createPelanggaranOnly = await prisma.Pelanggaran.create({
                    data: {
                        KelasSantri: {
                            connect: {
                                id: parseInt(kelasSantriId),
                            },
                        },
                        Kategori: {
                            connect: {
                                id: parseInt(pelanggaranId),
                            },
                        },
                        konsekuensi: dataPelanggaran.konsekuensi,
                        keterangan: dataPelanggaran.keterangan,
                        created_by: connectUserID,
                        last_update_by: connectUserID,
                    },
                });
                revalidatePath(HREF_URL.PELANGGARAN_HOME);
                resolve(createPelanggaranOnly);
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

export async function getPelanggaranByKelasAndTA({ nama_kelas, kode_ta }) {
    let data = await prisma.Pelanggaran.findMany({
        where: {
            KelasSantri: {
                TahunAjar: {
                    kode_ta: kode_ta === "undefined" ? undefined : kode_ta,
                },
                Kelas: {
                    nama_kelas:
                        nama_kelas === "undefined" ? undefined : nama_kelas,
                },
            },
        },
        select: {
            id: true,
            KelasSantri: {
                select: {
                    Kelas: {
                        select: {
                            nama_kelas: true,
                        },
                    },
                    Santri: {
                        select: {
                            id: true,
                            nama_lengkap: true,
                        },
                    },
                    TahunAjar: {
                        select: {
                            kode_ta: true,
                        },
                    },
                },
            },
            Kategori: {
                select: {
                    nama_pelanggaran: true,
                },
            },
            created_at: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return data.map((item) => {
        return {
            id: item.id,
            santri_id: item.KelasSantri.Santri.id,
            nama_santri: item.KelasSantri.Santri.nama_lengkap,
            kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
            nama_pelanggaran: item.Kategori.nama_pelanggaran,
            tanggal: new Date(item.created_at).toLocaleDateString(),
        };
    });
}

export async function updatePelanggaran(idPelanggaran, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();

            let {
                isCreateNewKategori,
                kategoriPelanggaranId,
                dataPelanggaran,
            } = data;

            let {
                nama_pelanggaran,
                kategori,
                jenis,
                poin,
                keterangan,
                konsekuensi,
            } = dataPelanggaran;
            let connectUserID = {
                connect: {
                    id: session.user.id,
                },
            };
            let query = {};

            if (isCreateNewKategori) {
                query = {
                    where: {
                        id: idPelanggaran,
                    },
                    data: {
                        konsekuensi,
                        keterangan,
                        last_update_by: connectUserID,
                        Kategori: {
                            create: {
                                nama_pelanggaran,
                                kategori,
                                jenis,
                                poin,
                                created_by: connectUserID,
                                last_update_by: connectUserID,
                            },
                        },
                    },
                };
            } else {
                query = {
                    where: {
                        id: idPelanggaran,
                    },
                    data: {
                        konsekuensi,
                        keterangan,
                        last_update_by: connectUserID,
                        Kategori: {
                            connect: {
                                id: parseInt(kategoriPelanggaranId),
                            },
                        },
                    },
                };
            }
            await prisma.Pelanggaran.update(query);
            revalidatePath(HREF_URL.PELANGGARAN_HOME);
            resolve("berhasil");
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

export async function deletePelanggaran(idPelanggaran) {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.Pelanggaran.delete({
                where: {
                    id: idPelanggaran,
                },
            });
            revalidatePath(HREF_URL.PELANGGARAN_HOME);
            resolve("Berhasil Hapus");
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
