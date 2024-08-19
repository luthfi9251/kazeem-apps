"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { HREF_URL } from "@/navigation-data";
import dayjs from "dayjs";

export async function addDataKesehatan(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                kelas_santri_id,
                nama_penyakit,
                penanganan,
                kategori,
                tgl_masuk,
                tgl_keluar,
                status,
            } = data;

            let session = await auth();
            let connectUserId = {
                connect: {
                    id: session.user.id,
                },
            };
            let insert = await prisma.Kesehatan.create({
                data: {
                    nama_penyakit,
                    penanganan,
                    kategori,
                    tgl_masuk: new Date(tgl_masuk).toISOString(),
                    tgl_keluar:
                        tgl_keluar && new Date(tgl_keluar).toISOString(),
                    status,
                    KelasSantri: {
                        connect: {
                            id: kelas_santri_id,
                        },
                    },
                    created_by: connectUserId,
                    last_update_by: connectUserId,
                },
            });
            revalidatePath(HREF_URL.KESEHATAN_HOME);
            resolve(insert);
        } catch (err) {
            console.log(err);
            reject(err.message);
        }
    });
}

export async function editDataKesehatan(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                nama_penyakit,
                penanganan,
                kategori,
                tgl_masuk,
                tgl_keluar,
                status,
            } = data;
            let session = await auth();
            let connectUserId = {
                connect: {
                    id: session.user.id,
                },
            };
            let update = await prisma.Kesehatan.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    nama_penyakit,
                    penanganan,
                    kategori,
                    tgl_masuk: new Date(tgl_masuk).toISOString(),
                    tgl_keluar: new Date(tgl_keluar).toISOString(),
                    status,
                    last_update_by: connectUserId,
                },
            });
            revalidatePath(HREF_URL.KESEHATAN_HOME);
            resolve(update);
        } catch (err) {
            console.log(err);
            reject(err.message);
        }
    });
}

export async function deleteDataKesehatan(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let insert = await prisma.Kesehatan.delete({
                where: {
                    id,
                },
            });
            revalidatePath(HREF_URL.KESEHATAN_HOME);
            resolve(insert);
        } catch (err) {
            console.log(err);
            reject(err.message);
        }
    });
}

export async function getDataKesehatanByKelasAndTA({ nama_kelas, kode_ta }) {
    let data = await prisma.Kesehatan.findMany({
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
        orderBy: {
            tgl_masuk: "desc",
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
                    TahunAjar: {
                        select: {
                            kode_ta: true,
                        },
                    },
                    Santri: {
                        select: {
                            nis: true,
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

    return data.map((item) => {
        return {
            ...item,
            tgl_masuk: dayjs(item.tgl_masuk).format("DD-MM-YYYY"),
            tgl_keluar: item.tgl_keluar
                ? dayjs(item.tgl_keluar).format("DD-MM-YYYY")
                : null,
            nis: item.KelasSantri.Santri.nis,
            nama_lengkap: item.KelasSantri.Santri.nama_lengkap,
            kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
        };
    });
}
