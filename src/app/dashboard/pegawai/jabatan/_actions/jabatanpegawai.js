"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function saveEditJabatanPegawai(idJabatan, dataJabatan, dataJabatanPegawai) {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();

            let userActionId = {
                connect: {
                    id: session.user.id,
                },
            };

            let updateJabatan = await prisma.Jabatan.update({
                where: {
                    id: parseInt(idJabatan),
                },
                data: {
                    nama_jabatan: dataJabatan.nama_jabatan,
                },
            });

            let updateJabatanPegawai = dataJabatanPegawai.map(async (item) => {
                return await prisma.JabatanPegawai.update({
                    where: {
                        id: parseInt(item.id),
                    },
                    data: {
                        pegawai: item.pegawai,
                        jabatan: item.jabatan,
                    },
                });
            });
            revalidatePath("/dashboard/pegawai/jabatan/");
            resolve("Done");
        } catch (err) {
            if (err === 'P2002') {
                throw new Error("Nama jabatan sudah ada.");
            } else {
                throw new Error("Ada kesalahan saat update data jabatan: " + err.message);
            }
        }
    });
}

export async function deleteJabatanPegawai(id) {
    return new Promise(async (resolve, reject) => {
        try {
            id = parseInt(id);
            let checkHasRelation = await prisma.JabatanPegawai.findMany({
                where: {
                    id_jabatan: id,
                },
            });
            if (checkHasRelation.length > 0) {
                throw new Error(
                    "Jabatan tidak dapat dihapus karena memiliki relasi dengan pegawai!"
                );
            }
            let deleteJabatan = await prisma.Jabatan.delete({
                where: {
                    id: id,
                },
            });
            revalidatePath("/dashboard/pegawai/jabatan/");
            resolve("berhasil delete jabatan");
        } catch (err) {
            reject(err);
        }
    });
}
