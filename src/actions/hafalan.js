"use server";

import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";

export const addJenisHafalan = async (data) => {
    try {
        let { jenis_hafalan } = data;
        await prisma.JenisHafalan.create({
            data: {
                jenis_hafalan,
            },
        });
        revalidatePath(HREF_URL.HAFALAN_JENIS_HAFALAN);
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal menambahkan data, pastikan jenis hafalan unik!"
        );
    }
};

export const editJenisHafalan = async (id, data) => {
    try {
        let { jenis_hafalan } = data;
        await prisma.JenisHafalan.update({
            where: {
                id,
            },
            data: {
                jenis_hafalan,
            },
        });
        revalidatePath(HREF_URL.HAFALAN_JENIS_HAFALAN);
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal mengubah data, pastikan jenis hafalan unik!"
        );
    }
};

export const deleteJenisHafalan = async (id) => {
    try {
        await prisma.JenisHafalan.delete({
            where: {
                id,
            },
        });
        revalidatePath(HREF_URL.HAFALAN_JENIS_HAFALAN);
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal mengubah data, pastikan jenis hafalan unik!"
        );
    }
};

export const getAllJenisHafalan = async () => {
    try {
        let data = await prisma.JenisHafalan.findMany({
            select: {
                id: true,
                jenis_hafalan: true,
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data!");
    }
};

export const getAllHafalanSantri = async (idSantri) => {
    try {
        let data = await prisma.Hafalan.findMany({
            where: {
                Santri: {
                    id: parseInt(idSantri),
                },
            },
            include: {
                JenisHafalan: true,
                Santri: true,
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data!");
    }
};

export const addHafalanSantri = async (data) => {
    try {
        let {
            hafalan_baru,
            tgl_hafalan,
            keterangan,
            id_santri,
            id_jenis_hafalan,
        } = data;

        await prisma.Hafalan.create({
            data: {
                hafalan_baru,
                tgl_hafalan,
                keterangan,
                Santri: {
                    connect: {
                        id: parseInt(id_santri),
                    },
                },
                JenisHafalan: {
                    connect: {
                        id: parseInt(id_jenis_hafalan),
                    },
                },
            },
        });

        revalidatePath(HREF_URL.HAFALAN_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(
            null,
            true,
            "Gagal menambahkan data, pastikan seluuh data sudah lengkap!"
        );
    }
};

export const getSantriInformationHafalan = async (idSantri) => {
    try {
        let data = await prisma.Santri.findUnique({
            where: {
                id: parseInt(idSantri),
            },
            select: {
                nis: true,
                nama_lengkap: true,
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data!");
    }
};

export const editJenisHafalanSantri = async (idHafalan, data) => {
    try {
        let {
            hafalan_baru,
            tgl_hafalan,
            keterangan,
            id_jenis_hafalan,
            id_santri,
        } = data;

        await prisma.Hafalan.update({
            where: {
                id: parseInt(idHafalan),
            },
            data: {
                hafalan_baru,
                tgl_hafalan,
                keterangan,
                JenisHafalan: {
                    connect: {
                        id: parseInt(id_jenis_hafalan),
                    },
                },
            },
        });
        revalidatePath(HREF_URL.HAFALAN_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal mengubah data, pastikan jenis hafalan unik!"
        );
    }
};

export const deleteHafalanSantri = async (idHafalan, id_santri) => {
    try {
        await prisma.Hafalan.delete({
            where: {
                id: idHafalan,
            },
        });
        revalidatePath(HREF_URL.HAFALAN_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(
            null,
            true,
            "Gagal mengubah data, pastikan jenis hafalan unik!"
        );
    }
};
