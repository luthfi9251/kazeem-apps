"use server";
import prisma from "@/lib/prisma";

export const getAllKelasName = async () => {
    let data = await prisma.Kelas.findMany({
        select: {
            nama_kelas: true,
        },
    });
    return data;
};
