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

export const getAllKelasDataForExcelExport = async () => {
    let data = await prisma.KelasSantri.findMany({
        include: {
            Kelas: {
                select: {
                    nama_kelas: true,
                    Tingkat: {
                        select: {
                            nama_tingkatan: true,
                        },
                    },
                },
            },
            TahunAjar: {
                select: {
                    kode_ta: true,
                    tgl_mulai: true,
                    tgl_selesai: true,
                    aktif: true,
                },
            },
            Santri: {
                select: {
                    nis: true,
                    nama_lengkap: true,
                },
            },
        },
    });

    return data.map((item) => {
        return {
            nama_kelas: item.Kelas.nama_kelas,
            tingkat: item.Kelas.Tingkat.nama_tingkatan,
            kode_ta: item.TahunAjar.kode_ta,
            tgl_mulai: item.TahunAjar.tgl_mulai,
            tgl_selesai: item.TahunAjar.tgl_selesai,
            aktif: item.TahunAjar.aktif,
            nis: item.Santri.nis,
            nama_santri: item.Santri.nama_lengkap,
            status: item.status,
        };
    });
};

export async function getOneKelasDataForExcelExport(idKelas, kode_ta) {
    let data = await prisma.KelasSantri.findMany({
        where: {
            kelas_id: parseInt(idKelas),
            TahunAjar: {
                kode_ta,
            },
        },
        include: {
            Kelas: {
                select: {
                    nama_kelas: true,
                    Tingkat: {
                        select: {
                            nama_tingkatan: true,
                        },
                    },
                },
            },
            TahunAjar: {
                select: {
                    kode_ta: true,
                    tgl_mulai: true,
                    tgl_selesai: true,
                    aktif: true,
                },
            },
            Santri: {
                select: {
                    nis: true,
                    nama_lengkap: true,
                },
            },
        },
    });

    return data.map((item) => {
        return {
            nama_kelas: item.Kelas.nama_kelas,
            tingkat: item.Kelas.Tingkat.nama_tingkatan,
            kode_ta: item.TahunAjar.kode_ta,
            tgl_mulai: item.TahunAjar.tgl_mulai,
            tgl_selesai: item.TahunAjar.tgl_selesai,
            aktif: item.TahunAjar.aktif,
            nis: item.Santri.nis,
            nama_santri: item.Santri.nama_lengkap,
            status: item.status,
        };
    });
}
