import DetailPage from "../../summary/DetailPage";
import prisma from "@/lib/prisma";

async function getData(idSantri) {
    let kelasAktifSantri = await prisma.KelasSantri.findFirst({
        where: {
            Santri: {
                id: idSantri,
            },
            TahunAjar: {
                aktif: true,
            },
        },
        select: {
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
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
        },
    });

    let santriSummary = await prisma.KelasSantri.findMany({
        where: {
            Santri: {
                id: idSantri,
            },
        },
        select: {
            TahunAjar: {
                select: {
                    id: true,
                    kode_ta: true,
                },
            },
            Kelas: {
                select: {
                    id: true,
                    nama_kelas: true,
                },
            },
            _count: {
                select: {
                    Pelangaran: true,
                },
            },
        },
    });

    let getAllPelanggaran = await prisma.Pelanggaran.findMany({
        where: {
            KelasSantri: {
                Santri: {
                    id: idSantri,
                },
            },
        },
        include: {
            Kategori: true,
            KelasSantri: {
                select: {
                    TahunAjar: {
                        select: {
                            id: true,
                            kode_ta: true,
                        },
                    },
                    Kelas: {
                        select: {
                            id: true,
                            nama_kelas: true,
                        },
                    },
                },
            },
        },
    });
    /**
     {
    id: 5,
    kategori_id: 3,
    kelassantri_id: 9,
    keterangan: '125',
    konsekuensi: '1234',
    last_update_by_id: 'c216277d-5be4-4b2f-867a-307e3b9b4348',
    created_by_id: 'c216277d-5be4-4b2f-867a-307e3b9b4348',
    created_at: 2024-05-31T14:19:05.322Z,
    updated_at: 2024-05-31T14:19:05.322Z,
    Kategori: {
      id: 3,
      nama_pelanggaran: 'Menyanyi',
      kategori: 'BERAT',
      jenis: 'Perilaku',
      poin: 100,
      created_by_id: 'c216277d-5be4-4b2f-867a-307e3b9b4348',
      last_update_by_id: 'c216277d-5be4-4b2f-867a-307e3b9b4348',
      created_at: 2024-05-31T12:43:07.911Z,
      updated_at: 2024-05-31T12:43:07.911Z
    },
    KelasSantri: {
      TahunAjar: { id: 2, kode_ta: '2025/2026' },
      Kelas: { id: 1, nama_kelas: '1-A' }
    }
  }
     */

    let dataSantri = {
        nama_kelas: kelasAktifSantri.Kelas.nama_kelas,
        kode_ta: kelasAktifSantri.TahunAjar.kode_ta,
        nama_santri: kelasAktifSantri.Santri.nama_lengkap,
        nama_lengkap: kelasAktifSantri.Santri.nama_lengkap,
        total_poin: getAllPelanggaran.reduce(
            (prev, curr) => prev + curr.Kategori.poin,
            0
        ),
    };

    let dataSummary = santriSummary.map((item) => {
        return {
            nama_kelas: item.Kelas.nama_kelas,
            kode_ta: item.TahunAjar.kode_ta,
            jumlah_pelanggaran: item._count.Pelangaran,
            total_poin: getAllPelanggaran.reduce((prev, curr) => {
                console.log(`Running on reduce ${item.Kelas.nama_kelas}`);
                if (
                    curr.KelasSantri.TahunAjar.kode_ta ===
                    item.TahunAjar.kode_ta
                ) {
                    if (
                        curr.KelasSantri.Kelas.nama_kelas ===
                        item.Kelas.nama_kelas
                    ) {
                        return prev + curr.Kategori.poin;
                    }
                }
                return prev;
            }, 0),
        };
    });
    let dataPelanggaran = getAllPelanggaran.map((item) => {
        return {
            id: item.id,
            nama_pelanggaran: item.Kategori.nama_pelanggaran,
            kategori: item.Kategori.kategori,
            jenis: item.Kategori.jenis,
            poin: item.Kategori.poin,
            keterangan: item.keterangan,
            konsekuensi: item.konsekuensi,
            created_at: new Date(item.created_at).toLocaleDateString(),
            nama_kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
        };
    });

    // console.dir(dataPelanggaran, { depth: null, colors: true });
    return { dataSantri, dataSummary, dataPelanggaran };
}

export default async function Page(props) {
    let idSantri = props.params.santriId;
    let { dataSantri, dataSummary, dataPelanggaran } = await getData(
        parseInt(idSantri)
    );
    return (
        <>
            <DetailPage
                dataSantri={dataSantri}
                dataSummary={dataSummary}
                dataPelanggaran={dataPelanggaran}
            />
        </>
    );
}
