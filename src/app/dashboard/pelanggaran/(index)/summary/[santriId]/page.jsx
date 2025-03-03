import DetailPage from "../../summary/DetailPage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(idSantri) {
    let kelasAktifSantri = await prisma.KelasSantri.findFirst({
        orderBy: [
            {
                created_at: "desc",
            },
        ],
        where: {
            Santri: {
                id: idSantri,
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
            berkas_penunjang: item.berkas_penunjang,
            created_at: new Date(item.created_at).toLocaleDateString(),
            nama_kelas: item.KelasSantri.Kelas.nama_kelas,
            kode_ta: item.KelasSantri.TahunAjar.kode_ta,
        };
    });

    // console.dir(dataPelanggaran, { depth: null, colors: true });
    return { dataSantri, dataSummary, dataPelanggaran };
}

async function Page(props) {
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
                idSantri={idSantri}
            />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_PELANGGARAN);
