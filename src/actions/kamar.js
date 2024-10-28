"use server";

import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";

export const createKamarSantri = async (formData) => {
    try {
        let { nama_kamar, deskripsi, kapasitas, lokasi } = formData;
        await prisma.Kamar.create({
            data: {
                nama_kamar,
                deskripsi,
                lokasi,
                kapasitas,
            },
        });
        revalidatePath(HREF_URL.KAMAR_SANTRI_HOME);
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal menambahkan data, pastikan nama kamar unik!"
        );
    }
};

export const getAllKamarSantri = async () => {
    try {
        let data = await prisma.Kamar.findMany({
            where: {},
            select: {
                nama_kamar: true,
                lokasi: true,
                id: true,
                kapasitas: true,
                deskripsi: true,
                _count: {
                    select: {
                        Santri: true,
                    },
                },
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};

export const getKamarById = async (idKamar) => {
    try {
        let data = await prisma.Kamar.findUnique({
            where: {
                id: parseInt(idKamar),
            },
            select: {
                nama_kamar: true,
                lokasi: true,
                id: true,
                kapasitas: true,
                deskripsi: true,
                _count: {
                    select: {
                        Santri: true,
                    },
                },
            },
        });

        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};

export const getAllSantriNotInKamar = async () => {
    try {
        let data = await prisma.Santri.findMany({
            where: {
                kamar_santri: null,
            },
            select: {
                id: true,
                nis: true,
                nama_lengkap: true,
            },
        });
        return data;
    } catch (err) {
        throw err;
    }
};

export const getSantriInKamar = async (idKamar) => {
    try {
        let data = await prisma.Kamar.findUnique({
            where: {
                id: parseInt(idKamar),
            },
            include: {
                _count: {
                    select: {
                        Santri: true,
                    },
                },
                Santri: {
                    select: {
                        id: true,
                        nis: true,
                        nama_lengkap: true,
                    },
                },
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, err.message);
    }
};

export const addSantriToKamar = async (santriIdList, idKamar) => {
    try {
        let updateSantri = await prisma.Kamar.update({
            where: {
                id: parseInt(idKamar),
            },
            data: {
                Santri: {
                    connect: santriIdList.map((item) => ({ id: item })),
                },
            },
        });
        revalidatePath(HREF_URL.KAMAR_SANTRI_DETAIL(idKamar));
        return serverResponse(updateSantri, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mengupdate data");
    }
};

export const deleteSantriFromKamar = async (idSantri) => {
    try {
        let updateSantri = await prisma.Santri.update({
            where: {
                id: parseInt(idSantri),
            },
            data: {
                kamar_santri: {
                    disconnect: {},
                },
            },
        });
        revalidatePath(HREF_URL.KAMAR_SANTRI_DETAIL(idSantri));
        return serverResponse(updateSantri, false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, "Gagal mengupdate data");
    }
};

export const pindahKamar = async (idKamar, idSantri) => {
    try {
        if (!idSantri) throw "id santri tidak boleh kosong!";
        let updateSantri = await prisma.Santri.update({
            where: {
                id: parseInt(idSantri),
            },
            data: {
                kamar_santri: {
                    connect: {
                        id: parseInt(idKamar),
                    },
                },
            },
        });
        revalidatePath(HREF_URL.KAMAR_SANTRI_DETAIL(idKamar));
        return serverResponse(updateSantri, false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, "Gagal mengupdate data");
    }
};

export const updateKamarSantri = async (idKamar, data) => {
    try {
        let updateKamar = await prisma.Kamar.update({
            where: {
                id: parseInt(idKamar),
            },
            data: {
                nama_kamar: data.nama_kamar,
                kapasitas: data.kapasitas,
                deskripsi: data.deskripsi,
                lokasi: data.lokasi,
            },
        });
        revalidatePath(HREF_URL.KAMAR_SANTRI_DETAIL(idKamar));
        revalidatePath(HREF_URL.KAMAR_SANTRI_HOME);
        return serverResponse(updateKamar, false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, "Gagal mengupdate data");
    }
};

export const deleteKamarSantri = async (idKamar) => {
    try {
        let deleteKamar = await prisma.Kamar.delete({
            where: {
                id: parseInt(idKamar),
            },
        });
        revalidatePath(HREF_URL.KAMAR_SANTRI_HOME);
        return serverResponse(deleteKamar, false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, "Gagal mengupdate data");
    }
};
