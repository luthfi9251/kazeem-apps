import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

async function getData() {
    let data = await prisma.KategoriPelanggaran.findMany({
        select: {
            id: true,
            nama_pelanggaran: true,
            jenis: true,
            kategori: true,
            poin: true,
        },
    });

    return data;
}

export default async function Page() {
    let data = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Kategori Pelanggaran</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}
