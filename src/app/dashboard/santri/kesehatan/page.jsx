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
import { PAGE_NAME } from "@/security-config";

async function getData() {
    let data = await prisma.Kesehatan.findMany({
        orderBy: {
            created_at: "desc",
        },
        select: {
            id: true,
            Santri: {
                select: {
                    nama_lengkap: true,
                },
            },
            nama_penyakit: true,
            penanganan: true,
            kategori: true,
            tgl_masuk: true,
            status: true,
        },
    });

    return data.map((item) => {
        return {
            ...item,
            tgl_masuk: new Date(item.tgl_masuk).toISOString().split("T")[0],
            nama_lengkap: item.Santri.nama_lengkap,
        };
    });
}

async function Page() {
    const santri = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Kesahatan</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={santri} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_SANTRI_PAGE);
