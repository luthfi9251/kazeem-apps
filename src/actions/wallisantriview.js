"use server";

import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getPelanggaranData = async (nis) => {};

export const getKesehatanData = async (nis) => {};

export const getWaliSantriSessionData = async () => {
    let cookieStore = cookies();
    let session = {};
    let nisSantri = cookieStore.get("walisantrisession");
    let santri = null;
    if (nisSantri) {
        santri = await prisma.Santri.findUnique({
            where: {
                nis: nisSantri?.value,
            },
        });
    }
    session.santri = santri;
    if (santri) {
        session.santri.foto = santri.foto
            ? process.env.APP_URL + `/api/${santri.foto}`
            : null;
    }
    return session;
};

export const waliSantriLogin = async (nis, tgl_lahir_walisantri) => {
    try {
        let cookieStore = cookies();
        const tglLahirWali = dayjs(tgl_lahir_walisantri)
            .locale("id")
            .format("YYYY-MM-DD");

        let santri = await prisma.Santri.findFirst({
            where: {
                nis,
                WaliSantri: {
                    some: {
                        wali: {
                            tgl_lhr: tglLahirWali + "T00:00:00.000Z",
                        },
                    },
                },
            },
            include: {
                WaliSantri: {
                    where: {
                        wali: {
                            tgl_lhr: tglLahirWali + "T00:00:00.000Z",
                        },
                    },
                    select: {
                        wali: {
                            select: {
                                nama_wali: true,
                            },
                        },
                    },
                },
            },
        });
        if (!santri)
            throw new Error(
                "Santri tidak ditemukan, periksa kemali kombinasi NIS dan Tanggal lahir Wali!"
            );
        cookieStore.set("walisantrisession", santri.nis, {
            secure: true,
            httpOnly: true,
            expires: dayjs().add(1, "day").toDate(),
        });

        return serverResponse("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, err.message);
    }
};

export const waliSantriLogOut = async () => {
    let cookieStore = cookies();
    cookieStore.delete("walisantrisession");
    redirect(HREF_URL.WALISANTRI_VIEW_LOGIN);
    return "";
};

export const getDashboardData = async (nis) => {
    try {
        let data = await prisma.Santri.findUnique({
            where: {
                nis,
            },
            include: {
                KelasSantri: {
                    orderBy: {
                        created_at: "desc",
                    },
                    select: {
                        Pelangaran: {
                            orderBy: {
                                created_at: "desc",
                            },
                            include: {
                                Kategori: true,
                            },
                        },
                        Kesehatan: {
                            orderBy: {
                                tgl_masuk: "desc",
                            },
                        },
                        TahunAjar: {
                            select: {
                                kode_ta: true,
                                aktif: true,
                            },
                        },
                        Kelas: {
                            select: {
                                nama_kelas: true,
                            },
                        },
                    },
                },
            },
        });

        let allPelanggaran = data.KelasSantri.map((item) => item.Pelangaran);
        let allKesehatan = data.KelasSantri.map((item) => item.Kesehatan);

        let summarySection = new Promise((resolve, reject) => {
            let count = data.KelasSantri.reduce(
                (accumulator, currentVal) => {
                    accumulator.kesehatan += currentVal.Kesehatan.length;
                    accumulator.pelanggaran += currentVal.Pelangaran.length;
                    return accumulator;
                },
                { kesehatan: 0, pelanggaran: 0 }
            );
            let returned = {
                count: {
                    kesehatan: count.kesehatan,
                    pelanggaran: count.pelanggaran,
                },
                nama_kelas:
                    data.KelasSantri.find((item) => item.TahunAjar?.aktif)
                        ?.Kelas?.nama_kelas || "Tidak ada",
                pelanggaran: allPelanggaran.flat().slice(0, 3),
                kesehatan: allKesehatan.flat().slice(0, 3),
            };
            resolve(returned);
        });

        let dataPelanggaran = new Promise((resolve, reject) => {
            let result = [];
            data.KelasSantri.forEach((kelasSantri) => {
                kelasSantri.Pelangaran.forEach((pelanggaran) => {
                    let temp = {
                        ...pelanggaran,
                        nama_kelas: kelasSantri.Kelas.nama_kelas,
                        kode_ta: kelasSantri.TahunAjar.kode_ta,
                    };
                    result.push(temp);
                });
            });
            resolve(result);
        });
        let dataKesehatan = new Promise((resolve, reject) => {
            let result = [];
            data.KelasSantri.forEach((kelasSantri) => {
                kelasSantri.Kesehatan.forEach((kesehatan) => {
                    let temp = {
                        ...kesehatan,
                        nama_kelas: kelasSantri.Kelas.nama_kelas,
                        kode_ta: kelasSantri.TahunAjar.kode_ta,
                    };
                    result.push(temp);
                });
            });
            resolve(result);
        });

        let promResult = await Promise.all([
            summarySection,
            dataPelanggaran,
            dataKesehatan,
        ]);
        let result = {
            umum: promResult[0],
            pelanggaran: promResult[1],
            kesehatan: promResult[2],
        };
        return serverResponse(result, false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, err.message);
    }
};
