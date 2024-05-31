"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { addTahunAjar } from "./tahunajar";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";

export async function addKelas(data) {
    return new Promise(async (resolve, reject) => {
        /**
         1. Menambahkan Tingkatan Kelas
         2. Menambahkan Kelas
            *Ketika membuat kelas dan belum ada Tahun Ajaran yang dibuat, maka akan otomatis terbuat*
         PARALEL = NAMA_KELAS
         */
        try {
            let session = await auth();

            let checkTA = await prisma.TahunAjar.findMany({
                select: {
                    id: true,
                },
            });

            if (checkTA.length < 1) {
                let tgl_mulai = new Date();
                let tgl_selesai = new Date(tgl_mulai);
                tgl_selesai.setFullYear(tgl_mulai.getFullYear() + 1);
                let kode_ta =
                    tgl_mulai.getFullYear() + "/" + tgl_selesai.getFullYear();
                await addTahunAjar({
                    tgl_selesai,
                    tgl_mulai,
                    kode_ta,
                    aktif: true,
                });
            }

            let uniqueTingkatan = [
                ...new Set(data.map((item) => item.tingkatan)),
            ];

            //create tingkatan
            await prisma.Tingkat.createMany({
                data: uniqueTingkatan.map((item) => {
                    return {
                        nama_tingkatan: item,
                        keterangan: "-",
                        created_by_id: session.user.id,
                        last_update_by_id: session.user.id,
                    };
                }),
                skipDuplicates: true,
            });
            let tingkatanData = await prisma.Tingkat.findMany({
                where: {
                    nama_tingkatan: { in: uniqueTingkatan },
                },
                select: {
                    id: true,
                    nama_tingkatan: true,
                },
            });
            let queryKelas = data.map((item) => {
                return {
                    nama_kelas: item.tingkatan + "-" + item.paralel,
                    tingkat_id: tingkatanData.find(
                        (ting) => ting.nama_tingkatan === item.tingkatan
                    ).id,
                    keterangan: "-",
                    created_by_id: session.user.id,
                    last_update_by_id: session.user.id,
                };
            });
            let createKelas = await prisma.Kelas.createMany({
                data: queryKelas,
                skipDuplicates: true,
            });
            revalidatePath(HREF_URL.KEMADRASAHAN_KELAS_HOME);
            resolve(createKelas);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

export async function getSiswaByKelasAndTA(idKelas, kode_ta) {
    let dataSiswa = await prisma.KelasSantri.findMany({
        where: {
            kelas_id: parseInt(idKelas),
            TahunAjar: {
                kode_ta,
            },
        },
        select: {
            id: true,
            TahunAjar: {
                select: {
                    kode_ta: true,
                },
            },
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
            status: true,
        },
    });

    let res = dataSiswa.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.Santri.nama_lengkap,
            status: item.status,
            kode_ta: item.TahunAjar.kode_ta,
        };
    });

    return res;
}

export async function getTahunAjarSummaryByKelas(idKelas) {
    let tahunAjar = await prisma.KelasSantri.groupBy({
        by: ["ta_id"],
        where: {
            kelas_id: parseInt(idKelas),
        },
        _count: true,
    });

    let tahunAjarId = tahunAjar.map((item) => item.ta_id);

    let dataTA = await prisma.TahunAjar.findMany({
        where: {
            id: {
                in: tahunAjarId,
            },
        },
    });

    let result = dataTA.map((item) => {
        return {
            id: item.id,
            kode_ta: item.kode_ta,
            status: item.aktif ? "Aktif" : "Non-Aktif",
            count: tahunAjar.find((item2) => item2.ta_id === item.id)._count,
        };
    });
    return result;
}

export async function getSiswaAlreadyJoinKelas() {
    let getTaAktif = await prisma.TahunAjar.findFirst({
        where: {
            aktif: true,
        },
    });

    let getSantriNotJoin = await prisma.KelasSantri.findMany({
        where: {
            ta_id: getTaAktif.id,
        },
        select: {
            santri_id: true,
        },
    });

    return [...new Set(getSantriNotJoin.map((item) => item.santri_id))];
}

export async function getAllSiswaNotJoinKelas(idKelas) {
    let santriAlreadyJoinKelas = await getSiswaAlreadyJoinKelas();
    let santriFree = await prisma.Santri.findMany({
        where: {
            id: {
                notIn: santriAlreadyJoinKelas,
            },
        },
        select: {
            id: true,
            nama_lengkap: true,
        },
    });

    return santriFree;
}

export async function addSiswaToKelas({ idKelas, idSantri, kodeTA, status }) {
    let session = auth();
    let checkJoin = prisma.KelasSantri.findFirst({
        where: {
            santri_id: idSantri,
            TahunAjar: {
                kode_ta: kodeTA,
            },
        },
    });

    let [sessionData, checkJoinData] = await Promise.all([session, checkJoin]);

    if (!checkJoinData) {
        let data = await prisma.KelasSantri.create({
            data: {
                Kelas: {
                    connect: {
                        id: parseInt(idKelas),
                    },
                },
                Santri: {
                    connect: {
                        id: parseInt(idSantri),
                    },
                },
                TahunAjar: {
                    connect: {
                        kode_ta: kodeTA,
                    },
                },
                created_by: {
                    connect: {
                        id: sessionData.user.id,
                    },
                },
                last_update_by: {
                    connect: {
                        id: sessionData.user.id,
                    },
                },
                status: status,
            },
        });
    } else {
        throw new Error("Santri already join class");
    }
}

export async function deleteSiswaFromKelas(idKelasSantri) {
    await prisma.KelasSantri.delete({
        where: {
            id: idKelasSantri,
        },
    });

    return null;
}

export async function deleteKelas({ idKelas }) {
    return new Promise(async (resolve, reject) => {
        try {
            let deleteTa = await prisma.Kelas.delete({
                where: {
                    id: parseInt(idKelas),
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
                        "Kelas tidak dapat dihapus karena memiliki data siswa!",
                });
            }
            revalidatePath(HREF_URL.KEMADRASAHAN_KELAS_HOME);
            return;
        } catch (err) {
            // console.log(err);
            reject(
                new Error(
                    "Kelas tidak dapat dihapus karena memiliki data siswa!"
                )
            );
            return;
        }
    });
}
