"use client";
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

export default function CardKelas({ dataKelas }) {
    return (
        <Card className="my-5">
            <CardHeader>
                <CardTitle>Kelas Siswa</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead>TA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataKelas.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell>{item.kelas}</TableCell>
                                    <TableCell>{item.kode_ta}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
