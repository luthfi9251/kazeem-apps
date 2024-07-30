import prisma from "@/lib/prisma";

export const getDataKesehatanForExcelExport = async () => {
    let data = await prisma.Kesehatan.findMany({
        orderBy: {
            tgl_masuk: "desc",
        },
        select: {
            id: true,
            KelasSantri: {
                select: {
                    Kelas: {
                        select: {
                            nama_kelas: true,
                        },
                    },
                    TahunAjar: {
                        select: {
                            kode_ta: true,
                        },
                    },
                    Santri: {
                        select: {
                            nis: true,
                            nama_lengkap: true,
                        },
                    },
                },
            },
            nama_penyakit: true,
            penanganan: true,
            kategori: true,
            tgl_masuk: true,
            tgl_keluar: true,
            status: true,
            created_at: true,
            updated_at: true,
        },
    });

    return data.map((item) => {
        return {
            nis: item.KelasSantri.Santri.nis,
            nama_lengkap: item.KelasSantri.Santri.nama_lengkap,
            kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
            tgl_masuk: new Date(item.tgl_masuk).toISOString().split("T")[0],
            tgl_keluar: item.tgl_keluar
                ? new Date(item.tgl_keluar).toISOString().split("T")[0]
                : null,
            sakit: item.nama_penyakit,
            penanganan: item.penanganan,
            kategori: item.kategori,
            status: item.status,
            created_at: item.created_at,
            updated_at: item.updated_at,
        };
    });
};
