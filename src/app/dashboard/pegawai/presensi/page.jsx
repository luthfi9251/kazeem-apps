import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import { getDataKesehatanByKelasAndTA } from "../_actions/kesehatan";

async function getData() {
    let data = await prisma.presensiPegawai.findMany({
        include: {
            pegawai: {
                include: {
                    JabatanPegawai: {
                        include: {
                            Jabatan: true,
                        }
                    }
                }
            }
        },
    });
    data = data.map((presensi) => ({
        id: presensi.id,
        id_pegawai: presensi.pegawai.id_pegawai,
        nama_pegawai: presensi.pegawai.nama_pegawai,
        jabatan: presensi.pegawai.JabatanPegawai.map((item) => item.Jabatan.nama_jabatan).join(", "),
        tgl_presensi: dayjs(presensi.tgl_presensi).format("DD-MM-YYYY"),
        status: presensi.status,
        keterangan: presensi.keterangan || '-',
    }))
    return data;
}

async function Page() {
    let pegawaiData = await getData();

    // let result = await Promise.all([data]);
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={pegawaiData}
                        selectData={pegawaiData}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_PRESENSI);
