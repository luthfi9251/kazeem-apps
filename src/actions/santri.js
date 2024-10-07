import prisma from "@/lib/prisma";
import { serverResponse } from "@/lib/utils";

export const getDataSantriForExcelExport = async () => {
    let santriData = await prisma.Santri.findMany({
        orderBy: [
            {
                nis: "asc",
            },
        ],
        select: {
            id: true,
            nama_lengkap: true,
            nis: true,
            hp: true,
            alamat: true,
            email: true,
            tempat_lahir: true,
            tgl_lhr: true,
            WaliSantri: {
                select: {
                    peran: true,
                    wali: {
                        select: {
                            nama_wali: true,
                            tgl_lhr: true,
                            email: true,
                            hp: true,
                        },
                    },
                },
            },
        },
    });

    let data = santriData.map((item) => {
        return {
            id: item.id,
            nis: item.nis,
            nama_lengkap: item.nama_lengkap,
            hp: item.hp,
            alamat: item.alamat,
            tgl_lhr: item.tgl_lhr,
            email: item.email,
            tempat_lahir: item.tempat_lahir,
            nama_wali: item.WaliSantri[0].wali.nama_wali,
            tgl_lhr_wali: item.WaliSantri[0].wali.tgl_lhr,
            email_wali: item.WaliSantri[0].wali.email,
            peran_wali: item.WaliSantri[0].peran,
        };
    });

    return data;
};

export const getAllSantriNameAndNIS = async () => {
    try {
        let data = await prisma.Santri.findMany({
            where: {},
            select: {
                id: true,
                nama_lengkap: true,
                nis: true,
            },
        });

        return serverResponse(data, false, null);
    } catch (err) {
        return serverResponse(null, true, "Gagal mendapatkan data");
    }
};
