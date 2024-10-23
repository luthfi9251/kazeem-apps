import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData() {
    let data = await prisma.Jabatan.findMany({
        orderBy: [
            {   
                nama_jabatan: "asc",
            },
        ],
        select: {
            id: true,
            nama_jabatan: true,
            JabatanPegawai: true,
            _count: {
                select: {
                    JabatanPegawai: true,
                },
            },
        },
    });

    data = data.map((item) => {
        return {
            id: item.id,
            nama_jabatan: item.nama_jabatan,
            pegawai_count: item._count.JabatanPegawai,
        };
    });

    return data;
}

async function Page() {
    let data = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Jabatan Pegawai</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_JABATAN_PEGAWAI);