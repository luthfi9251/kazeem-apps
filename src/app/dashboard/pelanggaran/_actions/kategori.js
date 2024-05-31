"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addKategoriPelanggaran({
    nama_pelanggaran,
    kategori,
    jenis,
    poin,
}) {
    return new Promise(async (resolve, reject) => {
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
            reject({
                error: "Gagal Mmenambahkan Kategori Pelanggaran",
                errMessage: err.message,
            });
        }
    });
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
