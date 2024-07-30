import prisma from "@/lib/prisma";

export const getDataPelanggaranForExcelExport = async () => {
    let data = await prisma.Pelanggaran.findMany({
        select: {
            id: true,
            KelasSantri: {
                select: {
                    Kelas: {
                        select: {
                            nama_kelas: true,
                        },
                    },
                    Santri: {
                        select: {
                            id: true,
                            nama_lengkap: true,
                            nis: true,
                        },
                    },
                    TahunAjar: {
                        select: {
                            kode_ta: true,
                        },
                    },
                },
            },
            Kategori: {
                select: {
                    nama_pelanggaran: true,
                    kategori: true,
                    jenis: true,
                    poin: true,
                },
            },
            created_at: true,
            updated_at: true,
            konsekuensi: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return data.map((item) => {
        return {
            id: item.id,
            santri_id: item.KelasSantri.Santri.id,
            nis: item.KelasSantri.Santri.nis,
            nama_santri: item.KelasSantri.Santri.nama_lengkap,
            kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
            nama_pelanggaran: item.Kategori.nama_pelanggaran,
            jenis_pelanggaran: item.Kategori.jenis,
            poin: item.Kategori.poin,
            tanggal: new Date(item.created_at).toLocaleDateString(),
            created_at: item.created_at,
            updated_at: item.updated_at,
            konsekuensi: item.konsekuensi,
        };
    });
};
