"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { HREF_URL } from "@/navigation-data";

export async function addDataKesehatan(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                santri_id,
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
                    tgl_masuk,
                    tgl_keluar,
                    status,
                    Santri: {
                        connect: {
                            id: santri_id,
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
                    tgl_masuk,
                    tgl_keluar,
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
