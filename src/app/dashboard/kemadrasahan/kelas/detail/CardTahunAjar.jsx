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
import { getTahunAjarSummaryByKelas } from "../_actions/kelas";

export default function CardTahunAjar({ dataKelas }) {
    let { data, isLoading, isError } = useQuery({
        queryKey: ["ta_count", dataKelas.id],
        queryFn: () => getTahunAjarSummaryByKelas(dataKelas.id),
        initialData: [],
    });

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className=" text-lg font-semibold">
                    Jumlah Siswa
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Kode TA</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Jumlah Siswa</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, i) => {
                            return (
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell>{item.kode_ta}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
