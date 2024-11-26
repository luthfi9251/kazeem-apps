"use server";

import prisma from "@/lib/prisma";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { serverResponse } = require("@/lib/utils");

export const addMataPelajaran = async (data) => {
    try {
        await prisma.MataPelajaran.create({
            data: {
                kode_mapel: data.kode_mapel,
                nama_pelajaran: data.nama_pelajaran,
                deskripsi: data.deskripsi,
            },
        });
        revalidatePath(HREF_URL.KEMADRASAHAN_MAPEL_HOME);
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(null, true, err.message);
    }
};

export const getMataPelajaran = async () => {
    let data = await prisma.MataPelajaran.findMany({});
    return serverResponse(data, false, null);
};

export const getListPegawai = async () => {
    let data = await prisma.Pegawai.findMany({});
    return serverResponse(data, false, null);
};

export const getMataPelajaranById = async (idPlain) => {
    try {
        const id = parseInt(idPlain);
        let data = await prisma.MataPelajaran.findUnique({
            where: {
                id,
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, err.message);
    }
};

export const editMataPelajaran = async (id, data) => {
    try {
        await prisma.MataPelajaran.update({
            where: {
                id: parseInt(id),
            },
            data: {
                kode_mapel: data.kode_mapel,
                nama_pelajaran: data.nama_pelajaran,
                deskripsi: data.deskripsi,
            },
        });
        revalidatePath(HREF_URL.KEMADRASAHAN_MAPEL_HOME);
        return serverResponse("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(null, true, err.message);
    }
};
