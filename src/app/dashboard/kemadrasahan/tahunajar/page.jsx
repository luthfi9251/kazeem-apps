import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

async function getData() {
    let ta = await prisma.TahunAjar.findMany({
        select: {
            id: true,
            kode_ta: true,
            tgl_mulai: true,
            tgl_selesai: true,
            aktif: true,
        },
        orderBy: [
            {
                aktif: "desc",
            },
            {
                tgl_mulai: "desc",
            },
        ],
    });
    ta = ta.map((item) => {
        return {
            ...item,
            tgl_mulai: new Date(item.tgl_mulai).toLocaleDateString(),
            tgl_selesai: new Date(item.tgl_selesai).toLocaleDateString(),
        };
    });
    return ta;
}

async function Page() {
    let data = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Tahun Ajar</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_MADRASAH_PAGE);
