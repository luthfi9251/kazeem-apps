"use server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

function getNormalDateFormat(dateRaw) {
    const date = new Date(dateRaw);
    const tanggal = date.getDate();
    const bulan = date.getMonth() + 1;
    const tahun = date.getFullYear();
    return `${tahun}-${bulan > 9 ? bulan : "0" + bulan}-${
        tanggal > 9 ? tanggal : "0" + tanggal
    }`;
}

function generateUsername(namaLengkap, tanggalLahir) {
    const namaKecil = namaLengkap.toLowerCase();
    const namaDepan = namaKecil.split(" ")[0];
    const date = getNormalDateFormat(tanggalLahir);

    const tanggal = date.split("-")[2];
    const bulan = date.split("-")[1];
    const tahun = date.split("-")[0];

    const username = namaDepan + tanggal + bulan + tahun;

    return username;
}

function generatePassword(tglSantri, tglWali) {
    //password yyyymmddyyyymmdd
    tglSantri = getNormalDateFormat(tglSantri).split("-");
    tglWali = getNormalDateFormat(tglWali).split("-");
    let password = [...tglSantri, ...tglWali].join("");
    return password;
}

export async function addSantri(santriFormData, waliSantriFormData) {
    let santri = santriFormData;
    let waliSantri = waliSantriFormData;
    let file = santri.get("foto");
    let session = await auth();
    let fotoPath = null;

    if (file !== "undefined") {
        let path = await saveFotoToLocal(file);
        fotoPath = path;
    }

    let userActionId = {
        connect: {
            id: session.user.id,
        },
    };

    let query = {
        data: {
            nama_lengkap: santri.get("nama_lengkap"),
            nis: santri.get("nis"),
            alamat: santri.get("alamat"),
            email: santri.get("email"),
            hp: santri.get("hp") || null,
            jenis_kel: santri.get("jenis_kel"),
            tempat_lahir: santri.get("tempat_lahir"),
            tgl_lhr: new Date(santri.get("tgl_lhr")).toISOString(),
            foto: fotoPath ? fotoPath : null,
            created_by: userActionId,
            last_update_by: userActionId,
            WaliSantri: {
                create: waliSantri.map((item) => {
                    return {
                        peran: item.peran,
                        created_by: userActionId,
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
                                    created_by: userActionId,
                                    last_update_by: userActionId,
                                },
                            },
                        },
                    };
                }),
            },
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            let santriSave = await prisma.Santri.create(query);
            revalidatePath("/dashboard/santri");
            resolve(santriSave);
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.meta.target === "Santri_nis_key"
            ) {
                reject(new Error("NIS sudah ada!"));
                throw err;
            }
            reject(new Error(err.message));
        }
    });
}
