"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveEditWaliSantri(idWali, dataWali, dataWaliSantri) {
    return new Promise(async (resolve, reject) => {
        try {
            let updateWali = await prisma.Wali.update({
                where: {
                    id: parseInt(idWali),
                },
                data: {
                    nama_wali: dataWali.nama_wali,
                    tgl_lhr: new Date(dataWali.tgl_lhr).toISOString(),
                    email: dataWali.email === "" ? null : dataWali.email,
                    hp: dataWali.hp,
                },
            });

            let updateWaliSantri = dataWaliSantri.map(async (item) => {
                return await prisma.WaliSantri.update({
                    where: {
                        id: parseInt(item.id),
                    },
                    data: {
                        peran: item.peran,
                    },
                });
            });
            revalidatePath("/dashboard/santri/wali/");
            resolve("Done");
        } catch (err) {
            reject(err);
        }
    });
}

export async function deleteWaliSantri(id) {
    return new Promise(async (resolve, reject) => {
        try {
            id = parseInt(id);
            let checkHasRelation = await prisma.WaliSantri.findMany({
                where: {
                    wali_id: id,
                },
            });
            console.log({ check: checkHasRelation });
            if (checkHasRelation.length > 0) {
                throw new Error(
                    "Wali tidak dapat dihapus karena memiliki perwalian santri!"
                );
            }
            let deleteWali = await prisma.Wali.delete({
                where: {
                    id: id,
                },
            });
            revalidatePath("/dashboard/santri/wali/");
            resolve("berhasil delete wali");
        } catch (err) {
            reject(err);
        }
    });
}
