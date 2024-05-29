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

export default function CardDataKelas({ dataKelas, dataTA }) {
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
                                Tingkatan
                            </TableCell>
                            <TableCell className="font-medium py-1 w-[50px]">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataKelas.Tingkat.nama_tingkatan}
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
                                {dataKelas.keterangan}
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
                                {dataTA.find((item) => item.aktif).kode_ta}{" "}
                                (Aktif)
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
