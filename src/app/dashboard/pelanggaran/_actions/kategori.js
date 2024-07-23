"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { serverResponse } from "@/lib/utils";

export async function addKategoriPelanggaran({
    nama_pelanggaran,
    kategori,
    jenis,
    poin,
}) {
    try {
        let session = await auth();
        let userActionId = {
            connect: {
                id: session.user.id,
            },
        };
        let create = await prisma.KategoriPelanggaran.create({
            data: {
                nama_pelanggaran,
                kategori,
                jenis,
                poin,
                last_update_by: userActionId,
                created_by: userActionId,
            },
        });
        revalidatePath("/dashboard/pelanggaran/kategori");
        resolve(create);
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (
                err.meta.target === "KategoriPelanggaran_nama_pelanggaran_key"
            ) {
                return serverResponse(
                    null,
                    true,
                    "Gagal menambahkan kategori, Nama Pelanggaran harus unik!"
                );
            }
        }
        return serverResponse(
            null,
            false,
            "Gagal Menambahkan Kategori Pelanggaran"
        );
    }
}

export async function editKategoriPelanggaran(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();
            let { nama_pelanggaran, kategori, jenis, poin } = data;
            let userActionId = {
                connect: {
                    id: session.user.id,
                },
            };
            let create = await prisma.KategoriPelanggaran.update({
                where: {
                    id,
                },
                data: {
                    nama_pelanggaran,
                    kategori,
                    jenis,
                    poin,
                    last_update_by: userActionId,
                },
            });
            revalidatePath("/dashboard/pelanggaran/kategori");
            resolve(create);
        } catch (err) {
            reject({
                error: "Gagal Mengedit Kategori Pelanggaran",
                errMessage: err.message,
            });
        }
    });
}

export async function deleteKategoriPelanggaran(id) {
    return new Promise(async (resolve, reject) => {
        //TODO
        // Ketika sudah ada tabel relasi, cek terlebih dahulu apakah ada relasi baru dihapus!
        try {
            let deleteKategori = await prisma.KategoriPelanggaran.delete({
                where: {
                    id,
                },
            });
            revalidatePath("/dashboard/pelanggaran/kategori");
            resolve("success delete");
        } catch (err) {
            reject({
                msg: "error delete",
                err: err,
            });
        }
    });
}
