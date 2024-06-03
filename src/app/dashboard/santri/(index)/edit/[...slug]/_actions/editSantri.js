"use server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { auth } from "@/auth";
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

async function deleteFoto(file) {
    let pathList = file.split("/");
    let fileName = pathList[pathList.length - 1];
    let pathToSave = path.join(process.cwd(), "public", "foto", `${fileName}`);

    fs.unlink(pathToSave, (err) => {
        if (err) {
            console.log(`Error delete foto : ${fileName} - ${err}`);
        }
    });
}

export async function editSantri(santriFormData, waliSantriFormData, prevFoto) {
    return new Promise(async (resolve, reject) => {
        try {
            let santri = santriFormData;
            let waliSantri = waliSantriFormData;
            let file = santri.get("foto");
            let fotoPath = null;
            let session = await auth();

            if (file !== "undefined") {
                let path = await saveFotoToLocal(file);
                fotoPath = path;
                if (prevFoto) {
                    await deleteFoto(prevFoto);
                }
            }

            let userActionId = {
                connect: {
                    id: session.user.id,
                },
            };

            let updateQueryData = {
                nama_lengkap: santri.get("nama_lengkap"),
                alamat: santri.get("alamat"),
                email: santri.get("email"),
                hp: santri.get("hp") || null,
                tempat_lahir: santri.get("tempat_lahir"),
                tgl_lhr: new Date(santri.get("tgl_lhr")).toISOString(),
                last_update_by: userActionId,
                WaliSantri: {
                    deleteMany: {},
                },
            };

            if (fotoPath) {
                updateQueryData.foto = fotoPath;
            }

            let updateSantri = prisma.Santri.update({
                where: {
                    id: parseInt(santri.get("id")),
                },
                data: updateQueryData,
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
                                last_update_by: userActionId,
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
                                            last_update_by: userActionId,
                                            created_by: userActionId,
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

export async function deleteSantri(id, foto) {
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

            if (foto) {
                await deleteFoto(foto);
            }
            revalidatePath("/dashboard/santri");
            resolve(deleteTransaction);
        } catch (err) {
            reject(err);
        }
    });
}
