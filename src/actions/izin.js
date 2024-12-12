"use server";

import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";

export const getSantriInformationPerizinan = async (idSantri) => {

    try {
        let data = await prisma.Santri.findUnique({
            where: {
                id: parseInt(idSantri),
            },
            select: {
                nis: true,
                nama_lengkap: true,
                KelasSantri: {
                    select: {
                        Kelas: {
                            select: {
                                nama_kelas: true,
                            }
                        },
                    },
                },
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data!");
    }
};

export const getAllIzinKeluarSantri = async (idSantri) => {
    try {
        let data = await prisma.IzinKeluar.findMany({
            where: {
                Santri: {
                    id: parseInt(idSantri),
                },
            },
            include: {
                Santri: {
                    include: {
                        KelasSantri: {
                            include: {
                                Kelas: true,
                            },
                        },
                    },
                },
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data!");
    }
};

export const addIzinKeluarSantri = async (data) => {
    try {
        let {
            tujuan,
            keperluan,
            tgl_izin,
            jam_keluar,
            jam_kembali,
            statusIzin,
            keterangan,
            id_santri,
        } = data;

        await prisma.IzinKeluar.create({
            data: {
                tujuan,
                keperluan,
                tgl_izin,
                jam_keluar,
                jam_kembali,
                statusIzin,
                keterangan,
                Santri: {
                    connect: {
                        id: parseInt(id_santri),
                    },
                },
    
            },
        });

        revalidatePath(HREF_URL.PERIZINAN_KELUAR_SANTRI_DETAIL(id_santri));
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

export const editIzinKeluarSantri = async (idIzinKeluar, data) => {
    try {
        let {
            tujuan,
            keperluan,
            tgl_izin,
            jam_keluar,
            jam_kembali,
            statusIzin,
            keterangan,
            id_santri,
        } = data;
        await prisma.IzinKeluar.update({
            where: {
                id: parseInt(idIzinKeluar),
            },
            data: {
                tujuan,
                keperluan,
                tgl_izin,
                jam_keluar,
                jam_kembali,
                statusIzin,
                keterangan,
            },
        });
        revalidatePath(HREF_URL.PERIZINAN_KELUAR_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal mengubah data"
        );
    }
};

export const deleteIzinKeluarSantri = async (idIzinKeluar, id_santri) => {
    try {
        await prisma.IzinKeluar.delete({
            where: {
                id: idIzinKeluar,
            },
        });
        revalidatePath(HREF_URL.PERIZINAN_KELUAR_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(
            null,
            true,
            "Gagal menghapus data"
        );
    }
};

export const getAllIzinPulangSantri = async (idSantri) => {
    try {
        let data = await prisma.IzinPulang.findMany({
            where: {
                Santri: {
                    id: parseInt(idSantri),
                },
            },
            include: {
                Santri: {
                    include: {
                        KelasSantri: {
                            include: {
                                Kelas: true,
                            },
                        },
                    },
                },
            },
        });
        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data!");
    }
};

export const addIzinPulangSantri = async (data) => {
    try {
        let {
            keperluan,
            tgl_izin,
            tgl_kembali,
            statusIzin,
            keterangan,
            id_santri,
        } = data;

        await prisma.IzinPulang.create({
            data: {
                keperluan,
                tgl_izin,
                tgl_kembali,
                statusIzin,
                keterangan,
                Santri: {
                    connect: {
                        id: parseInt(id_santri),
                    },
                },
    
            },
        });

        revalidatePath(HREF_URL.PERIZINAN_PULANG_SANTRI_DETAIL(id_santri));
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

export const editIzinPulangSantri = async (idIzinPulang, data) => {
    try {
        let {
            keperluan,
            tgl_izin,
            tgl_kembali,
            statusIzin,
            keterangan,
            id_santri,
        } = data;
        await prisma.IzinPulang.update({
            where: {
                id: parseInt(idIzinPulang),
            },
            data: {
                keperluan,
                tgl_izin,
                tgl_kembali,
                statusIzin,
                keterangan,
            },
        });
        revalidatePath(HREF_URL.PERIZINAN_PULANG_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        return serverResponse(
            null,
            true,
            "Gagal mengubah data"
        );
    }
};

export const deleteIzinPulangSantri = async (idIzinPulang, id_santri) => {
    try {
        await prisma.IzinPulang.delete({
            where: {
                id: idIzinPulang,
            },
        });
        revalidatePath(HREF_URL.PERIZINAN_PULANG_SANTRI_DETAIL(id_santri));
        return serverResponse("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponse(
            null,
            true,
            "Gagal menghapus data"
        );
    }
};
