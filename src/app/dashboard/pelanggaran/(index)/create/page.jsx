import CreatePage from "./CreatePage";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import { getEnableWhatsappNotification } from "@/actions/variable";

async function getNamaSantri() {
    let dataSantri = await prisma.KelasSantri.findMany({
        where: {
            TahunAjar: {
                aktif: true,
            },
        },
        select: {
            id: true,
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
        },
    });

    return dataSantri.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.Santri.nama_lengkap,
        };
    });
}

async function getKategoriPelanggaran() {
    let kategori = await prisma.KategoriPelanggaran.findMany({
        select: {
            id: true,
            nama_pelanggaran: true,
            jenis: true,
            kategori: true,
            poin: true,
            kelKecakapan: true,
            Penanganan: {
                select: {
                    id: true,
                },
            },
        },
    });
    return kategori;
}

async function getAllPegawai() {
    let pegawai = await prisma.Pegawai.findMany({
        select: {
            id: true,
            id_pegawai: true,
            nama_pegawai: true,
        },
    });

    return pegawai;
}

async function Page() {
    let [namaSantri, kategoriPelanggaran, enableWhatsapp] = await Promise.all([
        getNamaSantri(),
        getKategoriPelanggaran(),
        getEnableWhatsappNotification(),
    ]);
    let dataPegawai = await getAllPegawai();

    return (
        <>
            <CreatePage
                enableWhatsapp={enableWhatsapp}
                data={{ namaSantri, kategoriPelanggaran }}
                listPegawai={dataPegawai}
            />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_PELANGGARAN);
