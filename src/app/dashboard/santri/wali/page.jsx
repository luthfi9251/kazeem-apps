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
import { PAGE_NAME } from "@/security-config";

async function getData() {
    let data = await prisma.Wali.findMany({
        orderBy: [
            {
                nama_wali: "asc",
            },
        ],
        select: {
            id: true,
            nama_wali: true,
            tgl_lhr: true,
            hp: true,
            _count: {
                select: {
                    WaliSantri: true,
                },
            },
        },
    });

    data = data.map((item) => {
        return {
            id: item.id,
            nama_wali: item.nama_wali,
            tgl_lhr: item.tgl_lhr,
            hp: item.hp,
            santri_count: item._count.WaliSantri,
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
                    <CardTitle>Data Wali Santri</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_SANTRI_PAGE);
