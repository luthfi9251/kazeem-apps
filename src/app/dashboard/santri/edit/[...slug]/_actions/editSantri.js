"use server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

async function saveFotoToLocal(file) {
    //handle image
    let arrayBuffer = await file.arrayBuffer();
    let buffer = new Uint8Array(arrayBuffer);

    // handle save
    let fileName = crypto.randomBytes(20).toString("hex");
    let fileExt = file.name.split(".").slice(-1).pop();
    let pathToSave = path.join(
        process.cwd(),
        "public",
        "foto",
        `${fileName}.${fileExt}`
    );
    fs.writeFileSync(pathToSave, buffer, "base64");

    // return path.join("foto", `${fileName}.${fileExt}`);
    return `/foto/${fileName}.${fileExt}`;
}

export async function editSantri(santriFormData, waliSantriFormData) {
    return new Promise(async (resolve, reject) => {
        try {
            let santri = santriFormData;
            let waliSantri = waliSantriFormData;
            let file = santri.get("foto");
            let fotoPath = null;

            if (file !== "undefined") {
                let path = await saveFotoToLocal(file);
                fotoPath = path;
            }

            let updateSantri = prisma.Santri.update({
                where: {
                    id: parseInt(santri.get("id")),
                },
                data: {
                    nama_lengkap: santri.get("nama_lengkap"),
                    alamat: santri.get("alamat"),
                    email: santri.get("email"),
                    hp: santri.get("hp") || null,
                    tempat_lahir: santri.get("tempat_lahir"),
                    tgl_lhr: new Date(santri.get("tgl_lhr")).toISOString(),
                    foto: fotoPath ? fotoPath : null,
                    WaliSantri: {
                        deleteMany: {},
                    },
                },
            });

            let updateWaliSantri = prisma.Santri.update({
                where: {
                    id: parseInt(santri.get("id")),
                },
                data: {
                    WaliSantri: {
                        create: waliSantri.map((item) => {
                            return {
                                peran: item.peran,
                                wali: {
                                    connectOrCreate: {
                                        where: {
                                            waliIdentifier: {
                                                nama_wali: item.nama_wali,
                                                tgl_lhr: new Date(
                                                    item["tgl_lhr"]
                                                ).toISOString(),
                                            },
                                        },
                                        create: {
                                            nama_wali: item.nama_wali,
                                            tgl_lhr: new Date(
                                                item["tgl_lhr"]
                                            ).toISOString(),
                                            email: item.email || null,
                                            hp: item.hp || null,
                                        },
                                    },
                                },
                            };
                        }),
                    },
                },
            });
            const updateTransaction = await prisma.$transaction([
                updateSantri,
                updateWaliSantri,
            ]);

            resolve(updateTransaction);
        } catch (err) {
            reject(err);
        }
    });
}

export async function deleteSantri(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let deleteWaliSantri = prisma.WaliSantri.deleteMany({
                where: {
                    santri_id: id,
                },
            });

            let deleteSantri = prisma.Santri.delete({
                where: {
                    id: id,
                },
            });

            let deleteWali = prisma.Wali.deleteMany({
                where: { WaliSantri: { none: {} } },
            });

            let deleteTransaction = await prisma.$transaction([
                deleteWaliSantri,
                deleteSantri,
                deleteWali,
            ]);
            revalidatePath("/dashboard/santri");
            resolve(deleteTransaction);
        } catch (err) {
            reject(err);
        }
    });
}
