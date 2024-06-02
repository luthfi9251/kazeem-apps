"use client";
import { useQuery } from "@tanstack/react-query";
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

export default function CardJumlahPelanggaran({ dataSummary }) {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className=" text-lg font-semibold">
                    Jumlah Pelanggaran
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead>TA</TableHead>
                            <TableHead>Jumlah Pelanggaran</TableHead>
                            <TableHead>Total Poin</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataSummary.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell>{item.nama_kelas}</TableCell>
                                    <TableCell>{item.kode_ta}</TableCell>
                                    <TableCell>
                                        {item.jumlah_pelanggaran}
                                    </TableCell>
                                    <TableCell>{item.total_poin}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
