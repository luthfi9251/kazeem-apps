import prisma from "@/lib/prisma";

export const getDataPegawaiForExcelExport = async () => {
    let pegawaiData = await prisma.Pegawai.findMany({
        orderBy: [
            {
                id: "asc",
            },
        ],
        select: {
            id: true,
            id_pegawai: true,
            nama_pegawai: true,
            jenis_kel: true,
            no_telp: true,
            email: true,
            tempat_lahir: true,
            tgl_lhr: true,
            JabatanPegawai: {
                select: {
                    id: true,
                    Jabatan: {
                        select: {
                            nama_jabatan: true,
                        },
                    },
                },
            },
        },
    });

    let data = pegawaiData.map((item) => {
        return {
            id: item.id,
            id_pegawai: item.id_pegawai,
            nama_pegawai: item.nama_pegawai,
            no_telp: item.no_telp,
            tgl_lhr: item.tgl_lhr,
            email: item.email,
            tempat_lahir: item.tempat_lahir,
            jenis_kel: item.jenis_kel,
            nama_jabatan: item.JabatanPegawai.map((item) => item.Jabatan.nama_jabatan).join(", "),
        };
    });

    return data;
};
