"use server";

import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";

export const createKamarSantri = async (formData) => {
    try {
        let { nama_kamar, deskripsi, kapasitas } = formData;
        await prisma.Kamar.create({
            data: {
                nama_kamar,
                deskripsi,
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
                id: true,
                kapasitas: true,
                deskripsi: true,
            },
        });

        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};
