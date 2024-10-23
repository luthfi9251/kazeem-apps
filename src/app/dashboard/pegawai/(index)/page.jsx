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
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData() {
    let pegawaiData = await prisma.Pegawai.findMany({
        orderBy: [
            {
                nama_pegawai: "asc",
            },
        ],
        select: {
            id: true,
            id_pegawai: true,
            nama_pegawai: true,
            no_telp: true,
            email: true,
            tgl_lhr: true,
            JabatanPegawai: {
                select: {
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
            email: item.email,
            tgl_lhr: item.tgl_lhr,
            nama_jabatan: item.JabatanPegawai[0].Jabatan.nama_jabatan,
        };
    });

    return data;
}

async function Page() {
    const pegawai = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={pegawai} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_KELOLA_PEGAWAI);
