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
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import { getPelanggaranByKelasAndTA } from "../_actions/pelanggaran";

async function getData() {
    let data = await prisma.KelasSantri.findMany({
        where: {},
        distinct: ["kelas_id", "ta_id"],
        select: {
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
    /**{ Kelas: { nama_kelas: '1-A' }, TahunAjar: { kode_ta: '2024/2025' } } */
    let uniqueNamaKelas = [
        ...new Set(data.map((item) => item.Kelas.nama_kelas)),
    ];
    let uniqueTahunAjar = [
        ...new Set(data.map((item) => item.TahunAjar.kode_ta)),
    ];
    return {
        kelas: uniqueNamaKelas,
        kode_ta: uniqueTahunAjar,
    };
}

async function Page() {
    let data = getData();
    let dataPelanggaran = getPelanggaranByKelasAndTA({
        nama_kelas: undefined,
        kode_ta: undefined,
    });

    let result = await Promise.all([data, dataPelanggaran]);
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Pelanggaran</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={result[1]}
                        selectData={result[0]}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_PELANGGARAN);
