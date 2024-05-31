"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
export async function addPelanggaran({
    isCreateNewKategori,
    santriId,
    pelanggaranId,
    dataPelanggaran,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();
            console.log(pelanggaranId);
            let connectUserID = {
                connect: {
                    id: session.user.id,
                },
            };
            if (isCreateNewKategori) {
                let { nama_pelanggaran, kategori, jenis, poin, keterangan } =
                    dataPelanggaran;
                let createAll = await prisma.Pelanggaran.create({
                    data: {
                        KelasSantri: {
                            connect: {
                                id: parseInt(santriId),
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
                        created_by: connectUserID,
                        last_update_by: connectUserID,
                    },
                });
                resolve(createAll);
            } else {
                let createPelanggaranOnly = await prisma.Pelanggaran.create({
                    data: {
                        KelasSantri: {
                            connect: {
                                id: parseInt(santriId),
                            },
                        },
                        Kategori: {
                            connect: {
                                id: parseInt(pelanggaranId),
                            },
                        },
                        keterangan: dataPelanggaran.keterangan,
                        created_by: connectUserID,
                        last_update_by: connectUserID,
                    },
                });
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
                    kode_ta: kode_ta,
                },
                Kelas: {
                    nama_kelas: nama_kelas,
                },
            },
        },
        select: {
            KelasSantri: {
                select: {
                    Kelas: {
                        select: {
                            nama_kelas: true,
                        },
                    },
                    Santri: {
                        select: {
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
    });
    return data.map((item) => {
        return {
            nama_santri: item.KelasSantri.Santri.nama_lengkap,
            kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
            nama_pelanggaran: item.Kategori.nama_pelanggaran,
            tanggal: new Date(item.created_at).toLocaleDateString(),
        };
    });
}
