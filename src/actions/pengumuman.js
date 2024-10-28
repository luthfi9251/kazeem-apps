"use server";

import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";

export const getAllSantri = async () => {
    try {
        let dataSantri = await prisma.Santri.findMany({
            select: {
                id: true,
                nis: true,
                nama_lengkap: true,
            },
        });
        return serverResponse(dataSantri, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};
export const getAllKelas = async () => {
    try {
        let dataKelas = await prisma.Kelas.findMany({
            select: {
                id: true,
                nama_kelas: true,
            },
        });
        return serverResponse(dataKelas, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};

export const getSantriDataRecipient = async (idSantriList) => {
    try {
        let dataSantri = await prisma.Santri.findMany({
            where: {
                id: {
                    in: idSantriList,
                },
            },
            select: {
                id: true,
                nis: true,
                nama_lengkap: true,
                KelasSantri: {
                    where: {
                        TahunAjar: {
                            aktif: true,
                        },
                    },
                    select: {
                        Kelas: {
                            select: {
                                nama_kelas: true,
                            },
                        },
                    },
                },
                WaliSantri: {
                    select: {
                        wali: {
                            select: {
                                hp: true,
                            },
                        },
                    },
                },
            },
        });
        const mappedData = dataSantri.map((item) => ({
            id: item.id,
            nis: item.nis,
            nama_santri: item.nama_lengkap,
            kelas: item.KelasSantri[0].Kelas.nama_kelas,
            no_hp_wali: item.WaliSantri.map((item2) => item2.wali.hp),
        }));
        return serverResponse(mappedData, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};

export const getSantriInKelas = async (idKelasList) => {
    try {
        let dataSantri = await prisma.Santri.findMany({
            where: {
                KelasSantri: {
                    every: {
                        TahunAjar: {
                            aktif: true,
                        },
                    },
                    every: {
                        Kelas: {
                            id: {
                                in: idKelasList,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                nis: true,
                nama_lengkap: true,
                KelasSantri: {
                    where: {
                        TahunAjar: {
                            aktif: true,
                        },
                    },
                    select: {
                        Kelas: {
                            select: {
                                nama_kelas: true,
                            },
                        },
                    },
                },
                WaliSantri: {
                    select: {
                        wali: {
                            select: {
                                hp: true,
                            },
                        },
                    },
                },
            },
        });

        const mappedData = dataSantri.map((item) => ({
            id: item.id,
            nis: item.nis,
            nama_santri: item.nama_lengkap,
            kelas: item.KelasSantri[0].Kelas.nama_kelas,
            no_hp_wali: item.WaliSantri.map((item2) => item2.wali.hp),
        }));
        return serverResponse(mappedData, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};

export const kirimPengumumanSantri = async (infoPengumuman, recipientList) => {
    try {
        let insertPengumuman = await prisma.Pengumuman.create({
            data: {
                judul: infoPengumuman.judul,
                teks: infoPengumuman.teks,
                PengumumanRecipient: {
                    create: recipientList,
                },
            },
        });
        return serverResponse("success", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};
