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
