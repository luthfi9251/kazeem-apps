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

async function getDataActive() {
    let data = await prisma.KelasAkademik.findMany({
        where: {
            TahunAkademik: {
                aktif: true,
            },
        },
        select: {
            id: true,
            Tingkatan: {
                select: {
                    tingkatan: true,
                },
            },
            Paralel: {
                select: {
                    paralel: true,
                },
            },
            TahunAkademik: {
                select: {
                    tahun_mulai: true,
                    tahun_berakhir: true,
                },
            },
        },
    });
    let result = data.map((item) => {
        return {
            nama_kelas: item.Tingkatan.tingkatan + "-" + item.Paralel.paralel,
            tingkatan: item.Tingkatan.tingkatan,
            paralel: item.Paralel.paralel,
            ta:
                item.TahunAkademik.tahun_mulai +
                "/" +
                item.TahunAkademik.tahun_berakhir,
            jumlah_siswa: 0,
        };
    });
    return result;
}
async function getDataArchive() {
    let data = await prisma.KelasAkademik.findMany({
        where: {
            TahunAkademik: {
                aktif: false,
            },
        },
        select: {
            id: true,
            Tingkatan: {
                select: {
                    tingkatan: true,
                },
            },
            Paralel: {
                select: {
                    paralel: true,
                },
            },
            TahunAkademik: {
                select: {
                    tahun_mulai: true,
                    tahun_berakhir: true,
                },
            },
        },
        orderBy: {
            TahunAkademik: {
                tahun_mulai: "desc",
            },
        },
    });
    let result = data.map((item) => {
        return {
            nama_kelas: item.Tingkatan.tingkatan + "-" + item.Paralel.paralel,
            tingkatan: item.Tingkatan.tingkatan,
            paralel: item.Paralel.paralel,
            ta:
                item.TahunAkademik.tahun_mulai +
                "/" +
                item.TahunAkademik.tahun_berakhir,
            jumlah_siswa: 0,
        };
    });
    return result;
}

export default async function Page() {
    let [dataActive, dataArchive] = await Promise.all([
        getDataActive(),
        getDataArchive(),
    ]);
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Kategori Pelanggaran</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className=" border m-2 py-3 rounded">
                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="grid grid-cols-2 w-1/3">
                            <TabsTrigger value="active">
                                Kelas Aktif
                            </TabsTrigger>
                            <TabsTrigger value="archive">
                                Kelas Archive
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="active">
                            <DataTable columns={columns} data={dataActive} />
                        </TabsContent>
                        <TabsContent value="archive">
                            <DataTable columns={columns} data={dataArchive} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
