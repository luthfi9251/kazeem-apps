import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";

async function getData() {
    let taAktif = await prisma.TahunAjar.findFirst({
        where: {
            aktif: true,
        },
    });
    let data = await prisma.Kelas.findMany({
        select: {
            id: true,
            nama_kelas: true,
            Tingkat: {
                select: {
                    nama_tingkatan: true,
                },
            },
        },
    });

    let res = data.map((item) => {
        return {
            id: item.id,
            nama_kelas: item.nama_kelas,
            nama_tingkatan: item.Tingkat.nama_tingkatan,
        };
    });
    return res;
}

export default async function Page() {
    let data = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Kelas</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}
