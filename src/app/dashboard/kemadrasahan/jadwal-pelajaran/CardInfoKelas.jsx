import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

async function getData(idKelas) {
    let dataTahunAjaran = prisma.TahunAjar.findMany({
        where: {},
        orderBy: {
            tgl_mulai: "desc",
        },
    });

    let dataKelas = prisma.Kelas.findUnique({
        where: {
            id: parseInt(idKelas),
        },
        select: {
            id: true,
            nama_kelas: true,
            Tingkat: {
                select: {
                    nama_tingkatan: true,
                },
            },
            keterangan: true,
        },
    });

    return await Promise.all([dataTahunAjaran, dataKelas]);
}

export default async function CardInfoKelas({ idKelas }) {
    const dataKelas = await getData(idKelas);

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className=" text-lg font-semibold">
                    Detail Kelas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="table-auto">
                    <TableBody className="text-sm">
                        <TableRow className=" hover:bg-white border-none">
                            <TableCell className="font-medium py-1 w-[120px]">
                                Nama Kelas
                            </TableCell>
                            <TableCell className="font-medium py-1 w-[50px]">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataKelas[1].nama_kelas}
                            </TableCell>
                        </TableRow>
                        <TableRow className=" hover:bg-white border-none">
                            <TableCell className="font-medium py-1 w-[120px]">
                                Tingkatan
                            </TableCell>
                            <TableCell className="font-medium py-1 w-[50px]">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataKelas[1].Tingkat.nama_tingkatan}
                            </TableCell>
                        </TableRow>
                        <TableRow className=" hover:bg-white border-none">
                            <TableCell className="font-medium py-1">
                                Keterangan
                            </TableCell>
                            <TableCell className="font-medium py-1">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataKelas[1].keterangan}
                            </TableCell>
                        </TableRow>
                        <TableRow className=" hover:bg-white">
                            <TableCell className="font-medium py-1">
                                Tahun Ajaran
                            </TableCell>
                            <TableCell className="font-medium py-1">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {
                                    dataKelas[0].find((item) => item.aktif)
                                        .kode_ta
                                }{" "}
                                (Aktif)
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
