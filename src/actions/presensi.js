import prisma from "@/lib/prisma";

export const getDataPresensiForExcelExport = async () => {
    let data = await prisma.presensiPegawai.findMany({
        orderBy: {
            tgl_presensi: "desc",
        },
        select: {
            id: true, 
            tgl_presensi: true, 
            status: true, 
            keterangan: true, 
            pegawai: {
                select: {
                    id_pegawai: true,
                    nama_pegawai: true,
                    JabatanPegawai: {
                        select: {
                            id: true,
                            Jabatan: {
                                select: {
                                    nama_jabatan: true, 
                                }
                            }
                        }
                    }
                }
            }
        },
    });

    return data.map((presensi) => {
        return {
            id: presensi.id,
            // id_pegawai: presensi.pegawai.id_pegawai,
            nama_pegawai: presensi.pegawai.nama_pegawai,
            jabatan: presensi.pegawai.JabatanPegawai.map((item) => item.Jabatan.nama_jabatan).join(", "),
            tgl_presensi: presensi.tgl_presensi,
            status: presensi.status,
            keterangan: presensi.keterangan || '-',
        };
    });
};
